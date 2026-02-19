// Test frontend to backend connection
const testConnection = async () => {
  console.log("Testing connection to backend...");
  
  try {
    const response = await fetch("https://studypoint-1-r4wb.onrender.com/api/v1/auth/sendotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "chavdasamarth007@gmail.com"
      }),
      credentials: "include"
    });
    
    const data = await response.json();
    console.log("Response:", data);
    console.log("Status:", response.status);
    console.log("Headers:", response.headers);
    
    if (response.ok) {
      console.log("✅ SUCCESS: OTP sent!");
    } else {
      console.log("❌ ERROR:", data.message);
    }
  } catch (error) {
    console.log("❌ FETCH ERROR:", error);
  }
};

testConnection();
