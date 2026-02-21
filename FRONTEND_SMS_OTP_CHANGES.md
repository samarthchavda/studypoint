# 📱 FRONTEND CHANGES FOR SMS OTP

## Overview
Your backend is now ready to send SMS OTP! Here's how to update your React frontend to use phone numbers instead of email for OTP verification.

---

## 📝 **Changes to SignupForm.jsx**

### Current Implementation (Email)
Your current signup uses:
- `email` field
- `sendOTP(formData.email, navigate)`

### New Implementation (SMS)

**Replace the form data object to include phone number:**

```jsx
// OLD
const [formData, setFormData] = useState({
  fName: "",
  lName: "",
  email: "",
  password: "",
  cpassword: "",
  code: "",
  phoneNumber: "",
});

// NEW - Add method selection
const [formData, setFormData] = useState({
  fName: "",
  lName: "",
  email: "",
  phoneNumber: "",
  password: "",
  cpassword: "",
  code: "",
  sendMethod: "sms", // NEW - Options: "sms" or "email"
});
```

---

## 🔄 **Update Submit Handler**

**OLD:**
```jsx
function submitHandler(event) {
  event.preventDefault();
  if (formData.password !== formData.cpassword) {
    toast.error("password didn't match");
    return;
  }
  
  const data = {
    firstName: formData.fName,
    lastName: formData.lName,
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.cpassword,
    accountType: user,
  };
  
  dispatch(setSignupData(data));
  dispatch(sendOTP(formData.email, navigate)); // Email-based
}
```

**NEW:**
```jsx
function submitHandler(event) {
  event.preventDefault();
  
  if (formData.password !== formData.cpassword) {
    toast.error("Passwords don't match");
    return;
  }
  
  // Validate email and phone
  if (!formData.email) {
    toast.error("Email is required");
    return;
  }
  
  if (!formData.phoneNumber) {
    toast.error("Phone number is required for SMS OTP");
    return;
  }
  
  const data = {
    firstName: formData.fName,
    lastName: formData.lName,
    email: formData.email,
    phoneNumber: formData.phoneNumber, // NEW
    password: formData.password,
    confirmPassword: formData.cpassword,
    accountType: user,
  };
  
  dispatch(setSignupData(data));
  
  // NEW - Send SMS OTP instead of email
  dispatch(sendOTP(formData.phoneNumber, navigate, "sms"));
}
```

---

## 📱 **Add Phone Input Field**

Add a phone number input in your form JSX (after email field):

```jsx
<div className="flex flex-col gap-1 w-full">
  <label htmlFor="phoneNumber">
    Phone Number (with country code)
    <span className="text-red-500 text-sm absolute">*</span>
  </label>
  <input
    onChange={changeHandler}
    value={formData.phoneNumber}
    className="text-white rounded-md px-3 py-2 w-full outline-none bg-[#161D29]"
    type="tel"
    required
    placeholder="+1 201 555 0123"
    name="phoneNumber"
    id="phoneNumber"
  />
  <p className="text-xs text-gray-400">Format: +[country code][number]</p>
</div>
```

---

## 🔧 **Update authApi.js**

Check your `src/services/operations/authApi.js` file:

**OLD sendOTP function:**
```javascript
export const sendOTP = (email, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await apiConnector(
      "POST",
      SENDOTP_API,
      { email } // Only email
    );
    
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    
    toast.success("OTP sent successfully");
    navigate("/verify-email");
    dispatch(setLoading(false));
  } catch (error) {
    console.log("SENDOTP API ERROR:", error);
    toast.error(error.response?.data?.message || "Failed to send OTP");
    dispatch(setLoading(false));
  }
};
```

**NEW sendOTP function:**
```javascript
export const sendOTP = (contact, navigate, method = "sms") => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const payload = method === "sms" 
      ? { phoneNumber: contact, sendMethod: "sms" }  // NEW
      : { email: contact, sendMethod: "email" };     // Email fallback
    
    const response = await apiConnector(
      "POST",
      SENDOTP_API,
      payload
    );
    
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    
    toast.success(`OTP sent via ${method === "sms" ? "SMS" : "Email"}`);
    navigate("/verify-email");
    dispatch(setLoading(false));
  } catch (error) {
    console.log("SENDOTP API ERROR:", error);
    toast.error(error.response?.data?.message || "Failed to send OTP");
    dispatch(setLoading(false));
  }
};
```

---

## 📋 **Update Verification Step**

