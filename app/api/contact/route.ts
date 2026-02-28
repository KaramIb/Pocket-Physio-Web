import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { name, email, clinic, phone, message } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: 'Pocket Physio <noreply@pocketphysio.uk>',
      to: 'karam@pocketphysio.uk',
      replyTo: email,
      subject: `New Demo Request — ${name}${clinic ? ` (${clinic})` : ''}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f8f6;">
          <div style="background: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 32px;">
            <h2 style="margin: 0 0 24px; font-size: 20px; color: #0d0d0d;">New Demo Request</h2>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px; width: 120px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #0d0d0d; font-size: 14px; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #0d0d0d; font-size: 14px;"><a href="mailto:${email}" style="color: #1a4b8c;">${email}</a></td>
              </tr>
              ${clinic ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px;">Clinic</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #0d0d0d; font-size: 14px;">${clinic}</td>
              </tr>` : ''}
              ${phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #0d0d0d; font-size: 14px;">${phone}</td>
              </tr>` : ''}
              ${message ? `
              <tr>
                <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top; padding-top: 14px;">Message</td>
                <td style="padding: 10px 0; color: #0d0d0d; font-size: 14px; line-height: 1.6; padding-top: 14px;">${message}</td>
              </tr>` : ''}
            </table>

            <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
              <a href="mailto:${email}" style="display: inline-block; background: #0d0d0d; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 13px; font-weight: 500;">Reply to ${name}</a>
            </div>
          </div>
          <p style="margin-top: 16px; font-size: 11px; color: #aaa; text-align: center;">Pocket Physio · pocketphysio.uk</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
