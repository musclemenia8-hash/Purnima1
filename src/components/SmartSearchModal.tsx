import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowRight, Heart } from 'lucide-react';
import { Product } from '../types';

export const SmartSearchModal: React.FC = () => {
  const {
    language,
    t,
    isSearchOpen,
    setIsSearchOpen,
    setSelectedProduct,
    setCurrentView,
    toggleWishlist,
    isInWishlist,
  } = useShop();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.nameHi.includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.categoryHi.includes(trimmed) ||
          p.description.toLowerCase().includes(trimmed) ||
          p.descriptionHi.includes(trimmed)
      )
    : [];

  const handleSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    setIsSearchOpen(false);
  };

  const popularTerms = [
    { en: 'Bridal Choker', hi: 'ब्राइडल चोकर' },
    { en: 'Jhumka', hi: 'झुमके' },
    { en: 'Mayur Pendant', hi: 'मयूर पेंडेंट' },
    { en: 'Mangalsutra', hi: 'मंगलसूत्र' },
    { en: 'Gold Chain', hi: 'स्वर्ण चेन' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FAF7F5] rounded-xl shadow-2xl border border-[#EADBDD] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#EADBDD] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#A95372] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full bg-transparent text-sm sm:text-base text-[#1C1917] placeholder-[#6B6561]/60 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#6B6561] hover:text-[#1C1917]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-medium text-[#6B6561] hover:text-[#A95372] px-2 py-1 border border-[#EADBDD] rounded-md"
          >
            Esc
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
          {!trimmed && (
            <div>
              <span className="text-xs uppercase tracking-wider text-[#6B6561] font-semibold block mb-3">
                {language === 'hi' ? 'लोकप्रिय खोज सुझाव' : 'Popular Search Suggestions'}
              </span>
              <div className="flex flex-wrap gap-2">
                {popularTerms.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(language === 'hi' ? term.hi : term.en)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white border border-[#EADBDD] hover:border-[#A95372] hover:text-[#A95372] transition-colors"
                  >
                    {language === 'hi' ? term.hi : term.en}
                  </button>
                ))}
              </div>
            </div>
          )}

          {trimmed && results.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs text-[#6B6561] font-medium block">
                {results.length} {language === 'hi' ? 'आभूषण उपलब्ध हैं' : 'pieces found'}
              </span>
              <div className="divide-y divide-[#EADBDD]">
                {results.map((product) => {
                  const isFav = isInWishlist(product.id);
                  return (
                    <div
                      key={product.id}
                      onClick={() => handleSelect(product)}
                      className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/80 p-2 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-14 h-14 rounded-md object-cover bg-white border border-[#EADBDD] shrink-0"
                        />
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#B96F88] font-medium">
                            {language === 'hi' ? product.categoryHi : product.category} · {product.weightGrams}g
                          </span>
                          <h4 className="text-sm font-medium text-[#1C1917] group-hover:text-[#A95372] transition-colors">
                            {language === 'hi' ? product.nameHi : product.name}
                          </h4>
                          <span className="text-xs font-semibold text-[#1C1917] font-mono tabular-nums">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className="p-1.5 text-[#6B6561] hover:text-[#A95372]"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-[#A95372] text-[#A95372]' : ''}`} />
                        </button>
                        <ArrowRight className="w-4 h-4 text-[#A95372] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {trimmed && results.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-[#1C1917] font-medium mb-1">
                {t('noResults')}
              </p>
              <p className="text-xs text-[#6B6561]">
                {language === 'hi'
                  ? 'कृपया किसी अन्य शब्द जैसे "हार", "झुमके", अथवा "पेंडेंट" से खोजें।'
                  : 'Try searching for "Necklace", "Jhumka", "Pendant", or "Choker".'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
