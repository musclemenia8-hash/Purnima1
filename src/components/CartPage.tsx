import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag, Tag, ShieldCheck } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    language,
    t,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotal,
    setCurrentView,
    showToast,
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (!clean) return;

    if (clean === 'PURNIMA1000' || clean === 'PJGOLD') {
      const discount = 1000;
      setCouponDiscount(discount);
      setCouponApplied(true);
      setCouponError('');
      showToast(language === 'hi' ? '₹१,००० कूपन छूट लागू की गई!' : '₹1,000 festive coupon discount applied!');
    } else {
      setCouponError(language === 'hi' ? 'अमान्य कूपन कोड। कृपया मान्य कोड दर्ज करें।' : 'Invalid coupon code. Try PURNIMA1000 or PJGOLD');
    }
  };

  const finalPayable = Math.max(0, cartTotal - couponDiscount);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-[#F4E8EC] text-[#A95372] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10 stroke-1" />
        </div>
        <h2 className="font-serif text-3xl font-normal text-[#1C1917]">
          {t('bagEmpty')}
        </h2>
        <p className="text-sm text-[#6B6561] max-w-md mx-auto">
          {t('bagEmptySub')}
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="mt-6 px-8 py-3 bg-[#A95372] hover:bg-[#933E5D] text-white text-xs font-medium uppercase tracking-wider rounded-lg transition-colors"
        >
          {t('continueShopping')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal">
            {t('bagHeading')}
          </h1>
          <span className="text-xs text-[#6B6561]">
            {cart.length} {language === 'hi' ? 'आभूषण बैग में हैं' : 'pieces in your bag'}
          </span>
        </div>
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-flex items-center gap-1.5 text-xs text-[#A95372] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('continueShopping')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Cart Items List Left */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#EADBDD] divide-y divide-[#EADBDD] p-4 sm:p-6 shadow-xs">
          {cart.map((item) => (
            <div key={item.product.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover bg-[#FAF7F5] border border-[#EADBDD] shrink-0"
              />

              <div className="flex flex-col justify-between grow">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#B96F88] font-medium">
                        {language === 'hi' ? item.product.categoryHi : item.product.category}
                      </span>
                      <h3 className="font-serif text-lg text-[#1C1917] font-normal leading-snug">
                        {language === 'hi' ? item.product.nameHi : item.product.name}
                      </h3>
                      <p className="text-xs text-[#6B6561] font-mono mt-0.5">
                        Weight: {item.product.weightGrams}g · {item.product.goldPurity}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 text-[#6B6561] hover:text-red-600 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F4E8EC]">
                  <div className="flex items-center border border-[#EADBDD] rounded-md bg-white">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-[#F4E8EC] text-[#1C1917] transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-mono font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-[#F4E8EC] text-[#1C1917] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-[#6B6561] block">
                      @ ₹{item.product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-lg font-bold font-mono tabular-nums text-[#1C1917]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Right */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-[#EADBDD] p-6 shadow-xs space-y-5">
            <h2 className="font-serif text-xl font-normal text-[#1C1917] border-b border-[#F4E8EC] pb-3">
              {t('orderSummary')}
            </h2>

            {/* Coupon Application */}
            <div>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative grow">
                  <Tag className="w-3.5 h-3.5 text-[#B96F88] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code (e.g. PJGOLD)"
                    className="w-full pl-8 pr-3 py-2 text-xs border border-[#EADBDD] rounded-md uppercase font-mono placeholder:normal-case focus:outline-[#A95372]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1C1917] text-white hover:bg-[#383330] rounded-md text-xs font-medium transition-colors"
                >
                  Apply
                </button>
              </form>
              {couponApplied && (
                <p className="text-xs text-emerald-700 mt-1.5 font-medium">
                  ✓ ₹{couponDiscount} discount applied!
                </p>
              )}
              {couponError && (
                <p className="text-xs text-red-600 mt-1.5">{couponError}</p>
              )}
            </div>

            {/* Breakdown */}
            <div className="space-y-2.5 text-xs text-[#6B6561] pt-2 border-t border-[#F4E8EC]">
              <div className="flex justify-between">
                <span>{t('subtotal')}</span>
                <span className="font-mono tabular-nums text-[#1C1917]">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t('shipping')}</span>
                <span className="text-emerald-700 font-medium">{t('freeShipping')}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Festive Discount</span>
                  <span className="font-mono tabular-nums">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t border-[#F4E8EC] text-base font-bold text-[#1C1917]">
                <span>{t('totalPrice')}</span>
                <span className="font-mono tabular-nums text-xl text-[#A95372]">
                  ₹{finalPayable.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('checkout')}
              className="w-full py-3.5 px-6 bg-[#A95372] hover:bg-[#933E5D] text-white text-xs sm:text-sm font-medium tracking-wider uppercase rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <span>{t('proceedCheckout')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-[#FAF7F5] rounded-xl border border-[#EADBDD] text-xs text-[#6B6561] space-y-2">
            <div className="flex items-center gap-2 text-[#1C1917] font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Insured Delivery</span>
            </div>
            <p className="leading-relaxed">
              Every shipment is verified with tamper-proof seal and transit insurance underwritten by leading Indian underwriters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
