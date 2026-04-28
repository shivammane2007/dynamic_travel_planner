import { RequestHandler } from "express";
import nodemailer from "nodemailer";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ── Validation ─────────────────────────────────────────────────────────────
function validatePayload(body: Partial<ContactPayload>): string | null {
  if (!body.name || body.name.trim().length < 2)
    return "Full name must be at least 2 characters.";
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    return "A valid email address is required.";
  if (!body.subject || body.subject.trim().length < 1)
    return "Subject is required.";
  if (!body.message || body.message.trim().length < 10)
    return "Message must be at least 10 characters.";
  return null;
}

// ── Transporter factory ────────────────────────────────────────────────────
function createTransporter() {
  const {
    MAIL_HOST = "smtp.gmail.com",
    MAIL_PORT = "587",
    MAIL_USER,
    MAIL_PASS,
  } = process.env;

  if (!MAIL_USER || !MAIL_PASS) {
    throw new Error(
      "MAIL_USER and MAIL_PASS must be set in Frontend/.env to send emails.",
    );
  }

  return nodemailer.createTransport({
    host: MAIL_HOST,
    port: Number(MAIL_PORT),
    secure: false, // STARTTLS
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  });
}

// ── Admin notification email ───────────────────────────────────────────────
function buildAdminMail(payload: ContactPayload) {
  const { MAIL_USER, CONTACT_RECEIVER_EMAIL } = process.env;
  const to = CONTACT_RECEIVER_EMAIL || MAIL_USER || "";

  return {
    from: `"Lux Travel Planner" <${MAIL_USER}>`,
    to,
    subject: `✈️ New Contact Inquiry — ${payload.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 0; }
            .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
            .header { background: linear-gradient(135deg, #1a6b6b 0%, #c9820a 100%); padding: 32px 40px; color: white; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 700; }
            .header p { margin: 6px 0 0; opacity: 0.85; font-size: 14px; }
            .body { padding: 32px 40px; }
            .field { margin-bottom: 20px; }
            .label { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #888; margin-bottom: 4px; }
            .value { font-size: 15px; color: #222; font-weight: 500; }
            .message-box { background: #f5f5f5; border-left: 4px solid #1a6b6b; border-radius: 6px; padding: 16px 20px; margin-top: 4px; color: #333; line-height: 1.7; white-space: pre-wrap; font-size: 15px; }
            .footer { background: #f5f5f5; padding: 20px 40px; text-align: center; font-size: 12px; color: #999; }
            .badge { display: inline-block; background: #e8f5e9; color: #2e7d32; border-radius: 20px; padding: 4px 12px; font-size: 12px; font-weight: 600; margin-bottom: 16px; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <h1>✈️ Lux Travel Planner</h1>
              <p>New contact form submission received</p>
            </div>
            <div class="body">
              <span class="badge">📩 New Inquiry</span>
              <div class="field">
                <div class="label">From</div>
                <div class="value">${payload.name} &lt;${payload.email}&gt;</div>
              </div>
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${payload.subject}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${payload.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
              </div>
            </div>
            <div class="footer">
              Received on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST · Lux Travel Planner
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

// ── User auto-reply email ──────────────────────────────────────────────────
function buildUserReplyMail(payload: ContactPayload) {
  const { MAIL_USER } = process.env;
  return {
    from: `"Lux Travel Planner" <${MAIL_USER}>`,
    to: payload.email,
    subject: `✅ We received your message — Lux Travel Planner`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 0; }
            .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
            .header { background: linear-gradient(135deg, #1a6b6b 0%, #c9820a 100%); padding: 32px 40px; color: white; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 700; }
            .body { padding: 32px 40px; color: #333; line-height: 1.7; }
            .body p { margin: 0 0 16px; font-size: 15px; }
            .highlight { background: #f0f7f7; border-radius: 8px; padding: 16px 20px; margin: 16px 0; font-size: 14px; color: #555; }
            .footer { background: #f5f5f5; padding: 20px 40px; text-align: center; font-size: 12px; color: #999; }
            .cta { display: inline-block; background: linear-gradient(135deg, #1a6b6b, #c9820a); color: white; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px; text-decoration: none; margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <h1>✈️ Lux Travel Planner</h1>
            </div>
            <div class="body">
              <p>Hi <strong>${payload.name}</strong>,</p>
              <p>Thank you for reaching out to <strong>Lux Travel Planner</strong>! 🌍</p>
              <p>We've received your message and our travel experts will get back to you <strong>within 24 hours</strong>.</p>
              <div class="highlight">
                <strong>Your inquiry:</strong><br/>
                <em>"${payload.message.replace(/</g, "&lt;").replace(/>/g, "&gt;").slice(0, 120)}${payload.message.length > 120 ? "..." : ""}"</em>
              </div>
              <p>In the meantime, feel free to browse our luxury travel packages.</p>
              <a href="http://localhost:5173/packages" class="cta">Explore Packages</a>
              <p style="margin-top: 24px;">Warm regards,<br/><strong>The Lux Travel Team</strong></p>
            </div>
            <div class="footer">
              © ${new Date().getFullYear()} Lux Travel Planner · hello@luxtravel.com
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

// ── Route Handler ──────────────────────────────────────────────────────────
export const handleContact: RequestHandler = async (req, res) => {
  const payload = req.body as Partial<ContactPayload>;

  // 1. Validate
  const error = validatePayload(payload);
  if (error) {
    res.status(400).json({ success: false, message: error });
    return;
  }

  const data = payload as ContactPayload;

  // 2. Send emails
  try {
    const transporter = createTransporter();

    // Verify SMTP connection
    await transporter.verify();

    // Send admin notification + user auto-reply in parallel
    await Promise.all([
      transporter.sendMail(buildAdminMail(data)),
      transporter.sendMail(buildUserReplyMail(data)),
    ]);

    res.json({
      success: true,
      message: "Message sent successfully! We'll be in touch within 24 hours.",
    });
  } catch (err: any) {
    console.error("[Contact API] Email send failed:", err?.message ?? err);
    res.status(500).json({
      success: false,
      message:
        "Failed to send message. Please try again or email us directly at hello@luxtravel.com",
    });
  }
};
