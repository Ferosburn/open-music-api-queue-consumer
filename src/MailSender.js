const nodemailer = require("nodemailer");

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: "OpenMusic",
      to: targetEmail,
      subject: "Ekspor Lagu Playlist",
      text: "Hasil ekspor lagu playlist terlampir",
      attachments: [
        {
          filename: "playlist.json",
          content,
        },
      ],
    };
    return this.transporter.sendMail(message);
  }
}

module.exports = MailSender;
