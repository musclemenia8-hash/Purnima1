import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { ArrowRight } from 'lucide-react';

interface CuratedProductGridProps {
  onQuickView?: (product: Product) => void;
}

export const CuratedProductGrid: React.FC<CuratedProductGridProps> = ({ onQuickView }) => {
  const { language, t, setCurrentView } = useShop();
  const [filter, setFilter] = useState<'All' | 'Necklaces' | 'Earrings' | 'Pendants & Chains'>('All');

  const filteredProducts = filter === 'All'
    ? PRODUCTS.slice(0, 8)
    : PRODUCTS.filter((p) => p.category === filter).slice(0, 8);

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#EADBDD]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#B96F88] font-semibold">
            {language === 'hi' ? 'प्रामाणिक स्वर्ण संग्रह' : 'Authoritative Catalogue'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-2">
            {t('curatedSelection')}
          </h2>
          <p className="text-sm text-[#6B6561] mt-2 max-w-xl">
            {t('curatedSubtitle')}
          </p>
        </div>

        {/* Category Tabs & View All Link */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {(['All', 'Necklaces', 'Earrings', 'Pendants & Chains'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${
                filter === tab
                  ? 'bg-[#A95372] text-white shadow-xs'
                  : 'bg-white text-[#6B6561] hover:text-[#1C1917] border border-[#EADBDD]'
              }`}
            >
              {tab === 'All'
                ? (language === 'hi' ? 'सभी' : 'All')
                : tab === 'Necklaces'
                ? (language === 'hi' ? 'हार' : 'Necklaces')
                : tab === 'Earrings'
                ? (language === 'hi' ? 'झुमके' : 'Earrings')
                : (language === 'hi' ? 'पेंडेंट व चेन' : 'Pendants & Chains')}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Products (4 col desktop, 2 col mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
        ))}
      </div>

      {/* Bottom Route into Full Catalogue */}
      <div className="mt-12 text-center">
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-[#C17C91] text-[#A95372] hover:bg-[#A95372] hover:text-white text-xs sm:text-sm font-medium tracking-wider uppercase rounded-lg transition-colors shadow-xs"
        >
          <span>{t('viewAllPieces')} (13)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
