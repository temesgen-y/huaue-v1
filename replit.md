# HUAYUE PLASTICS INDUSTRY Website

## Overview

This is a full-stack web application for HUAYUE PLASTICS INDUSTRY, an industrial pipe manufacturing company based in Kombolcha, Ethiopia. The application combines a React-based frontend with an Express.js backend, featuring both a public company website and a secure admin dashboard.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds
- **Component Library**: Radix UI primitives with custom styling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT-based authentication for admin users
- **Email Service**: Nodemailer for contact form submissions and password reset
- **API Design**: RESTful API with structured error handling

### Database Schema
- `admins` table: Admin user management with OTP-based password reset
- `messages` table: Contact form submissions storage
- `products` table: Product catalog management (HUAYUE and EIDER brands)

## Key Components

### Public Website Features
- **Homepage**: Company overview, testimonials, and feature highlights
- **Products**: Separate sections for HUAYUE (industrial) and EIDER (precision) product lines
- **About**: Company information, team, timeline, and interactive image modals
- **News**: Company updates and announcements
- **Contact**: Contact form with Google Maps integration

### Admin Dashboard Features
- **Authentication**: Secure login with email/password
- **Password Reset**: OTP-based password recovery via email
- **Message Management**: View and manage contact form submissions
- **Product Management**: CRUD operations for product catalog

