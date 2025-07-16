# HUAYUE PLASTICS INDUSTRY Website

A comprehensive full-stack web application for HUAYUE PLASTICS INDUSTRY, an industrial pipe manufacturing company based in Kombolcha, Ethiopia.

## Project Structure (Vercel-Compatible)

```
/ (project root)
├── api/                    # Vercel serverless API functions
│   ├── admin/
│   │   ├── login.ts        # POST /api/admin/login
│   │   ├── messages.ts     # GET/DELETE /api/admin/messages
│   │   ├── request-reset.ts # POST /api/admin/request-reset
│   │   ├── reset-password.ts # POST /api/admin/reset-password
│   │   └── verify.ts       # GET /api/admin/verify
│   ├── contact.ts          # POST /api/contact
│   ├── products.ts         # GET /api/products
│   └── news.ts             # GET /api/news
├── dist/                   # Vite static build output
│   ├── index.html          # Main SPA entry point
│   ├── assets/
│   │   ├── main.js         # Bundled JavaScript
│   │   └── main.css        # Bundled CSS
│   └── favicon.ico         # Site favicon
├── server/                 # Shared server logic
│   ├── db.ts               # Database connection
│   ├── storage.ts          # Data access layer
│   ├── seed.ts             # Database seeding
│   ├── emailService.ts     # Email notifications
│   ├── telegramService.ts  # Telegram integration
│   └── sendgridService.ts  # SendGrid email service
├── client/                 # React application source
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   └── main.tsx        # React entry point
│   └── public/             # Static assets
├── shared/
│   └── schema.ts           # Database schema & validation
├── package.json
├── tsconfig.json
├── vercel.json             # Vercel deployment config
└── README.md
```

## Key Features

### Public Website
- **Homepage**: Company overview and testimonials
- **Products**: HUAYUE industrial & EIDER precision products
- **About**: Company information and certifications
- **News**: Company updates and announcements
- **Contact**: Contact form with Google Maps integration

### Admin Dashboard
- **Authentication**: JWT-based login system
- **Message Management**: View, search, and delete contact submissions
- **Product Management**: CRUD operations for product catalog
- **News Management**: Create and manage news articles
- **Password Reset**: OTP-based password recovery

### Integrations
- **Database**: PostgreSQL with Drizzle ORM
- **Email**: Nodemailer + SendGrid for notifications
- **Telegram**: Real-time contact form notifications
- **Authentication**: JWT tokens with 2-hour expiry

## API Endpoints (Vercel Serverless)

### Contact
- `POST /api/contact` - Submit contact form

### Admin Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/request-reset` - Request password reset
- `POST /api/admin/reset-password` - Reset password with OTP
- `GET /api/admin/verify` - Verify admin token

### Admin Management
- `GET /api/admin/messages` - Get contact messages (paginated)
- `DELETE /api/admin/messages?id=:id` - Delete message

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=:category` - Get products by category

### News
- `GET /api/news` - Get all news articles
- `GET /api/news?id=:id` - Get single news article
- `GET /api/news?query=:query` - Search news articles

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Wouter** for routing
- **TanStack Query** for state management
- **shadcn/ui** component library

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** with Drizzle ORM
- **JWT** for authentication
- **Zod** for validation

### Development
- **Vite** for development server
- **ESBuild** for production builds
- **Replit** for hosting

## Database Schema

### Tables
- `admins` - Admin user management
- `messages` - Contact form submissions
- `products` - Product catalog
- `news` - News articles

### Key Features
- Automatic seeding on startup
- Safe migration handling
- Comprehensive validation
- Audit trails with timestamps

## Setup & Development

### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://...

# Email Services
SENDGRID_API_KEY=...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASSWORD=...
ADMIN_EMAIL=admin@huayueplasticsindustry.com

# Telegram
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...

# Security
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run check

# Database operations
npm run db:push
```

### Database Seeding
The application automatically seeds the database with:
- Default admin user (admin@huayueplasticsindustry.com)
- Sample products (6 HUAYUE + 6 EIDER items)
- Sample news articles (5 items)
- Sample contact messages (5 items)

## Deployment

### Vercel Deployment Structure
```
/ (project root)
├── api/                    # Serverless API functions
├── dist/                   # Static build output (SPA)
├── package.json
├── vercel.json             # Deployment configuration
└── ...                     # Other project files
```

### Production Build
```bash
# For local development
npm run dev

# For production build
npm run build
```

### Vercel Configuration
The `vercel.json` file configures:
- Serverless functions for `/api/*` routes
- Static file serving for the React SPA
- Proper routing for single-page application
- Node.js 18.x runtime for API functions

### Deployment Process
1. Connect repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch
4. Access at `https://your-project.vercel.app`

## Security Features

- JWT authentication with 2-hour expiry
- Password hashing with bcrypt
- Input validation with Zod schemas
- CORS configuration
- Environment variable protection
- SQL injection prevention via ORM

## Contributing

1. Follow the existing code structure
2. Use TypeScript for all new code
3. Maintain consistent naming conventions
4. Add proper error handling
5. Update documentation for new features

## License

Private - HUAYUE PLASTICS INDUSTRY PLC