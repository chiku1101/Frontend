import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    fullName: 'Chaitanya Sonar',
    address: 'KL University, Dist.Guntur, Vijayawada, Guntur - 522502',
    phone: '+91 98765 43210'
  });

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setIsEditingAddress(false);
  };

  const handleProceedToCheckout = () => {
    setShowCheckoutModal(true);
  };

  // Format price for display
  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
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
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Shopping Cart ({cartItems.length} items)</h2>
                <button
                  onClick={clearCart}
                  className="text-sm text-[#e80071] hover:underline"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-4">
                  <div className="w-24 h-32 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center rounded-md"
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        ✕
                      </button>
                    </div>

                    {item.discount && (
                      <p className="text-sm text-green-600 mt-1">{item.discount}</p>
                    )}

                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 border-r hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 border-l hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold">{item.price}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.quantity} × {item.price.replace('₹', '')} = ₹
                          {parseInt(item.price.replace(/[^0-9]/g, ''), 10) * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>{formatPrice(getCartTotal() * 0.18)}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(getCartTotal() * 1.18)}</span>
                </div>
              </div>
            </div>

            <button onClick={handleProceedToCheckout} className="block w-full bg-[#e80071] text-white py-3 rounded-md hover:bg-[#c6005f] transition-colors duration-300 text-center">
              Proceed to Checkout
            </button>

            <div className="mt-6">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <span>🔒</span>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto py-8">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl mx-4 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Checkout Details</h2>
              <button onClick={() => setShowCheckoutModal(false)} className="text-gray-400 hover:text-red-500">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Delivery Address */}
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Delivery Address</h3>
                    <button 
                      onClick={() => setIsEditingAddress(true)} 
                      className="text-[#e80071] text-sm hover:underline"
                    >
                      {isEditingAddress ? 'Cancel' : 'Edit'}
                    </button>
                  </div>
                  {isEditingAddress ? (
                    <form onSubmit={handleAddressSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={addressForm.fullName}
                          onChange={(e) => setAddressForm({...addressForm, fullName: e.target.value})}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e80071]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                          value={addressForm.address}
                          onChange={(e) => setAddressForm({...addressForm, address: e.target.value})}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e80071] h-24"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e80071]"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#e80071] text-white py-2 rounded-md hover:bg-[#c6005f] transition-colors duration-300"
                      >
                        Save Address
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-2">
                      <p className="font-medium">{addressForm.fullName}</p>
                      <p className="text-gray-600">{addressForm.address}</p>
                      <p className="text-gray-600">Phone: {addressForm.phone}</p>
                    </div>
                  )}
                </div>

                {/* Delivery Options */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-4">Delivery Options</h3>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="radio" name="delivery" className="mt-1" defaultChecked />
                      <div>
                        <p className="font-medium">Standard Delivery</p>
                        <p className="text-sm text-gray-600">Estimated delivery by 3-5 business days</p>
                        <p className="text-sm text-green-600">Free</p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="radio" name="delivery" className="mt-1" />
                      <div>
                        <p className="font-medium">Express Delivery</p>
                        <p className="text-sm text-gray-600">Estimated delivery by tomorrow</p>
                        <p className="text-sm">₹99</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-4">Payment Methods</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="payment" defaultChecked />
                      <span>UPI</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="payment" />
                      <span>Credit/Debit Card</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="payment" />
                      <span>Net Banking</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="payment" />
                      <span>Cash on Delivery</span>
                    </label>
                  </div>
                </div>

                {/* Price Details */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-4">Price Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cart Total</span>
                      <span>{formatPrice(getCartTotal())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform Fee</span>
                      <span>₹20</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t font-semibold">
                      <span>Total Amount</span>
                      <span>{formatPrice(getCartTotal() + 20)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t mt-auto">
              <button className="w-full bg-[#e80071] text-white py-3 rounded-md hover:bg-[#c6005f] transition-colors duration-300">
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;