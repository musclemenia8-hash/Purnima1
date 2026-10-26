import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { ProductCategory, Product } from '../types';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ShopAllViewProps {
  initialCategory?: ProductCategory | null;
  onQuickView?: (product: Product) => void;
}

export const ShopAllView: React.FC<ShopAllViewProps> = ({ initialCategory = null, onQuickView }) => {
  const { language, t, selectedCategory, setSelectedCategory } = useShop();

  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>(
    selectedCategory || initialCategory || 'All'
  );
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'weight'>('featured');
  const [maxWeight, setMaxWeight] = useState<number>(30);

  const categories: (ProductCategory | 'All')[] = ['All', 'Necklaces', 'Earrings', 'Pendants & Chains'];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    result = result.filter((p) => p.weightGrams <= maxWeight);

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'weight':
        result.sort((a, b) => a.weightGrams - b.weightGrams);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [activeCategory, sortBy, maxWeight]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Page Title & Category Description */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-[#B96F88] font-semibold">
          {language === 'hi' ? 'संपूर्ण स्वर्ण आभूषण तालिका' : 'Official Hallmarked Catalogue'}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-2 mb-3">
          {activeCategory === 'All'
            ? t('navShopAll')
            : activeCategory === 'Necklaces'
            ? t('navNecklaces')
            : activeCategory === 'Earrings'
            ? t('navEarrings')
            : t('navPendantsChains')}
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6561] leading-relaxed">
          {language === 'hi'
            ? '२२ कैरेट शुद्ध सोने के प्रामाणिक आभूषण। सभी चित्र वास्तविक आभूषणों के हैं।'
            : 'Explore pure 22K gold necklaces, royal jhumkas, and hallmarked chains. Every product features verified catalogue photography and transparent pricing.'}
        </p>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="bg-white rounded-xl border border-[#EADBDD] p-4 mb-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedCategory(cat === 'All' ? null : cat);
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#A95372] text-white shadow-xs'
                  : 'bg-[#FAF7F5] text-[#6B6561] hover:text-[#1C1917] border border-[#EADBDD]'
              }`}
            >
              {cat === 'All'
                ? (language === 'hi' ? 'सभी आभूषण' : 'All Jewellery')
                : cat === 'Necklaces'
                ? (language === 'hi' ? 'हार एवं चोकर' : 'Necklaces')
                : cat === 'Earrings'
                ? (language === 'hi' ? 'झुमके' : 'Earrings')
                : (language === 'hi' ? 'पेंडेंट एवं चेन' : 'Pendants & Chains')}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end text-xs">
          <span className="text-[#6B6561] shrink-0">
            {filteredAndSortedProducts.length} {language === 'hi' ? 'आभूषण' : 'pieces'}
          </span>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#B96F88]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FAF7F5] border border-[#EADBDD] rounded-lg px-2.5 py-1.5 text-xs text-[#1C1917] focus:outline-[#A95372]"
            >
              <option value="featured">{t('sortFeatured')}</option>
              <option value="price-asc">{t('sortPriceLow')}</option>
              <option value="price-desc">{t('sortPriceHigh')}</option>
              <option value="weight">{t('sortWeight')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-xl border border-[#EADBDD] p-8 max-w-md mx-auto">
          <p className="text-sm font-medium text-[#1C1917] mb-2">No matching jewellery items</p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSelectedCategory(null);
            }}
            className="text-xs text-[#A95372] underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </div>
      )}
    </div>
  );
};
