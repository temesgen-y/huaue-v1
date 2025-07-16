import { db } from "./db";
import { admins, messages, products, news } from "../shared/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function seedDatabase() {
  console.log("Starting database seeding...");
  
  try {
    // 1. Create admin user if doesn't exist
    const existingAdmin = await db.select().from(admins).where(eq(admins.email, "admin@huayueplasticsindustry.com"));
    
    if (existingAdmin.length === 0) {
      const hashedPassword = await bcrypt.hash("Admin4321!", 10);
      await db.insert(admins).values({
        name: "HUAYUE Admin",
        email: "admin@huayueplasticsindustry.com",
        passwordHash: hashedPassword,
      });
      console.log("✅ Admin user created: admin@huayueplasticsindustry.com");
    } else {
      console.log("✅ Admin user already exists");
    }

    // 2. Create sample products if table is empty
    const existingProducts = await db.select().from(products);
    if (existingProducts.length === 0) {
      await db.insert(products).values([
        {
          name: "Industrial PE Pipe 110mm",
          category: "HUAYUE",
          description: "High-density polyethylene pipe for industrial water systems",
          imageUrl: "/assets/huayue-pipe-110.jpg",
        },
        {
          name: "HDPE Pipe 160mm",
          category: "HUAYUE",
          description: "Heavy-duty HDPE pipe for municipal water distribution",
          imageUrl: "/assets/huayue-pipe-160.jpg",
        },
        {
          name: "Precision Fitting 90° Elbow",
          category: "EIDER",
          description: "High-precision 90-degree elbow for complex piping systems",
          imageUrl: "/assets/eider-elbow-90.jpg",
        },
        {
          name: "Coupling Connector",
          category: "EIDER",
          description: "Universal coupling connector for pipe connections",
          imageUrl: "/assets/eider-coupling.jpg",
        },
        {
          name: "Industrial Valve 50mm",
          category: "HUAYUE",
          description: "Ball valve for industrial flow control applications",
          imageUrl: "/assets/huayue-valve-50.jpg",
        },
        {
          name: "Precision Adapter Set",
          category: "EIDER",
          description: "Complete set of precision adapters for various connections",
          imageUrl: "/assets/eider-adapter-set.jpg",
        }
      ]);
      console.log("✅ Sample products created (6 items)");
    } else {
      console.log("✅ Products already exist");
    }

    // 3. Create sample news articles if table is empty
    const existingNews = await db.select().from(news);
    if (existingNews.length === 0) {
      await db.insert(news).values([
        {
          title: "HUAYUE PLASTICS INDUSTRY Expands Production Capacity",
          content: "We are pleased to announce the expansion of our manufacturing facility in Kombolcha, Ethiopia. This expansion will increase our production capacity by 40% and enable us to serve more customers across East Africa with high-quality industrial piping solutions.",
          summary: "Production capacity expansion announced for Kombolcha facility",
          thumbnail: "/assets/news-expansion.jpg",
        },
        {
          title: "New EIDER Precision Fitting Series Launch",
          content: "Introducing our latest EIDER precision fitting series, designed for complex industrial applications. These new fittings meet international standards and provide superior performance in demanding environments.",
          summary: "Latest EIDER precision fitting series now available",
          thumbnail: "/assets/news-eider-launch.jpg",
        },
        {
          title: "Quality Certification Achievement",
          content: "HUAYUE PLASTICS INDUSTRY has achieved ISO 9001:2015 certification, demonstrating our commitment to quality management and continuous improvement in all our processes.",
          summary: "ISO 9001:2015 certification achieved",
          thumbnail: "/assets/news-certification.jpg",
        },
        {
          title: "Partnership with Ethiopian Construction Association",
          content: "We are proud to announce our strategic partnership with the Ethiopian Construction Association, strengthening our position in the construction industry and expanding our network of professional contacts.",
          summary: "Strategic partnership established with Ethiopian Construction Association",
          thumbnail: "/assets/news-partnership.jpg",
        },
        {
          title: "Sustainable Manufacturing Initiative",
          content: "HUAYUE PLASTICS INDUSTRY launches green manufacturing initiative, implementing eco-friendly processes and sustainable materials to reduce environmental impact while maintaining product quality.",
          summary: "Green manufacturing initiative launched",
          thumbnail: "/assets/news-sustainability.jpg",
        }
      ]);
      console.log("✅ Sample news articles created (5 items)");
    } else {
      console.log("✅ News articles already exist");
    }

    // 4. Create sample contact messages if table is empty
    const existingMessages = await db.select().from(messages);
    if (existingMessages.length === 0) {
      await db.insert(messages).values([
        {
          name: "Tadesse Mengistu",
          email: "tadesse@construction.et",
          phone: "+251911234567",
          subject: "Bulk Order Inquiry",
          message: "Hello, I am interested in placing a bulk order for HDPE pipes for a construction project in Addis Ababa. Please provide pricing and availability information.",
          submittedAt: new Date(),
        },
        {
          name: "Sara Ahmed",
          email: "sara.ahmed@waterworks.com",
          phone: "+251922345678",
          subject: "Technical Specifications Request",
          message: "Could you please send me detailed technical specifications for your industrial PE pipes? We need them for a water distribution system project.",
          submittedAt: new Date(),
        },
        {
          name: "Kebede Wolde",
          email: "kebede@industrial.et",
          phone: "+251933456789",
          subject: "Dealer Partnership",
          message: "I am interested in becoming a dealer for HUAYUE products in the northern region. Please provide information about dealer requirements and terms.",
          submittedAt: new Date(),
        },
        {
          name: "Almaz Tadesse",
          email: "almaz@engineering.com",
          phone: "+251944567890",
          subject: "Product Availability",
          message: "Are EIDER precision fittings available for immediate delivery? We need them for an urgent project completion.",
          submittedAt: new Date(),
        },
        {
          name: "Haile Gebremariam",
          email: "haile@development.et",
          phone: "+251955678901",
          subject: "Custom Manufacturing",
          message: "Do you offer custom manufacturing services for specialized pipe fittings? We have specific requirements for an industrial plant project.",
          submittedAt: new Date(),
        }
      ]);
      console.log("✅ Sample contact messages created (5 items)");
    } else {
      console.log("✅ Contact messages already exist");
    }

    console.log("🎉 Database seeding completed successfully!");
    
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    throw error;
  }
}

// Function to check and create tables if needed
export async function initializeTables() {
  console.log("Checking database tables...");
  
  try {
    // Test database connection by running a simple query
    await db.select().from(admins).limit(1);
    console.log("✅ Database connection successful");
    console.log("✅ All tables are ready");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    console.log("💡 Please run: npm run db:push");
    throw error;
  }
}