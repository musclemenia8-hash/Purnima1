import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRIMARY_CATEGORIES } from '../data/products';
import { ArrowUpRight } from 'lucide-react';
import { ProductCategory } from '../types';

export const ThreeCategories: React.FC = () => {
  const { language, t, setSelectedCategory, setCurrentView } = useShop();

  const handleSelect = (categoryName: ProductCategory) => {
    setSelectedCategory(categoryName);
    setCurrentView('category');
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-[#B96F88] font-semibold">
          {language === 'hi' ? 'हस्तनिर्मित संग्रह' : 'Curated Pillars'}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-2 mb-3">
          {t('primaryCategoriesHeading')}
        </h2>
        <p className="text-sm text-[#6B6561] leading-relaxed">
          {t('primaryCategoriesSub')}
        </p>
      </div>

      {/* Exactly Three Primary Shopping Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {PRIMARY_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleSelect(cat.slug as ProductCategory)}
            className="group relative bg-white rounded-xl overflow-hidden border border-[#EADBDD] shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
          >
            {/* Image Container */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-[#F4E8EC]/40">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#1C1917] group-hover:bg-[#A95372] group-hover:text-white transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div className="absolute bottom-3 left-4 text-white">
                <span className="text-xs tracking-wider uppercase font-medium text-[#FAF7F5]/80">
                  {cat.itemCount} {language === 'hi' ? 'आभूषण' : 'Designs'}
                </span>
              </div>
            </div>

            {/* Text Card Body */}
            <div className="p-6 flex flex-col justify-between grow">
              <div>
                <h3 className="font-serif text-2xl font-normal text-[#1C1917] group-hover:text-[#A95372] transition-colors mb-2">
                  {language === 'hi' ? cat.nameHi : cat.name}
                </h3>
                <p className="text-xs text-[#6B6561] leading-relaxed line-clamp-2">
                  {language === 'hi' ? cat.descriptionHi : cat.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#F4E8EC] flex items-center justify-between">
                <span className="text-xs font-medium text-[#A95372] tracking-wider uppercase flex items-center gap-1 group-hover:underline">
                  {t('viewCollection')}
                </span>
                <span className="text-xs text-[#6B6561]/80 font-mono">22K Gold</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
