import { RequestHandler } from "express";
import nodemailer from "nodemailer";

export interface BookingPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  travelers: number;
  packageTitle: string;
  destination: string;
  totalPrice: number;
}

// ── Transporter factory ────────────────────────────────────────────────────
function createTransporter() {
  const {
    MAIL_HOST = "smtp.gmail.com",
    MAIL_PORT = "587",
    MAIL_USER,
    MAIL_PASS,
  } = process.env;

  const cleanPass = MAIL_PASS?.replace(/\s/g, "");

  if (!MAIL_USER || !cleanPass) {
    throw new Error("MAIL_USER and MAIL_PASS must be set.");
  }

  return nodemailer.createTransport({
    host: MAIL_HOST,
    port: Number(MAIL_PORT),
    secure: false,
    auth: {
      user: MAIL_USER,
      pass: cleanPass,
    },
  });
}

// ── User Confirmation Email ────────────────────────────────────────────────
function buildUserConfirmationMail(payload: BookingPayload) {
  const { MAIL_USER } = process.env;
  return {
    from: `"Lux Travel Planner" <${MAIL_USER}>`,
    to: payload.email,
    subject: `✈️ Booking Confirmed: ${payload.packageTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f7f7; margin: 0; padding: 0; }
            .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
            .header { background: linear-gradient(135deg, #1a6b6b 0%, #c9820a 100%); padding: 40px; color: white; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
            .content { padding: 40px; color: #333; line-height: 1.6; }
            .details { background: #f9f9f9; border-radius: 12px; padding: 24px; margin: 24px 0; border: 1px solid #eee; }
            .details-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; }
            .details-label { color: #666; font-weight: 600; }
            .details-value { color: #1a6b6b; font-weight: 700; }
            .total-row { border-top: 2px solid #eee; margin-top: 16px; padding-top: 16px; font-size: 18px; }
            .footer { background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999; }
            .badge { display: inline-block; background: #e8f5e9; color: #2e7d32; border-radius: 20px; padding: 6px 16px; font-size: 13px; font-weight: 600; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <h1>Booking Confirmed!</h1>
              <p>Pack your bags, ${payload.firstName}!</p>
            </div>
            <div class="content">
              <div style="text-align: center;"><span class="badge">🎉 Successful Booking</span></div>
              <p>Hi <strong>${payload.firstName} ${payload.lastName}</strong>,</p>
              <p>Your luxury experience to <strong>${payload.destination}</strong> has been officially confirmed. We are thrilled to have you traveling with us!</p>
              
              <div class="details">
                <div class="details-row">
                  <span class="details-label">Package</span>
                  <span class="details-value">${payload.packageTitle}</span>
                </div>
                <div class="details-row">
                  <span class="details-label">Travelers</span>
                  <span class="details-value">${payload.travelers} Persons</span>
                </div>
                <div class="details-row">
                  <span class="details-label">Destination</span>
                  <span class="details-value">${payload.destination}</span>
                </div>
                <div class="total-row details-row">
                  <span class="details-label">Total Paid</span>
                  <span class="details-value">$${payload.totalPrice.toLocaleString()}</span>
                </div>
              </div>

              ${payload.specialRequests ? `
                <p><strong>Special Requests:</strong><br/>
                <span style="color: #666; font-style: italic;">"${payload.specialRequests}"</span></p>
              ` : ''}

              <p>A travel consultant will contact you within 48 hours with your full digital itinerary and travel documents.</p>
              
              <p style="margin-top: 32px;">Warm regards,<br/><strong>The Lux Travel Team</strong></p>
            </div>
            <div class="footer">
              © ${new Date().getFullYear()} Lux Travel Planner · Questions? Reply to this email.
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

// ── Admin Notification Email ───────────────────────────────────────────────
function buildAdminNotificationMail(payload: BookingPayload) {
  const { MAIL_USER, CONTACT_RECEIVER_EMAIL } = process.env;
  const to = CONTACT_RECEIVER_EMAIL || MAIL_USER || "";

  return {
    from: `"Lux Travel System" <${MAIL_USER}>`,
    to,
    subject: `💰 NEW BOOKING: $${payload.totalPrice.toLocaleString()} — ${payload.firstName} ${payload.lastName}`,
    html: `
      <h2>New Booking Received!</h2>
      <p><strong>Customer:</strong> ${payload.firstName} ${payload.lastName}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Phone:</strong> ${payload.phone}</p>
      <p><strong>Package:</strong> ${payload.packageTitle}</p>
      <p><strong>Travelers:</strong> ${payload.travelers}</p>
      <p><strong>Total Price:</strong> $${payload.totalPrice.toLocaleString()}</p>
      <p><strong>Special Requests:</strong> ${payload.specialRequests || 'None'}</p>
    `,
  };
}

export const handleBooking: RequestHandler = async (req, res) => {
  const payload = req.body as BookingPayload;

  try {
    const transporter = createTransporter();
    
    // Send to User and Admin
    await Promise.all([
      transporter.sendMail(buildUserConfirmationMail(payload)),
      transporter.sendMail(buildAdminNotificationMail(payload))
    ]);

    console.log(`✅ [Booking API] Confirmation sent to ${payload.email}`);

    res.json({ success: true, message: "Booking confirmed and email sent!" });
  } catch (error: any) {
    console.error("❌ [Booking API] Failed to send email:", error.message);
    // Still return success: true for the booking itself, but maybe with a warning?
    // Actually, user wants "Strict do not make mistakes" and "Make sure mail got", 
    // so if mail fails, we should probably report it.
    res.status(500).json({ success: false, message: "Booking processed but email failed to send." });
  }
};
