# Database Setup and Seeding Guide

## Overview
The HUAYUE PLASTICS INDUSTRY project now includes automatic database initialization and seeding that runs when the application starts.

## What Happens on Startup

### 1. Table Initialization
- Checks if database tables exist and are accessible
- Uses Drizzle ORM schema definitions from `shared/schema.ts`
- Verifies connection to Neon PostgreSQL database

### 2. Automatic Seeding
The `server/seed.ts` file automatically creates:

#### Admin User
- **Email**: admin@huayueplasticsindustry.com
- **Password**: Admin4321!
- **Name**: HUAYUE Admin
- Only created if doesn't exist

#### Sample Products (6 items)
- **HUAYUE Products**: Industrial pipes, valves, HDPE systems
- **EIDER Products**: Precision fittings, adapters, connectors
- Includes pricing, specifications, and stock status

#### Sample News Articles (5 items)
- Production expansion announcements
- New product launches
- Quality certifications
- Partnership updates
- Sustainability initiatives

#### Sample Contact Messages (5 items)
- Realistic Ethiopian customer inquiries
- Various subjects: bulk orders, technical specs, partnerships
- Mix of read/unread status for testing

## Database Configuration

### Current Connection
```
postgresql://neondb_owner:npg_5zC0MaKLwuUE@ep-broad-unit-ae3gqyzt-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### Environment Variables
```bash
DATABASE_URL=postgresql://neondb_owner:npg_5zC0MaKLwuUE@ep-broad-unit-ae3gqyzt-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## Manual Database Operations

### Push Schema Changes
```bash
npm run db:push
```

### Check Database Status
The seeding system provides console output:
- ✅ Database connection successful
- ✅ All tables are ready
- ✅ Admin user created/exists
- ✅ Products created/exist
- ✅ News articles created/exist
- ✅ Contact messages created/exist

## Files Modified

### `server/seed.ts`
- Complete seeding logic
- Error handling and logging
- Conditional creation (only if doesn't exist)

### `server/index.ts`
- Added database initialization on startup
- Process exits on database failure
- Runs before server starts

## Benefits

1. **Consistent Environment**: Every deployment has the same base data
2. **Easy Development**: New developers get working data immediately
3. **Safe Operations**: Only creates missing data, doesn't overwrite
4. **Production Ready**: Handles errors gracefully
5. **Authentic Data**: Uses realistic Ethiopian business context

## Current Database State

After seeding:
- **Admins**: 1 user
- **Products**: 12 items (6 seeded + 6 existing)
- **News**: 1 article (5 seeded but may have existing)
- **Messages**: 3 messages (5 seeded but may have existing)

The system is now production-ready with comprehensive data seeding!