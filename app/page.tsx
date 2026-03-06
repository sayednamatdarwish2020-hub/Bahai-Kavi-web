'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Vazirmatn } from 'next/font/google';

const vazir = Vazirmatn({ subsets: ['latin', 'arabic'], display: 'swap' });

// ==========================================
// 1. اطلاعات محتوایی سایت (چندزبانه)
// ==========================================
const contentData = {
  fa: {
    dir: 'rtl',
    nav: { 
      home: { title: 'صفحه اصلی' }, 
      whatIs: { title: 'بهائیت چیست؟', sub: [{id: 'whatIs-roots', title: 'ریشه‌های تاریخی'}, {id: 'whatIs-admin', title: 'ساختار اداری'}] }, 
      history: { title: 'تاریخچه و رهبران', sub: [{id: 'history-babi', title: 'دوران بابیگری'}, {id: 'history-leaders', title: 'رهبران اصلی'}] }, 
      critique: { title: 'نقد علمی', sub: [{id: 'critique-text', title: 'نقد متون'}, {id: 'critique-social', title: 'نقد اجتماعی'}] }, 
      doubts: { title: 'پاسخ به شبهات', sub: [{id: 'doubts-history', title: 'شبهات تاریخی'}, {id: 'doubts-theology', title: 'شبهات کلامی'}] }, 
      mahdism: { title: 'مهدویت' }, 
      articles: { title: 'مقالات', sub: [{id: 'articles-library', title: 'کتابخانه جامع'}, {id: 'articles-docs', title: 'اسناد پژوهشی'}] }, 
      media: { title: 'رسانه' }, 
      contact: { title: 'تماس' } 
    },
    pages: {
      home: { title: 'صفحه اصلی', desc: 'بهائی‌کاوی یک پایگاه پژوهشی مستقل است که با هدف مطالعه و تحلیل متون، اسناد تاریخی و دیدگاه‌های مختلف درباره آیین بهائی ایجاد شده است.' },
      whatIs: { title: 'بهائیت چیست؟', desc: 'بهائیت یک جنبش دینی است که در قرن نوزدهم در ایران شکل گرفت. مطالعه این موضوع شامل بررسی منابع تاریخی، تحلیل متون اصلی و بررسی زمینه‌های اجتماعی است.' },
      history: { title: 'تاریخچه و رهبران', desc: 'تاریخ شکل‌گیری این آیین با تحولات قرن نوزدهم مرتبط است. مطالعه زندگی و آثار رهبران برای درک تاریخ این جریان اهمیت دارد.' },
      critique: { title: 'نقد علمی', desc: 'در این بخش متون و ادعاهای تاریخی با استفاده از منابع مختلف و روش‌های دانشگاهی بررسی می‌شوند.' },
      doubts: { title: 'پاسخ به شبهات', desc: 'این بخش به بررسی مهم‌ترین پرسش‌ها و شبهات درباره متون و تاریخ این آیین می‌پردازد و پاسخ‌های مستند ارائه می‌کند.' },
      mahdism: { title: 'مهدویت', desc: 'مفهوم مهدویت در اندیشه اسلامی نقش مهمی داشته است. این بخش زمینه‌های تاریخی و فکری این مفهوم را بررسی می‌کند.' },
      articles: { title: 'مقالات و منابع', desc: 'این بخش شامل مجموعه‌ای از منابع پژوهشی، مقالات علمی، اسناد تاریخی و تحقیقات دانشگاهی است.' },
      media: { title: 'رسانه', desc: 'محتوای چندرسانه‌ای شامل ویدیوهای آموزشی، پادکست‌ها، و مستندهای تاریخی.' },
      contact: { title: 'تماس با ما', desc: 'برای ارتباط با تیم پژوهشی می‌توانید از طریق فرم تماس اقدام کنید.' },
    },
    ui: {
      login: 'ورود / ثبت‌نام', latestArticles: 'آخرین مطالب منتشر شده', bahaiLeaders: 'شخصیت‌ها و رهبران', specificDoubts: 'پاسخ به مهم‌ترین شبهات',
      footerDesc: 'پایگاه پژوهشی مستقل برای مطالعه متون، اسناد تاریخی و نقد علمی.', readMore: 'مطالعه بیشتر', slide1Title: 'مطالعه و تحلیل متون تاریخی', slide2Title: 'آشنایی با تاریخچه و رهبران', slide3Title: 'بررسی علمی و پاسخ به شبهات',
      videoTitle: 'مستند: ریشه‌های تاریخی در قرن نوزدهم', sidebarTitle: 'آخرین بروزرسانی‌ها', section1: 'بخش اول: مقدمه و کلیات', section2: 'بخش دوم: بررسی تحلیلی و اسناد', section3: 'نتیجه‌گیری پژوهش'
    }
  },
  en: {
    dir: 'ltr',
    nav: { 
      home: { title: 'Home' }, 
      whatIs: { title: 'What is Baháʼí?', sub: [{id: 'whatIs-roots', title: 'Historical Roots'}, {id: 'whatIs-admin', title: 'Administration'}] }, 
      history: { title: 'History', sub: [{id: 'history-babi', title: 'Babi Era'}, {id: 'history-leaders', title: 'Key Leaders'}] }, 
      critique: { title: 'Critique', sub: [{id: 'critique-text', title: 'Text Analysis'}, {id: 'critique-social', title: 'Social Critique'}] }, 
      doubts: { title: 'Doubts', sub: [{id: 'doubts-history', title: 'Historical'}, {id: 'doubts-theology', title: 'Theological'}] }, 
      mahdism: { title: 'Mahdism' }, 
      articles: { title: 'Articles', sub: [{id: 'articles-library', title: 'Library'}, {id: 'articles-docs', title: 'Documents'}] }, 
      media: { title: 'Media' }, 
      contact: { title: 'Contact' } 
    },
    pages: { 
      home: { title: 'Home', desc: 'Academic platform dedicated to the historical and textual study.' },
      whatIs: { title: 'What is the Baháʼí Faith?', desc: 'A religious movement that emerged in 19th-century Iran.' },
      history: { title: 'History & Leadership', desc: 'The history of this movement is tied to social changes.' },
      critique: { title: 'Academic Critique', desc: 'Examining claims using academic methodologies.' },
      doubts: { title: 'Research Responses', desc: 'Addressing common questions and doubts.' },
      mahdism: { title: 'Mahdism Context', desc: 'The concept of Mahdism in Islamic thought.' },
      articles: { title: 'Articles & Sources', desc: 'Books, academic papers, and historical documents.' },
      media: { title: 'Media', desc: 'Educational videos, podcasts, and documentaries.' },
      contact: { title: 'Contact', desc: 'Reach out to our research team.' },
    },
    ui: {
      login: 'Login', latestArticles: 'Latest Publications', bahaiLeaders: 'Key Figures & Leaders', specificDoubts: 'Answers to Doubts',
      footerDesc: 'Independent research base for studying texts.', readMore: 'Read More', slide1Title: 'Study Historical Texts', slide2Title: 'History & Leadership', slide3Title: 'Scientific Review & Responses',
      videoTitle: 'Documentary: Historical Roots', sidebarTitle: 'Recent Updates', section1: 'Part 1: Introduction', section2: 'Part 2: Analytical Review', section3: 'Conclusion'
    }
  }
};

