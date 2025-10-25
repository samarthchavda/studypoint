require("dotenv").config();
const { conncetToDatabase } = require("../config/database");
const seedDatabase = require("../seedData/seeder");

async function runSeeder() {
  try {
    console.log("Connecting to database...");
    await conncetToDatabase();
    console.log("Database connected");
    
    await seedDatabase();
    console.log("\n🎉 Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error running seeder:", error);
    process.exit(1);
  }
}

runSeeder();