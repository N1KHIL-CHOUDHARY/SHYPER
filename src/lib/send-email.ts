'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export type ContactFormState = {
  success: boolean
  error?: string
}

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name    = formData.get('name')?.toString().trim()
  const email   = formData.get('email')?.toString().trim()
  const message = formData.get('message')?.toString().trim()
  // Honeypot spam check
  const honeypot = formData.get('_hp')?.toString()

  if (honeypot) {
    // Bot detected — silently succeed
    return { success: true }
  }

  if (!name || !email || !message) {
    return { success: false, error: 'Please fill in all fields.' }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  if (message.length < 10) {
    return { success: false, error: 'Message is too short.' }
  }

  const toEmail   = process.env.RESEND_TO_EMAIL   ?? 'syph4@email.com'
  const fromEmail = process.env.RESEND_FROM_EMAIL  ?? 'contact@yourdomain.com'

  try {
    await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to:   [toEmail],
      replyTo: email,
      subject: `New message from ${name} — SYPH4 Portfolio`,
      html: `
        <div style="font-family: monospace; max-width: 600px; padding: 24px;">
          <h2 style="margin-bottom: 16px;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    })
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to send message. Please try again or reach out directly by email.' }
  }
}
