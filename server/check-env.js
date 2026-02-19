require('dotenv').config();

// Check if email environment variables are properly set
console.log("=== Environment Variables Check ===\n");
console.log("MAIL_HOST:", process.env.MAIL_HOST || "NOT SET");
console.log("MAIL_USER:", process.env.MAIL_USER || "NOT SET");
console.log("MAIL_PASS:", process.env.MAIL_PASS ? "***" + process.env.MAIL_PASS.slice(-4) : "NOT SET");
console.log("MAIL_PASS length:", process.env.MAIL_PASS ? process.env.MAIL_PASS.length : 0);
console.log("\nExpected MAIL_PASS length: 16");

