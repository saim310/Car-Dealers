import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'UKA Japan <noreply@ukajapan.com.au>';

// ═══════════════════════════════════════════════════════════
// YARD EMAIL ROUTING
// ═══════════════════════════════════════════════════════════
const YARD_EMAILS: Record<string, string> = {
  mordialloc: 'sales.mordialloc@ukajapan.com.au',
  maidstone: 'sales.maidstone@ukajapan.com.au',
  brisbane: 'sales.brisbane@ukajapan.com.au',
};

const GENERAL_EMAIL = 'info@ukajapan.com.au';

function getRecipients(formType: string, location?: string): string[] {
  const recipients: string[] = [];

  // Test Drive: yard-specific email based on location
  if (formType === 'testdrive' && location && YARD_EMAILS[location]) {
    recipients.push(YARD_EMAILS[location]);
  }

  // General: info@ukajapan.com.au for ALL submissions
  // (Finance, Enquiry, aur Test Drive mein bhi CC ki tarah)
  recipients.push(GENERAL_EMAIL);

	return Array.from(new Set(recipients)); // duplicates remove karne ke liye
}

export async function POST(request: Request) {
  if (!RESEND_API_KEY) {
    console.error('[Email API] RESEND_API_KEY is not defined.');
    return NextResponse.json(
      { success: false, error: 'Server configuration error: email service not configured.' },
      { status: 500 }
    );
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    const body = await request.json();
    const { formType, name, email, phone, message, contactMethod, carTitle, location, ...extra } = body;

    console.log(`[Email API] Received ${formType} from ${name} (${email}) | Location: ${location || 'N/A'}`);

    const subjectMap: Record<string, string> = {
      enquiry: `New Enquiry — ${name}`,
      testdrive: `New Test Drive Request — ${name}`,
      finance: `New Finance Application — ${name}`,
    };

    const subject = subjectMap[formType] || 'New Website Submission';
    const recipients = getRecipients(formType, location);

    console.log(`[Email API] Recipients: ${recipients.join(', ')}`);

    let htmlBody = `
      <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;color:#333;">
        <div style="background:#1a1a2e;padding:20px;text-align:center;">
          <h2 style="color:#ffc107;margin:0;font-size:20px;">UKA Japan</h2>
        </div>
        <div style="padding:24px;background:#fff;border:1px solid #eee;border-top:none;">
          <h3 style="color:#1a1a2e;margin-top:0;">${escapeHtml(subject)}</h3>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;width:140px;"><strong>Name</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Email</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(email)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Phone</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(phone)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Car</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(carTitle) || 'N/A'}</td>
            </tr>
    `;

    if (contactMethod) {
      htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Preferred Contact</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(contactMethod)}</td>
            </tr>
      `;
    }

    if (location) {
      htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Yard Location</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(location.charAt(0).toUpperCase() + location.slice(1))} Yard</td>
            </tr>
      `;
    }

    if (message) {
      htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;vertical-align:top;"><strong>Message</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(message).replace(/\n/g, '<br/>')}</td>
            </tr>
      `;
    }

    if (formType === 'testdrive') {
      if (extra.date) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Preferred Date</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(extra.date)}</td>
            </tr>
        `;
      }
      if (extra.time) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Preferred Time</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(extra.time)}</td>
            </tr>
        `;
      }
    }

    if (formType === 'finance') {
      if (extra.dob) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Date of Birth</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(extra.dob)}</td>
            </tr>
        `;
      }
      if (extra.employment) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Employment</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(extra.employment)}</td>
            </tr>
        `;
      }
      if (extra.income) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Annual Income</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(extra.income)}</td>
            </tr>
        `;
      }
      if (extra.term) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Loan Term</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(extra.term)} Years</td>
            </tr>
        `;
      }
      if (extra.deposit) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Deposit</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">$${escapeHtml(extra.deposit)}</td>
            </tr>
        `;
      }
    }

    if (formType === 'enquiry' && extra.interest) {
      htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Interest</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(extra.interest)}</td>
            </tr>
      `;
    }

    htmlBody += `
          </table>
        </div>
        <div style="background:#f8f9fa;padding:16px;text-align:center;font-size:12px;color:#999;">
          Submitted via UKA Japan website | ${new Date().toLocaleString('en-AU')}
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: recipients,
      subject,
      html: htmlBody,
      replyTo: email,
    });

    if (error) {
      console.error('[Email API] Resend error:', error);
      return NextResponse.json(
        { success: false, error: error.message || 'Failed to send email via provider.' },
        { status: 500 }
      );
    }

    console.log(`[Email API] Sent successfully. ID: ${data?.id || 'N/A'}`);

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('[Email API] Unhandled exception:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
