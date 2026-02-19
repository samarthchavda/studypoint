# 🔧 Fixing SMTP Connection Timeout on Render

## The Problem

Your Render logs show:
```
mailSender: error sending mail: Connection timeout
code: 'ETIMEDOUT',
command: 'CONN'
```

This means **Render cannot connect to Gmail's SMTP server on port 587**.

---

## Why This Happens

### Common Causes:
1. **Render blocks outbound SMTP on port 587** (common on free tier)
2. **Gmail blocks Render's IP addresses** as potential spam sources
3. **Firewall restrictions** on Render's infrastructure
4. **Network routing issues** between Render and Gmail servers

---

## ✅ Solutions (Try in Order)

### Solution 1: Use Port 465 with SSL (RECOMMENDED)

Port 465 with SSL works more reliably than port 587 with TLS on Render.

**Already Applied** - I've updated your code to use:
- Port: `465` (instead of 587)
- Secure: `true` (SSL instead of TLS)
- Increased timeout: `30 seconds`
- Connection pooling enabled

**Deploy this change:**
```bash
cd "/Users/chavdasamarth/Desktop/untitled folder/StudyNotion-main"
git add server/utils/mailSender.js
git commit -m "Fix: Switch to port 465 for Render SMTP compatibility"
git push origin main
```

---

### Solution 2: Use Gmail's Service Mode (Easiest)

Gmail service mode bypasses port configuration:

Update `server/utils/mailSender.js`:
```javascript
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
```

---

### Solution 3: Switch to SendGrid (Most Reliable)

SendGrid is designed for server-to-server email and works perfectly on Render.

#### Step 1: Get SendGrid API Key
1. Go to: https://signup.sendgrid.com
2. Free tier: 100 emails/day
3. Get API Key from Settings → API Keys

#### Step 2: Install SendGrid
```bash
cd server
npm install @sendgrid/mail
```

#### Step 3: Update Code

Create `server/utils/mailSenderSendGrid.js`:
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailSender = async (email, title, body) => {
  try {
    const msg = {
      to: email,
      from: process.env.MAIL_USER,
      subject: title,
      html: body,
    };
    
    await sgMail.send(msg);
    console.log('✅ Email sent via SendGrid');
    return { success: true };
  } catch (error) {
    console.error('SendGrid error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = mailSender;
```

#### Step 4: Add to Render Environment
```
SENDGRID_API_KEY=your_api_key_here
```

---

### Solution 4: Use Brevo (formerly Sendinblue)

Free tier: 300 emails/day

1. Sign up: https://www.brevo.com
2. Get SMTP credentials from Settings → SMTP & API
3. Update Render environment variables:
   ```
   MAIL_HOST=smtp-relay.brevo.com
   MAIL_USER=your_brevo_email
   MAIL_PASS=your_brevo_smtp_key
   ```

---

### Solution 5: Use Mailgun

1. Sign up: https://www.mailgun.com
2. Verify domain (or use sandbox)
3. Get SMTP credentials
4. Update Render environment variables

---

## 🧪 Testing After Fix

### Test Locally First
```bash
cd server
node test-email.js
```

### Deploy and Test on Render
```bash
git add .
git commit -m "Fix: SMTP configuration for Render"
git push origin main
```

Wait 2-3 minutes for deployment, then:
```bash
bash test-production-otp.sh
```

---

## 🔍 Debug on Render

### Check Render Logs
1. Go to: https://dashboard.render.com
2. Select your service
3. Click "Logs"
4. Look for:
   - `✅ Email sent successfully using...` (Success!)
   - `❌ Gmail SSL (Port 465) failed` (Still not working)

### Test SMTP Connection from Render Shell

1. Go to Render Dashboard → Your Service
2. Click "Shell" tab (if available)
3. Run:
   ```bash
   telnet smtp.gmail.com 465
   ```
   If it hangs, port 465 is blocked

4. Try port 587:
   ```bash
   telnet smtp.gmail.com 587
   ```

---

## 💡 Quick Fix Script

I've created a fallback email sender that tries multiple methods automatically.

**To use it:**

1. Rename the file:
   ```bash
   cd server/utils
   mv mailSender.js mailSender.old.js
   mv mailSenderWithFallback.js mailSender.js
   ```

2. Deploy:
   ```bash
   git add server/utils/
   git commit -m "Use email fallback system"
   git push origin main
   ```

This will automatically try:
1. Port 465 with SSL
2. Port 587 with TLS
3. Gmail service mode

---

## ⚠️ If Nothing Works

**Render Free Tier has SMTP Restrictions:**

The free tier on Render may block all outbound SMTP connections to prevent spam.

### Options:

1. **Upgrade to Paid Plan** ($7/month)
   - Removes SMTP restrictions
   - Always-on (no sleep)

2. **Use API-based Email Service** (Recommended)
   - SendGrid, Mailgun, Brevo
   - These use HTTPS (port 443) which is never blocked
   - More reliable for production

3. **Contact Render Support**
   - Ask them to whitelist SMTP ports for your service
   - Sometimes they allow it for legitimate use cases

---

## 📧 Recommended Solution for Production

**Use SendGrid** (or similar service):
- ✅ Works on all hosting platforms
- ✅ Better deliverability
- ✅ Email analytics
- ✅ No SMTP port issues
- ✅ Free tier: 100 emails/day

**Setup takes 5 minutes and solves this permanently!**

---

## 🚀 Next Steps

1. **Try port 465 fix first** (already committed)
2. **If still fails, use SendGrid** (recommended)
3. **Check Render logs** for exact error
4. **Contact Render support** if needed

Let me know which solution works for you!
