import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Helper to generate a simple ICS file content
function generateICS(event: any) {
    const formatDate = (dateStr: string, timeStr: string) => {
        // Simple parsing - assumes input is YYYY-MM-DD and HH:MM
        const date = new Date(`${dateStr}T${timeStr}:00`);
        // Format to YYYYMMDDTHHMMSSZ
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    // Calculate end time (assuming 1 hour duration)
    const startDate = new Date(`${event.date}T${event.time}:00`);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
    const startStr = startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endStr = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ServixerSpace//Booking System//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
SUMMARY:Meeting with ServixerSpace: ${event.service}
DTSTART:${startStr}
DTEND:${endStr}
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}
ORGANIZER;CN=ServixerSpace:mailto:servixerspace@gmail.com
UID:${Date.now()}@servixerspace.com
DESCRIPTION:Meeting regarding ${event.service}. Client: ${event.name} (${event.email}).
LOCATION:Online / ServixerSpace Office
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT15M
DESCRIPTION:Reminder
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`;
}

// Helper for Professional HTML Email Template
const getEmailTemplate = (title: string, content: string, isClient: boolean) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #2563EB 0%, #1E40AF 100%); padding: 30px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; }
        .content { padding: 40px 30px; }
        .detail-row { border-bottom: 1px solid #eee; padding: 12px 0; display: flex; justify-content: space-between; }
        .detail-row:last-child { border-bottom: none; }
        .label { font-weight: 600; color: #666; }
        .value { font-weight: 500; color: #111; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee; }
        .button { display: inline-block; padding: 12px 24px; background-color: #2563EB; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
        .subtle { color: #888; font-size: 14px; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${title}</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">ServixerSpace Booking System</p>
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ServixerSpace. All rights reserved.</p>
            <p>Skibhusvej 109, 5000 Odense, Denmark</p>
        </div>
    </div>
</body>
</html>
`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { service, date, time, name, email, company } = body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'servixerspace@gmail.com',
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Generate ICS Calendar File
        const icsContent = generateICS({ service, date, time, name, email });

        // --- 1. Admin Email Content ---
        const adminHtml = getEmailTemplate(
            'New Booking Request',
            `
            <p style="font-size: 16px; margin-bottom: 20px;">You have received a new booking request from your website.</p>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
                <div class="detail-row"><span class="label">Client Name</span><span class="value">${name}</span></div>
                <div class="detail-row"><span class="label">Email</span><span class="value">${email}</span></div>
                <div class="detail-row"><span class="label">Company</span><span class="value">${company || '-'}</span></div>
                <div class="detail-row"><span class="label">Service Interest</span><span class="value" style="text-transform: capitalize;">${service}</span></div>
                <div class="detail-row"><span class="label">Requested Date</span><span class="value">${date}</span></div>
                <div class="detail-row"><span class="label">Requested Time</span><span class="value">${time}</span></div>
            </div>
            <p class="subtle">An event invitation (.ics) is attached to this email.</p>
            `,
            false
        );

        // --- 2. User Confirmation Email Content ---
        const userHtml = getEmailTemplate(
            'Booking Confirmed',
            `
            <h2 style="color: #1E40AF; margin-top: 0;">Hi ${name},</h2>
            <p>Thank you for booking a meeting with <strong>ServixerSpace</strong>. We have received your request and are looking forward to speaking with you.</p>
            
            <div style="background: #f0f9ff; border: 1px solid #bfdbfe; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1e3a8a; font-size: 16px;">Meeting Details</h3>
                <div class="detail-row"><span class="label">Topic</span><span class="value" style="text-transform: capitalize;">${service} Consultation</span></div>
                <div class="detail-row"><span class="label">Date</span><span class="value">${date}</span></div>
                <div class="detail-row"><span class="label">Time</span><span class="value">${time}</span></div>
            </div>

            <p>We have attached a calendar invitation to this email. Please add it to your calendar.</p>
            
            <p>If you need to reschedule, please simply reply to this email.</p>
            
            <br/>
            <p>Best regards,<br/><strong>The ServixerSpace Team</strong></p>
            `,
            true
        );

        // Send Email to Admin
        await transporter.sendMail({
            from: '"ServixerSpace Website" <servixerspace@gmail.com>',
            to: 'servixerspace@gmail.com',
            replyTo: email, // Reply to the client directly
            subject: `📅 New Booking: ${name} - ${service}`,
            html: adminHtml,
            attachments: [
                {
                    filename: 'meeting.ics',
                    content: icsContent,
                    contentType: 'text/calendar',
                },
            ],
        });

        // Send Email to Client
        await transporter.sendMail({
            from: '"ServixerSpace Team" <servixerspace@gmail.com>',
            to: email,
            subject: `✅ Booking Confirmation: ServixerSpace - ${date}`,
            html: userHtml,
            attachments: [
                {
                    filename: 'meeting-invite.ics',
                    content: icsContent,
                    contentType: 'text/calendar',
                },
            ],
        });

        return NextResponse.json({ message: 'Booking emails sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Failed to send booking' }, { status: 500 });
    }
}
