# 🔐 TWILIO API CREDENTIALS - WHERE TO GET THEM

Based on your screenshot showing the Twilio Console:

---

## 📍 **Location 1: Account SID**

From your screenshot:
```
Live credentials
Account SID - used to exercise the REST API
AC29876...  ← THIS ONE
```

**Where to find:**
1. Login to Twilio: https://console.twilio.com
2. Look at the **"Live credentials"** section
3. You'll see **Account SID**

**Add to `.env`:**
```env
TWILIO_ACCOUNT_SID=AC29876...
```

---

## 🔑 **Location 2: Auth Token**

From your screenshot:
```
Auth token
[•••••••••••••••]  ← Click the 👁️ eye icon to reveal
```

**Where to find:**
1. In Twilio Console → **Live credentials** section
2. Below Account SID, find **Auth token**
3. Click the **👁️ eye icon** to see the full token
4. Copy the entire token (format: `xxxxxxxxxxxxxxxxxxxx`)

**Add to `.env`:**
```env
TWILIO_AUTH_TOKEN=your_full_auth_token_here
```

---

## 📱 **Location 3: Twilio Phone Number**

**Where to find:**
1. In Twilio Console, click **Phone Numbers** (left sidebar)
2. Go to **Manage** → **Incoming Phone Numbers**
3. You'll see your phone number(s)
   - Format: `+1234567890` (with + sign)
   - Example: `+1 201 555 0123`

**If you don't have a number yet:**
1. Click **"Get Started"** or **"Buy a Phone Number"**
2. Select **USA** or your country
3. Filter for **SMS** capability ✅
4. Click **"Buy"**
5. Copy the number

**Add to `.env`:**
```env
TWILIO_PHONE_NUMBER=+1234567890
```

---

## 📋 **Complete `.env` Setup**

Add these three lines to your `/server/.env` file:

```env
# At the end of the file, add:

# ========= TWILIO SMS CREDENTIALS =========
TWILIO_ACCOUNT_SID=AC29876...
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

---

## ✅ **Verification Checklist**

- [ ] Can you see **Account SID** in Twilio Console? ✓
- [ ] Can you reveal **Auth Token** with eye icon? ✓
- [ ] Do you have a **Phone Number** in Manage section? ✓
- [ ] Have you added all 3 to your `.env`? ✓
- [ ] Have you restarted the server? ✓

---

## 🧪 **Quick Test**

Once you've added credentials to `.env` and restarted the server:

```bash
curl -X POST http://localhost:4000/api/v1/auth/sendotp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"+1234567890","sendMethod":"sms"}'
```

You should see:
```json
{
  "success": true,
  "message": "OTP sent successfully via SMS",
  "contact": "+1234567890"
}
```

---

## ⚠️ **Common Issues**

| Issue | Solution |
|-------|----------|
| "Missing credentials" error | Check all 3 variables are in `.env` |
| Auth Token shows special chars | Copy the FULL token after clicking eye icon |
| Phone number not working | Make sure it has SMS capability (✅ SMS) |
| Can't see Auth Token | Click the 👁️ eye icon next to it first |

---

## 💾 **Next Steps**

1. Copy credentials from Twilio Console
2. Add to `.env` file
3. Restart server: `npm run dev`
4. Test with the curl command above
5. Test in your frontend with a real phone number

---

**Need your actual Twilio credentials?**
1. Go to: https://console.twilio.com
2. You're already logged in (from that browser tab!)
3. Copy the values from the page you showed me
4. Paste into the `.env` file below

```env
TWILIO_ACCOUNT_SID=  # Copy "Account SID" from console
TWILIO_AUTH_TOKEN=   # Click eye icon, then copy
TWILIO_PHONE_NUMBER= # Copy from Phone Numbers → Manage
```
