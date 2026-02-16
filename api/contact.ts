import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

type ContactPayload = {
  nombre?: string;
  email?: string;
  telefono?: string;
  telefono_pais?: string;
  empresa?: string;
  servicio?: string;
  contacto_preferido?: string;
  descripcion_servicio?: string;
  descripcion_empresa?: string;
  website?: string;
};

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

const isValidLength = (value: string, maxLength: number) =>
  value.length > 0 && value.length <= maxLength;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatField = (value: string) =>
  value ? escapeHtml(value) : "-";

const buildOwnerEmail = (payload: ContactPayload) => {
  const telefonoCompleto = `${payload.telefono_pais ?? ""} ${payload.telefono ?? ""}`.trim();

  return `Nuevo contacto desde EternalGrowth\n\n` +
    `Nombre: ${payload.nombre ?? ""}\n` +
    `Email: ${payload.email ?? ""}\n` +
    `Telefono: ${telefonoCompleto}\n` +
    `Empresa: ${payload.empresa ?? ""}\n` +
    `Servicio de interes: ${payload.servicio ?? ""}\n` +
    `Metodo de contacto: ${payload.contacto_preferido ?? ""}\n\n` +
    `Descripcion del servicio:\n${payload.descripcion_servicio ?? ""}\n\n` +
    `Descripcion de la empresa:\n${payload.descripcion_empresa ?? ""}`;
};

const buildOwnerEmailHtml = (payload: ContactPayload) => {
  const telefonoCompleto = `${payload.telefono_pais ?? ""} ${payload.telefono ?? ""}`.trim();
  const siteUrl = process.env.SITE_URL ?? "";
  const logoUrl = siteUrl ? `${siteUrl}/logo.jpeg` : "";

  return `
    <div style="background:#0d0816;padding:36px 20px;font-family:Arial,sans-serif;color:#f5efff;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;margin:0 auto;background:#171024;border:1px solid rgba(139,92,246,0.25);border-radius:20px;overflow:hidden;box-shadow:0 18px 40px rgba(0,0,0,0.45);">
        <tr>
          <td style="padding:28px 32px;background:linear-gradient(135deg,#2c1458 0%,#1a0e28 55%,#120a1a 100%);">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="vertical-align:middle;">
                  ${logoUrl ? `<img src="${logoUrl}" alt="EternalGrowth" width="120" style="display:block;max-width:120px;" />` : ""}
                </td>
                <td style="text-align:right;font-size:12px;color:rgba(255,255,255,0.65);">Nuevo lead</td>
              </tr>
            </table>
            <h1 style="margin:18px 0 6px;font-size:22px;letter-spacing:1px;color:#ffffff;">Solicitud recibida</h1>
            <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.7);">Revisa el resumen y continua el seguimiento comercial.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:26px 32px;">
            <h2 style="margin:0 0 14px;font-size:16px;color:#c084fc;">Resumen del cliente</h2>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;color:rgba(255,255,255,0.85);border-collapse:collapse;">
              <tr><td style="padding:8px 0;width:38%;color:rgba(255,255,255,0.6);">Nombre</td><td style="padding:8px 0;font-weight:600;">${formatField(payload.nombre ?? "")}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.6);">Email</td><td style="padding:8px 0;">${formatField(payload.email ?? "")}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.6);">Telefono</td><td style="padding:8px 0;">${formatField(telefonoCompleto)}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.6);">Empresa</td><td style="padding:8px 0;">${formatField(payload.empresa ?? "")}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.6);">Servicio</td><td style="padding:8px 0;">${formatField(payload.servicio ?? "")}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.6);">Metodo preferido</td><td style="padding:8px 0;">${formatField(payload.contacto_preferido ?? "")}</td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 24px;">
            <div style="background:#120a1a;border:1px solid rgba(139,92,246,0.2);border-radius:14px;padding:16px;">
              <h3 style="margin:0 0 8px;font-size:14px;color:#c084fc;">Descripcion del servicio</h3>
              <p style="margin:0;font-size:13.5px;line-height:1.6;color:rgba(255,255,255,0.85);">${formatField(payload.descripcion_servicio ?? "")}</p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 32px;">
            <div style="background:#120a1a;border:1px solid rgba(139,92,246,0.2);border-radius:14px;padding:16px;">
              <h3 style="margin:0 0 8px;font-size:14px;color:#c084fc;">Descripcion de la empresa</h3>
              <p style="margin:0;font-size:13.5px;line-height:1.6;color:rgba(255,255,255,0.85);">${formatField(payload.descripcion_empresa ?? "")}</p>
            </div>
          </td>
        </tr>
      </table>
      <p style="max-width:680px;margin:18px auto 0;font-size:12px;color:rgba(255,255,255,0.55);text-align:center;">EternalGrowth · Transformacion digital para tu negocio</p>
    </div>
  `;
};

