import { VercelRequest, VercelResponse } from '@vercel/node';
import { insertMessageSchema } from '../shared/schema';
import { storage } from '../server/storage';
import { createEmailService } from '../server/emailService';
import { telegramService } from '../server/telegramService';

const emailService = createEmailService();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  try {
    const validatedData = insertMessageSchema.parse(req.body);
    const message = await storage.createMessage(validatedData);
    let emailSent = false;
    if (emailService) {
      emailSent = await emailService.sendContactFormEmail({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        subject: validatedData.subject,
        message: validatedData.message
      });
    }
    let telegramSent = false;
    telegramSent = await telegramService.sendContactFormNotification({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      subject: validatedData.subject,
      message: validatedData.message
    });
    res.status(201).json({
      success: true,
      message: "Thank you for contacting us. We'll get back to you shortly.",
      id: message.id,
      emailSent,
      telegramSent
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ message: "Please check your form data and try again.", errors: error.errors });
    } else {
      res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
  }
} 