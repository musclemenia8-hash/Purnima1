import React from 'react';
import { useShop } from '../context/ShopContext';
import { Phone, MessageCircle } from 'lucide-react';
import { BRAND_INFO } from '../data/products';

export const AnnouncementStrip: React.FC = () => {
  const { t } = useShop();

  return (
    <div className="bg-[#A95372] text-[#FAF7F5] text-xs font-normal tracking-wide py-2 px-4 border-b border-[#8E4962]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <p className="line-clamp-1">{t('announcement')}</p>
        <div className="flex items-center gap-4 text-xs shrink-0">
          <a
            href={BRAND_INFO.phoneTel}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#F4E8EC]" />
            <span className="tabular-nums font-medium">{BRAND_INFO.formattedPhone}</span>
          </a>
          <span className="text-[#C17C91] opacity-60">|</span>
          <a
            href={BRAND_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#25D366] hover:text-[#20ba5a] font-medium transition-colors bg-white/10 px-2 py-0.5 rounded"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#25D366]"></span>
            <span className="text-[#FAF7F5]">WhatsApp Store</span>
          </a>
        </div>
      </div>
    </div>
  );
};
