import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  buildOwnerEmailHtml,
  buildUserEmailHtml,
  type ContactPayload,
} from "./emailTemplates";

const samplePayload: ContactPayload = {
  nombre: "Laura Martinez",
  email: "laura@empresa.com",
  telefono: "3123456789",
  telefono_pais: "+57",
  empresa: "Nova Studio",
  servicio: "Marketing Digital",
  contacto_preferido: "WhatsApp",
  descripcion_servicio: "Necesitamos estrategia de contenidos y pauta para el lanzamiento de un nuevo producto en abril.",
  descripcion_empresa: "Somos una marca de bienestar con presencia en Medellin y Bogota.",
};

export default function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "GET") {
    response.status(405).send("Metodo no permitido");
    return;
  }

  const typeParam = request.query.type;
  const typeValue = Array.isArray(typeParam) ? typeParam[0] : typeParam;
  const isOwner = typeValue === "owner";
  const html = isOwner
    ? buildOwnerEmailHtml(samplePayload)
    : buildUserEmailHtml(samplePayload);

  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.status(200).send(`<!doctype html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>Preview Email</title></head><body style="margin:0;background:#f5f4fb;">${html}</body></html>`);
}
