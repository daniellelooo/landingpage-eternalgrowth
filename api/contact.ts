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
  const nombre = normalizeField(payload?.nombre);
  const email = normalizeField(payload?.email);
  const telefono = normalizeField(payload?.telefono);
  const telefonoPais = normalizeField(payload?.telefono_pais);
  const empresa = normalizeField(payload?.empresa);
  const servicio = normalizeField(payload?.servicio);
  const contactoPreferido = normalizeField(payload?.contacto_preferido);
  const descripcionServicio = normalizeField(payload?.descripcion_servicio);
  const descripcionEmpresa = normalizeField(payload?.descripcion_empresa);
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
