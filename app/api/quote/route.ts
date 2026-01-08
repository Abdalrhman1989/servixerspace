import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Helper to convert Web File to Buffer
async function fileToBuffer(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    return Buffer.from(arrayBuffer);
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
            <p style="margin: 5px 0 0 0; opacity: 0.9;">ServixerSpace</p>
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
    // Check for environment variable
    if (!process.env.EMAIL_PASSWORD) {
        console.error('SERVER CONFIGURATION ERROR: EMAIL_PASSWORD environment variable is missing.');
        return NextResponse.json(
            { message: 'Server configuration error: EMAIL_PASSWORD is missing', code: 'MISSING_CONFIG' },
            { status: 500 }
        );
    }

    try {
        const formData = await req.formData();

        // Extract fields
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const taskDescription = formData.get('taskDescription') as string;

        // Extract files
        const files = formData.getAll('files') as File[];

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'servixerspace@gmail.com',
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Prepare attachments
        const attachments = await Promise.all(
            files.map(async (file) => ({
                filename: file.name,
                content: await fileToBuffer(file),
                contentType: file.type,
            }))
        );

        // --- 1. Admin Email Content ---
        const adminHtml = getEmailTemplate(
            'New Quote Request',
            `
            <p style="font-size: 16px; margin-bottom: 20px;">You have received a new price estimate request.</p>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
                <div class="detail-row"><span class="label">Client Name</span><span class="value">${name}</span></div>
                <div class="detail-row"><span class="label">Email</span><span class="value">${email}</span></div>
            </div>
            
            <p style="font-weight: 600; margin-top: 20px; margin-bottom: 10px;">Task Description:</p>
            <blockquote style="background: #f1f5f9; padding: 15px; border-left: 5px solid #2563EB; margin: 0; color: #555;">
                ${taskDescription.replace(/\n/g, '<br>')}
            </blockquote>
            
            ${files.length > 0 ? `<p style="margin-top: 20px; color: #000; font-weight: 600;">📎 ${files.length} file(s) attached.</p>` : ''}
            `,
            false
        );

        // --- 2. User Confirmation Email Content ---
        const userHtml = getEmailTemplate(
            'Request Received',
            `
            <h2 style="color: #1E40AF; margin-top: 0;">Hi ${name},</h2>
            <p>Thank you for reaching out to <strong>ServixerSpace</strong>. We have successfully received your request for a price estimate.</p>
            
            <div style="background: #e0f2fe; border: 1px solid #bae6fd; padding: 20px; border-radius: 8px; margin: 20px 0; color: #0c4a6e;">
                <p style="margin: 0; font-weight: 500;">We will check your requirements and get back to you as soon as possible.</p>
            </div>

            <p><strong>Your Project Description:</strong></p>
            <blockquote style="font-style: italic; color: #666; border-left: 3px solid #ccc; padding-left: 10px; margin-left: 0;">
                "${taskDescription.length > 100 ? taskDescription.substring(0, 100) + '...' : taskDescription}"
            </blockquote>
            
            <br/>
            <p>Best regards,<br/><strong>The ServixerSpace Team</strong></p>
            `,
            true
        );

        // Send Email to Admin
        await transporter.sendMail({
            from: '"ServixerSpace Quote Form" <servixerspace@gmail.com>',
            to: 'servixerspace@gmail.com',
            replyTo: email,
            subject: `Quote Request: ${name}`,
            html: adminHtml,
            attachments: attachments,
        });

        // Send Confirmation Email to Client
        await transporter.sendMail({
            from: '"ServixerSpace Team" <servixerspace@gmail.com>',
            to: email,
            subject: `We received your request: ServixerSpace`,
            html: userHtml,
        });

        return NextResponse.json({ message: 'Quote request sent successfully' }, { status: 200 });

    } catch (error: any) {
        console.error('Error sending quote email:', error);

        // Return more specific error information
        const errorMessage = error.message || 'Failed to send quote request';
        return NextResponse.json(
            { message: errorMessage, code: 'SEND_ERROR' },
            { status: 500 }
        );
    }
}
