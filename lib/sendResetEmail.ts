import * as Brevo from "@getbrevo/brevo";

const sendResetEmail = async (
  email: string,
  token: string,
  username: string
) => {
  const brevo = new Brevo.TransactionalEmailsApi();
  brevo.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY as string
  );

  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;

  sendSmtpEmail.subject = "Password Reset Request";
  sendSmtpEmail.htmlContent = `
   <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              text-align: center;
            }
            h1 {
              color: #333333;
            }
            p {
              font-size: 16px;
              color: #555555;
              line-height: 1.5;
            }
            .button {
              display: inline-block;
              padding: 12px 20px;
              margin-top: 20px;
              font-size: 16px;
              color: #ffffff;
              background: #4caf50;
              text-decoration: none;
              border-radius: 5px;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
              color: #888888;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <h1>Reset Your Password</h1>
            <p>Hi ${username},</p>
            <p>We received a request to reset your password. Click the button below to proceed:</p>
            <a href="${resetUrl}" class="button">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
            <div class="footer">
              <p>Story Flow &copy; 2025. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
  `;

  sendSmtpEmail.sender = {
    name: "Story Flow",
    email: "martinchijindu80@gmail.com",
  };
  sendSmtpEmail.to = [{ email }];

  try {
    await brevo.sendTransacEmail(sendSmtpEmail);
    console.log("Reset email sent successfully to", email);
  } catch (error) {
    console.error("Error sending reset email:", error);
    throw new Error("Failed to send reset email");
  }
};

export default sendResetEmail;
