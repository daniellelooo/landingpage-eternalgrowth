import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export type ContactPayload = {
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

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatField = (value: string) =>
  value ? escapeHtml(value) : "-";

const getLogoDataUri = () => {
  try {
    const logoPath = new URL("../src/assets/logocorregido-removebg-preview.png", import.meta.url);
    const buffer = readFileSync(fileURLToPath(logoPath));
    return `data:image/png;base64,${buffer.toString("base64")}`;
  } catch {
    return "";
  }
};

const getLogoUrl = () => {
  const dataUri = getLogoDataUri();
  if (dataUri) {
    return dataUri;
  }

  return "https://www.eternalgrowth.xyz/logocorregido-removebg-preview.png";
};

export const buildOwnerEmail = (payload: ContactPayload) => {
  const telefonoCompleto = `${payload.telefono_pais ?? ""} ${payload.telefono ?? ""}`.trim();

  return "Nuevo contacto desde EternalGrowth\n\n" +
    `Nombre: ${payload.nombre ?? ""}\n` +
    `Email: ${payload.email ?? ""}\n` +
    `Telefono: ${telefonoCompleto}\n` +
    `Empresa: ${payload.empresa ?? ""}\n` +
    `Servicio de interes: ${payload.servicio ?? ""}\n` +
    `Metodo de contacto: ${payload.contacto_preferido ?? ""}\n\n` +
    `Descripcion del servicio:\n${payload.descripcion_servicio ?? ""}\n\n` +
    `Descripcion de la empresa:\n${payload.descripcion_empresa ?? ""}`;
};

export const buildOwnerEmailHtml = (payload: ContactPayload) => {
  const telefonoCompleto = `${payload.telefono_pais ?? ""} ${payload.telefono ?? ""}`.trim();
  const logoUrl = getLogoUrl();

  return `
    <div style="background:#f5f4fb;padding:40px 20px;font-family:Arial,sans-serif;color:#1a1026;background-color:#f5f4fb !important;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="max-width:720px;margin:0 auto;background:#ffffff;background-color:#ffffff !important;border:1px solid #e2ddf3;border-radius:18px;overflow:hidden;box-shadow:0 16px 36px rgba(16,8,32,0.12);color:#1a1026;">
        <tr>
          <td bgcolor="#2c1458" style="padding:28px 36px;background:#2c1458;background:linear-gradient(135deg,#2c1458 0%,#1d1035 60%,#140a24 100%);color:#ffffff !important;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="vertical-align:middle;">
                  ${logoUrl ? `<img src="${logoUrl}" alt="EternalGrowth" width="120" style="display:block;max-width:120px;height:auto;" />` : ""}
                </td>
                <td style="text-align:right;font-size:12px;color:rgba(255,255,255,0.75);letter-spacing:0.12em;text-transform:uppercase;">Nuevo lead</td>
              </tr>
            </table>
            <h1 style="margin:18px 0 6px;font-size:22px;letter-spacing:1px;color:#ffffff;">Solicitud recibida</h1>
            <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.8);">Revisa el resumen y continua el seguimiento comercial.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 36px;color:#1a1026;">
            <h2 style="margin:0 0 14px;font-size:16px;color:#6b21a8;">Resumen del cliente</h2>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;color:#1a1026;border-collapse:collapse;">
              <tr><td style="padding:8px 0;width:36%;color:#5a5168;">Nombre</td><td style="padding:8px 0;font-weight:600;">${formatField(payload.nombre ?? "")}</td></tr>
              <tr><td style="padding:8px 0;color:#5a5168;">Email</td><td style="padding:8px 0;">${formatField(payload.email ?? "")}</td></tr>
              <tr><td style="padding:8px 0;color:#5a5168;">Telefono</td><td style="padding:8px 0;">${formatField(telefonoCompleto)}</td></tr>
              <tr><td style="padding:8px 0;color:#5a5168;">Empresa</td><td style="padding:8px 0;">${formatField(payload.empresa ?? "")}</td></tr>
              <tr><td style="padding:8px 0;color:#5a5168;">Servicio</td><td style="padding:8px 0;">${formatField(payload.servicio ?? "")}</td></tr>
              <tr><td style="padding:8px 0;color:#5a5168;">Metodo preferido</td><td style="padding:8px 0;">${formatField(payload.contacto_preferido ?? "")}</td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 36px 20px;">
            <div style="background:#f6f2ff;background-color:#f6f2ff !important;border:1px solid #e1d8f4;border-radius:14px;padding:16px;color:#2d233d;">
              <h3 style="margin:0 0 8px;font-size:14px;color:#6b21a8;">Descripcion del servicio</h3>
              <p style="margin:0;font-size:13.5px;line-height:1.6;color:#2d233d;">${formatField(payload.descripcion_servicio ?? "")}</p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:0 36px 32px;">
            <div style="background:#f6f2ff;background-color:#f6f2ff !important;border:1px solid #e1d8f4;border-radius:14px;padding:16px;color:#2d233d;">
              <h3 style="margin:0 0 8px;font-size:14px;color:#6b21a8;">Descripcion de la empresa</h3>
              <p style="margin:0;font-size:13.5px;line-height:1.6;color:#2d233d;">${formatField(payload.descripcion_empresa ?? "")}</p>
            </div>
          </td>
        </tr>
      </table>
      <p style="max-width:720px;margin:18px auto 0;font-size:12px;color:#6b6278;text-align:center;">EternalGrowth · Transformacion digital para tu negocio</p>
    </div>
  `;
};

export const buildUserEmail = (payload: ContactPayload) => {
  return `Hola ${payload.nombre ?? ""},\n\n` +
    "Gracias por contactarnos en EternalGrowth. Ya recibimos tu informacion y pronto nos pondremos en contacto contigo.\n\n" +
    "Resumen:\n" +
    `Servicio de interes: ${payload.servicio ?? ""}\n` +
    `Empresa: ${payload.empresa ?? ""}\n\n` +
    "Si necesitas agregar algo, responde este correo.\n\n" +
    "Equipo EternalGrowth";
};

export const buildUserEmailHtml = (payload: ContactPayload) => {
  const logoUrl = getLogoUrl();

  return `
    <div style="background:#f5f4fb;padding:40px 20px;font-family:Arial,sans-serif;color:#1a1026;background-color:#f5f4fb !important;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="max-width:720px;margin:0 auto;background:#ffffff;background-color:#ffffff !important;border:1px solid #e2ddf3;border-radius:18px;overflow:hidden;box-shadow:0 16px 36px rgba(16,8,32,0.12);color:#1a1026;">
        <tr>
          <td bgcolor="#2c1458" style="padding:28px 36px;background:#2c1458;background:linear-gradient(135deg,#2c1458 0%,#1d1035 60%,#140a24 100%);color:#ffffff !important;">
            ${logoUrl ? `<img src="${logoUrl}" alt="EternalGrowth" width="120" style="display:block;max-width:120px;height:auto;margin:0 0 18px;" />` : ""}
            <h1 style="margin:0;font-size:22px;letter-spacing:1px;color:#ffffff;">Hemos recibido tu solicitud</h1>
            <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.8);">Gracias por contactar a EternalGrowth.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:26px 36px;color:#2d233d;">
            <p style="margin:0 0 18px;font-size:14px;line-height:1.7;color:#2d233d;">
              Hola ${formatField(payload.nombre ?? "")}, hemos recibido tu informacion. Nuestro equipo revisara tu solicitud y se pondra en contacto contigo muy pronto.
            </p>
            <div style="background:#f6f2ff;background-color:#f6f2ff !important;border:1px solid #e1d8f4;border-radius:14px;padding:16px;color:#2d233d;">
              <p style="margin:0 0 6px;font-size:12px;color:#7a6f91;letter-spacing:0.08em;text-transform:uppercase;">Resumen</p>
              <p style="margin:0;font-size:14px;color:#2d233d;">Servicio: ${formatField(payload.servicio ?? "")}<br />Empresa: ${formatField(payload.empresa ?? "")}</p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:0 36px 20px;color:#2d233d;">
            <h3 style="margin:0 0 8px;font-size:14px;color:#6b21a8;">Contacto</h3>
            <p style="margin:0;font-size:14px;line-height:1.6;color:#2d233d;">
              Email: eternalgrowth00@gmail.com<br />
              Instagram: @eternalgrowth__
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 36px 32px;color:#7a6f91;">
            <p style="margin:0;font-size:13px;color:#7a6f91;">
              Si necesitas agregar informacion, responde a este correo.
            </p>
          </td>
        </tr>
      </table>
      <p style="max-width:720px;margin:18px auto 0;font-size:12px;color:#6b6278;text-align:center;">EternalGrowth · Transformacion digital para tu negocio</p>
    </div>
  `;
};
