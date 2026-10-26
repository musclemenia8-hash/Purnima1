import React from 'react';
import { useShop } from '../context/ShopContext';
import { Package, CheckCircle2, Clock, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { OrderStatus } from '../types';

export const OrdersPage: React.FC = () => {
  const { language, t, orders, setCurrentView } = useShop();

  const statuses: OrderStatus[] = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];

  const getStepIndex = (current: OrderStatus) => {
    return statuses.indexOf(current);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal">
            {t('ordersHeading')}
          </h1>
          <p className="text-xs text-[#6B6561] mt-1">
            {orders.length} {language === 'hi' ? 'आर्डर दर्ज हैं' : 'verified purchase records'}
          </p>
        </div>

        <button
          onClick={() => setCurrentView('shop')}
          className="inline-flex items-center gap-1.5 text-xs text-[#A95372] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('continueShopping')}</span>
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-white rounded-xl border border-[#EADBDD] max-w-xl mx-auto p-8 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#F4E8EC] text-[#A95372] flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-normal text-[#1C1917]">
            {t('noOrders')}
          </h2>
          <p className="text-xs text-[#6B6561] max-w-sm mx-auto">
            {t('noOrdersSub')}
          </p>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-6 py-2.5 bg-[#A95372] hover:bg-[#933E5D] text-white text-xs font-medium uppercase tracking-wider rounded-lg transition-colors"
          >
            {t('continueShopping')}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const currentIdx = getStepIndex(order.orderStatus);

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-[#EADBDD] p-5 sm:p-6 shadow-xs space-y-5"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F4E8EC] text-xs">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <div>
                      <span className="text-[#6B6561] block">{t('orderIdLabel')}</span>
                      <span className="font-mono font-bold text-[#1C1917]">{order.orderNumber}</span>
                    </div>
                    <div>
                      <span className="text-[#6B6561] block">Order Date</span>
                      <span className="font-medium text-[#1C1917]">{order.date}</span>
                    </div>
                    <div>
                      <span className="text-[#6B6561] block">Payment Status</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3" />
                        {order.paymentStatus} ({order.paymentMethod})
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[#6B6561] block">Total Amount</span>
                    <span className="font-mono text-base font-bold text-[#A95372]">
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Tracking Stepper */}
                <div className="py-2">
                  <span className="text-[11px] uppercase tracking-wider text-[#6B6561] font-semibold block mb-3">
                    {t('orderStatusLabel')}
                  </span>
                  <div className="grid grid-cols-4 gap-2 relative">
                    {statuses.map((step, idx) => {
                      const isDone = idx <= currentIdx;
                      const isCurrent = idx === currentIdx;

                      return (
                        <div key={step} className="flex flex-col items-center text-center">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold mb-1.5 transition-colors ${
                              isDone
                                ? 'bg-[#A95372] text-white shadow-2xs'
                                : 'bg-[#FAF7F5] border border-[#EADBDD] text-[#6B6561]'
                            }`}
                          >
                            {isDone ? '✓' : idx + 1}
                          </div>
                          <span
                            className={`text-[10px] sm:text-xs leading-tight ${
                              isCurrent
                                ? 'font-bold text-[#A95372]'
                                : isDone
                                ? 'font-medium text-[#1C1917]'
                                : 'text-[#6B6561]'
                            }`}
                          >
                            {step === 'Order Placed'
                              ? t('orderPlaced')
                              : step === 'Processing'
                              ? t('orderProcessing')
                              : step === 'Shipped'
                              ? t('orderShipped')
                              : t('orderDelivered')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items Ordered */}
                <div className="pt-3 border-t border-[#F4E8EC] space-y-3">
                  <span className="text-xs font-semibold text-[#1C1917] block">
                    Purchased Pieces ({order.items.length})
                  </span>
                  <div className="divide-y divide-[#F4E8EC]">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.images[0]}
                            alt=""
                            className="w-14 h-14 rounded-md object-cover border border-[#EADBDD] bg-[#FAF7F5]"
                          />
                          <div>
                            <h4 className="text-xs sm:text-sm font-medium text-[#1C1917]">
                              {language === 'hi' ? item.product.nameHi : item.product.name}
                            </h4>
                            <span className="text-xs text-[#6B6561] font-mono">
                              {item.product.weightGrams}g · {item.product.goldPurity} · Qty: {item.quantity}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs sm:text-sm font-mono font-semibold text-[#1C1917] tabular-nums">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Destination */}
                <div className="pt-3 border-t border-[#F4E8EC] text-xs text-[#6B6561] flex flex-col sm:flex-row justify-between gap-2 bg-[#FAF7F5] p-3 rounded-lg">
                  <div>
                    <span className="font-semibold text-[#1C1917] block mb-0.5">Delivery Address:</span>
                    <span>
                      {order.shippingAddress.fullName}, {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                    </span>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <span className="text-emerald-700 font-medium flex items-center sm:justify-end gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Insured Indian Postal / Courier Transit
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
