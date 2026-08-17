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

// ─── YARD FORMS (sirf location-based email bhejenge) ───
const YARD_FORM_TYPES = ['testdrive', 'finance', 'enquiry'];

// ─── NEW FORMS (sirf info + saim bhejenge) ───
const NEW_FORM_TYPES = ['contact', 'wholesale', 'finance_apply', 'finance_info', 'warranty'];

function getRecipients(formType: string, location?: string, carYard?: string, carCity?: string): string[] {
  const recipients: string[] = [];
  const searchKey = (location || carYard || carCity || '').toLowerCase();

  if (YARD_FORM_TYPES.includes(formType)) {
    if (searchKey.includes('mordialloc') || searchKey.includes('2')) {
      recipients.push(YARD_EMAILS.mordialloc);
    } else if (searchKey.includes('brisbane') || searchKey.includes('slacks') || searchKey.includes('4')) {
      recipients.push(YARD_EMAILS.brisbane);
    } else {
      // Default / Fallback yard sales email (Maidstone) agar koi aur match na ho
      recipients.push(YARD_EMAILS.maidstone);
    }
  }

  if (NEW_FORM_TYPES.includes(formType)) {
    recipients.push('info@ukajapan.com.au');
    recipients.push('saim@ukajapan.com.au');
  }

  return Array.from(new Set(recipients));
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
    const { formType, name, email, phone, message, contactMethod, carTitle, location, yard, city, ...extra } = body;

    console.log(`[Email API] Received ${formType} from ${name} (${email}) | Location/Yard/City: ${location || yard || city || 'N/A'}`);

    // ─── SUBJECT MAP ───
    const subjectMap: Record<string, string> = {
      enquiry: `New Enquiry — ${name}`,
      testdrive: `New Test Drive Request — ${name}`,
      finance: `New Finance Application — ${name}`,
      contact: `New Contact Form Submission — ${name}`,
      wholesale: `New Wholesale Enquiry — ${name}`,
      finance_apply: `New Finance Application (Apply) — ${name}`,
      finance_info: `New Finance Enquiry (Info) — ${name}`,
      warranty: `New Warranty Enquiry — ${name}`,
    };

    const subject = subjectMap[formType] || 'New Website Submission';
    const recipients = getRecipients(formType, location, yard, city);

    console.log(`[Email API] Recipients: ${recipients.join(', ')}`);

    // ─── HTML BODY ───
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

    const finalLoc = location || yard || city;
    if (finalLoc) {
      htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Yard Location</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(String(finalLoc))}</td>
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

    // ─── PURANE FORM TYPES ───
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

    // ─── NAYE FORM TYPES ───
    if (formType === 'wholesale') {
      if (extra.dealership) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Dealership</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(extra.dealership)}</td>
            </tr>
        `;
      }
      if (extra.legalEntity) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Legal Entity</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(extra.legalEntity)}</td>
            </tr>
        `;
      }
      if (extra.lcmt) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>LCMT Number</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(extra.lcmt)}</td>
            </tr>
        `;
      }
    }

    if (formType === 'finance_apply') {
      if (extra.loanAmount) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Loan Amount</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">$${escapeHtml(extra.loanAmount)}</td>
            </tr>
        `;
      }
      if (extra.loanDuration) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Loan Duration</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(extra.loanDuration)} Years</td>
            </tr>
        `;
      }
      if (extra.loanType) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Loan Type</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(extra.loanType)}</td>
            </tr>
        `;
      }
      if (extra.employmentStatus) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Employment Status</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(extra.employmentStatus)}</td>
            </tr>
        `;
      }
      if (extra.residencyStatus) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Residency Status</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(extra.residencyStatus)}</td>
            </tr>
        `;
      }
      if (extra.propertyOwner) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Property Owner</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(extra.propertyOwner)}</td>
            </tr>
        `;
      }
      if (extra.financeBefore) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Previous Finance</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(extra.financeBefore)}</td>
            </tr>
        `;
      }
      if (extra.creditHistory) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Credit History</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(extra.creditHistory)}</td>
            </tr>
        `;
      }
    }

    if (formType === 'finance_info') {
      if (extra.financeAmount) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Desired Finance Amount</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">$${escapeHtml(extra.financeAmount)}</td>
            </tr>
        `;
      }
      if (extra.employmentType) {
        htmlBody += `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Employment Type</strong></td>
              <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(extra.employmentType)}</td>
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

    console.log(`[Email API] Sent successfully to [${recipients.join(', ')}]. ID: ${data?.id || 'N/A'}`);
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
