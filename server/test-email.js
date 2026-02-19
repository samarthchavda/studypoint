require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('\n=== Email Configuration Test ===\n');
  
  // Check environment variables
  console.log('Environment Variables:');
  console.log('MAIL_HOST:', process.env.MAIL_HOST || 'NOT SET');
  console.log('MAIL_USER:', process.env.MAIL_USER || 'NOT SET');
  console.log('MAIL_PASS:', process.env.MAIL_PASS ? '***SET***' : 'NOT SET');
  console.log('NODE_ENV:', process.env.NODE_ENV || 'NOT SET');
  
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.log('\n❌ Error: MAIL_USER or MAIL_PASS not configured!');
    console.log('\nTo fix:');
    console.log('1. Go to https://myaccount.google.com/apppasswords');
    console.log('2. Generate an App Password for Mail');
    console.log('3. Set it in Render environment variables');
    return;
  }
  
  try {
    console.log('\n=== Testing SMTP Connection ===\n');
    
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    
    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection successful!');
    
    // Send test email
    console.log('\n=== Sending Test Email ===\n');
    const info = await transporter.sendMail({
      from: `"StudyNotion Test" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER, // Send to yourself
      subject: 'StudyNotion Email Test',
      html: '<h1>Email Configuration Test</h1><p>Your email setup is working correctly!</p>',
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('\nCheck your inbox at:', process.env.MAIL_USER);
    
  } catch (error) {
    console.log('\n❌ Email test failed!');
    console.log('Error:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\nAuthentication failed. Please check:');
      console.log('1. MAIL_USER is correct');
      console.log('2. MAIL_PASS is an App Password (not regular password)');
      console.log('3. Generate new App Password: https://myaccount.google.com/apppasswords');
    } else if (error.code === 'ECONNECTION') {
      console.log('\nConnection failed. Please check:');
      console.log('1. MAIL_HOST is correct (smtp.gmail.com)');
      console.log('2. Internet connection is available');
    }
  }
}

testEmail();
