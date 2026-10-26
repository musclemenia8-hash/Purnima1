import React from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_INFO } from '../data/products';

export const WhatsAppFloatingButton: React.FC = () => {
  const { currentView } = useShop();

  // Hide on checkout to avoid distraction
  if (currentView === 'checkout') return null;

  return (
    <aside
      aria-label="Direct WhatsApp Concierge"
      className="fixed bottom-5 right-5 z-30 flex items-center group pointer-events-auto"
    >
      <a
        href={BRAND_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with purnima jewellers on WhatsApp"
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 px-3.5 rounded-full shadow-lg transition-all duration-300 transform group-hover:scale-105 active:scale-95"
      >
        {/* Official WhatsApp icon */}
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.059-1.146-.086-.312-.102-.715-.24-1.237-.466-2.185-.947-3.618-3.167-3.729-3.315-.112-.149-.894-1.19-.894-2.27 0-1.08.566-1.61.767-1.83.201-.22.44-.275.586-.275.144 0 .287.002.412.008.132.006.309-.05.483.368.175.419.596 1.455.648 1.562.053.107.088.232.017.373-.07.142-.105.23-.21.353-.105.124-.22.277-.314.372-.106.106-.217.221-.093.434.123.212.55 1.056 1.178 1.616.809.721 1.492.944 1.706 1.05.213.106.338.089.463-.054.125-.142.535-.623.678-.836.142-.213.286-.178.48-.106.195.071 1.233.582 1.444.688.212.107.353.159.405.249.053.089.053.518-.091.923z"/>
        </svg>
        <span className="hidden sm:inline-block text-xs font-medium tracking-wide">
          WhatsApp Store
        </span>
      </a>
    </aside>
  );
};
