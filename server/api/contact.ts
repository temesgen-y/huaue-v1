import { Router } from "express";
import { insertMessageSchema } from "../../shared/schema";
import { storage } from "../storage";
import { telegramService } from "../telegramService";
import { sendSecureOtpEmail } from "../emailService";
import { sendGridService } from "../sendgridService";

const router = Router();

// Contact form submission
router.post("/", async (req, res) => {
  try {
    console.log("Contact form submission received:", req.body);
    
    const validatedData = insertMessageSchema.parse(req.body);
    console.log("Validation successful:", validatedData);
    
    // Store message in database
    const message = await storage.createMessage(validatedData);
    console.log("Message stored in database with ID:", message.id);
    
    // Send email notification (non-blocking)
    let emailSent = false;
    if (validatedData.email) {
      try {
        emailSent = await sendSecureOtpEmail(validatedData.email, "Contact form submitted");
        console.log("Email service result:", emailSent);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    }
    
    // Send Telegram notification (non-blocking)
    let telegramSent = false;
    try {
      telegramSent = await telegramService.sendContactFormNotification({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        subject: validatedData.subject,
        message: validatedData.message
      });
      console.log("Telegram service result:", telegramSent);
    } catch (telegramError) {
      console.error("Telegram notification failed:", telegramError);
    }
    
    const successResponse = { 
      success: true,
      message: "Thank you for contacting us. We'll get back to you shortly.",
      id: message.id,
      emailSent: emailSent,
      telegramSent: telegramSent
    };
    
    console.log("Sending success response:", successResponse);
    res.status(201).json(successResponse);
  } catch (error: any) {
    console.error("Contact form submission error:", error.message || error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        success: false,
        message: "Please check your form data and try again.", 
        errors: error.errors 
      });
    }
    res.status(500).json({ 
      success: false,
      message: "Something went wrong. Please try again later." 
    });
  }
});

export default router;