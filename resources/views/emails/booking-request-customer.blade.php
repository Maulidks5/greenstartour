<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>We received your request</title>
</head>
<body style="margin:0;background:#f8f4ec;font-family:Arial,sans-serif;color:#0f3550;">
    <div style="max-width:640px;margin:0 auto;padding:28px 16px;">
        <div style="background:#ffffff;border:1px solid #e7ded0;border-radius:18px;overflow:hidden;">
            <div style="background:#0f4669;color:#ffffff;padding:22px 26px;">
                <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#d9a94f;font-weight:bold;">Green Star Island Tour & Safari</div>
                <h1 style="margin:8px 0 0;font-size:26px;line-height:1.25;">Request received</h1>
            </div>
            <div style="padding:26px;">
                <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">Hello {{ $details['customerName'] }},</p>
                <p style="font-size:16px;line-height:1.7;margin:0 0 18px;">Thank you for choosing Green Star Island Tour & Safari. We have received your {{ $details['typeLabel'] }} request.</p>

                <div style="background:#eaf6ef;border-left:4px solid #2f8f5b;border-radius:12px;padding:14px 16px;margin-bottom:22px;">
                    <div style="font-size:12px;text-transform:uppercase;letter-spacing:1.5px;color:#2f6f49;font-weight:bold;margin-bottom:5px;">What happens next</div>
                    <div style="font-size:15px;line-height:1.6;">Our team will review your request and contact you shortly to confirm availability, pickup details, and final price.</div>
                </div>

                <h2 style="margin:0 0 10px;font-size:18px;color:#0f3550;">Your Request Summary</h2>
                <table style="width:100%;border-collapse:collapse;margin-bottom:22px;">
                    @foreach([
                        'Service' => $details['serviceName'],
                        'Date' => $details['dateLine'],
                        'Guests' => $details['guestsLine'],
                        'Pickup / Route' => $details['pickupLine'],
                        'Room type' => $details['roomType'],
                        'Estimated total' => $details['total'],
                    ] as $label => $value)
                        @if($value)
                            <tr>
                                <td style="width:36%;padding:11px 12px;border-bottom:1px solid #eee4d6;color:#6b7b86;">{{ $label }}</td>
                                <td style="padding:11px 12px;border-bottom:1px solid #eee4d6;font-weight:bold;">{{ $value }}</td>
                            </tr>
                        @endif
                    @endforeach
                </table>

                <p style="font-size:15px;line-height:1.7;margin:0 0 12px;">For faster help, reply to us on WhatsApp with your travel date, hotel name, and any special request.</p>
                <p style="font-size:15px;line-height:1.7;margin:0;color:#6b7b86;">Green Star Island Tour & Safari</p>
            </div>
        </div>
    </div>
</body>
</html>
