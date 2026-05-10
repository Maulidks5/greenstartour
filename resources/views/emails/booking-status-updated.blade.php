<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Booking {{ $details['statusTitle'] }}</title>
</head>
<body style="margin:0;background:#f8f4ec;font-family:Arial,sans-serif;color:#0f3550;">
    <div style="max-width:640px;margin:0 auto;padding:32px 18px;">
        <div style="background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e7ded0;">
            <div style="background:#0f4669;color:#ffffff;padding:24px 28px;">
                <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#d9a94f;font-weight:bold;">Green Star Island Tour & Safari</div>
                <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;">Booking {{ $details['statusTitle'] }}</h1>
            </div>
            <div style="padding:28px;">
                <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">Hello {{ $details['customerName'] }},</p>
                <p style="font-size:16px;line-height:1.7;margin:0 0 22px;">{{ $details['intro'] }}</p>

                <table style="width:100%;border-collapse:collapse;margin:0 0 22px;">
                    <tr>
                        <td style="padding:12px;border-bottom:1px solid #eee4d6;color:#6b7b86;">Service</td>
                        <td style="padding:12px;border-bottom:1px solid #eee4d6;font-weight:bold;">{{ $details['serviceName'] }}</td>
                    </tr>
                    @if($details['dateLine'])
                        <tr>
                            <td style="padding:12px;border-bottom:1px solid #eee4d6;color:#6b7b86;">Date</td>
                            <td style="padding:12px;border-bottom:1px solid #eee4d6;font-weight:bold;">{{ $details['dateLine'] }}</td>
                        </tr>
                    @endif
                    <tr>
                        <td style="padding:12px;border-bottom:1px solid #eee4d6;color:#6b7b86;">Status</td>
                        <td style="padding:12px;border-bottom:1px solid #eee4d6;font-weight:bold;">{{ $details['statusTitle'] }}</td>
                    </tr>
                    @if($details['total'])
                        <tr>
                            <td style="padding:12px;border-bottom:1px solid #eee4d6;color:#6b7b86;">Agreed price</td>
                            <td style="padding:12px;border-bottom:1px solid #eee4d6;font-weight:bold;color:#c98625;">{{ $details['total'] }}</td>
                        </tr>
                    @endif
                </table>

                @if($details['adminNote'])
                    <div style="background:#f8f4ec;border-radius:14px;padding:16px;margin-bottom:22px;">
                        <div style="font-size:12px;text-transform:uppercase;letter-spacing:1.5px;color:#6b7b86;font-weight:bold;margin-bottom:6px;">Note from our team</div>
                        <div style="font-size:15px;line-height:1.7;">{{ $details['adminNote'] }}</div>
                    </div>
                @endif

                <p style="font-size:15px;line-height:1.7;margin:0;">For quick help, reply to us on WhatsApp. We are happy to assist with pickup time, hotel details, and trip planning.</p>
            </div>
        </div>
    </div>
</body>
</html>
