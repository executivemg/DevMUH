const confirmationEmail = (name, ticket, quantity, total, qrcode, orderId) => (
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            h2 {
                font-size: 24px;
                margin-bottom: 20px;
            }
            p {
                margin-bottom: 10px;
            }
            strong {
                font-weight: bold;
            }
            img {
                max-width: 200px;
                height: auto;
                display: block;
                margin: 10px 0;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Order Confirmation</h2>
            
            <p><strong>Dear ${name},</strong></p>
            
            <p>We are delighted to confirm that your recent order has been successfully processed.</p>
            
            <p><strong>Order Details:</strong></p>
            <p><strong>Ticket:</strong> ${ticket}</p>
            <p><strong>Quantity:</strong> ${quantity}</p>
            
            <p><strong>Subtotal:</strong> $${total}</p>
            
            <p><strong>Invoice QR Code:</strong></p>
            <img src="${qrcode}" alt="QR Code">
            
            <p><strong>Order ID:</strong> ${orderId}</p>
            
            <p>Thank you for choosing us! Your support is greatly appreciated.</p>
            <p>If you have any questions or require further assistance, feel free to reach out to our customer support team.</p>
            
            <div class="footer">
                <p>Best Regards,</p>
                <p>The Event Rush Team</p>
            </div>
        </div>
    </body>
    </html>`
);

export default confirmationEmail;
