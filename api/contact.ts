import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import {
  buildOwnerEmail,
  buildOwnerEmailHtml,
  buildUserEmail,
  buildUserEmailHtml,
  type ContactPayload,
} from "./emailTemplates.js";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_LENGTHS = {
  nombre: 120,
  email: 200,
  telefono: 40,
  telefono_pais: 10,
  empresa: 160,
  servicio: 80,
  contacto_preferido: 20,
  descripcion_servicio: 1000,
  descripcion_empresa: 1000,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeField = (value: unknown) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

const normalizeBoolean = (value: unknown) =>
  value === true || value === "true" || value === 1 || value === "1";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isValidLength = (value: string, maxLength: number) =>
  value.length > 0 && value.length <= maxLength;


export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Metodo no permitido" });
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    response.status(500).json({ error: "Falta RESEND_API_KEY" });
    return;
  }

  const payload = request.body as ContactPayload;
  const isNewsletter = normalizeBoolean((payload as { newsletter?: unknown })?.newsletter);
  const newsletterSource = normalizeField(
    (payload as { newsletter_source?: unknown })?.newsletter_source,
  );
  const nombre = normalizeField(payload?.nombre);
  const email = normalizeField(payload?.email);
  const telefono = normalizeField(payload?.telefono);
  const telefonoPais = normalizeField(payload?.telefono_pais);
  const empresa = normalizeField(payload?.empresa);
  const servicio = normalizeField(payload?.servicio);
  const contactoPreferido = normalizeField(payload?.contacto_preferido);
  const descripcionServicio = normalizeField(payload?.descripcion_servicio);
  const descripcionEmpresa = normalizeField(payload?.descripcion_empresa);

  if (!EMAIL_REGEX.test(email)) {
    response.status(400).json({ error: "Email invalido" });
    return;
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "eternalgrowth00@gmail.com";

  if (isNewsletter) {
    const safeEmail = escapeHtml(email);
    const sourceLabel = newsletterSource || "Eternal News";

    try {
      // Guardar en Resend Audiences para poder hacer broadcasts futuros
      if (process.env.RESEND_AUDIENCE_ID) {
        await resend.contacts.create({
          email,
          audienceId: process.env.RESEND_AUDIENCE_ID,
          unsubscribed: false,
        });
      }

      const siteUrl = process.env.SITE_URL ?? "https://eternalgrowth.xyz";
      const logoUrl = `${siteUrl}/logo.jpeg`;
      const blogUrl = `${siteUrl}/blog`;

      // Notificación al owner
      await resend.emails.send({
        from: `EternalGrowth <${fromEmail}>`,
        to: toEmail,
        replyTo: email,
        subject: "Nuevo suscriptor — Eternal News",
        text: `Nuevo suscriptor en Eternal News\n\nEmail: ${email}\nOrigen: ${sourceLabel}`,
        html: `
<div style="background:#f5f4fb;padding:40px 20px;font-family:Arial,sans-serif;color:#1a1026;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
    style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e2ddf3;border-radius:18px;overflow:hidden;box-shadow:0 12px 32px rgba(16,8,32,0.1);">
    <tr>
      <td style="padding:28px 32px;background:linear-gradient(135deg,#2c1458 0%,#1d1035 60%,#140a24 100%);">
        <img src="${logoUrl}" alt="EternalGrowth" width="110" style="display:block;margin-bottom:16px;" />
        <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.55);letter-spacing:.14em;text-transform:uppercase;">Eternal News · Nuevo suscriptor</p>
        <h1 style="margin:0;font-size:20px;color:#fff;">Alguien se unio al blog</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 32px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;color:#1a1026;border-collapse:collapse;">
          <tr><td style="padding:7px 0;width:36%;color:#6b6278;">Email</td><td style="padding:7px 0;font-weight:600;">${safeEmail}</td></tr>
          <tr><td style="padding:7px 0;color:#6b6278;">Origen</td><td style="padding:7px 0;">${escapeHtml(sourceLabel)}</td></tr>
        </table>
      </td>
    </tr>
  </table>
  <p style="max-width:640px;margin:14px auto 0;font-size:11px;color:#8b80a0;text-align:center;">EternalGrowth · Medellín, Colombia · 2026</p>
</div>`,
      });

      // Bienvenida al suscriptor
      await resend.emails.send({
        from: `Eternal News <${fromEmail}>`,
        to: email,
        subject: "Ya eres parte de Eternal News",
        text:
          "Hola,\n\n" +
          "Quedaste suscrito a Eternal News.\n" +
          "Cada vez que publiquemos un nuevo analisis, alerta o tendencia digital te avisamos directo a tu correo.\n\n" +
          `Lee las publicaciones en: ${blogUrl}\n\n` +
          "Equipo EternalGrowth",
        html: `
<div style="background:#f5f4fb;padding:40px 20px;font-family:Arial,sans-serif;color:#1a1026;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
    style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e2ddf3;border-radius:18px;overflow:hidden;box-shadow:0 12px 32px rgba(16,8,32,0.1);">
    <tr>
      <td style="padding:28px 32px;background:linear-gradient(135deg,#2c1458 0%,#1d1035 60%,#140a24 100%);">
        <img src="${logoUrl}" alt="EternalGrowth" width="110" style="display:block;margin-bottom:20px;" />
        <p style="margin:0 0 6px;font-size:11px;color:rgba(255,255,255,0.55);letter-spacing:.14em;text-transform:uppercase;">Eternal News</p>
        <h1 style="margin:0 0 8px;font-size:22px;color:#fff;line-height:1.3;">Ya eres parte del blog</h1>
        <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.7);">Te avisamos cada vez que publiquemos algo nuevo.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 32px 20px;">
        <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#2d233d;">
          Gracias por suscribirte. Desde aquí recibirás análisis, alertas y señales útiles sobre tecnología, IA y marketing digital para hacer crecer tu negocio.
        </p>
        <div style="background:#f6f2ff;border:1px solid #e1d8f4;border-radius:12px;padding:18px 20px;margin-bottom:24px;">
          <p style="margin:0 0 6px;font-size:11px;color:#7a6f91;letter-spacing:.1em;text-transform:uppercase;">¿Qué recibirás?</p>
          <ul style="margin:8px 0 0;padding-left:18px;font-size:14px;color:#2d233d;line-height:1.8;">
            <li>Análisis de tendencias digitales</li>
            <li>Alertas sobre IA y automatización</li>
            <li>Señales útiles para pymes</li>
          </ul>
        </div>
        <a href="${blogUrl}"
          style="display:inline-block;padding:13px 30px;background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;letter-spacing:.02em;">
          Ver el blog →
        </a>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 32px;border-top:1px solid #f0ebfa;">
        <p style="margin:0;font-size:12px;color:#8a7f9a;line-height:1.6;">
          ¿Tienes preguntas? Escríbenos a <a href="mailto:eternalgrowth00@gmail.com" style="color:#7c3aed;text-decoration:none;">eternalgrowth00@gmail.com</a><br />
          Síguenos en Instagram: <a href="https://instagram.com/eternalgrowth__" style="color:#7c3aed;text-decoration:none;">@eternalgrowth__</a>
        </p>
      </td>
    </tr>
  </table>
  <p style="max-width:640px;margin:14px auto 0;font-size:11px;color:#8b80a0;text-align:center;">EternalGrowth · Medellín, Colombia · 2026</p>
</div>`,
      });

      response.status(200).json({ ok: true });
      return;
    } catch (error) {
      response.status(500).json({ error: "No se pudo enviar el correo" });
      return;
    }
  }

  if (
    !isValidLength(nombre, MAX_LENGTHS.nombre) ||
    !isValidLength(email, MAX_LENGTHS.email) ||
    !isValidLength(empresa, MAX_LENGTHS.empresa) ||
    !isValidLength(servicio, MAX_LENGTHS.servicio) ||
    !isValidLength(descripcionServicio, MAX_LENGTHS.descripcion_servicio) ||
    !isValidLength(descripcionEmpresa, MAX_LENGTHS.descripcion_empresa)
  ) {
    response.status(400).json({ error: "Campos requeridos incompletos" });
    return;
  }

  if (telefono && telefono.length > MAX_LENGTHS.telefono) {
    response.status(400).json({ error: "Telefono invalido" });
    return;
  }

  if (telefonoPais && telefonoPais.length > MAX_LENGTHS.telefono_pais) {
    response.status(400).json({ error: "Codigo de pais invalido" });
    return;
  }

  if (contactoPreferido && contactoPreferido.length > MAX_LENGTHS.contacto_preferido) {
    response.status(400).json({ error: "Metodo de contacto invalido" });
    return;
  }

  try {
    await resend.emails.send({
      from: `EternalGrowth <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `Nuevo lead: ${nombre}`.trim(),
      text: buildOwnerEmail({
        ...payload,
        nombre,
        email,
        telefono,
        telefono_pais: telefonoPais,
        empresa,
        servicio,
        contacto_preferido: contactoPreferido,
        descripcion_servicio: descripcionServicio,
        descripcion_empresa: descripcionEmpresa,
      }),
      html: buildOwnerEmailHtml({
        ...payload,
        nombre,
        email,
        telefono,
        telefono_pais: telefonoPais,
        empresa,
        servicio,
        contacto_preferido: contactoPreferido,
        descripcion_servicio: descripcionServicio,
        descripcion_empresa: descripcionEmpresa,
      }),
    });

    await resend.emails.send({
      from: `EternalGrowth <${fromEmail}>`,
      to: email,
      subject: "Recibimos tu solicitud",
      text: buildUserEmail({
        ...payload,
        nombre,
        email,
        empresa,
        servicio,
      }),
      html: buildUserEmailHtml({
        ...payload,
        nombre,
        email,
        empresa,
        servicio,
      }),
    });

    response.status(200).json({ ok: true });
  } catch (error) {
    response.status(500).json({ error: "No se pudo enviar el correo" });
  }
}
