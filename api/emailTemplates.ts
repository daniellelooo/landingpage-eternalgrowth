
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

const getLogoUrl = () => {
  return "https://www.eternalgrowth.xyz/logo.jpeg";
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
<style>
  @media (prefers-color-scheme:dark){
    .eg-wrap{background-color:#f5f4fb !important;}
    .eg-card{background-color:#ffffff !important;color:#1a1026 !important;}
    .eg-header{background-color:#2c1458 !important;}
    .eg-header *{color:#ffffff !important;-webkit-text-fill-color:#ffffff !important;}
    .eg-body{background-color:#ffffff !important;color:#1a1026 !important;}
    .eg-body *{color:#1a1026 !important;-webkit-text-fill-color:#1a1026 !important;}
    .eg-label{color:#6b6278 !important;-webkit-text-fill-color:#6b6278 !important;}
    .eg-box{background-color:#f6f2ff !important;}
    .eg-box *{color:#2d233d !important;-webkit-text-fill-color:#2d233d !important;}
    .eg-footer{color:#8b80a0 !important;-webkit-text-fill-color:#8b80a0 !important;}
  }
</style>
<div class="eg-wrap" style="background:#f5f4fb;background-color:#f5f4fb;padding:40px 20px;font-family:Arial,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
    <tr><td align="center">
      <table class="eg-card" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:720px;background:#ffffff;background-color:#ffffff;border:1px solid #e2ddf3;border-radius:18px;overflow:hidden;box-shadow:0 16px 36px rgba(16,8,32,0.12);">
        <tr>
          <td class="eg-header" bgcolor="#2c1458" style="padding:28px 36px;background:#2c1458;background:linear-gradient(135deg,#2c1458 0%,#1d1035 60%,#140a24 100%);">
            <img src="${logoUrl}" alt="EternalGrowth" width="120" style="display:block;max-width:120px;height:auto;margin-bottom:14px;" />
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#ffffff;-webkit-text-fill-color:#ffffff;">EternalGrowth · Nuevo lead</p>
            <h1 style="margin:6px 0 4px;font-size:22px;color:#ffffff;-webkit-text-fill-color:#ffffff;mso-color-alt:#ffffff;">Solicitud recibida</h1>
            <p style="margin:0;font-size:14px;color:#e9ddff;-webkit-text-fill-color:#e9ddff;mso-color-alt:#e9ddff;">Revisa el resumen y da seguimiento comercial.</p>
          </td>
        </tr>
        <tr>
          <td class="eg-body" bgcolor="#ffffff" style="padding:28px 36px;background:#ffffff;background-color:#ffffff;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-size:14px;">
              <tr><td class="eg-label" style="padding:8px 0;width:38%;color:#6b6278;-webkit-text-fill-color:#6b6278;">Nombre</td><td style="padding:8px 0;font-weight:600;color:#1a1026;-webkit-text-fill-color:#1a1026;">${formatField(payload.nombre ?? "")}</td></tr>
              <tr><td class="eg-label" style="padding:8px 0;color:#6b6278;-webkit-text-fill-color:#6b6278;">Email</td><td style="padding:8px 0;color:#1a1026;-webkit-text-fill-color:#1a1026;">${formatField(payload.email ?? "")}</td></tr>
              <tr><td class="eg-label" style="padding:8px 0;color:#6b6278;-webkit-text-fill-color:#6b6278;">Teléfono</td><td style="padding:8px 0;color:#1a1026;-webkit-text-fill-color:#1a1026;">${formatField(telefonoCompleto)}</td></tr>
              <tr><td class="eg-label" style="padding:8px 0;color:#6b6278;-webkit-text-fill-color:#6b6278;">Servicio</td><td style="padding:8px 0;color:#1a1026;-webkit-text-fill-color:#1a1026;">${formatField(payload.servicio ?? "")}</td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="#ffffff" style="padding:0 36px 32px;background:#ffffff;background-color:#ffffff;">
            <div class="eg-box" style="background:#f6f2ff;background-color:#f6f2ff;border:1px solid #e1d8f4;border-radius:14px;padding:16px 20px;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#7a6f91;-webkit-text-fill-color:#7a6f91;">Mensaje del cliente</p>
              <p style="margin:0;font-size:13.5px;line-height:1.65;color:#2d233d;-webkit-text-fill-color:#2d233d;">${formatField(payload.descripcion_servicio ?? "")}</p>
            </div>
          </td>
        </tr>
      </table>
      <p class="eg-footer" style="max-width:720px;margin:14px auto 0;font-size:11px;color:#8b80a0;-webkit-text-fill-color:#8b80a0;text-align:center;">EternalGrowth · Transformación digital para tu negocio</p>
    </td></tr>
  </table>
</div>`;
};

export const buildUserEmail = (payload: ContactPayload) => {
  return `Hola ${payload.nombre ?? ""},\n\n` +
    "Gracias por contactarnos en EternalGrowth. Ya recibimos tu informacion y pronto nos pondremos en contacto contigo.\n\n" +
    "Resumen:\n" +
    `Servicio de interes: ${payload.servicio ?? ""}\n` +
    `Empresa: ${payload.empresa ?? ""}\n\n` +
    "Si necesitas agregar algo, escribenos a eternalgrowth00@gmail.com.\n\n" +
    "Equipo EternalGrowth";
};

export const buildUserEmailHtml = (payload: ContactPayload) => {
  const logoUrl = getLogoUrl();

  return `
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
    .eg-footer{color:#8b80a0 !important;-webkit-text-fill-color:#8b80a0 !important;}
  }
</style>
<div class="eg-wrap" style="background:#f5f4fb;background-color:#f5f4fb;padding:40px 20px;font-family:Arial,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
    <tr><td align="center">
      <table class="eg-card" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;background:#ffffff;background-color:#ffffff;border:1px solid #e2ddf3;border-radius:18px;overflow:hidden;box-shadow:0 16px 36px rgba(16,8,32,0.12);">
        <tr>
          <td class="eg-header" bgcolor="#2c1458" style="padding:28px 36px;background:#2c1458;background:linear-gradient(135deg,#2c1458 0%,#1d1035 60%,#140a24 100%);">
            <img src="${logoUrl}" alt="EternalGrowth" width="110" style="display:block;max-width:110px;height:auto;margin-bottom:16px;" />
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#ffffff;-webkit-text-fill-color:#ffffff;">EternalGrowth</p>
            <h1 style="margin:4px 0 6px;font-size:21px;color:#ffffff;-webkit-text-fill-color:#ffffff;mso-color-alt:#ffffff;">¡Recibimos tu solicitud!</h1>
            <p style="margin:0;font-size:13px;color:#e9ddff;-webkit-text-fill-color:#e9ddff;mso-color-alt:#e9ddff;">Pronto te contactaremos para coordinar tu diagnóstico.</p>
          </td>
        </tr>
        <tr>
          <td class="eg-body" bgcolor="#ffffff" style="padding:26px 36px 20px;background:#ffffff;background-color:#ffffff;">
            <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#2d233d;-webkit-text-fill-color:#2d233d;">
              Hola <strong style="color:#1a1026;-webkit-text-fill-color:#1a1026;">${formatField(payload.nombre ?? "")}</strong>, gracias por escribirnos.
              Revisaremos tu solicitud y te confirmaremos en menos de 24 horas para coordinar tu sesión de diagnóstico gratuito de 30 minutos.
            </p>
            <div class="eg-box" style="background:#f6f2ff;background-color:#f6f2ff;border:1px solid #e1d8f4;border-radius:12px;padding:16px 20px;margin-bottom:20px;">
              <p style="margin:0 0 4px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#7a6f91;-webkit-text-fill-color:#7a6f91;">Tu interés</p>
              <p style="margin:0;font-size:14px;font-weight:600;color:#2d233d;-webkit-text-fill-color:#2d233d;">${formatField(payload.servicio ?? "")}</p>
            </div>
          </td>
        </tr>
        <tr>
          <td bgcolor="#ffffff" style="padding:0 36px 28px;background:#ffffff;background-color:#ffffff;border-top:1px solid #f0ebfa;">
            <p style="margin:0 0 6px;font-size:13px;color:#6b6278;-webkit-text-fill-color:#6b6278;">¿Tienes dudas? Escríbenos directamente:</p>
            <p style="margin:0;font-size:13px;color:#2d233d;-webkit-text-fill-color:#2d233d;">
              📧 <a href="mailto:eternalgrowth00@gmail.com" style="color:#7c3aed;-webkit-text-fill-color:#7c3aed;text-decoration:none;">eternalgrowth00@gmail.com</a><br />
              📸 <a href="https://instagram.com/eternalgrowth__" style="color:#7c3aed;-webkit-text-fill-color:#7c3aed;text-decoration:none;">@eternalgrowth__</a>
            </p>
          </td>
        </tr>
      </table>
      <p class="eg-footer" style="margin:14px auto 0;font-size:11px;color:#8b80a0;-webkit-text-fill-color:#8b80a0;text-align:center;">EternalGrowth · Medellín, Colombia · 2026</p>
    </td></tr>
  </table>
</div>`;
};

