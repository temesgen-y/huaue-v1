interface TelegramConfig {
  botToken: string;
  chatId: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

class TelegramService {
  private config: TelegramConfig | null = null;

  constructor() {
    this.initialize();
  }

  private initialize() {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      this.config = {
        botToken,
        chatId
      };
      console.log("Telegram service initialized successfully");
    } else {
      console.log("Telegram configuration not found - service disabled");
    }
  }

  async sendContactFormNotification(contactData: ContactFormData): Promise<boolean> {
    if (!this.config) {
      console.log("Telegram service not configured");
      return false;
    }

    try {
      const message = `
📩 *New Contact Message*
👤 *Name:* ${contactData.name}
📧 *Email:* ${contactData.email}
📞 *Phone:* ${contactData.phone}
📝 *Subject:* ${contactData.subject}
💬 *Message:* ${contactData.message}

---
_From HUAYUE PLASTICS INDUSTRY Website_
      `.trim();

      const response = await fetch(`https://api.telegram.org/bot${this.config.botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.config.chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Telegram API error:', errorData);
        return false;
      }

      console.log('Telegram notification sent successfully');
      return true;
    } catch (error) {
      console.error('Telegram service error:', error);
      return false;
    }
  }

  isConfigured(): boolean {
    return this.config !== null;
  }
}

export const telegramService = new TelegramService();