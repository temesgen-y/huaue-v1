# cPanel Email Configuration for HUAYUE PLASTICS INDUSTRY

## Email Server Setup

Your website's email server is now configured to work with cPanel email accounts.

### Default Configuration
- **SMTP Host**: mail.huayueplasticsindustry.com
- **SMTP Port**: 587 (STARTTLS) or 465 (SSL)
- **Email Address**: admin@huayueplasticsindustry.com
- **Security**: TLS enabled with self-signed certificate support

### Required Environment Variables

To enable OTP email delivery, you need to set these environment variables:

```
SMTP_HOST=mail.huayueplasticsindustry.com
SMTP_PORT=587
SMTP_USER=admin@huayueplasticsindustry.com
SMTP_PASSWORD=your-email-password
ADMIN_EMAIL=admin@huayueplasticsindustry.com
```

### cPanel Email Account Setup

1. **Create Email Account**:
   - Go to cPanel → Email Accounts
   - Create: admin@huayueplasticsindustry.com
   - Set a strong password

2. **SMTP Settings**:
   - **Incoming Server**: mail.huayueplasticsindustry.com
   - **Outgoing Server**: mail.huayueplasticsindustry.com
   - **Port**: 587 (TLS) or 465 (SSL)
   - **Authentication**: Required

3. **Test Email**:
   - Send a test email to verify the account works
   - Check spam/junk folders

### Alternative cPanel SMTP Configurations

**Option 1: Port 587 (STARTTLS)**
```
SMTP_HOST=mail.huayueplasticsindustry.com
SMTP_PORT=587
SMTP_USER=admin@huayueplasticsindustry.com
SMTP_PASSWORD=your-password
```

**Option 2: Port 465 (SSL)**
```
SMTP_HOST=mail.huayueplasticsindustry.com
SMTP_PORT=465
SMTP_USER=admin@huayueplasticsindustry.com
SMTP_PASSWORD=your-password
```

**Option 3: Alternative Host Format**
```
SMTP_HOST=server.huayueplasticsindustry.com
SMTP_PORT=587
SMTP_USER=admin@huayueplasticsindustry.com
SMTP_PASSWORD=your-password
```

### Testing OTP Email

Once configured, test with:
```bash
curl -X POST http://localhost:5000/api/admin/request-reset \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@huayueplasticsindustry.com"}'
```

The system will:
1. Generate a 6-digit OTP code
2. Send it to admin@huayueplasticsindustry.com
3. OTP expires in 15 minutes
4. Use the code to reset admin password

### Security Features
- ✅ Professional HTML email template
- ✅ 15-minute OTP expiry
- ✅ Secure password reset workflow
- ✅ No OTP exposure in client responses
- ✅ Automatic cleanup after successful reset