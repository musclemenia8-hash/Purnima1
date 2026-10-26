import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_INFO } from '../data/products';
import {
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language, t, showToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'Bridal Jewellery Consultation',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setSubmitted(true);
    showToast(language === 'hi' ? 'आपका संदेश दर्ज कर लिया गया है।' : 'Your consultation inquiry has been recorded.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-[#B96F88] font-semibold">
          {language === 'hi' ? 'प्रतिष्ठान संपर्क' : 'Showroom & Concierge'}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-2 mb-3">
          {t('contactHeading')}
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6561] leading-relaxed">
          {t('contactSub')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Direct Contact Details & Showroom Location */}
        <div className="lg:col-span-5 space-y-6">
          {/* Address Card */}
          <div className="bg-white rounded-xl border border-[#EADBDD] p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F4E8EC] text-[#A95372] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#1C1917]">
                  {t('addressTitle')}
                </h3>
                <span className="text-xs text-[#B96F88] font-medium">Raipur Showroom</span>
              </div>
            </div>

            <p className="text-xs text-[#1C1917] leading-relaxed pl-13">
              {BRAND_INFO.address}
            </p>

            <div className="pl-13 pt-1">
              <span className="inline-block text-[11px] bg-[#FAF7F5] border border-[#EADBDD] text-[#6B6561] px-2.5 py-1 rounded">
                Landmark: Near Kabir Chowk, Ramnagar Main Road
              </span>
            </div>
          </div>

          {/* Phone & Direct WhatsApp Card */}
          <div className="bg-white rounded-xl border border-[#EADBDD] p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F4E8EC] text-[#A95372] flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#1C1917]">
                  {t('phoneTitle')} & WhatsApp
                </h3>
                <span className="text-xs text-[#B96F88] font-medium">Direct Goldsmith Support</span>
              </div>
            </div>

            <div className="pl-13 space-y-3">
              <div>
                <span className="text-xs text-[#6B6561] block">Customer Care Hotline:</span>
                <a
                  href={BRAND_INFO.phoneTel}
                  className="font-mono text-base font-bold text-[#1C1917] hover:text-[#A95372] transition-colors"
                >
                  {BRAND_INFO.formattedPhone}
                </a>
              </div>

              <div>
                <span className="text-xs text-[#6B6561] block mb-1">Direct WhatsApp Concierge:</span>
                <a
                  href={BRAND_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-medium rounded-lg transition-colors shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.059-1.146-.086-.312-.102-.715-.24-1.237-.466-2.185-.947-3.618-3.167-3.729-3.315-.112-.149-.894-1.19-.894-2.27 0-1.08.566-1.61.767-1.83.201-.22.44-.275.586-.275.144 0 .287.002.412.008.132.006.309-.05.483.368.175.419.596 1.455.648 1.562.053.107.088.232.017.373-.07.142-.105.23-.21.353-.105.124-.22.277-.314.372-.106.106-.217.221-.093.434.123.212.55 1.056 1.178 1.616.809.721 1.492.944 1.706 1.05.213.106.338.089.463-.054.125-.142.535-.623.678-.836.142-.213.286-.178.48-.106.195.071 1.233.582 1.444.688.212.107.353.159.405.249.053.089.053.518-.091.923z"/>
                  </svg>
                  <span>{t('chatWhatsApp')} ({BRAND_INFO.formattedPhone})</span>
                </a>
              </div>
            </div>
          </div>

          {/* Social Channels & Hours */}
          <div className="bg-white rounded-xl border border-[#EADBDD] p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F4E8EC] text-[#A95372] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#1C1917]">
                  {t('hoursTitle')}
                </h3>
                <span className="text-xs text-[#6B6561]">{t('hoursText')}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F4E8EC] space-y-2">
              <span className="text-xs font-semibold text-[#1C1917] block">
                {t('socialTitle')}
              </span>
              <div className="flex flex-col gap-2 text-xs">
                <a
                  href={BRAND_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#6B6561] hover:text-[#A95372]"
                >
                  <Instagram className="w-4 h-4 text-[#E1306C]" />
                  <span>Instagram: <strong className="font-mono text-[#1C1917]">{BRAND_INFO.instagramHandle}</strong></span>
                </a>
                <div className="flex items-center gap-2 text-[#6B6561]">
                  <Facebook className="w-4 h-4 text-[#1877F2]" />
                  <span>Facebook: <strong className="text-[#1C1917]">{BRAND_INFO.facebookName}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry & Consultation Form */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#EADBDD] p-6 sm:p-8 shadow-xs">
          <div className="mb-6 pb-4 border-b border-[#F4E8EC]">
            <h2 className="font-serif text-2xl font-normal text-[#1C1917] mb-1">
              {language === 'hi' ? 'आभूषण परामर्श अथवा संदेश भेजें' : 'Book a Consultation or Inquire'}
            </h2>
            <p className="text-xs text-[#6B6561]">
              {language === 'hi'
                ? 'वैवाहिक आभूषणों के निर्माण, सोने की दर अथवा विशिष्ट डिजाइन के लिए हमें संदेश भेजें।'
                : 'Send your requirements for custom gold weight orders, bridal sets, or showroom appointments.'}
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-normal text-[#1C1917]">
                {language === 'hi' ? 'धन्यवाद! आपका संदेश प्राप्त हुआ' : 'Inquiry Received with Devotion'}
              </h3>
              <p className="text-xs text-[#6B6561] max-w-sm mx-auto leading-relaxed">
                {language === 'hi'
                  ? 'हमारे रायपुर प्रतिष्ठान की टीम जल्द ही आपसे व्हाट्सएप अथवा फोन द्वारा संपर्क करेगी।'
                  : 'Our master goldsmith concierge team in Raipur will connect with you via WhatsApp or phone call shortly.'}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-medium text-[#A95372] underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1">
                  {t('fullName')} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aarti Sharma"
                  className="w-full text-xs p-3 border border-[#EADBDD] rounded-lg focus:outline-[#A95372]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1">
                  {t('phoneNumber')} / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="10-digit mobile number"
                  className="w-full text-xs p-3 border border-[#EADBDD] rounded-lg focus:outline-[#A95372] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1">
                  Consultation Interest
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full text-xs p-3 border border-[#EADBDD] rounded-lg focus:outline-[#A95372] bg-white"
                >
                  <option value="Bridal Jewellery Consultation">Bridal Gold Jewellery Set</option>
                  <option value="Catalogue Product Inquiry">Catalogue Product Inquiry (Weight & Rates)</option>
                  <option value="Store Visit Appointment">Visit Raipur Showroom (Kabir Chowk)</option>
                  <option value="Custom Hallmark Order">Custom 22K Goldsmithing Order</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1C1917] mb-1">
                  Message Details (Optional)
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention preferred gold weight, design preference, or wedding date..."
                  className="w-full text-xs p-3 border border-[#EADBDD] rounded-lg focus:outline-[#A95372]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#A95372] hover:bg-[#933E5D] text-white text-xs font-medium uppercase tracking-wider rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Consultation Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
