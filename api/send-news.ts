import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function buildNewsEmailHtml(p: {
  title: string;
  deck: string;
  category: string;
  date: string;
  slug: string;
}) {
  const siteUrl = process.env.SITE_URL ?? "https://eternalgrowth.co";
  const logoUrl = `${siteUrl}/logo.jpeg`;
  const articleUrl = `${siteUrl}/news/${p.slug}`;
  const title = escapeHtml(p.title);
  const deck = escapeHtml(p.deck);
  const category = escapeHtml(p.category);
  const date = escapeHtml(p.date);

  return `
<div style="background:#f5f4fb;padding:40px 20px;font-family:Arial,sans-serif;color:#1a1026;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
    style="max-width:680px;margin:0 auto;background:#fff;border:1px solid #e2ddf3;border-radius:18px;overflow:hidden;box-shadow:0 12px 32px rgba(16,8,32,0.1);">
    <tr>
      <td style="padding:28px 32px;background:linear-gradient(135deg,#2c1458 0%,#1d1035 60%,#140a24 100%);">
        <img src="${logoUrl}" alt="EternalGrowth" width="110" style="display:block;margin-bottom:16px;" />
        <p style="margin:0 0 6px;font-size:11px;color:rgba(255,255,255,0.55);letter-spacing:.14em;text-transform:uppercase;">Nueva publicación · Blog</p>
        <h1 style="margin:0;font-size:20px;color:#fff;line-height:1.35;">${title}</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 32px 12px;">
        <span style="display:inline-block;padding:3px 10px;background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.3);border-radius:20px;font-size:11px;color:#8b5cf6;letter-spacing:.06em;">${category}</span>
        <span style="margin-left:8px;font-size:11px;color:#8a7f9a;">${date}</span>
      </td>
    </tr>
    <tr>
      <td style="padding:0 32px 28px;">
        <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#2d233d;">${deck}</p>
        <a href="${articleUrl}"
          style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;letter-spacing:.02em;">
          Leer artículo completo →
        </a>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 32px;border-top:1px solid #f0ebfa;">
        <p style="margin:0;font-size:11px;color:#8a7f9a;line-height:1.6;">
          Recibiste este correo porque te suscribiste a <strong>Eternal News</strong>.<br />
          Si no quieres recibir más correos, responde con "Cancelar suscripción".
        </p>
      </td>
    </tr>
  </table>
  <p style="max-width:680px;margin:14px auto 0;font-size:11px;color:#8b80a0;text-align:center;">EternalGrowth · Medellín, Colombia · 2026</p>
</div>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    res.status(500).json({ error: "Falta ADMIN_SECRET" });
    return;
  }

  const authHeader = req.headers["x-admin-secret"];
  if (authHeader !== adminSecret) {
    res.status(401).json({ error: "No autorizado" });
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    res.status(500).json({ error: "Falta RESEND_API_KEY" });
    return;
  }

  if (!process.env.RESEND_AUDIENCE_ID) {
    res.status(500).json({ error: "Falta RESEND_AUDIENCE_ID" });
    return;
  }

  const body = req.body as {
    title?: string;
    deck?: string;
    category?: string;
    date?: string;
    slug?: string;
  };

  const title = (body?.title ?? "").trim();
  const deck = (body?.deck ?? "").trim();
  const category = (body?.category ?? "").trim();
  const date = (body?.date ?? "").trim();
  const slug = (body?.slug ?? "").trim();

  if (!title || !deck || !slug) {
    res.status(400).json({ error: "Faltan campos: title, deck, slug" });
    return;
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const siteUrl = process.env.SITE_URL ?? "https://eternalgrowth.co";

  try {
    // Crear broadcast en Resend dirigido a toda la audiencia
    const created = await resend.broadcasts.create({
      audienceId: process.env.RESEND_AUDIENCE_ID,
      from: `Eternal News <${fromEmail}>`,
      subject: `Nueva publicación: ${title}`,
      html: buildNewsEmailHtml({ title, deck, category, date, slug }),
      text:
        `Nueva publicación en el Blog de EternalGrowth\n\n` +
        `${title}\n\n` +
        `${deck}\n\n` +
        `Leer artículo completo: ${siteUrl}/news/${slug}\n\n` +
        `---\nRecibiste este correo porque te suscribiste a Eternal News.`,
      name: `Blog - ${title}`,
    });

    if (created.error) {
      res.status(500).json({ error: created.error.message });
      return;
    }

    // Enviar el broadcast
    const sent = await resend.broadcasts.send(created.data!.id);

    if (sent.error) {
      res.status(500).json({ error: sent.error.message });
      return;
    }

    res.status(200).json({ ok: true, broadcastId: created.data!.id });
  } catch {
    res.status(500).json({ error: "No se pudo enviar el broadcast" });
  }
}
