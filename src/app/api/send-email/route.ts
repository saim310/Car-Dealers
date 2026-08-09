import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

// ═══════════════════════════════════════════════════════════
// TESTING: Default to your Resend account email
// so onboarding@resend.dev can actually deliver to it.
// Change this in .env.local if you want:
// ADMIN_EMAIL=zohairwordpress@gmail.com
// ═══════════════════════════════════════════════════════════
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'zohairwordpress@gmail.com';

// TESTING: Resend's test sender — works without domain verification.
// PRODUCTION: After verifying ukajapan.com.au, change to:
// const FROM_EMAIL = 'UKA Japan <noreply@ukajapan.com.au>';
const FROM_EMAIL = 'onboarding@resend.dev';

export async function POST(request: Request) {
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not defined.');
    return NextResponse.json(
      { success: false, error: 'Server configuration error: email service not configured.' },
      { status: 500 }
    );
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    const body = await request.json();
    const { formType, name, email, phone, message, contactMethod, carTitle, ...extra } = body;

    console.log(`[Email API] Received ${formType} from ${name} (${email})`);

    const subjectMap: Record<string, string> = {
      enquiry: `New Enquiry — ${name}`,
      testdrive: `Test Drive Request — ${name}`,
      finance: `Finance Application — ${name}`,
    };

    const subject = subjectMap[formType] || 'New Website Submission';

    let htmlBody = `
      <h2 style="color:#1a1a2e;">${subject}</h2>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Car:</strong> ${carTitle || 'N/A'}</p>
    `;

    if (contactMethod) htmlBody += `<p><strong>Preferred Contact:</strong> ${contactMethod}</p>`;
    if (message) htmlBody += `<p><strong>Message:</strong> ${message}</p>`;

    if (formType === 'testdrive') {
      if (extra.date) htmlBody += `<p><strong>Preferred Date:</strong> ${extra.date}</p>`;
      if (extra.time) htmlBody += `<p><strong>Preferred Time:</strong> ${extra.time}</p>`;
      if (extra.location) htmlBody += `<p><strong>Location:</strong> ${extra.location}</p>`;
    }

    if (formType === 'finance') {
      if (extra.dob) htmlBody += `<p><strong>Date of Birth:</strong> ${extra.dob}</p>`;
      if (extra.employment) htmlBody += `<p><strong>Employment:</strong> ${extra.employment}</p>`;
      if (extra.income) htmlBody += `<p><strong>Annual Income:</strong> ${extra.income}</p>`;
      if (extra.term) htmlBody += `<p><strong>Loan Term:</strong> ${extra.term} Years</p>`;
      if (extra.deposit) htmlBody += `<p><strong>Deposit:</strong> $${extra.deposit}</p>`;
    }

    if (formType === 'enquiry' && extra.interest) {
      htmlBody += `<p><strong>Interest:</strong> ${extra.interest}</p>`;
    }

    htmlBody += `<hr style="border:none;border-top:1px solid #eee;margin:16px 0;" /><p style="font-size:12px;color:#999;">Submitted via UKA Japan website.</p>`;

    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject,
      html: htmlBody,
      replyTo: email,
    });

    console.log(`[Email API] Sent successfully. ID: ${data.data?.id || 'N/A'}`);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('[Email API] Send error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}