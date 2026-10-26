import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_INFO } from '../data/products';
import { ProductCategory } from '../types';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Package,
  Globe,
  Phone,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    currentView,
    setCurrentView,
    setSelectedCategory,
    setIsSearchOpen,
    setIsCartOpen,
    cartCount,
    wishlist,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: string, category?: ProductCategory) => {
    if (category) {
      setSelectedCategory(category);
      setCurrentView('category');
    } else {
      setCurrentView(view as any);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F5]/95 backdrop-blur-md border-b border-[#EADBDD] transition-shadow">
      {/* Primary Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#1C1917] hover:text-[#A95372] focus:outline-none"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Official Brand Logo Lockup */}
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 text-left focus:outline-none group"
            >
              <img
                src={BRAND_INFO.logoUrl}
                alt="purnima jewellers official emblem"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-[#C17C91]/40 shadow-xs transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl md:text-[26px] tracking-tight text-[#1C1917] font-semibold lowercase leading-none">
                  purnima jewellers
                </span>
                <span className="text-[10px] sm:text-[11px] tracking-widest text-[#B96F88] uppercase font-medium mt-1">
                  Raipur · Est. 1997
                </span>
              </div>
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#1C1917]">
            <button
              onClick={() => handleNav('home')}
              className={`hover:text-[#A95372] transition-colors py-1 ${
                currentView === 'home'
                  ? 'text-[#A95372] border-b-2 border-[#A95372]'
                  : 'text-[#1C1917]'
              }`}
            >
              {t('navHome')}
            </button>
            <button
              onClick={() => handleNav('shop')}
              className={`hover:text-[#A95372] transition-colors py-1 ${
                currentView === 'shop'
                  ? 'text-[#A95372] border-b-2 border-[#A95372]'
                  : 'text-[#1C1917]'
              }`}
            >
              {t('navShopAll')}
            </button>
            <button
              onClick={() => handleNav('category', 'Necklaces')}
              className="hover:text-[#A95372] transition-colors py-1"
            >
              {t('navNecklaces')}
            </button>
            <button
              onClick={() => handleNav('category', 'Earrings')}
              className="hover:text-[#A95372] transition-colors py-1"
            >
              {t('navEarrings')}
            </button>
            <button
              onClick={() => handleNav('category', 'Pendants & Chains')}
              className="hover:text-[#A95372] transition-colors py-1"
            >
              {t('navPendantsChains')}
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`hover:text-[#A95372] transition-colors py-1 ${
                currentView === 'contact'
                  ? 'text-[#A95372] border-b-2 border-[#A95372]'
                  : 'text-[#1C1917]'
              }`}
            >
              {t('navContact')}
            </button>
          </nav>

          {/* Right: Actions (Search, Language, Wishlist, Orders, Bag) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Smart Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#1C1917] hover:text-[#A95372] hover:bg-[#F4E8EC] rounded-full transition-colors"
              aria-label="Search jewellery"
              title="Search jewellery"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <div className="hidden sm:flex items-center text-xs border border-[#C17C91]/30 rounded-full px-2 py-1 bg-white/60">
              <Globe className="w-3.5 h-3.5 text-[#B96F88] mr-1" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded-full transition-colors ${
                  language === 'en'
                    ? 'bg-[#A95372] text-white font-medium'
                    : 'text-[#6B6561] hover:text-[#1C1917]'
                }`}
              >
                EN
              </button>
              <span className="text-[#C17C91]/40 mx-0.5">/</span>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-1.5 py-0.5 rounded-full transition-colors ${
                  language === 'hi'
                    ? 'bg-[#A95372] text-white font-medium'
                    : 'text-[#6B6561] hover:text-[#1C1917]'
                }`}
              >
                हिं
              </button>
            </div>

            {/* My Orders */}
            <button
              onClick={() => handleNav('orders')}
              className="p-2 text-[#1C1917] hover:text-[#A95372] hover:bg-[#F4E8EC] rounded-full transition-colors relative"
              aria-label="My Orders"
              title={t('navOrders')}
            >
              <Package className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNav('wishlist')}
              className="p-2 text-[#1C1917] hover:text-[#A95372] hover:bg-[#F4E8EC] rounded-full transition-colors relative"
              aria-label="Wishlist"
              title={t('navWishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#A95372] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-white bg-[#A95372] hover:bg-[#933E5D] rounded-full transition-colors relative shadow-xs"
              aria-label="Shopping bag"
              title={t('navCart')}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#1C1917] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-[#FAF7F5] shadow-xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#EADBDD]">
                <div className="flex items-center gap-2">
                  <img
                    src={BRAND_INFO.logoUrl}
                    alt="purnima jewellers emblem"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-serif text-lg font-semibold text-[#1C1917] lowercase">
                    purnima jewellers
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#6B6561] hover:text-[#1C1917]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Language Switcher in Mobile Drawer */}
              <div className="flex items-center justify-between py-4 border-b border-[#EADBDD]">
                <span className="text-xs text-[#6B6561] flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-[#B96F88]" />
                  Language / भाषा:
                </span>
                <div className="flex items-center gap-1 bg-[#F4E8EC] p-1 rounded-full text-xs">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-full ${
                      language === 'en'
                        ? 'bg-[#A95372] text-white font-medium'
                        : 'text-[#6B6561]'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('hi')}
                    className={`px-3 py-1 rounded-full ${
                      language === 'hi'
                        ? 'bg-[#A95372] text-white font-medium'
                        : 'text-[#6B6561]'
                    }`}
                  >
                    हिंदी
                  </button>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="py-4 space-y-2">
                <button
                  onClick={() => handleNav('home')}
                  className="w-full text-left py-2.5 text-base font-medium text-[#1C1917] hover:text-[#A95372]"
                >
                  {t('navHome')}
                </button>
                <button
                  onClick={() => handleNav('shop')}
                  className="w-full text-left py-2.5 text-base font-medium text-[#1C1917] hover:text-[#A95372]"
                >
                  {t('navShopAll')}
                </button>
                <button
                  onClick={() => handleNav('category', 'Necklaces')}
                  className="w-full text-left py-2.5 text-base font-medium text-[#1C1917] hover:text-[#A95372]"
                >
                  {t('navNecklaces')}
                </button>
                <button
                  onClick={() => handleNav('category', 'Earrings')}
                  className="w-full text-left py-2.5 text-base font-medium text-[#1C1917] hover:text-[#A95372]"
                >
                  {t('navEarrings')}
                </button>
                <button
                  onClick={() => handleNav('category', 'Pendants & Chains')}
                  className="w-full text-left py-2.5 text-base font-medium text-[#1C1917] hover:text-[#A95372]"
                >
                  {t('navPendantsChains')}
                </button>
                <button
                  onClick={() => handleNav('orders')}
                  className="w-full text-left py-2.5 text-base font-medium text-[#1C1917] hover:text-[#A95372]"
                >
                  {t('navOrders')}
                </button>
                <button
                  onClick={() => handleNav('wishlist')}
                  className="w-full text-left py-2.5 text-base font-medium text-[#1C1917] hover:text-[#A95372]"
                >
                  {t('navWishlist')} ({wishlist.length})
                </button>
                <button
                  onClick={() => handleNav('contact')}
                  className="w-full text-left py-2.5 text-base font-medium text-[#1C1917] hover:text-[#A95372]"
                >
                  {t('navContact')}
                </button>
              </div>
            </div>

            {/* Bottom Contact actions in Mobile Drawer */}
            <div className="pt-4 border-t border-[#EADBDD] space-y-3">
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:bg-[#20ba5a] transition-colors"
              >
                <span>WhatsApp Concierge</span>
              </a>
              <a
                href={BRAND_INFO.phoneTel}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-[#C17C91] text-[#A95372] rounded-lg text-sm font-medium hover:bg-[#F4E8EC] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{BRAND_INFO.formattedPhone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
