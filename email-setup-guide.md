# Email Setup Guide for HUAYUE PLASTICS INDUSTRY

## Current Status
- ✅ OTP system is working (generates 6-digit codes)
- ❌ Email delivery is disabled (missing SMTP configuration)
- ❌ SendGrid is disabled (missing API key)

## Quick Solutions

### Option 1: Use Development Mode (Temporary)
The OTP codes are visible in the server logs. When you request a password reset, check the console logs for lines like:
```
Development mode - OTP for admin@huayueplasticsindustry.com: 394028
```

### Option 2: Set up Gmail SMTP (Recommended)
1. Go to your Gmail account settings
2. Enable 2-factor authentication
3. Generate an App Password (not your regular password)
4. Use these environment variables:
   - SMTP_HOST: smtp.gmail.com
   - SMTP_PORT: 587
   - SMTP_USER: your-email@gmail.com
   - SMTP_PASSWORD: your-app-password
   - ADMIN_EMAIL: admin@huayueplasticsindustry.com

### Option 3: Use SendGrid (Alternative)
1. Create a SendGrid account
2. Get your API key
3. Set SENDGRID_API_KEY environment variable

## Test Email Setup
Once configured, you can test with:
```bash
curl -X POST http://localhost:5000/api/admin/request-reset \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@huayueplasticsindustry.com"}'
```

## Current Admin Credentials
- Email: admin@huayueplasticsindustry.com
- Password: Admin4321!