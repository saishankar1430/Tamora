import axios from "axios";

const API = "http://localhost:5000/api/payment";

export async function createRazorpayOrder(amount) {
  const response = await axios.post(`${API}/create-order`, {
    amount,
  });

  return response.data;
}

export async function verifyPayment(data) {
  const response = await axios.post(
    `${API}/verify-payment`,
    data
  );

  return response.data;
}