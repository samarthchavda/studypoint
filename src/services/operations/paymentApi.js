import toast from "react-hot-toast";
import { paymentEndpoint } from "../apis";
import { resetCart } from "../../slices/cartSlice";
import { setLoading } from "../../slices/authSlice";

const { default: apiConnector } = require("../apiConnector");
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export const buyCourse = async (
  token,
  userId,
  courses,
  dispatch,
  fromCart = false
) => {
  dispatch(setLoading(true));

  const order = await createOrder(token, courses);
  console.log(order);
  const razorSdk = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!razorSdk) {
    toast.error("razorpay sdk failed to load");
    return;
  }
  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY,
    amount: order.amount,
    currency: order.currency,
    name: "StudyNotion",
    description: "Test Transaction",
    // image: "https://example.com/your_logo",
    order_id: order.id,
    notes: {
      userId,
      courses,
    },
    // callback_url: "http://localhost:4000/api/v1/payment/verifySignatureEnrollStudent",
    handler: async function (response) {
      const { razorpay_signature, razorpay_order_id, razorpay_payment_id } =
        response;
      const data = {
        razorpay_signature,
        razorpay_order_id: order.id,
        razorpay_payment_id,
        courses,
        userId,
      };
      const result = await verifySignatureAndEnrollStudent(token, data);
      if (result) {
        toast.success("payment successful");
        console.log(fromCart);
        if (fromCart) {
          dispatch(resetCart());
        }
        window.location.href = "/dashboard"; // redirect to dashboard
      } else {
        dispatch(setLoading(false));

        toast.error("payment failed");
      }
    },
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
  rzp.on("payment.failed", function (response) {
    console.log(response.error);
    toast.error("oops,payment failed");
    dispatch(setLoading(false));
  });
};

async function createOrder(token, courses) {
  try {
    const response = await apiConnector(
      paymentEndpoint.CAPTURE_PAYMENT_API,
      "POST",
      { courses, token }
    );
    console.log(response);
    return response.data.order;
  } catch (error) {
    console.log("error while creating order", error);
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function verifySignatureAndEnrollStudent(token, data) {
  try {
    const response = await apiConnector(
      paymentEndpoint.VERIFY_SIGNATURE_ENROLL_STUDENT_API,
      "POST",
      {
        ...data,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (response.data.success) return true;
    return false;
  } catch (error) {
    console.log(
      "error while verifying signature or enrollment of student to course",
      error
    );
    console.log(error);
  }
}
