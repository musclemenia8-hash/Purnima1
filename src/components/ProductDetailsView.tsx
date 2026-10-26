import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { BRAND_INFO } from '../data/products';
import {
  Heart,
  ShoppingBag,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Receipt,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Share2,
} from 'lucide-react';

interface ProductDetailsViewProps {
  product: Product;
}

export const ProductDetailsView: React.FC<ProductDetailsViewProps> = ({ product }) => {
  const {
    language,
    t,
    setCurrentView,
    addToCart,
    buyNow,
    toggleWishlist,
    isInWishlist,
    checkDeliveryPincode,
    showToast,
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showModelImage, setShowModelImage] = useState(false);
  const [pincodeInput, setPincodeInput] = useState('492009');
  const [pincodeResult, setPincodeResult] = useState<{
    checked: boolean;
    serviceable: boolean;
    message: string;
    estimateDays: number;
    localRaipur: boolean;
  }>({
    checked: true,
    serviceable: true,
    message: language === 'hi' 
      ? 'रायपुर स्थानीय: आज अथवा अगले दिन विशेष सुरक्षित हैंड-डिलीवरी अथवा स्टोर पिकअप उपलब्ध है।' 
      : 'Raipur Local: Same-day or next-day direct concierge delivery & store pickup available at Ramnagar.',
    estimateDays: 1,
    localRaipur: true,
  });

  const [isZoomed, setIsZoomed] = useState(false);
  const isFav = isInWishlist(product.id);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkDeliveryPincode(pincodeInput);
    setPincodeResult({ checked: true, ...result });
  };

  const currentDisplayImage = showModelImage && product.modelImage
    ? product.modelImage
    : product.images[activeImageIndex] || product.images[0];

  const whatsappInquiryUrl = `${BRAND_INFO.whatsappUrl}?text=${encodeURIComponent(
    `Hello purnima jewellers! I am inquiring about the ${product.name} (Price: ₹${product.price.toLocaleString('en-IN')}, Weight: ${product.weightGrams}g, Code: ${product.id}). Is this piece currently available in your Raipur store?`
  )}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Look at this exquisite gold piece from purnima jewellers: ${product.name}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(language === 'hi' ? 'लिंक कॉपी हो गया' : 'Product link copied to clipboard');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Back to Catalogue */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#6B6561] hover:text-[#A95372] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'hi' ? 'सभी आभूषण देखें' : 'Back to Collection'}</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs text-[#6B6561] hover:text-[#A95372] p-1.5 rounded-md hover:bg-[#F4E8EC] transition-colors"
          title="Share piece"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">{language === 'hi' ? 'साझा करें' : 'Share'}</span>
        </button>
      </div>

      {/* Main Grid: Gallery Left, Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery & Model View */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Display */}
          <div
            className="relative aspect-square w-full bg-white rounded-xl border border-[#EADBDD] overflow-hidden group cursor-crosshair shadow-xs"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <img
              src={currentDisplayImage}
              alt={product.name}
              className={`w-full h-full object-cover object-center transition-all duration-300 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-104 cursor-zoom-in'
              }`}
            />

            {/* Badge for Image Type */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#1C1917] bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-sm border border-[#EADBDD] shadow-2xs">
                {showModelImage ? 'Model Campaign Visual' : 'Authentic Catalogue Photograph'}
              </span>
              <span className="text-[10px] text-[#A95372] font-semibold bg-[#F4E8EC]/90 px-2 py-0.5 rounded-sm">
                22K BIS 916 Hallmarked
              </span>
            </div>

            {/* Wishlist Button inside image */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-xs shadow-xs transition-colors ${
                isFav
                  ? 'bg-white text-[#A95372]'
                  : 'bg-white/85 text-[#6B6561] hover:text-[#A95372] hover:bg-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current text-[#A95372]' : ''}`} />
            </button>

            {/* Tap to zoom hint */}
            <div className="absolute bottom-3 right-3 text-[10px] text-[#6B6561] bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded">
              {isZoomed ? 'Click to reset' : 'Click to zoom'}
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setShowModelImage(false);
                  setActiveImageIndex(idx);
                }}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                  !showModelImage && activeImageIndex === idx
                    ? 'border-[#A95372] shadow-xs'
                    : 'border-[#EADBDD] hover:border-[#C17C91]'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
                <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] text-center py-0.5">
                  Item #{idx + 1}
                </span>
              </button>
            ))}

            {product.modelImage && (
              <button
                onClick={() => setShowModelImage(true)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                  showModelImage
                    ? 'border-[#A95372] shadow-xs ring-2 ring-[#A95372]/20'
                    : 'border-[#EADBDD] hover:border-[#C17C91]'
                }`}
              >
                <img src={product.modelImage} alt="" className="w-full h-full object-cover" />
                <span className="absolute bottom-0 inset-x-0 bg-[#A95372] text-white text-[9px] font-semibold text-center py-0.5">
                  Model Worn
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Title */}
          <div className="border-b border-[#EADBDD] pb-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest text-[#B96F88] font-semibold">
                {language === 'hi' ? product.categoryHi : product.category}
              </span>
              <span className="text-xs text-[#6B6561]">·</span>
              <span className="text-xs font-mono text-[#6B6561]">{product.specifications.grossWeight}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-normal leading-snug mb-3">
              {language === 'hi' ? product.nameHi : product.name}
            </h1>

            {/* Total Payable Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] font-mono tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#6B6561] font-medium">
                {language === 'hi' ? '(सभी कर सहित)' : '(Inclusive of all taxes & 3% GST)'}
              </span>
            </div>
          </div>

          {/* Transparent Price Breakdown Table */}
          <div className="bg-white rounded-lg border border-[#EADBDD] p-4 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#F4E8EC]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1C1917] flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 text-[#A95372]" />
                {t('priceBreakdown')}
              </span>
              <span className="text-[11px] text-[#B96F88] font-medium">
                {product.weightGrams}g @ ₹7,350/g
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-[#6B6561]">
              <span>{t('goldComponent')}</span>
              <span className="font-mono tabular-nums text-[#1C1917]">
                ₹{product.goldPrice.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-[#6B6561]">
              <span>{t('makingCharges')}</span>
              <span className="font-mono tabular-nums text-[#1C1917]">
                ₹{product.makingCharges.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-[#6B6561]">
              <span>{t('gstTax')}</span>
              <span className="font-mono tabular-nums text-[#1C1917]">
                ₹{product.gst.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#F4E8EC] text-xs font-bold text-[#1C1917]">
              <span>{t('totalPrice')}</span>
              <span className="font-mono tabular-nums text-sm text-[#A95372]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => addToCart(product, 1)}
                className="w-full py-3 px-4 bg-white border border-[#A95372] text-[#A95372] hover:bg-[#F4E8EC] text-xs sm:text-sm font-medium tracking-wider uppercase rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('addToBag')}</span>
              </button>

              <button
                onClick={() => buyNow(product)}
                className="w-full py-3 px-4 bg-[#A95372] hover:bg-[#933E5D] text-white text-xs sm:text-sm font-medium tracking-wider uppercase rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <span>{t('buyNow')}</span>
              </button>
            </div>

            {/* WhatsApp direct inquiry */}
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 text-[#128C7E] text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366]" />
              <span>{t('askWhatsApp')} (+91 91113 26430)</span>
            </a>
          </div>

          {/* Delivery PIN code Checker */}
          <div className="bg-[#FAF7F5] rounded-lg border border-[#EADBDD] p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917]">
              <Truck className="w-4 h-4 text-[#A95372]" />
              <span>{t('deliveryPincode')}</span>
            </div>

            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincodeInput}
                onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                placeholder={t('pincodePlaceholder')}
                className="bg-white border border-[#EADBDD] rounded-md px-3 py-1.5 text-xs text-[#1C1917] font-mono w-44 focus:outline-[#A95372]"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#1C1917] text-white hover:bg-[#383330] rounded-md text-xs font-medium transition-colors"
              >
                {t('checkButton')}
              </button>
            </form>

            {pincodeResult.checked && (
              <div className="text-xs flex items-start gap-2 pt-1">
                {pincodeResult.serviceable ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-[#1C1917] leading-relaxed">
                      {pincodeResult.message}
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span className="text-amber-800">{pincodeResult.message}</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Specifications Accordion / Card */}
          <div className="border border-[#EADBDD] rounded-lg bg-white overflow-hidden divide-y divide-[#F4E8EC]">
            <div className="p-4 bg-[#FAF7F5]/60">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#A95372]" />
                {language === 'hi' ? 'प्रमाणित आभूषण विनिर्देश' : 'Verified Piece Specifications'}
              </h3>
            </div>

            <div className="p-4 space-y-2.5 text-xs">
              <div className="grid grid-cols-2 py-1 border-b border-[#F4E8EC]">
                <span className="text-[#6B6561]">{t('purity')}</span>
                <span className="font-medium text-[#1C1917]">{product.specifications.purity}</span>
              </div>
              <div className="grid grid-cols-2 py-1 border-b border-[#F4E8EC]">
                <span className="text-[#6B6561]">{t('grossWeight')}</span>
                <span className="font-mono font-medium text-[#1C1917]">{product.specifications.grossWeight}</span>
              </div>
              <div className="grid grid-cols-2 py-1 border-b border-[#F4E8EC]">
                <span className="text-[#6B6561]">{t('hallmarkId')}</span>
                <span className="font-medium text-[#1C1917] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {product.specifications.hallmark}
                </span>
              </div>
              {product.specifications.stoneDetails && (
                <div className="grid grid-cols-2 py-1 border-b border-[#F4E8EC]">
                  <span className="text-[#6B6561]">Stone / Enamel Details</span>
                  <span className="font-medium text-[#1C1917]">{product.specifications.stoneDetails}</span>
                </div>
              )}
              <div className="grid grid-cols-2 py-1">
                <span className="text-[#6B6561]">{t('occasion')}</span>
                <span className="font-medium text-[#1C1917]">{product.specifications.occasion}</span>
              </div>
            </div>
          </div>

          {/* Care Instructions */}
          <div className="p-4 bg-[#FAF7F5] rounded-lg border border-[#EADBDD] text-xs space-y-1.5">
            <span className="font-semibold text-[#1C1917] flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#B96F88]" />
              {t('careInstructionsTitle')}
            </span>
            <p className="text-[#6B6561] leading-relaxed">
              {t('careInstructionsText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
