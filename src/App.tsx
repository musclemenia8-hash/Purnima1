import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementStrip } from './components/AnnouncementStrip';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ThreeCategories } from './components/ThreeCategories';
import { CuratedProductGrid } from './components/CuratedProductGrid';
import { BrandTrustSection } from './components/BrandTrustSection';
import { Footer } from './components/Footer';
import { ProductDetailsView } from './components/ProductDetailsView';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { WishlistPage } from './components/WishlistPage';
import { OrdersPage } from './components/OrdersPage';
import { ContactPage } from './components/ContactPage';
import { ShopAllView } from './components/ShopAllView';
import { PolicyViews } from './components/PolicyViews';
import { SmartSearchModal } from './components/SmartSearchModal';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Toast } from './components/Toast';
import { Product } from './types';

const MainLayout: React.FC = () => {
  const { currentView, selectedProduct, selectedCategory } = useShop();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleOpenQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F5] text-[#1C1917] selection:bg-[#B96F88]/20 selection:text-[#8D3B58]">
      {/* 1. Premium Announcement Strip */}
      <AnnouncementStrip />

      {/* 2. Header with Logo, Navigation & Action Badges */}
      <Header />

      {/* Main Dynamic View Content */}
      <main className="grow">
        {currentView === 'home' && (
          <>
            {/* 4. Cinematic 3-Slide Hero Carousel */}
            <HeroBanner />

            {/* 5. Exactly Three Primary Shopping Categories */}
            <ThreeCategories />

            {/* 6. One Curated Jewellery Product Grid */}
            <CuratedProductGrid onQuickView={handleOpenQuickView} />

            {/* 7. Compact Brand-Story & Trust Section */}
            <BrandTrustSection />
          </>
        )}

        {currentView === 'shop' && (
          <ShopAllView initialCategory={null} onQuickView={handleOpenQuickView} />
        )}

        {currentView === 'category' && (
          <ShopAllView initialCategory={selectedCategory} onQuickView={handleOpenQuickView} />
        )}

        {currentView === 'product' && selectedProduct && (
          <ProductDetailsView product={selectedProduct} />
        )}

        {currentView === 'cart' && <CartPage />}

        {currentView === 'checkout' && <CheckoutPage />}

        {currentView === 'wishlist' && <WishlistPage />}

        {currentView === 'orders' && <OrdersPage />}

        {currentView === 'contact' && <ContactPage />}

        {currentView === 'about' && <PolicyViews type="about" />}

        {currentView === 'policy-shipping' && <PolicyViews type="shipping" />}

        {currentView === 'policy-returns' && <PolicyViews type="returns" />}

        {currentView === 'policy-privacy' && <PolicyViews type="privacy" />}

        {currentView === 'policy-terms' && <PolicyViews type="terms" />}

        {currentView === 'faqs' && <PolicyViews type="faqs" />}
      </main>

      {/* 8. Complete but Organised Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <SmartSearchModal />
      <CartDrawer />
      <QuickViewModal product={quickViewProduct} onClose={handleCloseQuickView} />
      <WhatsAppFloatingButton />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
