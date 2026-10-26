import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Heart, ArrowLeft } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { language, t, wishlist, setCurrentView } = useShop();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal">
            {t('navWishlist')}
          </h1>
          <p className="text-xs text-[#6B6561] mt-1">
            {savedProducts.length} {language === 'hi' ? 'आभूषण सहेजे गए हैं' : 'saved gold jewellery pieces'}
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

      {savedProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-white rounded-xl border border-[#EADBDD] max-w-xl mx-auto p-8 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#F4E8EC] text-[#A95372] flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-normal text-[#1C1917]">
            {language === 'hi' ? 'आपकी विशलिस्ट खाली है' : 'Your Wishlist is Empty'}
          </h2>
          <p className="text-xs text-[#6B6561] max-w-sm mx-auto">
            {language === 'hi'
              ? 'जब आप किसी आभूषण पर दिल के चिन्ह को चुनते हैं, तो वह यहां सुरक्षित रहता है।'
              : 'Save your favorite necklaces, earrings, and royal gold pendants to view or purchase them later.'}
          </p>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-6 py-2.5 bg-[#A95372] hover:bg-[#933E5D] text-white text-xs font-medium uppercase tracking-wider rounded-lg transition-colors"
          >
            {t('continueShopping')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
