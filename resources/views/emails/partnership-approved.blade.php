<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Partnership Approved</title>
</head>
<body style="margin:0;background:#f8f4ec;font-family:Arial,sans-serif;color:#0f3550;">
    <div style="max-width:640px;margin:0 auto;padding:32px 18px;">
        <div style="background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e7ded0;">
            <div style="background:#0f4669;color:#ffffff;padding:24px 28px;">
                <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#d9a94f;font-weight:bold;">Green Star Island Tour & Safari</div>
                <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">Partnership Approved</h1>
            </div>
            <div style="padding:28px;">
                <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">Hello {{ $partnershipRequest->full_name }},</p>
                <p style="font-size:16px;line-height:1.7;margin:0 0 22px;">
                    Good news. Your request to partner with Green Star has been approved.
                </p>

                <table style="width:100%;border-collapse:collapse;margin:0 0 22px;">
                    @if($partnershipRequest->company_name)
                        <tr>
                            <td style="padding:12px;border-bottom:1px solid #eee4d6;color:#6b7b86;">Company</td>
                            <td style="padding:12px;border-bottom:1px solid #eee4d6;font-weight:bold;">{{ $partnershipRequest->company_name }}</td>
                        </tr>
                    @endif
                    <tr>
                        <td style="padding:12px;border-bottom:1px solid #eee4d6;color:#6b7b86;">Partnership type</td>
                        <td style="padding:12px;border-bottom:1px solid #eee4d6;font-weight:bold;">{{ $partnershipRequest->partnership_type }}</td>
                    </tr>
                    <tr>
                        <td style="padding:12px;border-bottom:1px solid #eee4d6;color:#6b7b86;">Status</td>
                        <td style="padding:12px;border-bottom:1px solid #eee4d6;font-weight:bold;color:#24814f;">Approved</td>
                    </tr>
                </table>

                <p style="font-size:15px;line-height:1.7;margin:0 0 14px;">
                    Our team will contact you with the next steps and partnership details. You can also reply to this email or message us on WhatsApp for faster support.
                </p>
                <p style="font-size:15px;line-height:1.7;margin:0;">Thank you for choosing to work with Green Star.</p>
            </div>
        </div>
    </div>
</body>
</html>
