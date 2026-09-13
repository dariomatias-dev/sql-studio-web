import emailjs from "@emailjs/browser";

export interface EmailData {
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (data: EmailData): Promise<void> => {
  const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID as string;
  const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY as string;

  if (!serviceID || !templateID || !publicKey) {
    throw new Error("Missing EmailJS environment variables");
  }

  try {
    await emailjs.send(
      serviceID,
      templateID,
      {
        subject: data.subject,
        message: data.message,
        email: data.email,
      },
      publicKey,
    );
  } catch (error) {
    console.error("EmailJS Error:", error);
    throw error;
  }
};