type LangKey = keyof typeof contentData;

// ==========================================
// 2. پترن استاندارد و بدون نقص هندسی اسلامی
// این پترن بی‌نقص کاشی‌کاری شده و هرگز به هم نمی‌ریزد
// ==========================================
const seamlessIslamicPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='currentColor' stroke-width='1' opacity='0.15'%3E%3Cpath d='M30 0v10l10 10h10M30 60v-10l10-10h10M30 0v10L20 20H10M30 60v-10L20 40H10M0 30h10l10-10V10M60 30H50L40 20V10M0 30h10l10 10v10M60 30H50L40 40v10M20 20l20 20M40 20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

// ==========================================
// 3. انیمیشن لودینگ ۳ در ۳ (Matrix Wave)
// ==========================================
const MatrixLoader = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div className="grid grid-cols-3 gap-2 w-20 h-20 sm:w-24 sm:h-24 z-10 mb-8">
    {[...Array(9)].map((_, i) => {
      // فرمول محاسبه تاخیر برای ایجاد افکت موج از گوشه
      const row = Math.floor(i / 3);
      const col = i % 3;
      const delay = (row + col) * 0.15;
      
      return (
        <div
          key={i}
          className={`w-full h-full rounded-sm shadow-lg ${isDarkMode ? 'bg-[#fedc97]' : 'bg-[#033f63]'}`}
          style={{
            animation: `matrixPulse 1.2s infinite ease-in-out`,
            animationDelay: `${delay}s`
          }}
        />
      );
    })}
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes matrixPulse {
        0%, 100% { transform: scale(0.2); opacity: 0.3; border-radius: 50%; }
        50% { transform: scale(1); opacity: 1; border-radius: 6px; }
      }
    `}} />
  </div>
);

// ==========================================
// 4. کارت تعاملی با سایه شناور (Spotlight / Glassmorphism)
// این بخش درخواست اصلی شما برای حرکت سایه با موس است
// ==========================================
interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  isDarkMode: boolean;
  onClick?: () => void;
}

const GlowCard = ({ children, className = '', isDarkMode, onClick }: GlowCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative h-full w-full overflow-hidden rounded-[2rem] border transition-all duration-500 cursor-pointer
        ${isDarkMode 
          ? 'bg-[#0a1a2a]/60 border-white/10 hover:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
          : 'bg-white/60 border-gray-200/60 hover:border-[#7c9885]/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)]'}
        backdrop-blur-xl group ${className}`}
    >
      {/* هاله نورانی متحرک زیر موس */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${
            isDarkMode ? 'rgba(254, 220, 151, 0.15)' : 'rgba(124, 152, 133, 0.2)'
          }, transparent 40%)`,
        }}
      />
      {/* محتوای اصلی کارت */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

// ==========================================
// 5. کامپوننت اصلی سایت
// ==========================================
export default function App() {
  const [lang, setLang] = useState<LangKey>('fa');
  const [pageId, setPageId] = useState<string>('home'); 
  const [slide, setSlide] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  const t = contentData[lang] || contentData['fa']; 
  
  const [mainCategory, subCategory] = pageId.split('-');
  
  let currentPageTitle = t.pages[mainCategory as keyof typeof t.pages]?.title || '';
  let currentPageDesc = t.pages[mainCategory as keyof typeof t.pages]?.desc || '';
  
  if (subCategory) {
    const navItem = t.nav[mainCategory as keyof typeof t.nav];
    if ('sub' in navItem) {
      const subObj = navItem.sub?.find(s => s.id === pageId);
      if (subObj) {
        currentPageTitle = `${currentPageTitle} - ${subObj.title}`;
      }
    }
  }

  const slides = [
    { title: t.ui.slide1Title, desc: t.pages.home.desc, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2000&auto=format&fit=crop', targetPage: 'articles' },
    { title: t.ui.slide2Title, desc: t.pages.history.desc, image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2000&auto=format&fit=crop', targetPage: 'history' },
    { title: t.ui.slide3Title, desc: t.pages.doubts.desc, image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2000&auto=format&fit=crop', targetPage: 'doubts' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 2500); 
    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (newPageId: string) => {
    if (pageId === newPageId) {
      setIsMobileMenuOpen(false);
      return;
    }
    setIsTransitioning(true);
    setIsMobileMenuOpen(false); // بستن منوی موبایل موقع تغییر صفحه
    setTimeout(() => {
      setPageId(newPageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setIsTransitioning(false), 300);
    }, 400); 
  };

  useEffect(() => {
    if (mainCategory !== 'home' || isTransitioning) return;
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [mainCategory, slides.length, isTransitioning]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // ================= LOADING SCREEN اولیه =================
  if (isInitialLoad) {
    return (
      <div 
        className={`fixed inset-0 ${isDarkMode ? 'bg-[#040d17] text-[#fedc97]' : 'bg-[#f4f6f8] text-[#033f63]'} flex flex-col items-center justify-center z-[100] ${vazir.className}`} 
        style={{ backgroundImage: seamlessIslamicPattern, backgroundSize: '80px' }}
      >
        {/* افکت گرادیان برای نرم کردن پترن بک‌گراند */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-current opacity-10"></div>
        
        <MatrixLoader isDarkMode={isDarkMode} />

        <h1 className="text-3xl md:text-5xl font-black tracking-widest animate-pulse z-10 drop-shadow-md">
          {lang === 'fa' ? 'بهائی‌کاوی' : 'Bahai-Kavi'}
        </h1>
        <p className="mt-4 text-sm font-bold opacity-70 animate-pulse tracking-widest uppercase">LOADING</p>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen transition-colors duration-500 ${vazir.className} pb-20 ${isDarkMode ? 'bg-[#040d17] text-gray-200' : 'bg-[#f4f6f8] text-gray-800'}`} 
      dir={t.dir} 
    >
      {/* پترن بک‌گراند سراسری (بسیار ملایم) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-100 transition-colors duration-500"
        style={{ backgroundImage: seamlessIslamicPattern, backgroundSize: '80px', color: isDarkMode ? '#ffffff' : '#033f63' }}
      />
      
      {/* لودینگ بین صفحات */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#f4f6f8]/70 dark:bg-[#040d17]/80 backdrop-blur-md transition-opacity duration-300">
           <div className="scale-75">
              <MatrixLoader isDarkMode={isDarkMode} />
           </div>
        </div>
      )}

      {/* کانتینر اصلی */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 relative z-10">
        
        {/* ================= HEADER (کاملا ریسپانسیو و شیشه‌ای) ================= */}
        <header className="flex justify-between items-center bg-white/80 dark:bg-[#0d233a]/80 backdrop-blur-xl px-5 py-4 rounded-3xl shadow-lg dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 sticky top-4 z-50 border border-white/40 dark:border-white/10">
          
          <div 
            className="text-2xl md:text-3xl font-black text-[#033f63] dark:text-[#fedc97] tracking-tight cursor-pointer flex-shrink-0 transition-colors drop-shadow-sm"
            onClick={() => handlePageChange('home')}
          >
            {lang === 'fa' ? 'بهائی‌کاوی' : 'Bahai-Kavi'}
          </div>
          
          {/* منوی ناوبری دسکتاپ */}
          <nav className="hidden xl:flex items-center gap-x-6 text-[#28666e] dark:text-gray-300 font-bold text-sm">
            {(Object.keys(t.nav)).map((key) => {
              const navItem = t.nav[key as keyof typeof t.nav];
              const hasSub = 'sub' in navItem && navItem.sub;

              return (
                <div key={key} className="relative group">
                  <button 
                    onClick={() => handlePageChange(key)}
                    className={`flex items-center gap-1 py-2 ${mainCategory === key ? 'text-[#033f63] dark:text-[#fedc97]' : 'hover:text-[#033f63] dark:hover:text-white hover:-translate-y-1'} transition-all duration-300`}
                  >
                    {navItem.title}
                    {hasSub && (
                      <svg className="w-3.5 h-3.5 mt-0.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                    )}
                  </button>
                  
                  {/* زیرمنوی آبشاری */}
                  {hasSub && (
                    <div className="absolute top-full right-1/2 translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 w-48">
                      <div className="bg-white/90 dark:bg-[#0f172a]/95 backdrop-blur-xl rounded-2xl shadow-xl dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] border border-white/50 dark:border-white/10 overflow-hidden flex flex-col p-2">
                        {navItem.sub.map((subItem: any, idx: number) => (
                          <div 
                            key={idx} 
                            onClick={(e) => { e.stopPropagation(); handlePageChange(subItem.id); }}
                            className="px-4 py-3 text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-[#f4f6f8] dark:hover:bg-white/10 hover:text-[#033f63] dark:hover:text-[#fedc97] rounded-xl transition-all cursor-pointer whitespace-nowrap"
                          >
                            {subItem.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* دکمه تغییر تم */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-xl bg-white/50 dark:bg-white/10 text-[#033f63] dark:text-[#fedc97] hover:bg-white dark:hover:bg-white/20 transition-all shadow-sm border border-white/50 dark:border-white/5"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
              )}
            </button>

            {/* دکمه منوی همبرگری (فقط در موبایل) */}
            <button 
              className="xl:hidden p-2.5 rounded-xl bg-white/50 dark:bg-white/10 text-[#033f63] dark:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/></svg>
            </button>

            <select 
              className="hidden md:block bg-white/50 dark:bg-white/10 dark:backdrop-blur-md text-[#033f63] dark:text-gray-200 text-sm font-bold px-3 py-2.5 rounded-xl outline-none cursor-pointer hover:bg-white dark:hover:bg-white/20 transition-all border border-white/50 dark:border-white/5"
              value={lang}
              onChange={(e) => setLang(e.target.value as LangKey)}
            >
              <option value="fa" className="dark:bg-[#0f172a]">فارسی</option>
              <option value="en" className="dark:bg-[#0f172a]">English</option>
            </select>
            
            <button className="hidden md:block bg-[#033f63] dark:bg-[#fedc97] text-white dark:text-[#040d17] px-6 py-2.5 rounded-xl shadow-lg dark:shadow-[0_0_20px_rgba(254,220,151,0.3)] hover:bg-[#28666e] dark:hover:bg-white transition-all duration-300 font-bold whitespace-nowrap">
              {t.ui.login}
            </button>
          </div>
        </header>

        {/* منوی موبایل (Full Screen Overlay) */}
        <div className={`xl:hidden fixed inset-0 z-40 bg-white/95 dark:bg-[#040d17]/95 backdrop-blur-3xl flex flex-col p-8 transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className="mt-20 space-y-4 overflow-y-auto pb-20">
              {(Object.keys(t.nav)).map((key) => {
                 const navItem = t.nav[key as keyof typeof t.nav];
                 return (
                   <div key={key} className="border-b border-gray-100 dark:border-white/10 pb-4">
                     <button onClick={() => handlePageChange(key)} className="text-xl font-bold text-[#033f63] dark:text-white w-full text-start">
                       {navItem.title}
                     </button>
                     {'sub' in navItem && (
                       <div className="mt-3 flex flex-col gap-3 pr-4 border-r-2 border-[#fedc97]">
                         {navItem.sub?.map((subItem: any, idx: number) => (
                           <span key={idx} onClick={() => handlePageChange(subItem.id)} className="text-gray-600 dark:text-gray-400 text-sm">{subItem.title}</span>
                         ))}
                       </div>
                     )}
                   </div>
                 )
              })}
           </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className={`transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
          
          {mainCategory === 'home' ? (
            <div className="space-y-24 mt-8">
              
              {/* --- 1. Hero Slider --- */}
              <section className="relative w-full h-[400px] sm:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl group border-[6px] border-white/50 dark:border-white/10">
                <div className="absolute inset-0 transition-opacity duration-1000">
                  <img src={slides[slide].image} alt="Slider" className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 bg-[#033f63]/80 dark:bg-[#000000]/70 mix-blend-multiply"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#033f63] dark:from-[#040d17] via-[#033f63]/40 dark:via-[#040d17]/60 to-transparent"></div>
                </div>

                <div className="absolute inset-0 p-8 sm:p-16 md:p-20 flex flex-col justify-center items-start z-10">
                  <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 dark:bg-black/30 border border-white/30 dark:border-white/20 text-[#fedc97] text-xs sm:text-sm font-bold mb-4 sm:mb-6 backdrop-blur-md shadow-sm">
                    {lang === 'fa' ? 'پایگاه پژوهشی مستقل' : 'Independent Research'}
                  </span>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 text-white leading-tight max-w-3xl drop-shadow-lg">
                    {slides[slide].title}
                  </h1>
                  <p className="max-w-2xl text-sm sm:text-lg text-gray-200 dark:text-gray-300 leading-relaxed mb-6 sm:mb-8 font-light line-clamp-3">
                    {slides[slide].desc}
                  </p>
                  <button 
                    onClick={() => handlePageChange(slides[slide].targetPage)}
                    className="bg-[#fedc97] text-[#033f63] font-black px-8 py-3 sm:px-10 sm:py-4 rounded-xl shadow-[0_10px_20px_rgba(254,220,151,0.3)] dark:shadow-[0_10px_30px_rgba(254,220,151,0.4)] hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
                  >
                    {t.ui.readMore}
                  </button>
                </div>
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
                  {slides.map((_, i) => (
                    <button key={i} onClick={() => setSlide(i)} className={`h-2 rounded-full transition-all duration-500 ${slide === i ? 'w-10 sm:w-12 bg-[#fedc97]' : 'w-3 bg-white/40 hover:bg-white/80'}`}></button>
                  ))}
                </div>
              </section>

              {/* --- 2. اهداف (با استفاده از کارت هوشمند GlowCard) --- */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: lang === 'fa' ? 'گردآوری اسناد' : 'Documents', desc: t.pages.articles.desc, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                  { title: lang === 'fa' ? 'تحلیل آکادمیک' : 'Analysis', desc: t.pages.critique.desc, icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
                  { title: lang === 'fa' ? 'ارائه مستند' : 'Output', desc: t.pages.doubts.desc, icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' }
                ].map((item, i) => (
                  <GlowCard key={i} isDarkMode={isDarkMode} className="p-8 flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/50 dark:bg-black/20 text-[#28666e] dark:text-[#fedc97] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon}/></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#033f63] dark:text-white text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </GlowCard>
                ))}
              </section>

              {/* --- 3. دسته‌بندی‌ها --- */}
              <GlowCard isDarkMode={isDarkMode} className="p-6 sm:p-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                  {[
                    { title: t.nav.whatIs.title, icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', page: 'whatIs' },
                    { title: t.nav.history.title, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', page: 'history' },
                    { title: t.nav.critique.title, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', page: 'critique' },
                    { title: t.nav.mahdism.title, icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', page: 'mahdism' },
                    { title: t.nav.media.title, icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z', page: 'media' }
                  ].map((item, index) => (
                    <div key={index} onClick={() => handlePageChange(item.page as PageKey)} className="bg-white/50 dark:bg-black/20 border border-white/40 dark:border-white/5 h-32 sm:h-36 rounded-2xl hover:shadow-lg dark:hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-center items-center text-[#033f63] dark:text-gray-200 p-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/80 dark:bg-white/10 text-[#28666e] dark:text-[#fedc97] rounded-xl mb-3 flex items-center justify-center transition-colors shadow-sm">
                        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-center">{item.title}</span>
                    </div>
                  ))}
                </div>
              </GlowCard>

              {/* --- 4. رهبران --- */}
              <section>
                <h2 className="text-2xl md:text-3xl font-black text-[#033f63] dark:text-white border-b-4 border-[#fedc97] pb-3 inline-block mb-8 md:mb-12 drop-shadow-sm">{t.ui.bahaiLeaders}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {['سید علی‌محمد باب', 'میرزا حسین‌علی (بهاءالله)', 'عباس افندی (عبدالبهاء)', 'شوقی افندی'].map((leader, i) => (
                    <GlowCard key={i} isDarkMode={isDarkMode} onClick={() => handlePageChange('history')} className="p-6 flex flex-col items-center text-center">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-5 overflow-hidden border-[6px] border-white/50 dark:border-white/10 group-hover:scale-105 transition-transform duration-500 relative shadow-inner">
                        <img src={`https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=200&auto=format&fit=crop&sig=${i}`} alt={leader} className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 transition-all duration-500"/>
                      </div>
                      <h3 className="font-bold text-[#033f63] dark:text-gray-100 text-lg mb-2">{lang === 'fa' ? leader : `Leader ${i+1}`}</h3>
                      <p className="text-sm text-[#7c9885] dark:text-[#fedc97] font-medium opacity-0 group-hover:opacity-100 transition-opacity">{t.ui.readMore}</p>
                    </GlowCard>
                  ))}
                </div>
              </section>

              {/* --- 5. آخرین مقالات --- */}
              <section className="relative mt-24 mb-56">
                <div className="bg-gradient-to-r from-[#28666e] to-[#7c9885] dark:from-[#0a1a2a]/90 dark:to-[#040d17]/90 dark:backdrop-blur-2xl rounded-[3rem] pt-16 pb-44 px-6 sm:px-14 shadow-2xl relative overflow-hidden border border-transparent dark:border-white/10">
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 sm:mb-6 relative z-10 flex items-center gap-3 sm:gap-4">
                    <svg className="w-8 h-8 text-[#fedc97]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    {t.ui.latestArticles}
                  </h2>
                  <p className="text-white/80 dark:text-gray-300 max-w-3xl text-sm sm:text-lg leading-relaxed font-light relative z-10">{t.pages.articles.desc}</p>
                </div>
                
                <div className="absolute -bottom-40 left-4 right-4 sm:left-14 sm:right-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 z-20">
                  {[
                    'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=500&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=500&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=500&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=500&auto=format&fit=crop'
                  ].map((img, i) => (
                    <GlowCard key={i} isDarkMode={isDarkMode} onClick={() => handlePageChange('articles-docs')} className="p-4 sm:p-5 h-64 sm:h-72 flex flex-col justify-between">
                      <div>
                        <div className="w-full h-32 sm:h-36 rounded-xl mb-4 sm:mb-5 overflow-hidden relative bg-black/10 dark:bg-black/50">
                          <img src={img} alt="Article" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"/>
                        </div>
                        <h3 className="font-bold text-[#033f63] dark:text-gray-100 text-sm sm:text-base line-clamp-2 leading-relaxed">{t.pages.critique.title} - بررسی جامع {i+1}</h3>
                      </div>
                    </GlowCard>
                  ))}
                </div>
              </section>

            </div>
          ) : (
            /* ================= INTERNAL PAGES (WITH SIDEBAR) ================= */
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
              
              {/* SIDEBAR */}
              <aside className="lg:col-span-1 hidden lg:block">
                <div className="bg-white/60 dark:bg-[#0a1a2a]/60 backdrop-blur-xl border border-gray-200/60 dark:border-white/10 text-gray-800 dark:text-white p-6 rounded-[2.5rem] shadow-xl sticky top-32">
                  <h3 className="text-lg font-black mb-6 flex items-center gap-3 border-b border-gray-200 dark:border-white/10 pb-4 text-[#033f63] dark:text-[#fedc97]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14"/></svg>
                    {t.ui.sidebarTitle}
                  </h3>
                  <div className="space-y-4">
                    {[t.pages.whatIs.title, t.pages.history.title, t.pages.critique.title, t.pages.doubts.title].map((itemTitle, idx) => (
                      <div key={idx} className="flex gap-4 items-center group cursor-pointer p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors" onClick={() => handlePageChange('articles-docs')}>
                        <div className="w-12 h-12 bg-black/10 dark:bg-white/10 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                          <img src={`https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=150&auto=format&fit=crop&sig=${idx}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="thumb"/>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-xs text-gray-800 dark:text-white/90 group-hover:text-[#033f63] dark:group-hover:text-[#fedc97] transition-colors line-clamp-2">{itemTitle}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>

              {/* MAIN CONTENT AREA */}
              <main className="lg:col-span-3">
                <GlowCard isDarkMode={isDarkMode} className="p-6 sm:p-10 md:p-14 min-h-[60vh]">
                  <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/50 dark:bg-black/30 rounded-full flex items-center justify-center text-[#28666e] dark:text-[#fedc97] mb-6 shadow-inner border border-gray-200 dark:border-white/5">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#033f63] dark:text-white mb-6 relative pb-4 inline-block">
                      {currentPageTitle}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-1.5 bg-[#fedc97] rounded-full"></div>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-4xl leading-relaxed mt-2 font-light">
                      {currentPageDesc}
                    </p>
                  </div>

                  {mainCategory !== 'contact' ? (
                    <div className="space-y-10 sm:space-y-12">
                      <div className="w-full h-[250px] sm:h-[400px] bg-black/10 dark:bg-black/40 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-inner relative group border-4 border-white/50 dark:border-white/5">
                        <img src="https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90 dark:opacity-70" alt="Content Image"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#033f63]/80 dark:from-[#040d17] via-transparent to-transparent"></div>
                      </div>
                      
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#033f63] dark:text-[#fedc97] mb-4 flex items-center gap-2">
                          <span className="w-5 h-5 sm:w-6 sm:h-6 bg-[#fedc97] rounded flex-shrink-0"></span>
                          {t.ui.section1}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-loose text-justify text-base sm:text-lg font-light">
                          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد.
                        </p>
                      </div>

                      <div className="bg-black/5 dark:bg-black/30 p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2rem] border-r-8 border-[#7c9885] dark:border-[#fedc97] shadow-inner">
                        <h2 className="text-lg sm:text-xl font-bold text-[#28666e] dark:text-white mb-4 sm:mb-6">{t.ui.section2}</h2>
                        <ul className="space-y-3 sm:space-y-4 text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-lg">
                          <li className="flex items-start gap-3"><svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#7c9885] dark:text-[#fedc97] mt-0.5 sm:mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> بررسی اسناد و مدارک تاریخی بجا مانده از قرن نوزدهم</li>
                          <li className="flex items-start gap-3"><svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#7c9885] dark:text-[#fedc97] mt-0.5 sm:mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> تحلیل تطبیقی متون و نوشته‌های رهبران جنبش</li>
                          <li className="flex items-start gap-3"><svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#7c9885] dark:text-[#fedc97] mt-0.5 sm:mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> تاثیرات اجتماعی و فرهنگی در بستر جامعه آن زمان</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full max-w-2xl mx-auto bg-black/5 dark:bg-black/30 p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-200/50 dark:border-white/10 shadow-inner mt-8 sm:mt-10">
                      <input type="text" placeholder="نام و نام خانوادگی..." className="w-full mb-4 sm:mb-5 bg-white/80 dark:bg-[#0a1a2a] dark:text-white border border-gray-200 dark:border-white/10 p-3 sm:p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#28666e] dark:focus:ring-[#fedc97] transition-all"/>
                      <input type="email" placeholder="آدرس ایمیل..." className="w-full mb-4 sm:mb-5 bg-white/80 dark:bg-[#0a1a2a] dark:text-white border border-gray-200 dark:border-white/10 p-3 sm:p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#28666e] dark:focus:ring-[#fedc97] transition-all"/>
                      <textarea placeholder="پیام یا درخواست پژوهشی خود را بنویسید..." rows={6} className="w-full mb-5 sm:mb-6 bg-white/80 dark:bg-[#0a1a2a] dark:text-white border border-gray-200 dark:border-white/10 p-3 sm:p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#28666e] dark:focus:ring-[#fedc97] transition-all"></textarea>
                      <button className="w-full bg-[#033f63] dark:bg-[#fedc97] text-white dark:text-[#040d17] text-base sm:text-lg font-bold py-3 sm:py-4 rounded-xl shadow-lg hover:opacity-90 transition-all">
                         ارسال فرم تماس
                      </button>
                    </div>
                  )}
                </GlowCard>
              </main>
            </div>
          )}
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#033f63] dark:bg-[#020810]/80 dark:backdrop-blur-2xl text-white mt-24 pt-16 sm:pt-20 pb-8 sm:pb-10 rounded-t-[3rem] sm:rounded-t-[4rem] relative overflow-hidden border-t border-transparent dark:border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        <div className="absolute top-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[#28666e] dark:bg-[#fedc97] rounded-full blur-[100px] sm:blur-[120px] opacity-30 pointer-events-none"></div>
        <div className="max-w-[1300px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10 mb-10 sm:mb-12 text-center md:text-start border-b border-white/10 pb-10 sm:pb-12">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#fedc97] mb-3 sm:mb-4 tracking-tight drop-shadow-sm">
                 {lang === 'fa' ? 'بهائی‌کاوی' : 'Bahai-Kavi'}
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-sm">
                {t.ui.footerDesc}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <a href="#" className="bg-white/10 p-3 rounded-xl sm:rounded-2xl hover:bg-red-500 transition-all duration-300 backdrop-blur-sm border border-white/5"><svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 00-1.94 2C1 8.17 1 12 1 12s0 3.83.46 5.58a2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 001.94-2C23 15.83 23 12 23 12s0-3.83-.46-5.58z M9.5 15.5v-7l6.5 3.5z"/></svg></a>
              <a href="#" className="bg-white/10 p-3 rounded-xl sm:rounded-2xl hover:bg-pink-500 transition-all duration-300 backdrop-blur-sm border border-white/5"><svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg></a>
              <a href="#" className="bg-white/10 p-3 rounded-xl sm:rounded-2xl hover:bg-blue-500 transition-all duration-300 backdrop-blur-sm border border-white/5"><svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
              <a href="#" className="bg-white/10 p-3 rounded-xl sm:rounded-2xl hover:bg-blue-400 transition-all duration-300 backdrop-blur-sm border border-white/5"><svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg></a>
            </div>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm text-center">
             © {new Date().getFullYear()} پایگاه پژوهشی بهائی‌کاوی. تمامی حقوق محفوظ است.
          </p>
        </div>
      </footer>

    </div>
  );
}
