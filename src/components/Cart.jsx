import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { loadScript } from '../utils/razorpay'

const Cart = () => {
  const { cartItems } = useCart()
  const [paymentLoading, setPaymentLoading] = useState(false)

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ''))
      return total + price
    }, 0)
  }

  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-white shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center gap-4 mb-4">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-20 h-20 object-cover rounded"
          />
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.price}</p>
          </div>
        </div>
      ))}

      <div className="mt-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total:</span>
          <span className="text-xl font-bold">₹{calculateTotal()}</span>
        </div>

        <button
          onClick={async () => {
            try {
              setPaymentLoading(true)
              const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
              
              if (!res) {
                alert('Razorpay SDK failed to load')
                setPaymentLoading(false)
                return
              }

              const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_key',
                amount: calculateTotal() * 100,
                currency: 'INR',
                name: 'Ecommerce Store',
                description: 'Thank you for your purchase',
                handler: function (response) {
                  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
                  // Here you would typically make an API call to your backend to verify the payment
                  console.log('Payment successful', { razorpay_payment_id, razorpay_order_id, razorpay_signature });
                  alert('Payment successful! Your order has been placed.');
                },
                modal: {
                  ondismiss: function() {
                    setPaymentLoading(false);
                  }
                },
                prefill: {
                  name: 'Customer Name',
                  email: 'customer@example.com',
                  contact: '9999999999'
                },
                theme: {
                  color: '#e80071'
                }
              }

              const paymentObject = new window.Razorpay(options)
              paymentObject.open()
            } catch (error) {
              console.error('Payment error:', error)
              alert('Payment failed. Please try again.')
            } finally {
              setPaymentLoading(false)
            }
          }}
          disabled={paymentLoading}
          className="w-full bg-[#e80071] text-white py-3 rounded-md hover:bg-[#c6005f] transition-colors duration-300 disabled:opacity-50"
        >
          {paymentLoading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  )
}

export default Cart