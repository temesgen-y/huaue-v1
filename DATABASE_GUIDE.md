# HUAYUE PLASTICS INDUSTRY - Database Query Guide

## Overview
This guide provides comprehensive database queries for your HUAYUE PLASTICS INDUSTRY website. The queries are organized by functionality and include examples for common operations.

## Database Schema Summary

### Tables:
- **messages** - Contact form submissions
- **admins** - Admin user accounts
- **products** - Product catalog (HUAYUE & EIDER)
- **news** - News articles and announcements
- **users** - General user accounts (if needed)

## How to Use These Queries

### 1. Using pgAdmin or Database Client
```sql
-- Connect to your PostgreSQL database
-- Copy and paste queries from database_queries.sql
-- Modify parameters as needed
```

### 2. Using the Application's Database Connection
```javascript
// In your Node.js application
import { db } from './server/db';
import { messages, products, news } from './shared/schema';

// Example: Get recent messages
const recentMessages = await db
  .select()
  .from(messages)
  .orderBy(desc(messages.submittedAt))
  .limit(10);
```

### 3. Using SQL Tool in Terminal
```bash
# Connect to database
psql $DATABASE_URL

# Run queries
\i database_queries.sql
```

## Most Common Queries for Your Website

### Contact Messages Management
```sql
-- Get paginated messages for admin panel
SELECT * FROM messages 
ORDER BY submitted_at DESC 
LIMIT 10 OFFSET 0;

-- Mark message as read
UPDATE messages SET is_read = true WHERE id = 1;

-- Delete message
DELETE FROM messages WHERE id = 1;

-- Get unread count
SELECT COUNT(*) FROM messages WHERE is_read = false;
```

### Product Management
```sql
-- Get HUAYUE products
SELECT * FROM products 
WHERE category = 'HUAYUE' AND is_active = true;

-- Get EIDER products  
SELECT * FROM products 
WHERE category = 'EIDER' AND is_active = true;

-- Add new product
INSERT INTO products (name, description, category, image_url) 
VALUES ('New Pipe', 'Description', 'HUAYUE', '/images/pipe.jpg');
```

### News Management
```sql
-- Get recent news
SELECT * FROM news 
ORDER BY publish_date DESC 
LIMIT 10;

-- Add news article
INSERT INTO news (title, content, author) 
VALUES ('New Title', 'Article content', 'Admin');
```

### Analytics Queries
```sql
-- Website statistics
SELECT 
    (SELECT COUNT(*) FROM messages) as total_messages,
    (SELECT COUNT(*) FROM messages WHERE is_read = false) as unread_messages,
    (SELECT COUNT(*) FROM products WHERE is_active = true) as active_products,
    (SELECT COUNT(*) FROM news) as total_news;

-- Monthly message trends
SELECT 
    TO_CHAR(submitted_at, 'YYYY-MM') as month,
    COUNT(*) as message_count
FROM messages 
WHERE submitted_at >= NOW() - INTERVAL '12 months'
GROUP BY TO_CHAR(submitted_at, 'YYYY-MM')
ORDER BY month DESC;
```

## Query Categories in database_queries.sql

### 1. Contact Messages (Queries 1-8)
- Pagination and filtering
- Read/unread management
- Statistics and analytics
- Search functionality

### 2. Admin Users (Queries 9-13)
- Authentication
- Password management
- OTP handling

### 3. Products (Queries 14-20)
- Category filtering (HUAYUE/EIDER)
- Active/inactive products
- Search and specifications

### 4. News (Queries 21-26)
- Publishing and dates
- Content search
- Pagination

### 5. Analytics (Queries 27-30)
- Activity summaries
- Trends and statistics
- Reporting

### 6. Maintenance (Queries 31-33)
- Data cleanup
- Performance monitoring
- Database statistics

### 7. Security & Performance (Queries 34-40)
- Data export
- Suspicious activity detection
- Index optimization
- Useful views

## Performance Tips

1. **Use Indexes**: Run the index creation queries (Query 38) for better performance
2. **Limit Results**: Always use LIMIT for large datasets
3. **Filter Early**: Use WHERE clauses to reduce data processing
4. **Use Views**: Create views for frequently used complex queries

## Security Considerations

1. **Parameterized Queries**: Always use parameterized queries in your application
2. **Input Validation**: Validate all inputs before database queries
3. **Rate Limiting**: Monitor and limit database access
4. **Regular Backups**: Use export queries for data backup

## Common Use Cases

### Admin Dashboard
```sql
-- Dashboard statistics
SELECT 
    COUNT(*) as total_messages,
    COUNT(CASE WHEN is_read = false THEN 1 END) as unread_messages
FROM messages;
```

### Product Catalog
```sql
-- Product listing with pagination
SELECT * FROM products 
WHERE is_active = true 
ORDER BY name ASC 
LIMIT 20 OFFSET 0;
```

### Contact Management
```sql
-- Recent unread messages
SELECT name, email, subject, submitted_at 
FROM messages 
WHERE is_read = false 
ORDER BY submitted_at DESC;
```

## Troubleshooting

### Common Issues:
1. **Permission Errors**: Ensure database user has proper permissions
2. **Connection Issues**: Check DATABASE_URL environment variable
3. **Query Timeouts**: Add indexes and optimize queries
4. **Data Types**: Ensure correct data types in INSERT statements

### Debug Queries:
```sql
-- Check table structure
\d messages
\d products
\d news

-- Check current data
SELECT COUNT(*) FROM messages;
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM news;
```

## Integration with Your Application

The queries in `database_queries.sql` complement your existing Drizzle ORM setup. You can:

1. Use raw SQL for complex analytics
2. Use Drizzle ORM for standard CRUD operations
3. Combine both approaches as needed

Your application already implements many of these queries through the Drizzle ORM in `server/storage.ts`.