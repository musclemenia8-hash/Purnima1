import React from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { Heart, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { language, t, setSelectedProduct, setCurrentView, toggleWishlist, isInWishlist, addToCart } = useShop();

  const isFavorited = isInWishlist(product.id);

  const handleClick = () => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  return (
    <div className="group bg-white rounded-lg border border-[#EADBDD] overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300 relative">
      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-[#FAF7F5] overflow-hidden cursor-pointer" onClick={handleClick}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
          loading="lazy"
        />

        {/* Subtle Category Kicker Tag */}
        <div className="absolute top-2.5 left-2.5">
          <span className="text-[10px] tracking-wider uppercase font-semibold text-[#6B6561] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-sm border border-[#EADBDD]/50 shadow-2xs">
            {product.weightGrams}g · 22K
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-colors shadow-2xs ${
            isFavorited
              ? 'bg-white text-[#A95372]'
              : 'bg-white/80 text-[#6B6561] hover:text-[#A95372] hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current text-[#A95372]' : ''}`} />
        </button>

        {/* Quick View Floating Action on Desktop */}
        <div className="absolute inset-x-3 bottom-3 hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onQuickView) onQuickView(product);
              else handleClick();
            }}
            className="flex-1 py-2 px-3 bg-white/95 text-[#1C1917] hover:bg-[#FAF7F5] text-xs font-medium rounded shadow-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#A95372]" />
            <span>{t('quickView')}</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="p-2 bg-[#A95372] text-white hover:bg-[#933E5D] rounded shadow-xs transition-colors"
            title={t('addToBag')}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between grow">
        <div>
          <span className="text-[11px] text-[#B96F88] font-medium tracking-wide uppercase block mb-1">
            {language === 'hi' ? product.categoryHi : product.category}
          </span>
          <h4
            onClick={handleClick}
            className="font-serif text-base sm:text-lg text-[#1C1917] hover:text-[#A95372] font-normal leading-snug cursor-pointer line-clamp-1 transition-colors"
          >
            {language === 'hi' ? product.nameHi : product.name}
          </h4>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[#F4E8EC] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-[#6B6561]">
              {language === 'hi' ? 'कुल देय राशि' : 'All-Inclusive'}
            </span>
            <span className="text-sm sm:text-base font-semibold text-[#1C1917] font-mono tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="md:hidden p-2 text-[#A95372] bg-[#F4E8EC] hover:bg-[#A95372] hover:text-white rounded-full transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
