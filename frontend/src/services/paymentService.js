import axios from "axios";

const API =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function createRazorpayOrder(amount) {
  const response = await axios.post(`${API}/payment/create-order`, {
    amount,
  });

  return response.data;
}

export async function verifyPayment(data) {
  const response = await axios.post(
    `${API}/payment/verify-payment`,
    data
  );

  return response.data;
}