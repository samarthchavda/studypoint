# 📧 Setup SendGrid for Email Delivery

## Quick Setup (5 minutes)

### Step 1: Create SendGrid Account
1. Go to: https://signup.sendgrid.com/
2. Sign up (Free tier: 100 emails/day)
3. Verify your email

### Step 2: Create API Key
1. Login to SendGrid dashboard
2. Go to: **Settings** → **API Keys**
3. Click **"Create API Key"**
4. Name: `StudyNotion`
5. Permissions: **Full Access**
6. Click **"Create & View"**
7. **Copy the API Key** (you'll only see it once!)

### Step 3: Verify Sender Email
1. Go to: **Settings** → **Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Fill in your details:
   - From Email: `chavdasamarth007@gmail.com`
   - From Name: `StudyNotion`
   - Reply To: `chavdasamarth007@gmail.com`
4. Complete verification
5. Check your email and click verification link

### Step 4: Add to Render
1. Go to: https://dashboard.render.com
2. Select your backend service
3. Go to **Environment** tab
4. Add new variable:
   ```
   Name: SENDGRID_API_KEY
   Value: SG.xxxxxxxxxxxxxxxxxxxxx (paste your API key)
   ```
5. Click **Save Changes**
6. Wait for auto-redeploy (2-3 minutes)

### Step 5: Test
After Render redeploys, try sending OTP from your website!

---

## ✅ Why SendGrid?
- ✅ Works on all hosting platforms (no SMTP port issues)
- ✅ Free tier: 100 emails/day
- ✅ Better deliverability (won't go to spam)
- ✅ Email analytics
- ✅ No timeout issues

---

## 🔧 Already Installed
I've updated your code to use SendGrid automatically when `SENDGRID_API_KEY` is present.
It will fallback to Gmail SMTP if SendGrid is not configured.

---

## 📝 Important Notes
1. **Sender email must be verified** in SendGrid
2. **Use the same email** as your Gmail (chavdasamarth007@gmail.com)
3. **API key is sensitive** - don't commit it to git
4. **Free tier limit:** 100 emails/day (upgrade if you need more)

---

## 🎯 Next Steps
1. Create SendGrid account
2. Get API key
3. Verify sender email
4. Add SENDGRID_API_KEY to Render
5. Wait for redeploy
6. Test OTP - emails will arrive! 📬