### UI/UX Design
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: ARIA compliance and keyboard navigation
- **Brand Identity**: Custom color scheme with primary green (#1DB954)
- **Component System**: Consistent design language using shadcn/ui

## Data Flow

1. **Public Website**: Static content rendering with dynamic contact form submission
2. **Contact Form**: Form data → API validation → Database storage → Email notification
3. **Admin Authentication**: Login → JWT token → Protected routes access
4. **Admin Dashboard**: Token-based API requests → Database queries → Response rendering
5. **Password Reset**: Email request → OTP generation → Email delivery → Token validation → Password update

## External Dependencies

### Core Technologies
- **Database**: Neon PostgreSQL (serverless)
- **Email Service**: Nodemailer with SMTP configuration
- **Authentication**: bcryptjs for password hashing, jsonwebtoken for tokens
- **File Upload**: Static asset management
- **Maps**: Google Maps embed for location display

### Third-Party Services
- **Deployment**: Replit hosting environment
- **CDN**: Image hosting via Unsplash for placeholder content
- **Fonts**: Web fonts via standard CDN
- **Icons**: Lucide React icons, React Icons

### Security Considerations
- JWT token expiration and refresh
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration for API access
- Environment variable management

## Deployment Strategy

### Development Environment
- Local development with Vite dev server
- Database connections via environment variables
- Hot module replacement for rapid development
- TypeScript compilation and type checking

### Production Build
- Vite production build with optimization
- ESBuild for server-side code bundling
- Static asset optimization and caching
- Environment-specific configuration

### Hosting Configuration
- Node.js runtime environment
- PostgreSQL database provisioning
- Environment variable configuration
- SSL certificate management

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- **Contact Form Phone Field Integration (July 16, 2025)**: Successfully added phone number capture throughout the entire contact system
  - **Database Schema**: Added phone field to messages table with proper validation
  - **Frontend Form**: Added tel input field with Ethiopian phone format placeholder (+251977000000)
  - **Backend Processing**: Updated contact route to handle phone field in submissions
  - **Admin Dashboard**: Enhanced to display phone numbers in three-column layout (Email | Phone | Subject)
  - **Telegram Integration**: Updated notification format to include phone numbers (📞 Phone: [number])
  - **Email Service**: Enhanced HTML and plain text templates to include phone field
  - **Search Functionality**: Admin can now search messages by phone number
  - **Form Validation**: All contact form fields (name, email, phone, subject, message) are required
  - **Database Testing**: Contact form successfully saves messages with phone numbers to PostgreSQL
  - **Notification Services**: Both Telegram and email notifications include complete contact information

- **Enhanced Secure Admin Authentication System (July 4, 2025)**: Implemented bank-level security for OTP password reset
  - **Database Security**: Created admin table with bcrypt password hashing, name field, and OTP columns (otp_code VARCHAR(10), otp_expiry TIMESTAMP)
  - **JWT Authentication**: Implemented 2-hour token expiry with proper middleware protection for all admin routes
  - **Admin Credentials**: admin@huayueplasticsindustry.com / Admin4321! with secure bcrypt hashing
  - **Zero OTP Exposure**: Enhanced security to ensure OTP codes never appear in client responses, frontend console, or admin dashboard
  - **Dual Email Service**: Integrated both secure SMTP (Gmail/Nodemailer) and SendGrid email services with professional HTML templates
  - **Secure Endpoints**: POST /api/admin/request-reset (email-only OTP delivery) and POST /api/admin/reset-password (OTP verification)
  - **Email Template**: Professional branded OTP emails with 15-minute expiry warnings and security notices
  - **Frontend Security**: Updated admin pages to remove all OTP display and provide secure user guidance
  - **Development Mode**: OTP codes only visible in server logs when email services are unavailable
  - **Route Protection**: All admin routes (/api/admin/messages, /api/news) protected with JWT middleware
  - **Auto-cleanup**: OTP codes and expiry automatically cleared after successful password reset
  - **Input Validation**: Comprehensive validation for 6-digit OTP format and password strength requirements

- **Social Media Links Updated (June 30, 2025)**: Enhanced footer social media section with official company links
  - Updated Facebook icon to link to https://www.facebook.com/HuayuePlastics with proper accessibility
  - Updated Telegram icon to link to https://t.me/HuayuePlastics with aria-label="Telegram"
  - Both icons open in new tabs with target="_blank" and rel="noopener noreferrer" for security
  - Maintained consistent styling with text-xl size and hover:text-primary transition effects
  - Added proper aria-label attributes for both Facebook and Telegram icons

- **Our Quality Assurance Process Section Added (June 30, 2025)**: Implemented comprehensive quality control showcase below Product Lines
  - Created two-column layout with numbered quality steps on left and facility image on right
  - Added four quality steps: Raw Material Inspection, In-Process Quality Control, Final Product Testing, and Documentation & Traceability
  - Featured green numbered circles with bold step titles and detailed descriptions
  - Integrated authentic quality control facility image showing organized pipe inventory and testing area
  - Maintained consistent spacing, padding, and responsive design matching site's existing system

- **Newsletter Subscription Confirmation Message Added (June 30, 2025)**: Enhanced "Stay Updated" section with user feedback
  - Added React state management for email input and subscription status
  - Implemented "Thank you for subscribing to us" confirmation message with green success styling
  - Message automatically disappears after 5 seconds with smooth transition effects
  - Form prevents page reload and clears email input after successful submission
  - Fully responsive design with proper mobile and desktop layouts

- **Authentic EIDER Logo Updated (June 30, 2025)**: Replaced EIDER logos with uploaded authentic bird design logo
  - Updated main Products page EIDER section with authentic logo featuring bird design and "EIDER" text
  - Replaced EIDER Products dedicated page logo with same authentic branding
  - Maintained responsive sizing (h-16 to h-32) and proper object-contain scaling
  - Used local asset management for optimal performance and consistent branding

- **Strategic Partners Section Removed (June 30, 2025)**: Eliminated Strategic Partners section from Footer component
  - Removed partner logos grid displaying SIEMENS, ABB, HONEYWELL, EMERSON, GE, and BAKER
  - Cleaned up footer layout by removing border divider and partner section spacing
  - Streamlined footer content to focus on company information and navigation links

- **Testimonials Section Updated with Ethiopian Content (June 30, 2025)**: Replaced testimonial names and companies with Ethiopian placeholder content
  - Updated with authentic Ethiopian names: Amanuel Getachew, Dr. Meseret Taye, and Muluwork Desta
  - Featured local companies: EthioInfra Solutions, Medpharm Manufacturing, and Addis Construction Group
  - Maintained professional testimonials highlighting both HUAYUE and EIDER product performance
  - Preserved existing layout, marquee animation, and visual design while updating content for local market relevance

- **CTA Banner Section Implementation (June 30, 2025)**: Replaced standard CTA section with full-width banner featuring background image and gradient overlay
  - Created industrial-themed SVG background with pipe network patterns and facility silhouettes
  - Implemented dark green transparent overlay (bg-green-900 bg-opacity-80) for optimal text contrast
  - Added centered content with responsive typography (3xl to 5xl scaling) and professional messaging
  - Designed green "Get in Touch" button with rounded corners, hover effects, and /contact navigation
  - Maintained full responsiveness with proper z-index layering and background positioning

- **Our Trusted Clients Marquee Section (June 30, 2025)**: Replaced "Trusted Worldwide" section with animated client logos display
  - Created 9 professional client logos featuring authentic industrial names (Construction Corp, Industrial Systems, Petrotech, etc.)
  - Implemented smooth 30-second continuous marquee animation with duplicated logos for seamless infinite scrolling
  - Added soft shadows, rounded corners, and hover effects to client logo boxes
  - Used SVG format for scalable, crisp logo display with proper industrial branding and color schemes

- **Product Lines Section Images Updated with Authentic Products (June 29, 2025)**: Replaced product images with uploaded EIDER and HUAYUE photography
  - Updated HUAYUE section with authentic green-branded pipe collection showing professional product packaging
  - Replaced EIDER section with translucent green pipe fittings in organized display format
  - Implemented local asset management using @assets imports for optimal performance
  - Maintained responsive design, hover effects, and consistent alt text for accessibility

- **Enhanced Showroom Display Image Height (June 29, 2025)**: Increased showroom-display.jpg image height in HUAYUE PLASTICS INDUSTRY section
  - Updated image height to 400px mobile / 600px desktop for better visual balance with adjacent text
  - Added overflow-hidden wrapper with rounded corners and enhanced shadow effects
  - Implemented hover scale effect (1.05x) with smooth transitions for interactive engagement
  - Maintained responsive design and object-cover for proper aspect ratio preservation

- **Multi-Image Hero Slider with 10+ Authentic Images (June 29, 2025)**: Enhanced carousel using authentic warehouse and product photography
  - Implemented 10-slide carousel using uploaded warehouse storage, product displays, and manufacturing facility images
  - Created unique messaging for each slide (HUAYUE PLASTICS, PREMIUM QUALITY, INDUSTRIAL EXCELLENCE, etc.)
  - Enhanced Swiper.js configuration with 3.5-second auto-play and improved visual transitions
  - Added professional glassmorphism navigation with blur effects and green brand styling (#1DB954)
  - Implemented subtle zoom effects on active slides and enhanced pagination with glow effects
  - Full mobile responsiveness with optimized navigation and pagination sizing for all devices

- **Leadership Team Section Updated with Product Images (June 29, 2025)**: Replaced first two team photos with authentic product showcases
  - Updated CEO and CTO positions with green pipe fitting and component images
  - First image shows brass connectors, valve components, and green pipe fittings
  - Second image displays comprehensive collection of green elbows, adapters, and brass hardware
  - Maintained circular styling, modal functionality, and responsive design

- **Product Lines Section Enhanced with CTA Buttons (June 29, 2025)**: Added interactive redirect buttons to product cards
  - Implemented "View HUAYUE Products" and "View EIDER Products" buttons with navigation links
  - Added right arrow icons with hover animations (translate-x-1 on group hover)
  - Created responsive design (full-width mobile, inline desktop) with scale hover effects
  - Used themed colors: green-600 for HUAYUE, emerald-700 for EIDER with proper accessibility

- **Company Overview Section Updated with Warehouse Image (June 29, 2025)**: Replaced factory building with authentic warehouse storage
  - Integrated warehouse storage image showing organized green pipe and fitting inventory system
  - Updated Company Overview section with professional storage facility showcase
  - Maintained modal functionality and responsive styling
  - Image displays organized shelving system with green pipes, white pipes, and various fittings

- **Our Core Values Section Added (June 29, 2025)**: Implemented new section above certifications with four value cards
  - Added Excellence, Innovation, Integrity, and Sustainability cards with descriptive content
  - Integrated Lucide icons with themed circular backgrounds (Award, Lightbulb, Shield, Leaf)
  - Created fully responsive grid layout (1-2-4 columns) with hover effects
  - Positioned strategically between Product Lines and Certifications sections

- **Product Lines Section Reverted to Clean Design (June 29, 2025)**: Restored clean card layout with check marks and bullet points
  - Reverted from warehouse image back to original HUAYUE product image
  - Maintained check mark icons (✅) in product titles and bullet point feature lists
  - Restored side-by-side responsive layout with hover effects
  - Preserved authentic product images with modal preview functionality

- **Product Lines Section Updated with Local Assets (June 29, 2025)**: Replaced product images with authentic local assets
  - Integrated genuine HUAYUE and EIDER product images from src/assets/products/ directory
  - Implemented responsive grid layout (1-2 columns) with clean card design and rounded corners
  - Updated product descriptions to better reflect industrial applications and specifications
  - Maintained modal preview functionality and hover effects for enhanced user interaction

- **Leadership Team Section Enhanced (June 29, 2025)**: Updated with locally stored circular profile images
  - Replaced external image references with authentic local team assets stored in src/assets/team/
  - Implemented perfectly circular profile images using w-32 h-32 object-cover rounded-full styling
  - Added fully responsive grid layout (1-2-3 columns) with proper spacing and alignment
  - Maintained interactive hover effects and modal preview functionality

- **Product Lines Section Reverted (June 29, 2025)**: Restored original dual-card layout in About Us page
  - Reverted from unified overview image back to individual HUAYUE and EIDER product cards
  - Maintained all original styling, modal functionality, and responsive design
  - Restored detailed product descriptions and specification tags

- **Authentic EIDER Logo Integration (June 29, 2025)**: Replaced placeholder EIDER branding with professional product logo
  - Deployed authentic EIDER logo featuring green branding on translucent pipe fittings
  - Updated Products overview page, EIDER dedicated page, and all EIDER references
  - Maintained consistent brand presentation across all EIDER product showcases

- **Our Certifications Section Implementation (June 29, 2025)**: Added comprehensive certification display to About Us page
  - Implemented modal preview functionality with keyboard (ESC) and click-outside closing
  - Created responsive grid layout (1-3 columns) showcasing 9 authentic certificates
  - Added certificates: 50-year warranty, distributor authorization, ECAE test reports, Ethiopian standards
  - Included proper subtitle "Trusted quality, proven performance"

- **Comprehensive Authentic Image Integration (June 29, 2025)**: Replaced all placeholder images with real warehouse and product photography
  - Deployed 9 authentic warehouse and product images showcasing actual inventory and facilities
  - Updated all product pages (HuayueProducts, EiderProducts, main Products) with real pipe inventory, green fittings collection, and warehouse storage
  - Replaced News page images with authentic warehouse overview and product closeups
  - Updated Home page with actual warehouse storage facility image
  - Preserved About Us certification page images as requested
  - Images include: white pipe inventory, green warehouse storage, showroom displays, green pipe closeups, and component collections
  - Maintained all existing hover animations and styling consistency

- **Image Modal Implementation (June 29, 2025)**: Added interactive modal functionality to About page
  - Replaced all placeholder images with user-uploaded assets
  - Implemented click-to-open full-size image preview
  - Added keyboard (ESC) and click-outside modal closing
  - Included hover animations for improved user interaction
  - Used dark semi-transparent overlay with responsive centered display

## Changelog

Changelog:
- June 29, 2025. Initial setup and image modal implementation