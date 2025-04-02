import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, getCartTotal } = useCart();
  const [activeStep, setActiveStep] = useState('address'); // 'address' or 'payment'
  
  // Form state
  const [formData, setFormData] = useState({
    // Address details
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    // Delivery options
    deliveryOption: 'standard',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeStep === 'address') {
      setActiveStep('payment');
    } else {
      // Process payment and complete order
      alert('Order placed successfully!');
      // Here you would typically redirect to an order confirmation page
    }
  };

  // Format price for display
  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    });
  };

  // If cart is empty, redirect to cart page
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">You need to add items to your cart before checkout.</p>
          <a
            href="/women"
            className="inline-block bg-[#e80071] text-white px-6 py-3 rounded-md hover:bg-[#c6005f] transition-colors duration-300"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Checkout Steps */}
      <div className="flex mb-8 border-b pb-4">
        <div className={`flex-1 text-center ${activeStep === 'address' ? 'text-[#e80071] font-semibold' : 'text-gray-500'}`}>
          <div className="flex items-center justify-center">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${activeStep === 'address' ? 'bg-[#e80071] text-white' : 'bg-gray-200 text-gray-600'}`}>1</span>
            <span>Address & Delivery</span>
          </div>
        </div>
        <div className={`flex-1 text-center ${activeStep === 'payment' ? 'text-[#e80071] font-semibold' : 'text-gray-500'}`}>
          <div className="flex items-center justify-center">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${activeStep === 'payment' ? 'bg-[#e80071] text-white' : 'bg-gray-200 text-gray-600'}`}>2</span>
            <span>Payment</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {activeStep === 'address' ? (
              <form onSubmit={handleSubmit}>
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e80071]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e80071]"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e80071]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e80071]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e80071]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e80071]"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold mb-4">Delivery Options</h2>
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border rounded-md cursor-pointer hover:border-[#e80071]">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="standard"
                        checked={formData.deliveryOption === 'standard'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <div>
                        <h3 className="font-medium">Standard Delivery</h3>
                        <p className="text-sm text-gray-500">Delivery within 4-6 business days</p>
                        <p className="text-sm font-medium text-green-600 mt-1">Free</p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border rounded-md cursor-pointer hover:border-[#e80071]">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="express"
                        checked={formData.deliveryOption === 'express'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <div>
                        <h3 className="font-medium">Express Delivery</h3>
                        <p className="text-sm text-gray-500">Delivery within 2-3 business days</p>
                        <p className="text-sm font-medium mt-1">₹99</p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border rounded-md cursor-pointer hover:border-[#e80071]">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="nextday"
                        checked={formData.deliveryOption === 'nextday'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <div>
                        <h3 className="font-medium">Next Day Delivery</h3>
                        <p className="text-sm text-gray-500">Order before 2pm for next day delivery</p>
                        <p className="text-sm font-medium mt-1">₹199</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="p-6">
                  <button
                    type="submit"
                    className="w-full bg-[#e80071] text-white py-3 rounded-md hover:bg-[#c6005f] transition-colors duration-300"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border rounded-md cursor-pointer hover:border-[#e80071]">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        defaultChecked
                        className="mr-3"
                      />
                      <div className="flex-grow">
                        <h3 className="font-medium">Credit/Debit Card</h3>
                        <p className="text-sm text-gray-500">Pay securely with your card</p>
                      </div>
                      <div className="flex space-x-2">
                        <span className="text-2xl">💳</span>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border rounded-md cursor-pointer hover:border-[#e80071]">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        className="mr-3"
                      />
                      <div className="flex-grow">
                        <h3 className="font-medium">UPI</h3>
                        <p className="text-sm text-gray-500">Pay using UPI apps</p>
                      </div>
                      <div className="flex space-x-2">
                        <span className="text-2xl">📱</span>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border rounded-md cursor-pointer hover:border-[#e80071]">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        className="mr-3"
                      />
                      <div className="flex-grow">
                        <h3 className="font-medium">Cash on Delivery</h3>
                        <p className="text-sm text-gray-500">Pay when you receive your order</p>
                      </div>
                      <div className="flex space-x-2">
                        <span className="text-2xl">💰</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="p-6">
                  <button
                    type="button"
                    onClick={() => setActiveStep('address')}
                    className="w-full mb-4 bg-gray-100 text-gray-800 py-3 rounded-md hover:bg-gray-200 transition-colors duration-300"
                  >
                    Back to Address
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-[#e80071] text-white py-3 rounded-md hover:bg-[#c6005f] transition-colors duration-300"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="max-h-60 overflow-y-auto mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center py-2 border-b">
                  <div className="w-12 h-16 flex-shrink-0 mr-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>
                  {formData.deliveryOption === 'standard' ? 'Free' : 
                   formData.deliveryOption === 'express' ? '₹99' : 
                   formData.deliveryOption === 'nextday' ? '₹199' : 'Free'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>{formatPrice(getCartTotal() * 0.18)}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>
                    {formatPrice(
                      getCartTotal() * 1.18 + 
                      (formData.deliveryOption === 'express' ? 99 : 
                       formData.deliveryOption === 'nextday' ? 199 : 0)
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <span>🔒</span>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;