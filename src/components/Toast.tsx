import React from 'react';
import { useShop } from '../context/ShopContext';
import { Check } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className="bg-[#1C1917]/95 text-white text-xs sm:text-sm font-medium py-2.5 px-4 rounded-full shadow-lg border border-[#A95372]/50 flex items-center gap-2 backdrop-blur-xs animate-in fade-in slide-in-from-bottom-3 duration-200">
        <span className="w-4 h-4 rounded-full bg-[#A95372] flex items-center justify-center shrink-0">
          <Check className="w-2.5 h-2.5 text-white" />
        </span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
