import nodemailer from "nodemailer";

export const sendMail = async (senderEmailId, Emailsubject, EmailBody) => {
  try {
    //! Mail Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
      },
    });

    //! Mail Info
    const info = await transporter.sendMail({
      from: "No reply @LibraryManagementApp",
      to: senderEmailId,
      subject: Emailsubject,
      text: EmailBody,
      // html: "" //TODO- pending
    });

    console.log(
      "MailTrap Send Email Successfully. Message id: ",
      info.messageId
    );
    return info;
    
  } catch (error) {
    console.log(
      `❌ Failed to execute sendMail function ERROR=> ${error.message}`
    );
    throw error;
  }
};
