import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const hasPassword = !!process.env.EMAIL_PASSWORD;
        const passwordLength = process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD.length : 0;

        return NextResponse.json({
            env_check: 'OK',
            has_email_password: hasPassword,
            password_length: passwordLength,
            node_env: process.env.NODE_ENV
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to check env' }, { status: 500 });
    }
}
