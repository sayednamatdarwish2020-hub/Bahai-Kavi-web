'use client';

import React, { useState, useEffect } from 'react';
import { Vazirmatn } from 'next/font/google';

const vazir = Vazirmatn({ subsets: ['latin', 'arabic'], display: 'swap' });

// ==========================================
// 1. اطلاعات محتوایی و زیرمنوهای اختصاصی
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
      articles: { title: 'مقالات و منابع', sub: [{id: 'articles-library', title: 'کتابخانه جامع'}, {id: 'articles-docs', title: 'اسناد پژوهشی'}] }, 
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
      login: 'ورود / ثبت نام', latestArticles: 'آخرین مطالب منتشر شده', bahaiLeaders: 'شخصیت‌ها و رهبران', specificDoubts: 'پاسخ به مهم‌ترین شبهات',
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
      critique: { title: 'Critique', sub: [{id: 'critique-text', title: 'Textual Analysis'}, {id: 'critique-social', title: 'Social Critique'}] }, 
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
  },
  ps: {
    dir: 'rtl',
    nav: { 
      home: { title: 'کور پاڼه' }, 
      whatIs: { title: 'بهائیت څه دی؟', sub: [{id: 'whatIs-roots', title: 'تاريخي ريښې'}, {id: 'whatIs-admin', title: 'اداري جوړښت'}] }, 
      history: { title: 'تاريخ او مشران', sub: [{id: 'history-babi', title: 'د بابيانو دوره'}, {id: 'history-leaders', title: 'مهم مشران'}] }, 
      critique: { title: 'علمي نيوکه', sub: [{id: 'critique-text', title: 'د متونو نيوکه'}, {id: 'critique-social', title: 'ټولنيزه نيوکه'}] }, 
      doubts: { title: 'شبهاتو ته ځوابونه', sub: [{id: 'doubts-history', title: 'تاريخي شبهات'}, {id: 'doubts-theology', title: 'عقيدتي شبهات'}] }, 
      mahdism: { title: 'مهدویت' }, 
      articles: { title: 'مقالې او سرچينې', sub: [{id: 'articles-library', title: 'کتابتون'}, {id: 'articles-docs', title: 'څېړنيز اسناد'}] }, 
      media: { title: 'رسنۍ' }, 
      contact: { title: 'اړيکه' } 
    },
    pages: {
      home: { title: 'کور پاڼه', desc: 'دا وېبپاڼه د څېړنې او علمي مطالعې لپاره جوړه شوې ده. دلته د تاريخي اسنادو، متونو او بېلابېلو نظرونو علمي څېړنه وړاندې کېږي.' },
      whatIs: { title: 'بهائیت څه دی؟', desc: 'دلته د تاريخي اسنادو، متونو او بېلابېلو نظرونو علمي څېړنه وړاندې کېږي.' },
      history: { title: 'تاريخ او مشران', desc: 'دلته د تاريخي اسنادو، متونو او بېلابېلو نظرونو علمي څېړنه وړاندې کېږي.' },
      critique: { title: 'علمي نيوکه', desc: 'دلته د تاريخي اسنادو، متونو او بېلابېلو نظرونو علمي څېړنه وړاندې کېږي.' },
      doubts: { title: 'شبهاتو ته ځوابونه', desc: 'دلته د تاريخي اسنادو، متونو او بېلابېلو نظرونو علمي څېړنه وړاندې کېږي.' },
      mahdism: { title: 'مهدویت', desc: 'دلته د تاريخي اسنادو، متونو او بېلابېلو نظرونو علمي څېړنه وړاندې کېږي.' },
      articles: { title: 'مقالې او سرچينې', desc: 'دلته د تاريخي اسنادو، متونو او بېلابېلو نظرونو علمي څېړنه وړاندې کېږي.' },
      media: { title: 'رسنۍ', desc: 'دلته د تاريخي اسنادو، متونو او بېلابېلو نظرونو علمي څېړنه وړاندې کېږي.' },
      contact: { title: 'اړيکه', desc: 'د اړيکې لپاره مهرباني وکړئ فورمه ډکه کړئ.' },
    },
    ui: {
      login: 'ننوتل', latestArticles: 'وروستۍ مقالې', bahaiLeaders: 'مشران او شخصيتونه', specificDoubts: 'مهمو شبهاتو ته ځوابونه',
      footerDesc: 'د متونو او اسنادو د مطالعې لپاره خپلواکه څېړنیزه اډه.', readMore: 'نور ولولئ', slide1Title: 'د تاريخي متونو مطالعه', slide2Title: 'تاريخ او مشران', slide3Title: 'علمي څېړنه او ځوابونه',
      videoTitle: 'مستند: په نولسمه پېړۍ کې تاريخي ريښې', sidebarTitle: 'وروستي مطالب', section1: 'لومړۍ برخه: پېژندنه', section2: 'دويمه برخه: تحليلي څېړنه', section3: 'پايله'
    }
  },
  tk: {
    dir: 'ltr',
    nav: { 
      home: { title: 'Baş sahypa' }, 
      whatIs: { title: 'Bahaizm näme?', sub: [{id: 'whatIs-roots', title: 'Taryhy kökler'}, {id: 'whatIs-admin', title: 'Administrasiýa'}] }, 
      history: { title: 'Taryh & Liderler', sub: [{id: 'history-babi', title: 'Babi döwri'}, {id: 'history-leaders', title: 'Esasy Liderler'}] }, 
      critique: { title: 'Ylmy tankyt', sub: [{id: 'critique-text', title: 'Tekst derňewi'}, {id: 'critique-social', title: 'Sosial tankyt'}] }, 
      doubts: { title: 'Jogaplar', sub: [{id: 'doubts-history', title: 'Taryhy şübheler'}, {id: 'doubts-theology', title: 'Dini şübheler'}] }, 
      mahdism: { title: 'Mähdiçilik' }, 
      articles: { title: 'Makalalar', sub: [{id: 'articles-library', title: 'Kitaphana'}, {id: 'articles-docs', title: 'Resminamalar'}] }, 
      media: { title: 'Media' }, 
      contact: { title: 'Aragatnaşyk' } 
    },
    pages: {
      home: { title: 'Baş sahypa', desc: 'Bu web sahypasy taryhy çeşmeleri, ýazgylary we dürli garaýyşlary ylmy taýdan öwrenmek üçin döredilen barlag platformasydyr.' },
      whatIs: { title: 'Bahaizm näme?', desc: 'Bu web sahypasy taryhy çeşmeleri...' },
      history: { title: 'Taryh we Liderler', desc: 'Bu web sahypasy taryhy çeşmeleri...' },
      critique: { title: 'Ylmy tankyt', desc: 'Bu web sahypasy taryhy çeşmeleri...' },
      doubts: { title: 'Jogaplar', desc: 'Bu web sahypasy taryhy çeşmeleri...' },
      mahdism: { title: 'Mähdiçilik', desc: 'Bu web sahypasy taryhy çeşmeleri...' },
      articles: { title: 'Makalalar', desc: 'Bu web sahypasy taryhy çeşmeleri...' },
      media: { title: 'Media', desc: 'Bu web sahypasy taryhy çeşmeleri...' },
      contact: { title: 'Aragatnaşyk', desc: 'Topar bilen habarlaşmak üçin.' },
    },
    ui: {
      login: 'Giriş', latestArticles: 'Soňky makalalar', bahaiLeaders: 'Şahsyýetler we Liderler', specificDoubts: 'Şübhelere jogaplar',
      footerDesc: 'Tekstleri öwrenmek üçin garaşsyz gözleg bazasy.', readMore: 'Giňişleýin okaň', slide1Title: 'Taryhy tekstleri öwreniň', slide2Title: 'Taryh we Liderler', slide3Title: 'Ylmy gözden geçiriş',
      videoTitle: 'Dokumental film: Taryhy kökler', sidebarTitle: 'Soňky neşirler', section1: '1-nji bölüm: Giriş', section2: '2-nji bölüm: Analitik gözden geçiriş', section3: 'Netije'
    }
  }
};

