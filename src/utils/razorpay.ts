
// This file contains the utility functions for Razorpay integration

// Types for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Razorpay API Keys
export const RAZORPAY_KEY_ID = "rzp_test_DfF1r6xv4VVddb";
// Note: Key secret should only be used on the server side, not in client-side code
// This is just stored here for reference
export const RAZORPAY_KEY_SECRET = "spjQ63WjzRky2UKM24KdqtD5";

// Load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Initialize Razorpay payment
export const initializeRazorpayPayment = (options: RazorpayOptions) => {
  const rzp = new window.Razorpay(options);
  rzp.open();
  return rzp;
};
