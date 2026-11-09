/**
 * Función serverless de Vercel: recibe el formulario y lo envía con Resend.
 * Variables de entorno (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY     clave de Resend (nunca en el código ni en el navegador)
 *   CONTACT_TO_EMAIL   dirección donde quieres recibir los mensajes
 *   CONTACT_FROM_EMAIL (opcional) remitente; por defecto el de pruebas de Resend
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';

const LIMITS = { nombre: 100, email: 200, mensaje: 2000 };
const MIN = { nombre: 2, mensaje: 10 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Método no permitido.' });
  }

  const { nombre, email, mensaje, website } = (req.body ?? {}) as Record<string, unknown>;

  // Campo trampa: un humano no lo ve ni lo rellena. Respondemos "ok" para no dar pistas al bot.
  if (typeof website === 'string' && website.length > 0) {
    return res.status(200).json({ ok: true });
  }

  if (typeof nombre !== 'string' || typeof email !== 'string' || typeof mensaje !== 'string') {
    return res.status(400).json({ ok: false, error: 'Faltan campos.' });
  }
  const n = nombre.trim();
  const e = email.trim();
  const m = mensaje.trim();
  if (n.length < MIN.nombre || m.length < MIN.mensaje || !EMAIL_RE.test(e)) {
    return res.status(400).json({ ok: false, error: 'Revisa el nombre, el email y el mensaje.' });
  }
  if (n.length > LIMITS.nombre || e.length > LIMITS.email || m.length > LIMITS.mensaje) {
    return res.status(400).json({ ok: false, error: 'Algún campo es demasiado largo.' });
  }

  const apiKey = process.env['RESEND_API_KEY'];
  const to = process.env['CONTACT_TO_EMAIL'];
  if (!apiKey || !to) {
    return res.status(500).json({ ok: false, error: 'El envío no está configurado todavía.' });
  }

  const from = process.env['CONTACT_FROM_EMAIL'] ?? 'Portfolio <onboarding@resend.dev>';
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: e,
      subject: `Mensaje del portfolio de ${n.replace(/[\r\n]+/g, ' ')}`,
      text: `${n} <${e}>\n\n${m}`,
      html: `<p><strong>${escapeHtml(n)}</strong> &lt;${escapeHtml(e)}&gt;</p><p>${escapeHtml(m).replace(/\n/g, '<br>')}</p>`,
    }),
  });

  if (!response.ok) {
    return res.status(502).json({ ok: false, error: 'No se pudo enviar. Inténtalo de nuevo en un rato.' });
  }
  return res.status(200).json({ ok: true });
}
