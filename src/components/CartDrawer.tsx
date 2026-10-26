import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    language,
    t,
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotal,
    setCurrentView,
  } = useShop();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    setCurrentView('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F5] shadow-2xl flex flex-col justify-between border-l border-[#EADBDD]">
          {/* Header */}
          <div className="p-5 bg-white border-b border-[#EADBDD] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#A95372]" />
              <h2 className="font-serif text-lg font-semibold text-[#1C1917]">
                {t('bagHeading')} ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#6B6561] hover:text-[#1C1917] rounded-md transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-5 overflow-y-auto grow space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#F4E8EC] text-[#A95372] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="font-serif text-lg font-normal text-[#1C1917]">
                  {t('bagEmpty')}
                </h3>
                <p className="text-xs text-[#6B6561] max-w-xs mx-auto">
                  {t('bagEmptySub')}
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentView('shop');
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#A95372] text-white text-xs font-medium uppercase tracking-wider rounded-lg hover:bg-[#933E5D] transition-colors"
                >
                  {t('continueShopping')}
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#EADBDD]">
                {cart.map((item) => (
                  <div key={item.product.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-lg object-cover bg-white border border-[#EADBDD] shrink-0"
                    />
                    <div className="flex flex-col justify-between grow">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-medium text-[#1C1917] line-clamp-1">
                            {language === 'hi' ? item.product.nameHi : item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[#6B6561] hover:text-red-600 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-[11px] text-[#B96F88] font-mono">
                          {item.product.weightGrams}g · 22K Gold
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#EADBDD] rounded-md bg-white">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-[#F4E8EC] text-[#1C1917] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-[#F4E8EC] text-[#1C1917] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold font-mono tabular-nums text-[#1C1917]">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Summary & Actions */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#EADBDD] space-y-4">
              <div className="space-y-1.5 text-xs text-[#6B6561]">
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
                <div className="flex justify-between pt-2 border-t border-[#F4E8EC] text-sm font-bold text-[#1C1917]">
                  <span>{t('totalPrice')}</span>
                  <span className="font-mono tabular-nums text-base text-[#A95372]">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleViewCart}
                  className="w-full py-3 px-4 border border-[#C17C91] text-[#A95372] hover:bg-[#F4E8EC] text-xs font-medium uppercase tracking-wider rounded-lg transition-colors"
                >
                  View Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 px-4 bg-[#A95372] hover:bg-[#933E5D] text-white text-xs font-medium uppercase tracking-wider rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>{t('proceedCheckout')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
