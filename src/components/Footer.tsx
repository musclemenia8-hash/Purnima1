import React from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_INFO } from '../data/products';
import { AppView, ProductCategory } from '../types';
import {
  MapPin,
  Phone,
  Instagram,
  Facebook,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t, setCurrentView, setSelectedCategory } = useShop();

  const handleNav = (view: AppView, cat?: ProductCategory) => {
    if (cat) {
      setSelectedCategory(cat);
      setCurrentView('category');
    } else {
      setCurrentView(view);
    }
  };

  return (
    <footer className="bg-[#1C1917] text-[#FAF7F5] border-t border-[#383330]">
      {/* Upper Footer: Main Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={BRAND_INFO.logoUrl}
                alt="purnima jewellers logo"
                className="w-12 h-12 rounded-full object-cover border border-[#C17C91]/50"
              />
              <span className="font-serif text-2xl font-normal lowercase tracking-tight text-white">
                purnima jewellers
              </span>
            </div>

            <p className="text-xs text-[#FAF7F5]/70 leading-relaxed max-w-sm">
              {language === 'hi'
                ? 'शुद्ध २२ कैरेट हॉलमार्क स्वर्ण आभूषण, पारंपरिक भारतीय शिल्पकला और पारदर्शी मूल्य निर्धारण का विश्वसनीय नाम। रायपुर, छत्तीसगढ़।'
                : 'Handcrafted BIS hallmarked 22K pure gold jewellery celebrating Indian traditions, royal bridal designs, and everyday elegance. Raipur, Chhattisgarh.'}
            </p>

            {/* Official Business Address */}
            <div className="space-y-2 pt-2 text-xs text-[#FAF7F5]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B96F88] shrink-0 mt-0.5" />
                <span>{BRAND_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B96F88] shrink-0" />
                <a
                  href={BRAND_INFO.phoneTel}
                  className="hover:text-[#F4E8EC] font-mono tabular-nums underline-offset-2 hover:underline"
                >
                  {BRAND_INFO.formattedPhone}
                </a>
              </div>
            </div>

            {/* Direct WhatsApp & Socials */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-medium rounded-md transition-colors"
              >
                {/* Recognizable WhatsApp Icon */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.059-1.146-.086-.312-.102-.715-.24-1.237-.466-2.185-.947-3.618-3.167-3.729-3.315-.112-.149-.894-1.19-.894-2.27 0-1.08.566-1.61.767-1.83.201-.22.44-.275.586-.275.144 0 .287.002.412.008.132.006.309-.05.483.368.175.419.596 1.455.648 1.562.053.107.088.232.017.373-.07.142-.105.23-.21.353-.105.124-.22.277-.314.372-.106.106-.217.221-.093.434.123.212.55 1.056 1.178 1.616.809.721 1.492.944 1.706 1.05.213.106.338.089.463-.054.125-.142.535-.623.678-.836.142-.213.286-.178.48-.106.195.071 1.233.582 1.444.688.212.107.353.159.405.249.053.089.053.518-.091.923z"/>
                </svg>
                <span>WhatsApp</span>
              </a>

              <a
                href={BRAND_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-xs text-[#FAF7F5] rounded-md transition-colors"
                title="Instagram Profile"
              >
                <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                <span className="font-mono text-[11px]">{BRAND_INFO.instagramHandle}</span>
              </a>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-xs text-[#FAF7F5]/80 rounded-md">
                <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
                <span className="text-[11px]">{BRAND_INFO.facebookName}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Jewellery Collections */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4 tracking-wide">
              {language === 'hi' ? 'आभूषण श्रेणियां' : 'Jewellery'}
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF7F5]/70">
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-white transition-colors"
                >
                  {t('navShopAll')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('category', 'Necklaces')}
                  className="hover:text-white transition-colors"
                >
                  {t('navNecklaces')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('category', 'Earrings')}
                  className="hover:text-white transition-colors"
                >
                  {t('navEarrings')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('category', 'Pendants & Chains')}
                  className="hover:text-white transition-colors"
                >
                  {t('navPendantsChains')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('orders')}
                  className="hover:text-white transition-colors"
                >
                  {t('navOrders')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Care & Policies */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4 tracking-wide">
              {language === 'hi' ? 'ग्राहक सेवा एवं नीतियां' : 'Customer Care'}
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF7F5]/70">
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors"
                >
                  {t('navContact')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors"
                >
                  {t('navAbout')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('policy-shipping')}
                  className="hover:text-white transition-colors"
                >
                  {t('policyShippingTitle')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('policy-returns')}
                  className="hover:text-white transition-colors"
                >
                  {t('policyReturnsTitle')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faqs')}
                  className="hover:text-white transition-colors"
                >
                  {t('faqsTitle')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Security & Store Hours */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4 tracking-wide">
              {t('hoursTitle')}
            </h4>
            <p className="text-xs text-[#FAF7F5]/70 leading-relaxed mb-4">
              {t('hoursText')}
            </p>
            <div className="pt-2 border-t border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#FAF7F5]/80">
                <ShieldCheck className="w-4 h-4 text-[#B96F88]" />
                <span>BIS 916 Hallmarked Gold</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#FAF7F5]/80">
                <CreditCard className="w-4 h-4 text-[#B96F88]" />
                <span>Secure UPI & Card Gateways</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Terms */}
      <div className="border-t border-white/10 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#FAF7F5]/60">
        <p>
          © 2026 <span className="lowercase font-medium text-[#FAF7F5]">purnima jewellers</span>. All rights reserved. Kabir Chowk, Ramnagar, Raipur, Chhattisgarh.
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNav('policy-privacy')}
            className="hover:text-white transition-colors"
          >
            {t('policyPrivacyTitle')}
          </button>
          <span>·</span>
          <button
            onClick={() => handleNav('policy-terms')}
            className="hover:text-white transition-colors"
          >
            {t('policyTermsTitle')}
          </button>
        </div>
      </div>
    </footer>
  );
};
