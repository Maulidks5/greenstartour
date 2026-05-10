<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>New {{ $details['typeLabel'] }} request</title>
</head>
<body style="margin:0;background:#f8f4ec;font-family:Arial,sans-serif;color:#0f3550;">
    <div style="max-width:680px;margin:0 auto;padding:28px 16px;">
        <div style="background:#ffffff;border:1px solid #e7ded0;border-radius:18px;overflow:hidden;">
            <div style="background:#0f4669;color:#ffffff;padding:22px 26px;">
                <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#d9a94f;font-weight:bold;">Green Star Island Tour & Safari</div>
                <h1 style="margin:8px 0 0;font-size:26px;line-height:1.25;">New {{ ucwords($details['typeLabel']) }}</h1>
                <p style="margin:10px 0 0;color:#dcebf3;font-size:14px;line-height:1.6;">{{ $details['customerName'] }} needs help with {{ $details['serviceName'] }}.</p>
            </div>
            <div style="padding:26px;">
                <div style="background:#eaf6ef;border-left:4px solid #2f8f5b;border-radius:12px;padding:14px 16px;margin-bottom:20px;">
                    <div style="font-size:12px;text-transform:uppercase;letter-spacing:1.5px;color:#2f6f49;font-weight:bold;margin-bottom:5px;">Next action</div>
                    <div style="font-size:15px;line-height:1.6;">Reply to the customer by email or WhatsApp, confirm availability, final price, and pickup details.</div>
                </div>

                <h2 style="margin:0 0 10px;font-size:18px;color:#0f3550;">Customer Details</h2>
                <table style="width:100%;border-collapse:collapse;">
                    @foreach([
                        'Customer' => $details['customerName'],
                        'Email' => $details['email'],
                        'WhatsApp' => $details['whatsapp'],
                        'Submitted' => $details['submittedAt'],
                    ] as $label => $value)
                        @if($value)
                            <tr>
                                <td style="width:34%;padding:11px 12px;border-bottom:1px solid #eee4d6;color:#6b7b86;">{{ $label }}</td>
                                <td style="padding:11px 12px;border-bottom:1px solid #eee4d6;font-weight:bold;">{{ $value }}</td>
                            </tr>
                        @endif
                    @endforeach
                </table>

                <h2 style="margin:22px 0 10px;font-size:18px;color:#0f3550;">Request Details</h2>
                <table style="width:100%;border-collapse:collapse;">
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
                                <td style="width:34%;padding:11px 12px;border-bottom:1px solid #eee4d6;color:#6b7b86;">{{ $label }}</td>
                                <td style="padding:11px 12px;border-bottom:1px solid #eee4d6;font-weight:bold;">{{ $value }}</td>
                            </tr>
                        @endif
                    @endforeach
                </table>

                @if($details['message'])
                    <div style="margin-top:22px;background:#f8f4ec;border-radius:14px;padding:16px;">
                        <div style="font-size:12px;text-transform:uppercase;letter-spacing:1.5px;color:#6b7b86;font-weight:bold;margin-bottom:8px;">Message</div>
                        <div style="font-size:15px;line-height:1.7;">{{ $details['message'] }}</div>
                    </div>
                @endif

                <p style="font-size:13px;line-height:1.6;margin:20px 0 0;color:#6b7b86;">This request was sent from the Green Star website booking form.</p>
            </div>
        </div>
    </div>
</body>
</html>
