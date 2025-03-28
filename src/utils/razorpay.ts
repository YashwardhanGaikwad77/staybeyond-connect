
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
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
    backdrop_close?: boolean;
    animation?: boolean;
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
    // Check if script is already loaded
    if (window.Razorpay) {
      console.log("Razorpay script already loaded");
      resolve(true);
      return;
    }

    console.log("Loading Razorpay script...");
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded successfully");
      resolve(true);
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Initialize Razorpay payment
export const initializeRazorpayPayment = (options: RazorpayOptions) => {
  try {
    if (!window.Razorpay) {
      throw new Error("Razorpay not loaded");
    }
    
    // Add default modal options for better UX
    const razorpayOptions = {
      ...options,
      modal: {
        escape: false,
        backdrop_close: false,
        animation: true,
        ondismiss: function() {
          console.log("Payment modal closed");
          if (typeof options.modal?.ondismiss === 'function') {
            options.modal.ondismiss();
          }
        },
        ...options.modal,
      }
    };
    
    console.log("Initializing Razorpay payment with options:", razorpayOptions);
    const rzp = new window.Razorpay(razorpayOptions);
    rzp.on('payment.failed', function (response: any) {
      console.error("Payment failed:", response.error);
    });
    rzp.open();
    return rzp;
  } catch (error) {
    console.error("Error initializing Razorpay payment:", error);
    throw error;
  }
};