type LangKey = keyof typeof contentData;

// پترن‌های اسلیمی برای گوشه‌ها (بر اساس ساختار شش‌ضلعی و ستاره)
const cornerIslamicPattern = `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0L74.1 25.9L103.9 15L93 45.9L120 60L93 74.1L103.9 105L74.1 94.1L60 120L45.9 94.1L16.1 105L27 74.1L0 60L27 45.9L16.1 15L45.9 25.9L60 0Z' fill='currentColor' fill-opacity='0.08'/%3E%3Cpath d='M60 10L70 30L92 22L84 45L108 60L84 75L92 98L70 90L60 110L50 90L28 98L36 75L12 60L36 45L28 22L50 30L60 10Z' fill='none' stroke='currentColor' stroke-width='2' stroke-opacity='0.15'/%3E%3C/svg%3E")`;

export default function App() {
  const [lang, setLang] = useState<LangKey>('fa');
  const [pageId, setPageId] = useState<string>('home');
  const [slide, setSlide] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // مدیریت حالت تاریک (Dark Mode)
  const [isDarkMode, setIsDarkMode] = useState(false);

  const t = contentData[lang] || contentData['fa']; 
  const isRtl = t.dir === 'rtl';

  // متغیرهای استایل برای تم تاریک و روشن
  const theme = isDarkMode ? {
    bgMain: 'bg-slate-900',
    nav: 'bg-slate-900/95 border-slate-700 shadow-lg shadow-black/20',
    card: 'bg-slate-800 border-slate-700 shadow-slate-900/50 hover:bg-slate-750',
    textMain: 'text-slate-300',
    textHeading: 'text-white',
    textMuted: 'text-slate-500',
    accentText: 'text-[#fedc97]',
    inputBg: 'bg-slate-800 border-slate-700 focus:border-[#fedc97] text-white',
    patternColor: 'text-white',
    footerBg: 'bg-slate-950',
    btnPrimary: 'bg-[#fedc97] text-[#033f63] hover:bg-white',
    dropdown: 'bg-slate-800 border-slate-700 shadow-2xl',
    dropdownItem: 'text-slate-300 hover:bg-slate-700 hover:text-white',
  } : {
    bgMain: 'bg-[#f4f6f8]',
    nav: 'bg-white/95 border-white/50 shadow-sm',
    card: 'bg-white border-gray-100 shadow-sm hover:shadow-lg',
    textMain: 'text-gray-600',
    textHeading: 'text-[#033f63]',
    textMuted: 'text-gray-500',
    accentText: 'text-[#28666e]',
    inputBg: 'bg-white border-gray-200 focus:border-[#28666e] text-gray-800',
    patternColor: 'text-[#033f63]',
    footerBg: 'bg-[#033f63]',
    btnPrimary: 'bg-[#033f63] text-white hover:bg-[#28666e]',
    dropdown: 'bg-white border-gray-100 shadow-xl',
    dropdownItem: 'text-gray-600 hover:bg-[#28666e] hover:text-white',
  };

  const [mainCategory, subCategory] = pageId.split('-');
  let currentPageTitle = t.pages[mainCategory as keyof typeof t.pages]?.title || '';
  let currentPageDesc = t.pages[mainCategory as keyof typeof t.pages]?.desc || '';
  
  if (subCategory) {
    const navItem = t.nav[mainCategory as keyof typeof t.nav];
    if ('sub' in navItem) {
      const subObj = navItem.sub?.find(s => s.id === pageId);
      if (subObj) currentPageTitle = `${currentPageTitle} - ${subObj.title}`;
    }
  }

  const slides = [
    { title: t.ui.slide1Title, desc: t.pages.home.desc, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2000&auto=format&fit=crop', targetPage: 'articles' },
    { title: t.ui.slide2Title, desc: t.pages.history.desc, image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2000&auto=format&fit=crop', targetPage: 'history' },
    { title: t.ui.slide3Title, desc: t.pages.doubts.desc, image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2000&auto=format&fit=crop', targetPage: 'doubts' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (newPageId: string) => {
    if (pageId === newPageId) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setPageId(newPageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setIsTransitioning(false), 300);
    }, 500); 
  };

  useEffect(() => {
    if (mainCategory !== 'home' || isTransitioning) return;
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [mainCategory, slides.length, isTransitioning]);

  // ================= LOADING SCREEN اولیه =================
  if (isInitialLoad) {
    return (
      <div className={`fixed inset-0 ${isDarkMode ? 'bg-slate-900' : 'bg-[#f4f6f8]'} flex flex-col items-center justify-center z-[100] ${vazir.className}`}>
        <div className="relative flex justify-center items-center w-32 h-32 mb-6">
          <div className={`absolute inset-0 border-t-4 border-r-4 ${isDarkMode ? 'border-white' : 'border-[#033f63]'} rounded-full animate-spin`}></div>
          <div className="absolute inset-2 border-b-4 border-l-4 border-[#28666e] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <svg className="w-12 h-12 text-[#d9a05b] animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5H23l-7 5.5 2.5 8.5-7-5.5-7 5.5 2.5-8.5-7-5.5h8.5z"/></svg>
        </div>
        <h1 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-[#033f63]'} tracking-widest animate-pulse`}>
          {lang === 'fa' || lang === 'ps' ? 'بهائی‌کاوی' : 'Bahai-Kavi'}
        </h1>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.bgMain} transition-colors duration-500 ${vazir.className} pb-20 relative overflow-hidden`} dir={t.dir}>
      
      {/* ================= پترن‌های گوشه‌ای (Corner Patterns) ================= */}
      <div className={`absolute top-0 ${isRtl ? 'left-0' : 'right-0'} w-96 h-96 pointer-events-none ${theme.patternColor}`} style={{ backgroundImage: cornerIslamicPattern, backgroundSize: '150px' }}></div>
      <div className={`absolute bottom-0 ${isRtl ? 'right-0' : 'left-0'} w-96 h-96 pointer-events-none ${theme.patternColor} rotate-180`} style={{ backgroundImage: cornerIslamicPattern, backgroundSize: '150px' }}></div>

      {/* ================= OVERLAY LOADING (انیمیشن بین صفحات) ================= */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity duration-300">
           <div className={`w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin`}></div>
        </div>
      )}

      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 relative z-10">
        
        {/* ================= HEADER ================= */}
        <header className={`flex flex-col xl:flex-row justify-between items-center ${theme.nav} backdrop-blur-md px-6 py-4 rounded-2xl transition-all duration-300 sticky top-4 z-50`}>
          
          <div 
            className={`text-2xl xl:text-3xl font-black ${theme.textHeading} tracking-tight cursor-pointer flex-shrink-0 mb-4 xl:mb-0 hover:scale-105 transition-transform`}
            onClick={() => handlePageChange('home')}
          >
            {lang === 'fa' || lang === 'ps' ? 'بهائی‌کاوی' : 'Bahai-Kavi'}
          </div>
          
          {/* Navigation */}
          <nav className={`flex items-center gap-x-3 xl:gap-x-6 ${isDarkMode ? 'text-slate-300' : 'text-[#28666e]'} font-bold text-[13px] xl:text-sm whitespace-nowrap overflow-x-auto xl:overflow-visible no-scrollbar pb-2 xl:pb-0 w-full xl:w-auto justify-center`}>
            {(Object.keys(t.nav)).map((key) => {
              const navItem = t.nav[key as keyof typeof t.nav];
              const hasSub = 'sub' in navItem && navItem.sub;

              return (
                <div key={key} className="relative group">
                  <button 
                    onClick={() => handlePageChange(key)}
                    className={`flex items-center gap-1 py-2 ${mainCategory === key ? (isDarkMode ? 'text-[#fedc97] border-b-2 border-[#fedc97]' : 'text-[#033f63] border-b-2 border-[#fedc97]') : `hover:${theme.accentText} hover:-translate-y-0.5`} transition-all duration-300`}
                  >
                    {navItem.title}
                    {hasSub && (
                      <svg className="w-3.5 h-3.5 mt-0.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                    )}
                  </button>
                  
                  {/* Dropdown Menu */}
                  {hasSub && (
                    <div className="absolute top-full right-1/2 translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 w-44">
                      <div className={`${theme.dropdown} rounded-xl overflow-hidden flex flex-col p-2`}>
                        {navItem.sub.map((subItem: any, idx: number) => (
                          <div 
                            key={idx} 
                            onClick={(e) => { e.stopPropagation(); handlePageChange(subItem.id); }}
                            className={`px-4 py-2.5 text-xs ${theme.dropdownItem} rounded-lg transition-colors cursor-pointer whitespace-nowrap`}
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
          
          <div className="flex items-center gap-3 xl:gap-4 flex-shrink-0 mt-4 xl:mt-0">
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className={`p-2.5 rounded-full ${isDarkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-gray-100 text-[#033f63] hover:bg-gray-200'} transition-colors shadow-sm`}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 4.22a1 1 0 011.415 0l.708.707a1 1 0 01-1.414 1.414l-.708-.707a1 1 0 010-1.414zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-4.22 4.22a1 1 0 010 1.415l-.707.708a1 1 0 01-1.414-1.414l.707-.708a1 1 0 011.414 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.22-4.22a1 1 0 01-1.415 0l-.708-.707a1 1 0 011.414-1.414l.708.707a1 1 0 010 1.414zM4 10a1 1 0 01-1 1H2a1 1 0 110-2h1a1 1 0 011 1zm4.22-4.22a1 1 0 010-1.415l.707-.708a1 1 0 011.414 1.414l-.707.708a1 1 0 01-1.414 0zM10 5a5 5 0 100 10 5 5 0 000-10z"/></svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
              )}
            </button>

            <select 
              className={`${isDarkMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-gray-100 text-[#033f63] hover:bg-gray-200'} text-xs xl:text-sm font-bold px-3 py-2.5 rounded-xl outline-none cursor-pointer transition-colors`}
              value={lang}
              onChange={(e) => setLang(e.target.value as LangKey)}
            >
              <option value="fa">فارسی</option>
              <option value="ps">پښتو</option>
              <option value="en">English</option>
              <option value="tk">Türkmençe</option>
            </select>
            
            <button className={`${theme.btnPrimary} px-5 py-2.5 rounded-xl shadow-md transition-all duration-300 font-bold text-xs xl:text-sm whitespace-nowrap`}>
              {t.ui.login}
            </button>
          </div>
        </header>

        {/* ================= MAIN CONTENT AREA ================= */}
        <div className={`transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
          
          {mainCategory === 'home' ? (
            /* ================= HOME PAGE CONTENT ================= */
            <div className="space-y-24 mt-8">
              
              {/* --- 1. Hero Slider --- */}
              <section className={`relative w-full h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl group border-4 ${isDarkMode ? 'border-slate-800' : 'border-white'}`}>
                <div className="absolute inset-0 transition-opacity duration-1000">
                  <img src={slides[slide].image} alt="Slider Background" className="w-full h-full object-cover"/>
                  <div className={`absolute inset-0 ${isDarkMode ? 'bg-slate-900/85' : 'bg-[#033f63]/80'} mix-blend-multiply`}></div>
                  <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-slate-950 via-slate-900/40' : 'from-[#033f63] via-[#033f63]/40'} to-transparent`}></div>
                </div>

                <div className="absolute inset-0 p-10 md:p-20 flex flex-col justify-center items-start z-10">
                  <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-[#fedc97] text-sm font-bold mb-6 backdrop-blur-md shadow-sm">
                    {lang === 'fa' || lang === 'ps' ? 'پایگاه پژوهشی مستقل' : 'Independent Research'}
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white leading-tight max-w-3xl drop-shadow-lg">
                    {slides[slide].title}
                  </h1>
                  <p className="max-w-2xl text-lg text-gray-200 leading-relaxed mb-8 font-light line-clamp-3">
                    {slides[slide].desc}
                  </p>
                  <button 
                    onClick={() => handlePageChange(slides[slide].targetPage)}
                    className="bg-[#fedc97] text-[#033f63] font-black px-10 py-3.5 rounded-xl shadow-[0_10px_20px_rgba(254,220,151,0.2)] hover:shadow-[0_15px_30px_rgba(254,220,151,0.4)] hover:-translate-y-1 transition-all duration-300"
                  >
                    {t.ui.readMore}
                  </button>
                </div>
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
                  {slides.map((_, i) => (
                    <button key={i} onClick={() => setSlide(i)} className={`h-2 rounded-full transition-all duration-500 ${slide === i ? 'w-12 bg-[#fedc97]' : 'w-3 bg-white/40 hover:bg-white/80'}`}></button>
                  ))}
                </div>
              </section>

              {/* --- 2. اهداف و روش‌شناسی --- */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: lang === 'fa' ? 'گردآوری اسناد' : 'Document Collection', desc: t.pages.articles.desc, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                  { title: lang === 'fa' ? 'تحلیل آکادمیک' : 'Academic Analysis', desc: t.pages.critique.desc, icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
                  { title: lang === 'fa' ? 'ارائه مستند' : 'Documented Output', desc: t.pages.doubts.desc, icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' }
                ].map((item, i) => (
                  <div key={i} className={`${theme.card} rounded-[2rem] p-8 transition-all duration-300 flex items-start gap-6 group`}>
                    <div className={`w-16 h-16 rounded-2xl ${isDarkMode ? 'bg-slate-700 text-slate-300 group-hover:bg-[#fedc97] group-hover:text-slate-900' : 'bg-[#f4f6f8] text-[#28666e] group-hover:bg-[#28666e] group-hover:text-white'} flex items-center justify-center flex-shrink-0 transition-colors duration-300`}>
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon}/></svg>
                    </div>
                    <div>
                      <h3 className={`font-bold ${theme.textHeading} text-lg mb-2 line-clamp-1`}>{item.title}</h3>
                      <p className={`text-sm ${theme.textMuted} line-clamp-2`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </section>

              {/* --- 3. دسته‌بندی‌ها --- */}
              <section className={`${theme.card} p-8 rounded-[2.5rem]`}>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                  {[
                    { title: t.nav.whatIs.title, icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', page: 'whatIs' },
                    { title: t.nav.history.title, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', page: 'history' },
                    { title: t.nav.critique.title, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', page: 'critique' },
                    { title: t.nav.mahdism.title, icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', page: 'mahdism' },
                    { title: t.nav.media.title, icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z', page: 'media' }
                  ].map((item, index) => (
                    <div key={index} onClick={() => handlePageChange(item.page as PageKey)} className={`${isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600' : 'bg-[#f4f6f8] border-gray-100 text-[#033f63] hover:bg-[#033f63] hover:text-white'} h-36 rounded-2xl border hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-center items-center p-4 group`}>
                      <div className={`w-14 h-14 ${isDarkMode ? 'bg-slate-800 text-slate-300 group-hover:bg-[#fedc97] group-hover:text-slate-900' : 'bg-white text-[#033f63] group-hover:bg-[#fedc97] group-hover:text-[#033f63]'} rounded-xl mb-3 flex items-center justify-center transition-colors shadow-sm`}>
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                      </div>
                      <span className="text-sm font-bold text-center">{item.title}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* --- 4. رهبران بهائیت --- */}
              <section>
                <h2 className={`text-2xl font-black ${theme.textHeading} border-b-4 border-[#fedc97] pb-2 inline-block mb-8`}>{t.ui.bahaiLeaders}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {['سید علی‌محمد باب', 'میرزا حسین‌علی (بهاءالله)', 'عباس افندی (عبدالبهاء)', 'شوقی افندی'].map((leader, i) => (
                    <div key={i} className={`${theme.card} rounded-[2rem] p-6 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center cursor-pointer group`} onClick={() => handlePageChange('history')}>
                      <div className={`w-28 h-28 rounded-full bg-gray-200 mb-5 overflow-hidden border-[6px] ${isDarkMode ? 'border-slate-900 group-hover:border-[#fedc97]' : 'border-[#f4f6f8] group-hover:border-[#7c9885]'} transition-colors relative`}>
                        <img src={`https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=200&auto=format&fit=crop&sig=${i}`} alt={leader} className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 transition-all duration-500"/>
                      </div>
                      <h3 className={`font-bold ${theme.textHeading} text-lg mb-2`}>{lang === 'fa' || lang === 'ps' ? leader : `Leader ${i+1}`}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-[#fedc97]' : 'text-[#7c9885]'} font-medium opacity-0 group-hover:opacity-100 transition-opacity`}>{t.ui.readMore}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* --- 5. مرکز رسانه --- */}
              <section className="bg-[#28666e] rounded-[3rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#fedc97]/20 rounded-full blur-3xl"></div>
                <div className="flex-1 relative z-10 text-white space-y-6">
                  <span className="bg-[#fedc97] text-[#033f63] font-bold px-4 py-1.5 rounded-full text-sm">مستند ویژه</span>
                  <h2 className="text-3xl md:text-4xl font-black leading-tight">{t.ui.videoTitle}</h2>
                  <p className="text-gray-200 text-lg">{t.pages.media.desc}</p>
                  <button onClick={() => handlePageChange('media')} className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-xl transition-all font-bold backdrop-blur-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    مشاهده آرشیو رسانه
                  </button>
                </div>
                <div className="w-full md:w-1/2 h-64 md:h-80 bg-gray-900 rounded-[2rem] relative z-10 overflow-hidden group cursor-pointer shadow-lg border-4 border-white/10" onClick={() => handlePageChange('media')}>
                  <img src="https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=1000&auto=format&fit=crop" alt="Video Thumbnail" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"/>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-20 h-20 bg-[#fedc97] rounded-full flex items-center justify-center text-[#033f63] shadow-[0_0_30px_rgba(254,220,151,0.5)] group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z"/></svg>
                     </div>
                  </div>
                </div>
              </section>

              {/* --- 6. آخرین مقالات --- */}
              <section className="relative mt-24 mb-56">
                <div className="bg-gradient-to-r from-[#28666e] to-[#7c9885] rounded-[3rem] pt-16 pb-44 px-8 sm:px-14 shadow-xl relative overflow-hidden">
                  <h2 className="text-3xl font-black text-white mb-6 relative z-10 flex items-center gap-4">
                    <svg className="w-8 h-8 text-[#fedc97]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    {t.ui.latestArticles}
                  </h2>
                  <p className="text-white/80 max-w-3xl text-lg leading-relaxed font-light relative z-10">{t.pages.articles.desc}</p>
                </div>
                <div className="absolute -bottom-40 left-6 right-6 sm:left-14 sm:right-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 z-20">
                  {[
                    'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=500&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=500&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=500&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=500&auto=format&fit=crop'
                  ].map((img, i) => (
                    <div key={i} onClick={() => handlePageChange('articles-docs')} className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border-t-[6px] border-[#033f63] h-72 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:-translate-y-4 transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer group`}>
                      <div>
                        <div className={`w-full h-36 rounded-xl mb-5 overflow-hidden relative ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
                          <img src={img} alt="Article" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                        </div>
                        <h3 className={`font-bold ${theme.textHeading} text-base line-clamp-2 leading-relaxed`}>{t.pages.critique.title} - بررسی جامع {i+1}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          ) : (
            /* ================= INTERNAL PAGES TEMPLATE (WITH SIDEBAR) ================= */
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8 relative z-10">
              
              {/* SIDEBAR */}
              <aside className="lg:col-span-1">
                <div className="bg-gradient-to-b from-[#28666e] to-[#7c9885] text-white p-6 rounded-[2.5rem] shadow-xl sticky top-32 border border-white/10">
                  <h3 className="text-xl font-black mb-6 flex items-center gap-3 border-b border-white/20 pb-4">
                    <svg className="w-6 h-6 text-[#fedc97]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14"/></svg>
                    {t.ui.sidebarTitle}
                  </h3>
                  <div className="space-y-5">
                    {[t.pages.whatIs.title, t.pages.history.title, t.pages.critique.title, t.pages.doubts.title].map((itemTitle, idx) => (
                      <div key={idx} className="flex gap-4 items-center group cursor-pointer" onClick={() => handlePageChange('articles-docs')}>
                        <div className="w-14 h-14 bg-white/10 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform border border-white/10 flex-shrink-0">
                          <img src={`https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=150&auto=format&fit=crop&sig=${idx}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="thumb"/>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-white/90 group-hover:text-[#033f63] transition-colors line-clamp-2">{itemTitle} - تحلیل ساختاری</h4>
                          <p className="text-[11px] text-white/60 mt-1">2 روز پیش</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>

              {/* MAIN INTERNAL CONTENT */}
              <main className={`lg:col-span-3 ${theme.card} rounded-[3rem] p-10 md:p-14 border min-h-[60vh] transition-colors`}>
                <div className="flex flex-col items-center text-center mb-12">
                  <div className={`w-20 h-20 ${isDarkMode ? 'bg-slate-700' : 'bg-[#f4f6f8]'} rounded-full flex items-center justify-center text-[#28666e] mb-6 shadow-inner border ${isDarkMode ? 'border-slate-600' : 'border-gray-200'}`}>
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  <h1 className={`text-4xl md:text-5xl font-black ${theme.textHeading} mb-6 relative pb-4 inline-block`}>
                    {currentPageTitle}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-[#fedc97] rounded-full"></div>
                  </h1>
                  <p className={`text-xl ${theme.textMuted} max-w-4xl leading-relaxed mt-4 font-light`}>
                    {currentPageDesc}
                  </p>
                </div>

                {mainCategory !== 'contact' ? (
                  <div className="space-y-12">
                    <div className={`w-full h-[400px] ${isDarkMode ? 'bg-slate-700 border-slate-700' : 'bg-gray-100 border-[#f4f6f8]'} rounded-[2.5rem] overflow-hidden shadow-inner relative group border-4`}>
                      <img src="https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Content Image"/>
                      <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-slate-900/90 via-slate-900/40' : 'from-[#033f63]/80 via-[#033f63]/20'} to-transparent`}></div>
                      <div className="absolute bottom-6 left-8 right-8 text-white font-bold text-2xl drop-shadow-md">
                        {currentPageTitle}
                      </div>
                    </div>
                    
                    <div>
                      <h2 className={`text-2xl font-bold ${theme.textHeading} mb-4 flex items-center gap-2`}>
                        <span className="w-6 h-6 bg-[#fedc97] rounded flex-shrink-0"></span>
                        {t.ui.section1}
                      </h2>
                      <p className={`${theme.textMain} leading-loose text-justify text-lg font-light`}>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد.
                      </p>
                    </div>

                    <div className={`${isDarkMode ? 'bg-slate-700 border-[#fedc97]' : 'bg-[#f4f6f8] border-[#7c9885]'} p-10 rounded-[2rem] border-r-8 shadow-sm`}>
                      <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-[#28666e]'} mb-6`}>{t.ui.section2}</h2>
                      <ul className={`space-y-4 ${theme.textMain} font-medium text-lg`}>
                        <li className="flex items-start gap-3"><svg className={`w-6 h-6 ${isDarkMode ? 'text-[#fedc97]' : 'text-[#7c9885]'} mt-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> بررسی اسناد و مدارک تاریخی بجا مانده از قرن نوزدهم</li>
                        <li className="flex items-start gap-3"><svg className={`w-6 h-6 ${isDarkMode ? 'text-[#fedc97]' : 'text-[#7c9885]'} mt-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> تحلیل تطبیقی متون و نوشته‌های رهبران جنبش</li>
                        <li className="flex items-start gap-3"><svg className={`w-6 h-6 ${isDarkMode ? 'text-[#fedc97]' : 'text-[#7c9885]'} mt-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> تاثیرات اجتماعی و فرهنگی در بستر جامعه آن زمان</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className={`w-full max-w-2xl mx-auto ${isDarkMode ? 'bg-slate-750' : 'bg-gray-50'} p-10 rounded-[2.5rem] border ${isDarkMode ? 'border-slate-600' : 'border-gray-200'} shadow-sm mt-10`}>
                    <input type="text" placeholder="نام و نام خانوادگی..." className={`w-full mb-5 p-4 rounded-xl outline-none transition-all ${theme.inputBg}`}/>
                    <input type="email" placeholder="آدرس ایمیل..." className={`w-full mb-5 p-4 rounded-xl outline-none transition-all ${theme.inputBg}`}/>
                    <textarea placeholder="پیام یا درخواست پژوهشی خود را بنویسید..." rows={6} className={`w-full mb-6 p-4 rounded-xl outline-none transition-all ${theme.inputBg}`}></textarea>
                    <button className="w-full bg-[#28666e] text-white text-lg font-bold py-4 rounded-xl shadow-md hover:bg-[#033f63] hover:shadow-lg transition-all">
                       ارسال فرم تماس
                    </button>
                  </div>
                )}
              </main>
            </div>
          )}
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className={`${theme.footerBg} text-white mt-24 pt-20 pb-10 rounded-t-[4rem] relative overflow-hidden transition-colors`}>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#28666e] rounded-full blur-[100px] opacity-50 pointer-events-none"></div>
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-12 text-center md:text-start border-b border-white/10 pb-12">
            <div>
              <div className="text-4xl font-black text-[#fedc97] mb-4 tracking-tight">
                 {lang === 'fa' || lang === 'ps' ? 'بهائی‌کاوی' : 'Bahai-Kavi'}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
                {t.ui.footerDesc}
              </p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="bg-white/10 p-3.5 rounded-2xl hover:bg-red-500 transition-all duration-300 shadow-sm backdrop-blur-sm"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 00-1.94 2C1 8.17 1 12 1 12s0 3.83.46 5.58a2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 001.94-2C23 15.83 23 12 23 12s0-3.83-.46-5.58z M9.5 15.5v-7l6.5 3.5z"/></svg></a>
              <a href="#" className="bg-white/10 p-3.5 rounded-2xl hover:bg-pink-500 transition-all duration-300 shadow-sm backdrop-blur-sm"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg></a>
              <a href="#" className="bg-white/10 p-3.5 rounded-2xl hover:bg-blue-500 transition-all duration-300 shadow-sm backdrop-blur-sm"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
              <a href="#" className="bg-white/10 p-3.5 rounded-2xl hover:bg-blue-400 transition-all duration-300 shadow-sm backdrop-blur-sm"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg></a>
            </div>
          </div>
          <p className="text-gray-400 text-sm text-center">
             © {new Date().getFullYear()} پایگاه پژوهشی بهائی‌کاوی. تمامی حقوق محفوظ است.
          </p>
        </div>
      </footer>

    </div>
  );
}
