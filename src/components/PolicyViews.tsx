import React from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_INFO } from '../data/products';
import { ShieldCheck, Truck, RotateCcw, Lock, HelpCircle, ArrowLeft } from 'lucide-react';

interface PolicyViewProps {
  type: 'shipping' | 'returns' | 'privacy' | 'terms' | 'faqs' | 'about';
}

export const PolicyViews: React.FC<PolicyViewProps> = ({ type }) => {
  const { language, t, setCurrentView } = useShop();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <button
        onClick={() => setCurrentView('home')}
        className="inline-flex items-center gap-1.5 text-xs text-[#6B6561] hover:text-[#A95372] mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Home</span>
      </button>

      {/* About Us */}
      {type === 'about' && (
        <div className="bg-white rounded-xl border border-[#EADBDD] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="border-b border-[#F4E8EC] pb-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B96F88] font-semibold">
              Heritage & Craft
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-1">
              About purnima jewellers
            </h1>
          </div>

          <div className="prose text-xs sm:text-sm text-[#6B6561] leading-relaxed space-y-4">
            <p>
              Founded in 1997 and situated at Kabir Chowk, Ramnagar, Raipur, <strong>purnima jewellers</strong> is dedicated to the timeless art of traditional and contemporary gold jewellery craftsmanship.
            </p>
            <p>
              We specialize in pure 22 Karat (916) gold creations that honor Indian heritage while embracing modern refinement. Every bridal choker, filigree hasli necklace, temple jhumka, and sacred mangalsutra in our collection is crafted with generational passion and meticulous attention to metal purity.
            </p>
            <h3 className="font-serif text-lg text-[#1C1917] font-semibold pt-2">Our Guiding Pillars</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Certified BIS Hallmarking:</strong> Every piece bears official Bureau of Indian Standards (BIS) hallmarking with distinct HUID verification for undeniable authenticity.</li>
              <li><strong>Transparent Pricing:</strong> We believe in open, honest craftsmanship. Our prices clearly separate pure gold market value, making charges, and statutory 3% GST.</li>
              <li><strong>Showroom & Nationwide Delivery:</strong> Experience our hospitality in Ramnagar, Raipur or enjoy safe, fully insured transit to your doorstep anywhere in India.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Shipping Policy */}
      {type === 'shipping' && (
        <div className="bg-white rounded-xl border border-[#EADBDD] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="border-b border-[#F4E8EC] pb-4 flex items-center gap-3">
            <Truck className="w-6 h-6 text-[#A95372]" />
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#B96F88] font-semibold">
                Customer Care
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-1">
                {t('policyShippingTitle')}
              </h1>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-[#6B6561] leading-relaxed space-y-4">
            <h3 className="font-serif text-base font-semibold text-[#1C1917]">1. Insured Logistics & Safe Transit</h3>
            <p>
              Gold jewellery is precious. All consignments dispatched from our Raipur establishment are 100% insured during transit and packaged in tamper-evident security boxes sealed under CCTV supervision.
            </p>

            <h3 className="font-serif text-base font-semibold text-[#1C1917]">2. Delivery Timelines</h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Raipur Local (PIN 492xxx):</strong> Same-day or next-day personal courier hand-delivery or direct collection from our Kabir Chowk showroom.</li>
              <li><strong>Chhattisgarh State (PIN 49xxxx):</strong> 2 to 3 business days via verified express courier.</li>
              <li><strong>Rest of India:</strong> 3 to 5 business days via national secure logistics partners.</li>
            </ul>

            <h3 className="font-serif text-base font-semibold text-[#1C1917]">3. Delivery Verification</h3>
            <p>
              To protect your investment, delivery is completed only against recipient identity verification and an OTP or signature. We advise customers to inspect the outer tamper-evident seal before accepting the parcel.
            </p>
          </div>
        </div>
      )}

      {/* Returns & Exchange Policy */}
      {type === 'returns' && (
        <div className="bg-white rounded-xl border border-[#EADBDD] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="border-b border-[#F4E8EC] pb-4 flex items-center gap-3">
            <RotateCcw className="w-6 h-6 text-[#A95372]" />
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#B96F88] font-semibold">
                Customer Care
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-1">
                {t('policyReturnsTitle')}
              </h1>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-[#6B6561] leading-relaxed space-y-4">
            <h3 className="font-serif text-base font-semibold text-[#1C1917]">1. Transparency & Inspection</h3>
            <p>
              Due to the intrinsic value and hallmarking regulations of precious metals, returns and exchanges are handled with utmost rigor. If your piece arrives with any transit damage or discrepancies, please notify our Raipur support team within 48 hours of delivery.
            </p>

            <h3 className="font-serif text-base font-semibold text-[#1C1917]">2. 7-Day Exchange Window</h3>
            <p>
              Unworn pieces in original condition with the intact security tag, BIS hallmark certificate, and tax invoice may be exchanged within 7 days of delivery at our Kabir Chowk, Ramnagar showroom or via coordinated insured reverse courier.
            </p>

            <h3 className="font-serif text-base font-semibold text-[#1C1917]">3. Lifetime Buyback & Gold Purity</h3>
            <p>
              purnima jewellers honors lifetime buyback on all authentic pieces sold, based on the prevailing pure 22K gold rate and verified net gold weight.
            </p>
          </div>
        </div>
      )}

      {/* Privacy Policy */}
      {type === 'privacy' && (
        <div className="bg-white rounded-xl border border-[#EADBDD] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="border-b border-[#F4E8EC] pb-4 flex items-center gap-3">
            <Lock className="w-6 h-6 text-[#A95372]" />
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#B96F88] font-semibold">
                Legal
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-1">
                {t('policyPrivacyTitle')}
              </h1>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-[#6B6561] leading-relaxed space-y-4">
            <p>
              At <strong>purnima jewellers</strong>, we respect and safeguard the personal and transactional privacy of our patrons.
            </p>
            <h3 className="font-serif text-base font-semibold text-[#1C1917]">Data Protection</h3>
            <p>
              We collect your name, mobile number, delivery address, and pincode strictly for order fulfilment, insured courier documentation, and statutory tax billing. We do not sell or lease your personal information to third parties.
            </p>
            <h3 className="font-serif text-base font-semibold text-[#1C1917]">Payment Security</h3>
            <p>
              All online transactions are processed through RBI-authorized payment gateways complying with PCI-DSS standards. We never record, store, or view sensitive payment card credentials on our servers.
            </p>
          </div>
        </div>
      )}

      {/* Terms & Conditions */}
      {type === 'terms' && (
        <div className="bg-white rounded-xl border border-[#EADBDD] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="border-b border-[#F4E8EC] pb-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B96F88] font-semibold">
              Legal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-1">
              {t('policyTermsTitle')}
            </h1>
          </div>

          <div className="text-xs sm:text-sm text-[#6B6561] leading-relaxed space-y-4">
            <h3 className="font-serif text-base font-semibold text-[#1C1917]">1. Orders & Pricing</h3>
            <p>
              Product prices shown reflect verified 22 Karat gold weight, craftsmanship making charges, and mandatory 3% GST. Gold market rates fluctuate; order amounts are locked at the instant of order placement.
            </p>
            <h3 className="font-serif text-base font-semibold text-[#1C1917]">2. Genuine Catalogue Imagery</h3>
            <p>
              All product photographs displayed represent authentic pieces handcrafted by or curated for purnima jewellers. Slight dimensional tolerances within standard Indian goldsmithing practices may apply.
            </p>
            <h3 className="font-serif text-base font-semibold text-[#1C1917]">3. Jurisdiction</h3>
            <p>
              Any disputes or legal matters are subject exclusively to the competent courts of Raipur, Chhattisgarh, India.
            </p>
          </div>
        </div>
      )}

      {/* FAQs */}
      {type === 'faqs' && (
        <div className="bg-white rounded-xl border border-[#EADBDD] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="border-b border-[#F4E8EC] pb-4 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-[#A95372]" />
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#B96F88] font-semibold">
                Help & Answers
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-1">
                {t('faqsTitle')}
              </h1>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 bg-[#FAF7F5] rounded-lg border border-[#EADBDD]">
              <h3 className="font-semibold text-[#1C1917] mb-1">
                How do I know the gold is authentic and pure?
              </h3>
              <p className="text-[#6B6561] leading-relaxed">
                All jewellery crafted and sold by purnima jewellers carries mandatory BIS 916 hallmarking alongside a unique six-digit HUID (Hallmark Unique Identification) laser-inscribed by certified assaying centers.
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F5] rounded-lg border border-[#EADBDD]">
              <h3 className="font-semibold text-[#1C1917] mb-1">
                Can I visit your showroom in Raipur to see pieces in person?
              </h3>
              <p className="text-[#6B6561] leading-relaxed">
                Yes, warmly! Our showroom is conveniently located at Kabir Chowk, Ramnagar, Raipur, Chhattisgarh 492009. We are open Monday through Sunday from 10:30 AM to 9:00 PM.
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F5] rounded-lg border border-[#EADBDD]">
              <h3 className="font-semibold text-[#1C1917] mb-1">
                How is the final jewellery price calculated?
              </h3>
              <p className="text-[#6B6561] leading-relaxed">
                We practice total price transparency. The price equals (Net Gold Weight × Prevailing 22K Gold Rate) + (Making Charges) + (3% statutory GST). You can inspect this detailed breakdown on every product page.
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F5] rounded-lg border border-[#EADBDD]">
              <h3 className="font-semibold text-[#1C1917] mb-1">
                Can I order directly over WhatsApp?
              </h3>
              <p className="text-[#6B6561] leading-relaxed">
                Absolutely. Click the WhatsApp button anywhere on the website or message us at +91 91113 26430. Our family goldsmith team will share live videos, weight certificates, and guide your order.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
