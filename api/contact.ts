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
};

const resend = new Resend(process.env.RESEND_API_KEY);

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

const buildUserEmail = (payload: ContactPayload) => {
  return `Hola ${payload.nombre ?? ""},\n\n` +
    `Gracias por contactarnos en EternalGrowth. Ya recibimos tu informacion y pronto nos pondremos en contacto contigo.\n\n` +
    `Resumen:\n` +
    `Servicio de interes: ${payload.servicio ?? ""}\n` +
    `Empresa: ${payload.empresa ?? ""}\n\n` +
    `Si necesitas agregar algo, responde este correo.\n\n` +
    `Equipo EternalGrowth`;
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

  if (!payload?.nombre || !payload?.email || !payload?.servicio || !payload?.empresa) {
    response.status(400).json({ error: "Campos requeridos incompletos" });
    return;
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "eternalgrowth00@gmail.com";

  try {
    await resend.emails.send({
      from: `EternalGrowth <${fromEmail}>`,
      to: toEmail,
      replyTo: payload.email,
      subject: `Nuevo lead: ${payload.nombre ?? ""}`.trim(),
      text: buildOwnerEmail(payload),
    });

    await resend.emails.send({
      from: `EternalGrowth <${fromEmail}>`,
      to: payload.email,
      subject: "Recibimos tu solicitud",
      text: buildUserEmail(payload),
    });

    response.status(200).json({ ok: true });
  } catch (error) {
    response.status(500).json({ error: "No se pudo enviar el correo" });
  }
}
