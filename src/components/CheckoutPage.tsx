import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Address } from '../types';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Building2,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Phone,
  MapPin,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    language,
    t,
    cart,
    cartSubtotal,
    cartTotal,
    savedAddresses,
    saveAddress,
    placeOrder,
    lastOrder,
    setCurrentView,
    checkDeliveryPincode,
  } = useShop();

  const defaultAddr = savedAddresses[0] || {
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: 'Raipur',
    state: 'Chhattisgarh',
    pincode: '492009',
  };

  const [address, setAddress] = useState<Address>(defaultAddr);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiVpa, setUpiVpa] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle address form changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validations
    if (!address.fullName.trim() || !address.phone.trim() || !address.addressLine1.trim() || !address.pincode.trim()) {
      setErrorMessage(language === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें।' : 'Please fill all required address fields.');
      return;
    }

    const pinCheck = checkDeliveryPincode(address.pincode);
    if (!pinCheck.serviceable) {
      setErrorMessage(pinCheck.message);
      return;
    }

    if (paymentMethod === 'upi' && upiVpa && !upiVpa.includes('@')) {
      setErrorMessage(language === 'hi' ? 'कृपया मान्य UPI आईडी दर्ज करें (उदा. name@okhdfcbank)' : 'Please enter a valid UPI ID (e.g. name@okhdfcbank)');
      return;
    }

    setIsProcessing(true);

    // Simulate secure Indian payment gateway order creation & cryptographic signature validation
    setTimeout(async () => {
      saveAddress(address);
      const methodName =
        paymentMethod === 'upi'
          ? `UPI (${upiVpa || 'Google Pay / PhonePe QR'})`
          : paymentMethod === 'card'
          ? 'Credit / Debit Card'
          : 'Net Banking';

      const res = await placeOrder({
        address,
        paymentMethod: methodName,
      });

      setIsProcessing(false);
      if (res.success) {
        setOrderComplete(true);
      } else {
        setErrorMessage('Payment verification encountered an issue. Please try again.');
      }
    }, 1800);
  };

  // Order Success View
  if (orderComplete && lastOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B96F88]">
            {language === 'hi' ? 'भुगतान सफल एवं सत्यापित' : 'Verified & Confirmed'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-2">
            {t('orderSuccessTitle')}
          </h1>
          <p className="text-sm text-[#6B6561] mt-2 max-w-lg mx-auto">
            {t('orderSuccessSub')}
          </p>
        </div>

        {/* Receipt Box */}
        <div className="bg-white rounded-xl border border-[#EADBDD] p-6 text-left max-w-md mx-auto shadow-xs space-y-3">
          <div className="flex justify-between text-xs pb-3 border-b border-[#F4E8EC]">
            <span className="text-[#6B6561]">{t('orderIdLabel')}</span>
            <span className="font-mono font-bold text-[#1C1917]">{lastOrder.orderNumber}</span>
          </div>
          <div className="flex justify-between text-xs pb-3 border-b border-[#F4E8EC]">
            <span className="text-[#6B6561]">Transaction Proof</span>
            <span className="font-mono text-[11px] text-[#A95372]">{lastOrder.paymentTransactionId}</span>
          </div>
          <div className="flex justify-between text-xs pb-3 border-b border-[#F4E8EC]">
            <span className="text-[#6B6561]">Payment Mode</span>
            <span className="font-medium text-[#1C1917]">{lastOrder.paymentMethod}</span>
          </div>
          <div className="flex justify-between text-xs pb-3 border-b border-[#F4E8EC]">
            <span className="text-[#6B6561]">Delivery To</span>
            <span className="font-medium text-[#1C1917] text-right line-clamp-1">
              {lastOrder.shippingAddress.fullName}, {lastOrder.shippingAddress.city}
            </span>
          </div>
          <div className="flex justify-between text-sm font-bold pt-1 text-[#1C1917]">
            <span>Total Paid (22K Gold)</span>
            <span className="font-mono text-[#A95372]">₹{lastOrder.total.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setCurrentView('orders')}
            className="px-6 py-3 bg-[#A95372] hover:bg-[#933E5D] text-white text-xs font-medium uppercase tracking-wider rounded-lg transition-colors shadow-xs"
          >
            {t('ordersHeading')}
          </button>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-6 py-3 border border-[#C17C91] text-[#A95372] hover:bg-[#F4E8EC] text-xs font-medium uppercase tracking-wider rounded-lg transition-colors"
          >
            {t('continueShopping')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <button
            onClick={() => setCurrentView('cart')}
            className="inline-flex items-center gap-1.5 text-xs text-[#6B6561] hover:text-[#A95372] mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Shopping Bag</span>
          </button>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal">
            {t('checkoutHeading')}
          </h1>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <Lock className="w-3.5 h-3.5" />
          <span>256-bit SSL Secure Checkout</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Form: Delivery Address & Payment Method */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1: Delivery Address */}
          <div className="bg-white rounded-xl border border-[#EADBDD] p-6 shadow-xs space-y-4">
            <h2 className="font-serif text-xl font-normal text-[#1C1917] flex items-center gap-2 border-b border-[#F4E8EC] pb-3">
              <MapPin className="w-5 h-5 text-[#A95372]" />
              <span>{t('deliveryAddress')}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1">
                  {t('fullName')} *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={address.fullName}
                  onChange={handleAddressChange}
                  placeholder="e.g. Pooja Verma"
                  className="w-full text-xs p-2.5 border border-[#EADBDD] rounded-lg focus:outline-[#A95372]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1">
                  {t('phoneNumber')} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={address.phone}
                  onChange={handleAddressChange}
                  placeholder="10-digit mobile number"
                  className="w-full text-xs p-2.5 border border-[#EADBDD] rounded-lg focus:outline-[#A95372] font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#1C1917] mb-1">
                  {t('streetAddress')} *
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  required
                  value={address.addressLine1}
                  onChange={handleAddressChange}
                  placeholder="Flat/House No., Building Name, Street"
                  className="w-full text-xs p-2.5 border border-[#EADBDD] rounded-lg focus:outline-[#A95372]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#1C1917] mb-1">
                  {t('landmark')}
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={address.addressLine2 || ''}
                  onChange={handleAddressChange}
                  placeholder="Near landmark or colony"
                  className="w-full text-xs p-2.5 border border-[#EADBDD] rounded-lg focus:outline-[#A95372]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1">
                  {t('city')} *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={address.city}
                  onChange={handleAddressChange}
                  className="w-full text-xs p-2.5 border border-[#EADBDD] rounded-lg focus:outline-[#A95372]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1">
                  {t('state')} *
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  value={address.state}
                  onChange={handleAddressChange}
                  className="w-full text-xs p-2.5 border border-[#EADBDD] rounded-lg focus:outline-[#A95372]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1">
                  {t('pincode')} *
                </label>
                <input
                  type="text"
                  name="pincode"
                  maxLength={6}
                  required
                  value={address.pincode}
                  onChange={handleAddressChange}
                  placeholder="492009"
                  className="w-full text-xs p-2.5 border border-[#EADBDD] rounded-lg focus:outline-[#A95372] font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="bg-white rounded-xl border border-[#EADBDD] p-6 shadow-xs space-y-4">
            <h2 className="font-serif text-xl font-normal text-[#1C1917] flex items-center gap-2 border-b border-[#F4E8EC] pb-3">
              <CreditCard className="w-5 h-5 text-[#A95372]" />
              <span>{t('paymentMethod')}</span>
            </h2>

            <div className="space-y-3">
              {/* UPI Option */}
              <label
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                  paymentMethod === 'upi'
                    ? 'border-[#A95372] bg-[#F4E8EC]/30'
                    : 'border-[#EADBDD] hover:bg-[#FAF7F5]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="mt-1 text-[#A95372] focus:ring-[#A95372]"
                />
                <div className="grow space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#1C1917] flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-[#A95372]" />
                      {t('payUpi')}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Instant · Zero Surcharge
                    </span>
                  </div>
                  {paymentMethod === 'upi' && (
                    <div className="pt-2">
                      <input
                        type="text"
                        value={upiVpa}
                        onChange={(e) => setUpiVpa(e.target.value)}
                        placeholder="Enter UPI ID (e.g. mobile@upi or name@okaxis) or leave blank for QR"
                        className="w-full text-xs p-2 border border-[#EADBDD] rounded-md bg-white focus:outline-[#A95372]"
                      />
                    </div>
                  )}
                </div>
              </label>

              {/* Card Option */}
              <label
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-[#A95372] bg-[#F4E8EC]/30'
                    : 'border-[#EADBDD] hover:bg-[#FAF7F5]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mt-1 text-[#A95372] focus:ring-[#A95372]"
                />
                <div>
                  <span className="text-sm font-medium text-[#1C1917] flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#A95372]" />
                    {t('payCard')}
                  </span>
                  <span className="text-xs text-[#6B6561] block mt-0.5">
                    Encrypted via verified Indian payment gateway. Raw card numbers are never stored.
                  </span>
                </div>
              </label>

              {/* Net Banking */}
              <label
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                  paymentMethod === 'netbanking'
                    ? 'border-[#A95372] bg-[#F4E8EC]/30'
                    : 'border-[#EADBDD] hover:bg-[#FAF7F5]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={paymentMethod === 'netbanking'}
                  onChange={() => setPaymentMethod('netbanking')}
                  className="mt-1 text-[#A95372] focus:ring-[#A95372]"
                />
                <div>
                  <span className="text-sm font-medium text-[#1C1917] flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#A95372]" />
                    {t('payNetbanking')}
                  </span>
                  <span className="text-xs text-[#6B6561] block mt-0.5">
                    SBI, HDFC, ICICI, Axis Bank, PNB and 50+ Indian banks.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Right Column: Order Review & Confirmation CTA */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-[#EADBDD] p-6 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-normal text-[#1C1917] border-b border-[#F4E8EC] pb-3">
              Order Review ({cart.length})
            </h3>

            <div className="max-h-60 overflow-y-auto divide-y divide-[#F4E8EC] pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="w-10 h-10 rounded object-cover border border-[#EADBDD]"
                    />
                    <div>
                      <span className="font-medium text-[#1C1917] line-clamp-1">
                        {language === 'hi' ? item.product.nameHi : item.product.name}
                      </span>
                      <span className="text-[11px] text-[#6B6561]">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-mono tabular-nums font-medium text-[#1C1917]">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#F4E8EC] space-y-2 text-xs text-[#6B6561]">
              <div className="flex justify-between">
                <span>Gold Jewellery Value</span>
                <span className="font-mono tabular-nums text-[#1C1917]">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Insured Transit</span>
                <span className="text-emerald-700 font-medium">{t('freeShipping')}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#F4E8EC] text-base font-bold text-[#1C1917]">
                <span>Total Amount</span>
                <span className="font-mono tabular-nums text-lg text-[#A95372]">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 px-6 bg-[#A95372] hover:bg-[#933E5D] disabled:bg-[#C17C91] text-white text-xs sm:text-sm font-medium tracking-wider uppercase rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('verifyingPayment')}</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>{t('placeOrder')}</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 bg-[#FAF7F5] rounded-xl border border-[#EADBDD] text-xs text-[#6B6561] space-y-2">
            <div className="flex items-center gap-2 text-[#1C1917] font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Goldsmith Direct Guarantee</span>
            </div>
            <p className="leading-relaxed">
              Every package is sealed under CCTV dispatch in Ramnagar, Raipur, accompanied by official invoice, HUID certificate, and 100% transit insurance.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