When user enters OTP, update the signup data to include phone:

**In your OTP verification component:**

```jsx
// Make sure phoneNumber is included in signup data
const signupData = useSelector((state) => state.auth.signupData);

const data = {
  ...signupData,
  phoneNumber: signupData.phoneNumber, // Make sure this is included
  otp: enteredOTP
};

dispatch(signupUser(data)); // This sends to signup endpoint
```

---

## ✅ **Updated Signup API Call**

Your signup API should already be updated to accept phoneNumber. The endpoint now accepts:

```json
POST /api/v1/auth/signup
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phoneNumber": "+1234567890",  // NEW
  "password": "Secure@123",
  "confirmPassword": "Secure@123",
  "accountType": "Student",
  "otp": "123456"
}
```

---

## 🔀 **Option: Toggle Between Email & SMS**

To allow users to choose SMS or Email OTP:

```jsx
// Add to state
const [sendMethod, setSendMethod] = useState("sms");

// Add buttons in form
<div className="flex gap-4 w-full mb-4">
  <button 
    type="button"
    onClick={() => setSendMethod("sms")}
    className={`flex-1 py-2 rounded ${sendMethod === "sms" ? "bg-yellow-50 text-black" : "bg-gray-700 text-white"}`}
  >
    📱 Send to SMS
  </button>
  <button 
    type="button"
    onClick={() => setSendMethod("email")}
    className={`flex-1 py-2 rounded ${sendMethod === "email" ? "bg-yellow-50 text-black" : "bg-gray-700 text-white"}`}
  >
    📧 Send to Email
  </button>
</div>

// Update submit
dispatch(sendOTP(
  sendMethod === "sms" ? formData.phoneNumber : formData.email,
  navigate,
  sendMethod
));
```

---

## 🧪 **Test the Changes**

1. **Start backend:** `npm run dev` in `/server`
2. **Start frontend:** `npm start` in root folder
3. Go to **Signup page**
4. Enter:
   - First Name: `John`
   - Last Name: `Doe`
   - Email: `john@example.com`
   - Phone: `+1234567890` (use your actual number)
   - Password & Confirm Password
5. Click **Send OTP**
6. **Check your phone** for SMS with OTP! 📱
7. Enter OTP and submit
8. Account created! ✅

---

## 🔗 **Phone Number Format Examples**

Users should enter phone numbers in **E.164 format**:

```
USA:      +1 201 555 0123
India:    +91 98765 43210
UK:       +44 20 7946 0958
Canada:   +1 613 555 0144
Germany:  +49 30 90 0 2000
```

Add a **helper tooltip** in your form:

```jsx
<p className="text-xs text-gray-400 mt-1">
  Format: +[Country Code] [Number]<br/>
  Example: +1 201 555 0123
</p>
```

---

## 📚 **Files to Modify**

1. **`src/components/loginSignup/SignupForm.jsx`**
   - Add phone number input
   - Update submit handler to include phone
   - Change sendOTP call to use phone + "sms" method

2. **`src/services/operations/authApi.js`**
   - Update `sendOTP` function to accept `method` parameter
   - Send `phoneNumber` instead of just `email`

3. **`src/slices/authSlice.js`** (if needed)
   - Make sure signupData includes phoneNumber

4. **Your OTP verification component**
   - Ensure phoneNumber is passed to final signup

---

## ✨ **Best Practices**

1. **Use E.164 format** for phone numbers
2. **Validate phone format** before sending
3. **Show brief loading** while OTP is being sent
4. **Keep email required** as backup
5. **Test with real phone number** (Twilio trial needs verification)
6. **Add error messages** for invalid phone numbers

---

## 🆘 **Troubleshooting**

| Issue | Solution |
|-------|----------|
| SMS won't send | Check phone format: `+1` prefix needed |
| "Phone required" error | Add phone input field to form |
| OTP not matching | Make sure OTP expires after 5 minutes |
| Phone in request but not working | Restart backend after `.env` changes |

---

## 💡 **Sample Complete Form Data**

```javascript
{
  fName: "John",
  lName: "Doe",
  email: "john@example.com",
  phoneNumber: "+12015550123",
  password: "SecurePass@123",
  cpassword: "SecurePass@123",
  code: "1",
  sendMethod: "sms"
}
```

---

When you're done with these changes, your app will:
✅ Accept phone numbers  
✅ Send SMS OTP via Twilio  
✅ Verify OTP from SMS  
✅ Create user account  

Good luck! 🚀
