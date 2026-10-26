import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, ReceiptText, Truck, Sparkles, MapPin, Phone } from 'lucide-react';
import { BRAND_INFO } from '../data/products';

export const BrandTrustSection: React.FC = () => {
  const { language, t, setCurrentView } = useShop();

  const trustPillars = [
    {
      icon: ShieldCheck,
      title: t('trustBisTitle'),
      desc: t('trustBisDesc'),
    },
    {
      icon: ReceiptText,
      title: t('trustPriceTitle'),
      desc: t('trustPriceDesc'),
    },
    {
      icon: Truck,
      title: t('trustDeliveryTitle'),
      desc: t('trustDeliveryDesc'),
    },
    {
      icon: Sparkles,
      title: t('trustArtisanTitle'),
      desc: t('trustArtisanDesc'),
    },
  ];

  return (
    <section className="bg-white border-y border-[#EADBDD] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Brand Editorial Snippet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B96F88] font-semibold block mb-2">
              {language === 'hi' ? 'प्रतिष्ठान का संकल्प' : 'Generational Goldsmithing'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal leading-tight mb-4">
              {language === 'hi' ? 'शुद्ध स्वर्ण, प्रामाणिक विश्वास' : 'Authentic 22K Gold Crafted with Generational Devotion'}
            </h2>
            <p className="text-sm text-[#6B6561] leading-relaxed mb-6">
              {language === 'hi'
                ? 'purnima jewellers में प्रत्येक आभूषण बीआईएस हॉलमार्क प्रमाणिकता और पारदर्शी मूल्य निर्धारण के साथ प्रस्तुत किया जाता है। रायपुर स्थित हमारे प्रतिष्ठान पर सीधे पधारें अथवा भारत भर में सुरक्षित बीमित डिलीवरी प्राप्त करें।'
                : 'At purnima jewellers, every piece of gold jewellery reflects authentic Indian traditions, verified BIS hallmark purity, and absolute pricing transparency. Visit our showroom at Kabir Chowk, Ramnagar, Raipur or order with tamper-evident insured transit across India.'}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setCurrentView('contact')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#A95372] text-white hover:bg-[#933E5D] text-xs font-medium tracking-wider uppercase rounded-lg transition-colors shadow-xs"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'स्टोर का पता देखें' : 'Visit Raipur Store'}</span>
              </button>
              <a
                href={BRAND_INFO.phoneTel}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#C17C91] text-[#A95372] hover:bg-[#F4E8EC] text-xs font-medium tracking-wider uppercase rounded-lg transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="font-mono tabular-nums">{BRAND_INFO.formattedPhone}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {trustPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#FAF7F5] border border-[#EADBDD]/70 flex flex-col justify-between"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F4E8EC] text-[#A95372] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#1C1917] mb-1.5">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#6B6561] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
