import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { X, ShoppingBag, Eye, Heart, ShieldCheck } from 'lucide-react';
import { BRAND_INFO } from '../data/products';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { language, t, addToCart, buyNow, toggleWishlist, isInWishlist, setCurrentView, setSelectedProduct } = useShop();

  if (!product) return null;

  const isFav = isInWishlist(product.id);

  const handleFullDetails = () => {
    setSelectedProduct(product);
    setCurrentView('product');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF7F5] rounded-xl border border-[#EADBDD] shadow-2xl max-w-2xl w-full overflow-hidden z-10 max-h-[90vh] flex flex-col sm:flex-row">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full text-[#6B6561] hover:text-[#1C1917] z-20 shadow-xs"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image Left */}
        <div className="w-full sm:w-1/2 aspect-square bg-white relative shrink-0">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-3 left-3 p-2 rounded-full bg-white/90 text-[#6B6561] hover:text-[#A95372] shadow-xs"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-[#A95372] text-[#A95372]' : ''}`} />
          </button>
        </div>

        {/* Product Details Right */}
        <div className="p-6 flex flex-col justify-between overflow-y-auto grow space-y-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#B96F88] font-semibold">
              {language === 'hi' ? product.categoryHi : product.category} · {product.weightGrams}g
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#1C1917] font-normal mt-1 leading-snug">
              {language === 'hi' ? product.nameHi : product.name}
            </h3>
            <div className="mt-2 text-xl font-bold font-mono text-[#1C1917] tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-[#6B6561] mt-2 line-clamp-3 leading-relaxed">
              {language === 'hi' ? product.descriptionHi : product.description}
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#EADBDD] text-xs">
            <div className="flex justify-between text-[#6B6561]">
              <span>Gold Purity:</span>
              <span className="font-medium text-[#1C1917]">{product.goldPurity}</span>
            </div>
            <div className="flex justify-between text-[#6B6561]">
              <span>Gross Weight:</span>
              <span className="font-mono text-[#1C1917]">{product.specifications.grossWeight}</span>
            </div>
            <div className="flex justify-between text-[#6B6561]">
              <span>Hallmark:</span>
              <span className="font-medium text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                BIS Hallmarked (HUID)
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  addToCart(product, 1);
                  onClose();
                }}
                className="w-full py-2.5 px-3 bg-[#A95372] hover:bg-[#933E5D] text-white text-xs font-medium uppercase tracking-wider rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{t('addToBag')}</span>
              </button>

              <button
                onClick={handleFullDetails}
                className="w-full py-2.5 px-3 border border-[#C17C91] text-[#A95372] hover:bg-[#F4E8EC] text-xs font-medium uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Full Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
