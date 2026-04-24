import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

type ContactPayload = {
  nombre?: string;
  email?: string;
  telefono?: string;
  telefono_pais?: string;
  servicio?: string;
  mensaje?: string;
  website?: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_LENGTHS = {
  nombre: 120,
  email: 200,
  telefono: 40,
  telefono_pais: 10,
  servicio: 80,
  mensaje: 1200,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeField = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const isValidLength = (value: string, max: number) =>
  value.length > 0 && value.length <= max;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const fmt = (value: string) => (value ? escapeHtml(value) : "-");

const buildOwnerEmailHtml = (p: ContactPayload) => {
  const tel = `${p.telefono_pais ?? ""} ${p.telefono ?? ""}`.trim();
  const siteUrl = process.env.SITE_URL ?? "";
  const logoUrl = siteUrl ? `${siteUrl}/logo.jpeg` : "";

  return `
<div style="background:#f5f4fb;padding:40px 20px;font-family:Arial,sans-serif;color:#1a1026;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
    style="max-width:680px;margin:0 auto;background:#fff;border:1px solid #e2ddf3;border-radius:18px;overflow:hidden;box-shadow:0 12px 32px rgba(16,8,32,0.1);">
    <tr>
      <td style="padding:28px 32px;background:linear-gradient(135deg,#2c1458 0%,#1d1035 60%,#140a24 100%);">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td>${logoUrl ? `<img src="${logoUrl}" alt="EternalGrowth" width="110" style="display:block;" />` : ""}</td>
            <td style="text-align:right;font-size:11px;color:rgba(255,255,255,0.65);letter-spacing:.12em;text-transform:uppercase;">Nuevo lead</td>
          </tr>
        </table>
        <h1 style="margin:16px 0 4px;font-size:20px;color:#fff;">Solicitud de diagnóstico</h1>
        <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.75);">Nuevo interesado desde la landing page.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 32px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
          style="font-size:14px;color:#1a1026;border-collapse:collapse;">
          <tr><td style="padding:7px 0;width:36%;color:#6b6278;">Nombre</td><td style="padding:7px 0;font-weight:600;">${fmt(p.nombre ?? "")}</td></tr>
          <tr><td style="padding:7px 0;color:#6b6278;">Email</td><td style="padding:7px 0;">${fmt(p.email ?? "")}</td></tr>
          <tr><td style="padding:7px 0;color:#6b6278;">Teléfono</td><td style="padding:7px 0;">${fmt(tel)}</td></tr>
          <tr><td style="padding:7px 0;color:#6b6278;">Interés</td><td style="padding:7px 0;">${fmt(p.servicio ?? "")}</td></tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:0 32px 28px;">
        <div style="background:#f6f2ff;border:1px solid #e1d8f4;border-radius:12px;padding:16px;">
          <p style="margin:0 0 6px;font-size:11px;color:#7a6f91;letter-spacing:.1em;text-transform:uppercase;">Mensaje</p>
          <p style="margin:0;font-size:13.5px;line-height:1.65;color:#2d233d;">${fmt(p.mensaje ?? "")}</p>
        </div>
      </td>
    </tr>
  </table>
  <p style="max-width:680px;margin:14px auto 0;font-size:11px;color:#8b80a0;text-align:center;">EternalGrowth · Transformación digital para tu negocio</p>
</div>`;
};

const buildUserEmailHtml = (p: ContactPayload) => {
  const siteUrl = process.env.SITE_URL ?? "";
  const logoUrl = siteUrl ? `${siteUrl}/logo.jpeg` : "";

  return `
<div style="background:#f5f4fb;padding:40px 20px;font-family:Arial,sans-serif;color:#1a1026;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
    style="max-width:680px;margin:0 auto;background:#fff;border:1px solid #e2ddf3;border-radius:18px;overflow:hidden;box-shadow:0 12px 32px rgba(16,8,32,0.1);">
    <tr>
      <td style="padding:28px 32px;background:linear-gradient(135deg,#2c1458 0%,#1d1035 60%,#140a24 100%);">
        ${logoUrl ? `<img src="${logoUrl}" alt="EternalGrowth" width="110" style="display:block;margin-bottom:16px;" />` : ""}
        <h1 style="margin:0;font-size:20px;color:#fff;">¡Recibimos tu solicitud!</h1>
        <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.75);">Pronto te contactaremos para coordinar tu diagnóstico.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:26px 32px;">
        <p style="margin:0 0 16px;font-size:14px;line-height:1.75;color:#2d233d;">
          Hola <strong>${fmt(p.nombre ?? "")}</strong>, gracias por escribirnos.
          Revisaremos tu mensaje y te confirmaremos en menos de 24 horas para coordinar tu sesión de diagnóstico gratuito de 30 minutos.
        </p>
        <div style="background:#f6f2ff;border:1px solid #e1d8f4;border-radius:12px;padding:16px 20px;">
          <p style="margin:0 0 4px;font-size:11px;color:#7a6f91;letter-spacing:.1em;text-transform:uppercase;">Tu interés</p>
          <p style="margin:0;font-size:14px;font-weight:600;color:#2d233d;">${fmt(p.servicio ?? "")}</p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:0 32px 28px;">
        <p style="margin:0 0 8px;font-size:13px;color:#6b6278;">¿Tienes dudas? Escríbenos directamente:</p>
        <p style="margin:0;font-size:13px;color:#2d233d;">
          📧 eternalgrowth00@gmail.com<br />
          📸 @eternalgrowth__
        </p>
      </td>
    </tr>
  </table>
  <p style="max-width:680px;margin:14px auto 0;font-size:11px;color:#8b80a0;text-align:center;">EternalGrowth · Medellín, Colombia · 2026</p>
</div>`;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    res.status(500).json({ error: "Falta RESEND_API_KEY" });
    return;
  }

  const body = req.body as ContactPayload;
  const nombre = normalizeField(body?.nombre);
  const email = normalizeField(body?.email);
  const telefono = normalizeField(body?.telefono);
  const telefonoPais = normalizeField(body?.telefono_pais);
  const servicio = normalizeField(body?.servicio);
  const mensaje = normalizeField(body?.mensaje);
  const honeypot = normalizeField(body?.website);

  if (honeypot) {
    res.status(200).json({ ok: true });
    return;
  }

  if (
    !isValidLength(nombre, MAX_LENGTHS.nombre) ||
    !isValidLength(email, MAX_LENGTHS.email) ||
    !isValidLength(servicio, MAX_LENGTHS.servicio) ||
    !isValidLength(mensaje, MAX_LENGTHS.mensaje)
  ) {
    res.status(400).json({ error: "Campos requeridos incompletos" });
    return;
  }

  if (!EMAIL_REGEX.test(email)) {
    res.status(400).json({ error: "Email inválido" });
    return;
  }

  const payload: ContactPayload = { nombre, email, telefono, telefono_pais: telefonoPais, servicio, mensaje };
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const to = process.env.CONTACT_TO_EMAIL ?? "eternalgrowth00@gmail.com";

  try {
    await Promise.all([
      resend.emails.send({
        from: `EternalGrowth <${from}>`,
        to,
        replyTo: email,
        subject: `Nuevo diagnóstico: ${nombre}`,
        html: buildOwnerEmailHtml(payload),
        text: `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefonoPais} ${telefono}\nInterés: ${servicio}\n\n${mensaje}`,
      }),
      resend.emails.send({
        from: `EternalGrowth <${from}>`,
        to: email,
        subject: "Recibimos tu solicitud — EternalGrowth",
        html: buildUserEmailHtml(payload),
        text: `Hola ${nombre}, recibimos tu solicitud y te escribiremos en menos de 24 horas.\n\nInterés: ${servicio}\n\nEquipo EternalGrowth`,
      }),
    ]);

    res.status(200).json({ ok: true });
  } catch {
    res.status(500).json({ error: "No se pudo enviar el correo" });
  }
}
