<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>New contact message</title>
</head>
<body style="margin:0;background:#f8f4ec;font-family:Arial,sans-serif;color:#0f3550;">
    <div style="max-width:680px;margin:0 auto;padding:28px 16px;">
        <div style="background:#ffffff;border:1px solid #e7ded0;border-radius:18px;overflow:hidden;">
            <div style="background:#0f4669;color:#ffffff;padding:22px 26px;">
                <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#d9a94f;font-weight:bold;">Green Star Island Tour & Safari</div>
                <h1 style="margin:8px 0 0;font-size:26px;line-height:1.25;">New contact message</h1>
            </div>
            <div style="padding:26px;">
                <table style="width:100%;border-collapse:collapse;">
                    @foreach([
                        'Name' => $inquiry->full_name,
                        'Email' => $inquiry->email,
                        'WhatsApp' => $inquiry->whatsapp_number,
                        'Subject' => $inquiry->subject,
                    ] as $label => $value)
                        @if($value)
                            <tr>
                                <td style="width:34%;padding:12px;border-bottom:1px solid #eee4d6;color:#6b7b86;">{{ $label }}</td>
                                <td style="padding:12px;border-bottom:1px solid #eee4d6;font-weight:bold;">{{ $value }}</td>
                            </tr>
                        @endif
                    @endforeach
                </table>
                <div style="margin-top:20px;background:#f8f4ec;border-radius:14px;padding:16px;">
                    <div style="font-size:12px;text-transform:uppercase;letter-spacing:1.5px;color:#6b7b86;font-weight:bold;margin-bottom:8px;">Message</div>
                    <div style="font-size:15px;line-height:1.7;">{{ $inquiry->message }}</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