const buildUserEmail = (payload: ContactPayload) => {
  return `Hola ${payload.nombre ?? ""},\n\n` +
    `Gracias por contactarnos en EternalGrowth. Ya recibimos tu informacion y pronto nos pondremos en contacto contigo.\n\n` +
    `Resumen:\n` +
    `Servicio de interes: ${payload.servicio ?? ""}\n` +
    `Empresa: ${payload.empresa ?? ""}\n\n` +
    `Si necesitas agregar algo, responde este correo.\n\n` +
    `Equipo EternalGrowth`;
};

const buildUserEmailHtml = (payload: ContactPayload) => {
  const siteUrl = process.env.SITE_URL ?? "";
  const logoUrl = siteUrl ? `${siteUrl}/logo.jpeg` : "";

  return `
    <div style="background:#0d0816;padding:36px 20px;font-family:Arial,sans-serif;color:#f5efff;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;margin:0 auto;background:#171024;border:1px solid rgba(139,92,246,0.25);border-radius:20px;overflow:hidden;box-shadow:0 18px 40px rgba(0,0,0,0.45);">
        <tr>
          <td style="padding:28px 32px;background:linear-gradient(135deg,#2c1458 0%,#1a0e28 55%,#120a1a 100%);">
            ${logoUrl ? `<img src="${logoUrl}" alt="EternalGrowth" width="120" style="display:block;max-width:120px;margin:0 0 18px;" />` : ""}
            <h1 style="margin:0;font-size:22px;letter-spacing:1px;color:#ffffff;">Hemos recibido tu solicitud</h1>
            <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.7);">Gracias por contactar a EternalGrowth.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px;">
            <p style="margin:0 0 18px;font-size:14px;line-height:1.7;color:rgba(255,255,255,0.9);">
              Hola ${formatField(payload.nombre ?? "")}, hemos recibido tu informacion. Nuestro equipo revisara tu solicitud y se pondra en contacto contigo muy pronto.
            </p>
            <div style="background:#120a1a;border:1px solid rgba(139,92,246,0.25);border-radius:14px;padding:16px;">
              <p style="margin:0 0 6px;font-size:12px;color:rgba(255,255,255,0.6);letter-spacing:0.08em;text-transform:uppercase;">Resumen</p>
              <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.95);">Servicio: ${formatField(payload.servicio ?? "")}<br />Empresa: ${formatField(payload.empresa ?? "")}</p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 24px;">
            <h3 style="margin:0 0 8px;font-size:14px;color:#c084fc;">Contacto</h3>
            <p style="margin:0;font-size:14px;line-height:1.6;color:rgba(255,255,255,0.8);">
              Email: eternalgrowth00@gmail.com<br />
              Instagram: @eternalgrowth__
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 32px;">
            <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.6);">
              Si necesitas agregar informacion, responde a este correo.
            </p>
          </td>
        </tr>
      </table>
      <p style="max-width:680px;margin:18px auto 0;font-size:12px;color:rgba(255,255,255,0.55);text-align:center;">EternalGrowth · Transformacion digital para tu negocio</p>
    </div>
  `;
};

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
  const nombre = normalizeField(payload?.nombre);
  const email = normalizeField(payload?.email);
  const telefono = normalizeField(payload?.telefono);
  const telefonoPais = normalizeField(payload?.telefono_pais);
  const empresa = normalizeField(payload?.empresa);
  const servicio = normalizeField(payload?.servicio);
  const contactoPreferido = normalizeField(payload?.contacto_preferido);
  const descripcionServicio = normalizeField(payload?.descripcion_servicio);
  const descripcionEmpresa = normalizeField(payload?.descripcion_empresa);
  const honeypot = normalizeField(payload?.website);

  if (honeypot) {
    response.status(200).json({ ok: true });
    return;
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

  if (!EMAIL_REGEX.test(email)) {
    response.status(400).json({ error: "Email invalido" });
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

  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "eternalgrowth00@gmail.com";

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
