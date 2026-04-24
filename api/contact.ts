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
  servicio: 80,
  mensaje: 2000,
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

  const payload = request.body as ContactPayload & { newsletter?: unknown; newsletter_source?: unknown; mensaje?: unknown; website?: unknown };
  const isNewsletter = normalizeBoolean(payload?.newsletter);
  const newsletterSource = normalizeField(payload?.newsletter_source);
  const honeypot = normalizeField(payload?.website);
  const nombre = normalizeField(payload?.nombre);
  const email = normalizeField(payload?.email);
  const telefono = normalizeField(payload?.telefono);
  const telefonoPais = normalizeField(payload?.telefono_pais);
  const servicio = normalizeField(payload?.servicio);
  const mensaje = normalizeField(payload?.mensaje);

  if (!EMAIL_REGEX.test(email)) {
    response.status(400).json({ error: "Email invalido" });
    return;
  }

  // Honeypot anti-spam
  if (honeypot) {
    response.status(200).json({ ok: true });
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
<style>
  @media (prefers-color-scheme:dark){
    .eg-wrap{background-color:#f5f4fb !important;}
    .eg-card{background-color:#ffffff !important;}
    .eg-header{background-color:#2c1458 !important;}
    .eg-header *{color:#ffffff !important;-webkit-text-fill-color:#ffffff !important;}
    .eg-body *{color:#1a1026 !important;-webkit-text-fill-color:#1a1026 !important;}
    .eg-label{color:#6b6278 !important;-webkit-text-fill-color:#6b6278 !important;}
  }
</style>
<div class="eg-wrap" style="background:#f5f4fb;background-color:#f5f4fb;padding:40px 20px;font-family:Arial,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center">
    <table class="eg-card" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;background:#ffffff;background-color:#ffffff;border:1px solid #e2ddf3;border-radius:18px;overflow:hidden;box-shadow:0 12px 32px rgba(16,8,32,0.1);">
      <tr>
        <td class="eg-header" bgcolor="#2c1458" style="padding:28px 32px;background:#2c1458;background:linear-gradient(135deg,#2c1458 0%,#1d1035 60%,#140a24 100%);">
          <img src="${logoUrl}" alt="EternalGrowth" width="110" style="display:block;margin-bottom:14px;" />
          <p style="margin:0 0 4px;font-size:11px;color:#ffffff;-webkit-text-fill-color:#ffffff;letter-spacing:.14em;text-transform:uppercase;">Eternal News · Nuevo suscriptor</p>
          <h1 style="margin:4px 0 0;font-size:20px;color:#ffffff;-webkit-text-fill-color:#ffffff;mso-color-alt:#ffffff;">Alguien se unió al blog</h1>
        </td>
      </tr>
      <tr>
        <td bgcolor="#ffffff" style="padding:24px 32px;background:#ffffff;background-color:#ffffff;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;border-collapse:collapse;">
            <tr><td class="eg-label" style="padding:7px 0;width:36%;color:#6b6278;-webkit-text-fill-color:#6b6278;">Email</td><td style="padding:7px 0;font-weight:600;color:#1a1026;-webkit-text-fill-color:#1a1026;">${safeEmail}</td></tr>
            <tr><td class="eg-label" style="padding:7px 0;color:#6b6278;-webkit-text-fill-color:#6b6278;">Origen</td><td style="padding:7px 0;color:#1a1026;-webkit-text-fill-color:#1a1026;">${escapeHtml(sourceLabel)}</td></tr>
          </table>
        </td>
      </tr>
    </table>
    <p style="margin:14px auto 0;font-size:11px;color:#8b80a0;-webkit-text-fill-color:#8b80a0;text-align:center;">EternalGrowth · Medellín, Colombia · 2026</p>
  </td></tr></table>
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
<style>
  @media (prefers-color-scheme:dark){
    .eg-wrap{background-color:#f5f4fb !important;}
    .eg-card{background-color:#ffffff !important;}
    .eg-header{background-color:#2c1458 !important;}
    .eg-header *{color:#ffffff !important;-webkit-text-fill-color:#ffffff !important;}
    .eg-body{background-color:#ffffff !important;}
    .eg-body *{color:#2d233d !important;-webkit-text-fill-color:#2d233d !important;}
    .eg-box{background-color:#f6f2ff !important;}
    .eg-box *{color:#2d233d !important;-webkit-text-fill-color:#2d233d !important;}
    .eg-footer-row{background-color:#ffffff !important;border-top:1px solid #f0ebfa !important;}
    .eg-footer-row *{color:#8a7f9a !important;-webkit-text-fill-color:#8a7f9a !important;}
  }
</style>
<div class="eg-wrap" style="background:#f5f4fb;background-color:#f5f4fb;padding:40px 20px;font-family:Arial,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center">
    <table class="eg-card" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;background:#ffffff;background-color:#ffffff;border:1px solid #e2ddf3;border-radius:18px;overflow:hidden;box-shadow:0 12px 32px rgba(16,8,32,0.1);">
      <tr>
        <td class="eg-header" bgcolor="#2c1458" style="padding:28px 32px;background:#2c1458;background:linear-gradient(135deg,#2c1458 0%,#1d1035 60%,#140a24 100%);">
          <img src="${logoUrl}" alt="EternalGrowth" width="110" style="display:block;margin-bottom:18px;" />
          <p style="margin:0 0 6px;font-size:11px;color:#ffffff;-webkit-text-fill-color:#ffffff;letter-spacing:.14em;text-transform:uppercase;">Eternal News</p>
          <h1 style="margin:0 0 6px;font-size:22px;color:#ffffff;-webkit-text-fill-color:#ffffff;mso-color-alt:#ffffff;line-height:1.3;">Ya eres parte del blog</h1>
          <p style="margin:0;font-size:13px;color:#e9ddff;-webkit-text-fill-color:#e9ddff;mso-color-alt:#e9ddff;">Te avisamos cada vez que publiquemos algo nuevo.</p>
        </td>
      </tr>
      <tr>
        <td class="eg-body" bgcolor="#ffffff" style="padding:28px 32px 20px;background:#ffffff;background-color:#ffffff;">
          <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#2d233d;-webkit-text-fill-color:#2d233d;">
            Gracias por suscribirte. Desde aquí recibirás análisis, alertas y señales útiles sobre tecnología, IA y marketing digital para hacer crecer tu negocio.
          </p>
          <div class="eg-box" style="background:#f6f2ff;background-color:#f6f2ff;border:1px solid #e1d8f4;border-radius:12px;padding:18px 20px;margin-bottom:24px;">
            <p style="margin:0 0 8px;font-size:11px;color:#7a6f91;-webkit-text-fill-color:#7a6f91;letter-spacing:.1em;text-transform:uppercase;">¿Qué recibirás?</p>
            <ul style="margin:0;padding-left:18px;font-size:14px;color:#2d233d;-webkit-text-fill-color:#2d233d;line-height:1.8;">
              <li>Análisis de tendencias digitales</li>
              <li>Alertas sobre IA y automatización</li>
              <li>Señales útiles para pymes</li>
            </ul>
          </div>
          <a href="${blogUrl}" style="display:inline-block;padding:13px 30px;background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#ffffff;-webkit-text-fill-color:#ffffff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;letter-spacing:.02em;">
            Ver el blog →
          </a>
        </td>
      </tr>
      <tr>
        <td class="eg-footer-row" bgcolor="#ffffff" style="padding:16px 32px;background:#ffffff;background-color:#ffffff;border-top:1px solid #f0ebfa;">
          <p style="margin:0;font-size:12px;color:#8a7f9a;-webkit-text-fill-color:#8a7f9a;line-height:1.6;">
            ¿Tienes preguntas? Escríbenos a <a href="mailto:eternalgrowth00@gmail.com" style="color:#7c3aed;-webkit-text-fill-color:#7c3aed;text-decoration:none;">eternalgrowth00@gmail.com</a><br />
            Síguenos en Instagram: <a href="https://instagram.com/eternalgrowth__" style="color:#7c3aed;-webkit-text-fill-color:#7c3aed;text-decoration:none;">@eternalgrowth__</a>
          </p>
        </td>
      </tr>
    </table>
    <p style="margin:14px auto 0;font-size:11px;color:#8b80a0;-webkit-text-fill-color:#8b80a0;text-align:center;">EternalGrowth · Medellín, Colombia · 2026</p>
  </td></tr></table>
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
    !isValidLength(servicio, MAX_LENGTHS.servicio) ||
    !isValidLength(mensaje, MAX_LENGTHS.mensaje)
  ) {
    response.status(400).json({ error: "Campos requeridos incompletos" });
    return;
  }

  try {
    await resend.emails.send({
      from: `EternalGrowth <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `Nuevo lead: ${nombre}`.trim(),
      text: buildOwnerEmail({
        nombre,
        email,
        telefono,
        telefono_pais: telefonoPais,
        servicio,
        descripcion_servicio: mensaje,
      }),
      html: buildOwnerEmailHtml({
        nombre,
        email,
        telefono,
        telefono_pais: telefonoPais,
        servicio,
        descripcion_servicio: mensaje,
      }),
    });

    await resend.emails.send({
      from: `EternalGrowth <${fromEmail}>`,
      to: email,
      subject: "Recibimos tu solicitud",
      text: buildUserEmail({ nombre, email, servicio }),
      html: buildUserEmailHtml({ nombre, email, servicio }),
    });

    response.status(200).json({ ok: true });
  } catch (error) {
    response.status(500).json({ error: "No se pudo enviar el correo" });
  }
}
