import "dotenv/config";
import { db } from "./db";
import { admins, users, products, news } from "@shared/schema";
import bcrypt from "bcryptjs";

async function main() {
  // Seed admin
  const adminPassword = await bcrypt.hash("Admin4321!", 10);
  await db.insert(admins).values({
    name: "System Administrator",
    email: "admin@huayueplasticsindustry.com",
    passwordHash: adminPassword,
  }).onConflictDoNothing();

  // Seed user
  const userPassword = await bcrypt.hash("userpassword", 10);
  await db.insert(users).values({
    username: "testuser",
    password: userPassword,
  }).onConflictDoNothing();

  // Seed product
  await db.insert(products).values({
    name: "Sample Pipe",
    description: "High quality industrial pipe.",
    category: "HUAYUE",
    imageUrl: "https://example.com/sample-pipe.jpg",
    specifications: "Diameter: 100mm, Length: 6m",
    certifications: "ISO 9001",
    isActive: true,
  }).onConflictDoNothing();

  // Seed news
  await db.insert(news).values({
    title: "Welcome to HUAYUE PLASTICS INDUSTRY!",
    summary: "We are excited to launch our new website.",
    content: "Our company is dedicated to providing the best industrial piping solutions.",
    thumbnail: "https://example.com/news-thumb.jpg",
    author: "Admin",
  }).onConflictDoNothing();

  console.log("Database seeded successfully.");
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
}); 