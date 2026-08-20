import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'UKA Japan <noreply@ukajapan.com.au>';

const YARD_EMAILS: Record<string, string> = {
  mordialloc: 'sales.mordialloc@ukajapan.com.au',
  maidstone: 'sales.maidstone@ukajapan.com.au',
  brisbane: 'sales.brisbane@ukajapan.com.au',
};

const YARD_FORM_TYPES = ['testdrive', 'finance', 'enquiry'];
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
    return NextResponse.json({ success: false, error: 'Service not configured.' }, { status: 500 });
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    const body = await request.json();
    const { formType, name, email, phone, message, contactMethod, carTitle, location, yard, city, ...extra } = body;

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

    let htmlBody = `
      <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;color:#333;">
        <div style="background:#1a1a2e;padding:20px;text-align:center;"><h2 style="color:#ffc107;margin:0;">UKA Japan</h2></div>
        <div style="padding:24px;background:#fff;border:1px solid #eee;">
          <h3 style="color:#1a1a2e;margin-top:0;">${escapeHtml(subject)}</h3>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;"><strong>Name</strong></td><td style="padding:8px 0;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px 0;"><strong>Email</strong></td><td style="padding:8px 0;">${escapeHtml(email)}</td></tr>
            <tr><td style="padding:8px 0;"><strong>Phone</strong></td><td style="padding:8px 0;">${escapeHtml(phone)}</td></tr>
            <tr><td style="padding:8px 0;"><strong>Car</strong></td><td style="padding:8px 0;">${escapeHtml(carTitle) || 'N/A'}</td></tr>
    `;

// Nayi Fields (Multiple variable support ke sath)
    const license = extra.licenseNumber || extra.license || extra.driverLicense;
    const time = extra.customTime || extra.time || extra.preferredTime;
    const address = extra.customerAddress || extra.address;
    const salesPerson = extra.salesPersonName || extra.salesPerson || extra.salesman;
    const stockNo = extra.stockNumber || extra.stockNo || extra.stockId;
    const prefDate = extra.date || extra.preferredDate || extra.bookingDate;

    if (license) htmlBody += `<tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>License #</strong></td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(license)}</td></tr>`;
    if (prefDate) htmlBody += `<tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Preferred Date</strong></td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(prefDate)}</td></tr>`;
    if (time) htmlBody += `<tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Preferred Time</strong></td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(time)}</td></tr>`;
    if (address) htmlBody += `<tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Address</strong></td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(address)}</td></tr>`;
    if (salesPerson) htmlBody += `<tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Sales Person</strong></td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(salesPerson)}</td></tr>`;
    if (stockNo) htmlBody += `<tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Stock Number</strong></td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(stockNo)}</td></tr>`;

    if (contactMethod) htmlBody += `<tr><td style="padding:8px 0;"><strong>Preferred Contact</strong></td><td style="padding:8px 0;">${escapeHtml(contactMethod)}</td></tr>`;
    const finalLoc = location || yard || city;
    if (finalLoc) htmlBody += `<tr><td style="padding:8px 0;"><strong>Yard Location</strong></td><td style="padding:8px 0;">${escapeHtml(String(finalLoc))}</td></tr>`;
    if (message) htmlBody += `<tr><td style="padding:8px 0;"><strong>Message</strong></td><td style="padding:8px 0;">${escapeHtml(message).replace(/\n/g, '<br/>')}</td></tr>`;

    htmlBody += `</table></div>
        <div style="background:#f8f9fa;padding:16px;text-align:center;font-size:12px;color:#999;">
          Submitted via UKA Japan website | ${new Date().toLocaleString('en-AU')}
        </div>
      </div>`;

    await resend.emails.send({ from: FROM_EMAIL, to: recipients, subject, html: htmlBody, replyTo: email });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

function escapeHtml(text: string): string {
  if (!text) return '';
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
