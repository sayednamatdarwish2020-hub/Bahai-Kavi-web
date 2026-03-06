'use client';

import React, { useState, useEffect } from 'react';
import { Vazirmatn } from 'next/font/google';

const vazir = Vazirmatn({ subsets: ['latin', 'arabic'], display: 'swap' });

// ==========================================
// 1. اطلاعات محتوایی (شامل صفحات اختصاصی برای زیرمنوها)
// ==========================================
const contentData = {
  fa: {
    dir: 'rtl',
    nav: {
      home: { title: 'صفحه اصلی' },
      whatIs: {
        title: 'بهائیت چیست؟',
        sub: [
          { id: 'whatIs_roots', title: 'ریشه‌های تاریخی' },
          { id: 'whatIs_admin', title: 'ساختار اداری' },
        ],
      },
      history: {
        title: 'تاریخچه و رهبران',
        sub: [
          { id: 'history_babi', title: 'دوران بابیگری' },
          { id: 'history_leaders', title: 'رهبران اصلی' },
        ],
      },
      critique: {
        title: 'نقد علمی',
        sub: [
          { id: 'critique_text', title: 'نقد متون' },
          { id: 'critique_social', title: 'نقد اجتماعی' },
        ],
      },
      doubts: {
        title: 'پاسخ به شبهات',
        sub: [
          { id: 'doubts_history', title: 'شبهات تاریخی' },
          { id: 'doubts_theology', title: 'شبهات کلامی' },
        ],
      },
      mahdism: { title: 'مهدویت' },
      articles: {
        title: 'مقالات و منابع',
        sub: [
          { id: 'articles_lib', title: 'کتابخانه' },
          { id: 'articles_docs', title: 'اسناد پژوهشی' },
        ],
      },
      media: { title: 'رسانه' },
      contact: { title: 'تماس' },
    },
    pages: {
      home: {
        title: 'صفحه اصلی',
        desc: 'بهائی‌کاوی یک پایگاه پژوهشی مستقل است که با هدف مطالعه و تحلیل متون، اسناد تاریخی و دیدگاه‌های مختلف درباره آیین بهائی ایجاد شده است.',
      },
      whatIs: {
        title: 'بهائیت چیست؟',
        desc: 'بهائیت یک جنبش دینی است که در قرن نوزدهم در ایران شکل گرفت.',
      },
      whatIs_roots: {
        title: 'ریشه‌های تاریخی آیین بهائی',
        desc: 'بررسی دقیق ریشه‌های شکل‌گیری این جنبش در بستر تاریخی ایران قرن نوزدهم و ارتباط آن با جریانات پیشین.',
      },
      whatIs_admin: {
        title: 'ساختار اداری و تشکیلاتی',
        desc: 'تحلیل ساختار تشکیلاتی، بیت‌العدل و نحوه مدیریت و سازماندهی در این آیین.',
      },
      history: {
        title: 'تاریخچه و رهبران',
        desc: 'تاریخ شکل‌گیری این آیین با تحولات مذهبی و اجتماعی قرن نوزدهم مرتبط است.',
      },
      history_babi: {
        title: 'دوران بابیگری',
        desc: 'مطالعه تحلیلی دوران سید علی‌محمد باب و تاثیرات اجتماعی و مذهبی آن دوره.',
      },
      history_leaders: {
        title: 'رهبران اصلی',
        desc: 'بررسی زندگی، آثار و نقش بهاءالله، عبدالبهاء و شوقی افندی در گسترش این جریان.',
      },
      critique: {
        title: 'نقد علمی',
        desc: 'نقد علمی به معنای بررسی یک موضوع با روش‌های دانشگاهی است.',
      },
      critique_text: {
        title: 'نقد و تحلیل متون',
        desc: 'بررسی تطبیقی و تحلیلی متون اصلی و نامه‌های بجا مانده با رویکرد آکادمیک.',
      },
      critique_social: {
        title: 'نقد آموزه‌های اجتماعی',
        desc: 'ارزیابی ادعاهای اجتماعی و تطابق آن‌ها با واقعیات تاریخی و عملکردها.',
      },
      doubts: {
        title: 'پاسخ به شبهات',
        desc: 'در پژوهش‌های تاریخی پرسش‌های زیادی مطرح می‌شود. این بخش به بررسی آن‌ها می‌پردازد.',
      },
      doubts_history: {
        title: 'پاسخ به شبهات تاریخی',
        desc: 'بررسی اسناد و مدارک برای پاسخگویی به ابهامات و تناقضات تاریخی مطرح شده.',
      },
      doubts_theology: {
        title: 'پاسخ به شبهات کلامی',
        desc: 'تحلیل مبانی اعتقادی و پاسخ به پرسش‌های کلامی با ارجاع به منابع اولیه.',
      },
      mahdism: {
        title: 'مهدویت',
        desc: 'مفهوم مهدویت در اندیشه اسلامی نقش مهمی داشته است.',
      },
      articles: {
        title: 'مقالات و منابع',
        desc: 'این بخش شامل مجموعه‌ای از منابع پژوهشی است.',
      },
      articles_lib: {
        title: 'کتابخانه تخصصی',
        desc: 'دسترسی به کتب، مقالات و پژوهش‌های منتشر شده در این حوزه.',
      },
      articles_docs: {
        title: 'اسناد پژوهشی و تاریخی',
        desc: 'بایگانی اسناد دست‌اول، نامه‌ها و مدارک تاریخی دوران قاجار و پهلوی.',
      },
      media: {
        title: 'رسانه',
        desc: 'در این بخش محتوای چندرسانه‌ای ارائه می‌شود.',
      },
      contact: {
        title: 'تماس با ما',
        desc: 'برای ارتباط با تیم پژوهشی می‌توانید از طریق فرم تماس اقدام کنید.',
      },
    },
    ui: {
      login: 'ورود / ثبت نام',
      latestArticles: 'آخرین مقالات و مطالب',
      bahaiLeaders: 'شخصیت‌ها و رهبران',
      specificDoubts: 'پاسخ به مهم‌ترین شبهات',
      footerDesc:
        'پایگاه پژوهشی مستقل برای مطالعه متون، اسناد تاریخی و نقد علمی.',
      readMore: 'مطالعه بیشتر',
      slide1Title: 'مطالعه و تحلیل متون تاریخی',
      slide2Title: 'آشنایی با تاریخچه و رهبران',
      slide3Title: 'بررسی علمی و پاسخ به شبهات',
      sidebarTitle: 'آخرین مطالب منتشر شده',
      section1: 'بخش اول: مقدمه و کلیات',
      section2: 'بخش دوم: بررسی تحلیلی و اسناد',
      section3: 'نتیجه‌گیری پژوهش',
    },
  },
  en: {
    dir: 'ltr',
    nav: {
      home: { title: 'Home' },
      whatIs: {
        title: 'What is Baháʼí?',
        sub: [
          { id: 'whatIs_roots', title: 'Historical Roots' },
          { id: 'whatIs_admin', title: 'Administration' },
        ],
      },
      history: {
        title: 'History',
        sub: [
          { id: 'history_babi', title: 'Babi Era' },
          { id: 'history_leaders', title: 'Key Leaders' },
        ],
      },
      critique: {
        title: 'Critique',
        sub: [
          { id: 'critique_text', title: 'Textual Analysis' },
          { id: 'critique_social', title: 'Social Critique' },
        ],
      },
      doubts: {
        title: 'Doubts',
        sub: [
          { id: 'doubts_history', title: 'Historical' },
          { id: 'doubts_theology', title: 'Theological' },
        ],
      },
      mahdism: { title: 'Mahdism' },
      articles: {
        title: 'Articles',
        sub: [
          { id: 'articles_lib', title: 'Library' },
          { id: 'articles_docs', title: 'Documents' },
        ],
      },
      media: { title: 'Media' },
      contact: { title: 'Contact' },
    },
    pages: {
      home: {
        title: 'Home',
        desc: 'Academic platform dedicated to the historical and textual study.',
      },
      whatIs: {
        title: 'What is the Baháʼí Faith?',
        desc: 'A religious movement that emerged in 19th-century Iran.',
      },
      whatIs_roots: {
        title: 'Historical Roots',
        desc: "Detailed study of the movement's origins.",
      },
      whatIs_admin: {
        title: 'Administration',
        desc: 'Analysis of the organizational structure.',
      },
      history: {
        title: 'History & Leadership',
        desc: 'The history of this movement is tied to social changes.',
      },
      history_babi: {
        title: 'The Babi Era',
        desc: 'Analytical study of the Babi period.',
      },
      history_leaders: {
        title: 'Key Leaders',
        desc: 'Examining the lives and works of key figures.',
      },
      critique: {
        title: 'Academic Critique',
        desc: 'Examining claims using academic methodologies.',
      },
      critique_text: {
        title: 'Textual Analysis',
        desc: 'Comparative study of original texts.',
      },
      critique_social: {
        title: 'Social Critique',
        desc: 'Evaluating social claims against historical realities.',
      },
      doubts: {
        title: 'Research Responses',
        desc: 'Addressing common questions and doubts.',
      },
      doubts_history: {
        title: 'Historical Doubts',
        desc: 'Reviewing documents to answer historical ambiguities.',
      },
      doubts_theology: {
        title: 'Theological Doubts',
        desc: 'Analyzing beliefs based on primary sources.',
      },
      mahdism: {
        title: 'Mahdism Context',
        desc: 'The concept of Mahdism in Islamic thought.',
      },
      articles: {
        title: 'Articles & Sources',
        desc: 'Books, academic papers, and historical documents.',
      },
      articles_lib: {
        title: 'Specialized Library',
        desc: 'Access to published books and research.',
      },
      articles_docs: {
        title: 'Historical Documents',
        desc: 'Archive of primary sources and letters.',
      },
      media: {
        title: 'Media',
        desc: 'Educational videos, podcasts, and documentaries.',
      },
      contact: { title: 'Contact', desc: 'Reach out to our research team.' },
    },
    ui: {
      login: 'Login',
      latestArticles: 'Latest Publications',
      bahaiLeaders: 'Key Figures & Leaders',
      specificDoubts: 'Answers to Doubts',
      footerDesc: 'Independent research base for studying texts.',
      readMore: 'Read More',
      slide1Title: 'Study Historical Texts',
      slide2Title: 'History & Leadership',
      slide3Title: 'Scientific Review',
      sidebarTitle: 'Latest Publications',
      section1: 'Part 1: Introduction',
      section2: 'Part 2: Analytical Review',
      section3: 'Conclusion',
    },
  },
  ps: {
    dir: 'rtl',
    nav: {
      home: { title: 'کور پاڼه' },
      whatIs: {
        title: 'بهائیت څه دی؟',
        sub: [
          { id: 'whatIs_roots', title: 'تاريخي ريښې' },
          { id: 'whatIs_admin', title: 'اداري جوړښت' },
        ],
      },
      history: {
        title: 'تاريخ او مشران',
        sub: [
          { id: 'history_babi', title: 'د بابيانو دوره' },
          { id: 'history_leaders', title: 'مهم مشران' },
        ],
      },
      critique: {
        title: 'علمي نيوکه',
        sub: [
          { id: 'critique_text', title: 'د متونو نيوکه' },
          { id: 'critique_social', title: 'ټولنيزه نيوکه' },
        ],
      },
      doubts: {
        title: 'شبهاتو ته ځوابونه',
        sub: [
          { id: 'doubts_history', title: 'تاريخي شبهات' },
          { id: 'doubts_theology', title: 'عقيدتي شبهات' },
        ],
      },
      mahdism: { title: 'مهدویت' },
      articles: {
        title: 'مقالې او سرچينې',
        sub: [
          { id: 'articles_lib', title: 'کتابتون' },
          { id: 'articles_docs', title: 'څېړنيز اسناد' },
        ],
      },
      media: { title: 'رسنۍ' },
      contact: { title: 'اړيکه' },
    },
    pages: {
      home: {
        title: 'کور پاڼه',
        desc: 'دا وېبپاڼه د څېړنې او علمي مطالعې لپاره جوړه شوې ده.',
      },
      whatIs: { title: 'بهائیت څه دی؟', desc: 'علمي څېړنه او مستندات.' },
      whatIs_roots: { title: 'تاريخي ريښې', desc: 'د جنبش د ريښو څېړنه.' },
      whatIs_admin: { title: 'اداري جوړښت', desc: 'د اداري جوړښت تحليل.' },
      history: { title: 'تاريخ او مشران', desc: 'تاريخي او ټولنيز بدلونونه.' },
      history_babi: { title: 'د بابيانو دوره', desc: 'د باب دورې څېړنه.' },
      history_leaders: {
        title: 'مهم مشران',
        desc: 'د مشرانو د ژوند او اثارو څېړنه.',
      },
      critique: { title: 'علمي نيوکه', desc: 'د متونو علمي نيوکه.' },
      critique_text: {
        title: 'د متونو نيوکه',
        desc: 'د اصلي متونو تطبیقي څېړنه.',
      },
      critique_social: {
        title: 'ټولنيزه نيوکه',
        desc: 'د ټولنيزو ادعاوو ارزونه.',
      },
      doubts: { title: 'شبهاتو ته ځوابونه', desc: 'مهمو پوښتنو ته ځوابونه.' },
      doubts_history: {
        title: 'تاريخي شبهات',
        desc: 'د تاريخي اسنادو ارزونه.',
      },
      doubts_theology: { title: 'عقيدتي شبهات', desc: 'د عقايدو تحليل.' },
      mahdism: { title: 'مهدویت', desc: 'په اسلامي مفکوره کې مهدویت.' },
      articles: { title: 'مقالې او سرچينې', desc: 'علمي مقالې او اسناد.' },
      articles_lib: { title: 'کتابتون', desc: 'کتابونو ته لاسرسی.' },
      articles_docs: { title: 'څېړنيز اسناد', desc: 'تاريخي اسناد او ليکونه.' },
      media: { title: 'رسنۍ', desc: 'ويډيوګانې او مستندات.' },
      contact: { title: 'اړيکه', desc: 'له موږ سره اړيکه ونيسئ.' },
    },
    ui: {
      login: 'ننوتل / نوم ليکنه',
      latestArticles: 'وروستي مطالب',
      bahaiLeaders: 'مشران او شخصيتونه',
      specificDoubts: 'مهمو شبهاتو ته ځوابونه',
      footerDesc: 'د متونو او اسنادو د مطالعې لپاره خپلواکه څېړنیزه اډه.',
      readMore: 'نور ولولئ',
      slide1Title: 'د تاريخي متونو مطالعه',
      slide2Title: 'تاريخ او مشران',
      slide3Title: 'علمي څېړنه',
      sidebarTitle: 'وروستي مطالب',
      section1: 'لومړۍ برخه: پېژندنه',
      section2: 'دويمه برخه: تحليلي څېړنه',
      section3: 'پايله',
    },
  },
  tk: {
    dir: 'ltr',
    nav: {
      home: { title: 'Baş sahypa' },
      whatIs: {
        title: 'Bahaizm näme?',
        sub: [
          { id: 'whatIs_roots', title: 'Taryhy kökler' },
          { id: 'whatIs_admin', title: 'Administrasiýa' },
        ],
      },
      history: {
        title: 'Taryh & Liderler',
        sub: [
          { id: 'history_babi', title: 'Babi döwri' },
          { id: 'history_leaders', title: 'Esasy Liderler' },
        ],
      },
      critique: {
        title: 'Ylmy tankyt',
        sub: [
          { id: 'critique_text', title: 'Tekst derňewi' },
          { id: 'critique_social', title: 'Sosial tankyt' },
        ],
      },
      doubts: {
        title: 'Jogaplar',
        sub: [
          { id: 'doubts_history', title: 'Taryhy şübheler' },
          { id: 'doubts_theology', title: 'Dini şübheler' },
        ],
      },
      mahdism: { title: 'Mähdiçilik' },
      articles: {
        title: 'Makalalar',
        sub: [
          { id: 'articles_lib', title: 'Kitaphana' },
          { id: 'articles_docs', title: 'Resminamalar' },
        ],
      },
      media: { title: 'Media' },
      contact: { title: 'Aragatnaşyk' },
    },
    pages: {
      home: {
        title: 'Baş sahypa',
        desc: 'Bu web sahypasy ylmy taýdan öwrenmek üçin döredilen barlag platformasydyr.',
      },
      whatIs: { title: 'Bahaizm näme?', desc: 'Taryhy çeşmeler...' },
      whatIs_roots: { title: 'Taryhy kökler', desc: 'Taryhy çeşmeler...' },
      whatIs_admin: { title: 'Administrasiýa', desc: 'Taryhy çeşmeler...' },
      history: { title: 'Taryh we Liderler', desc: 'Taryhy çeşmeler...' },
      history_babi: { title: 'Babi döwri', desc: 'Taryhy çeşmeler...' },
      history_leaders: { title: 'Esasy Liderler', desc: 'Taryhy çeşmeler...' },
      critique: { title: 'Ylmy tankyt', desc: 'Taryhy çeşmeler...' },
      critique_text: { title: 'Tekst derňewi', desc: 'Taryhy çeşmeler...' },
      critique_social: { title: 'Sosial tankyt', desc: 'Taryhy çeşmeler...' },
      doubts: { title: 'Jogaplar', desc: 'Taryhy çeşmeler...' },
      doubts_history: { title: 'Taryhy şübheler', desc: 'Taryhy çeşmeler...' },
      doubts_theology: { title: 'Dini şübheler', desc: 'Taryhy çeşmeler...' },
      mahdism: { title: 'Mähdiçilik', desc: 'Taryhy çeşmeler...' },
      articles: { title: 'Makalalar', desc: 'Taryhy çeşmeler...' },
      articles_lib: { title: 'Kitaphana', desc: 'Taryhy çeşmeler...' },
      articles_docs: { title: 'Resminamalar', desc: 'Taryhy çeşmeler...' },
      media: { title: 'Media', desc: 'Taryhy çeşmeler...' },
      contact: { title: 'Aragatnaşyk', desc: 'Habarlaşmak üçin.' },
    },
    ui: {
      login: 'Giriş',
      latestArticles: 'Soňky makalalar',
      bahaiLeaders: 'Şahsyýetler we Liderler',
      specificDoubts: 'Şübhelere jogaplar',
      footerDesc: 'Garaşsyz gözleg bazasy.',
      readMore: 'Giňişleýin okaň',
      slide1Title: 'Taryhy tekstleri öwreniň',
      slide2Title: 'Taryh we Liderler',
      slide3Title: 'Ylmy gözden geçiriş',
      sidebarTitle: 'Soňky neşirler',
      section1: '1-nji bölüm: Giriş',
      section2: '2-nji bölüm: Analitik gözden geçiriş',
      section3: 'Netije',
    },
  },
};

type LangKey = keyof typeof contentData;

// پترن‌های جدید هندسی بزرگ (وضوح بالا)
const newPatternLight = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23033f63' fill-opacity='0.04'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L40 1.41V0h-1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;
const newPatternDark = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L40 1.41V0h-1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

export default function App() {
  const [lang, setLang] = useState<LangKey>('fa');
  const [page, setPage] = useState<string>('home');
  const [slide, setSlide] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const t = contentData[lang] || contentData['fa'];
  const isRtl = t.dir === 'rtl';

  const slides = [
    {
      title: t.ui.slide1Title,
      desc: t.pages.home.desc,
      image:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2000&auto=format&fit=crop',
      targetPage: 'articles',
    },
    {
      title: t.ui.slide2Title,
      desc: t.pages.history.desc,
      image:
        'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2000&auto=format&fit=crop',
      targetPage: 'history',
    },
    {
      title: t.ui.slide3Title,
      desc: t.pages.doubts.desc,
      image:
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2000&auto=format&fit=crop',
      targetPage: 'doubts',
    },
  ];

  // لودینگ اولیه
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // تابع تغییر صفحه (Transition Logic)
  const handlePageChange = (newPage: string) => {
    if (page === newPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setIsTransitioning(false), 300);
    }, 400);
  };

  useEffect(() => {
    if (page !== 'home' || isTransitioning) return;
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [page, slides.length, isTransitioning]);

  // استخراج امن اطلاعات صفحه فعال
  const currentPageData = (t.pages as any)[page] || t.pages.home;

  if (isInitialLoad) {
    return (
      <div
        className={`fixed inset-0 bg-[#f4f6f8] flex flex-col items-center justify-center z-[100] ${vazir.className}`}
        style={{ backgroundImage: newPatternLight }}
      >
        <div className="relative flex justify-center items-center w-32 h-32 mb-6">
          <div className="absolute inset-0 border-t-4 border-r-4 border-[#033f63] rounded-full animate-spin"></div>
          <div
            className="absolute inset-2 border-b-4 border-l-4 border-[#28666e] rounded-full animate-spin"
            style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
          ></div>
          <svg
            className="w-12 h-12 text-[#d9a05b] animate-pulse"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0l2.5 8.5H23l-7 5.5 2.5 8.5-7-5.5-7 5.5 2.5-8.5-7-5.5h8.5z" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-[#033f63] tracking-widest animate-pulse">
          {lang === 'fa' || lang === 'ps' ? 'بهائی‌کاوی' : 'Bahai-Kavi'}
        </h1>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-[#f4f6f8] ${vazir.className} pb-20`}
      dir={t.dir}
      style={{ backgroundImage: newPatternLight }}
    >
      {isTransitioning && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#f4f6f8]/70 backdrop-blur-md transition-opacity duration-300">
          <div className="w-16 h-16 border-4 border-[#28666e]/30 border-t-[#033f63] rounded-full animate-spin"></div>
        </div>
      )}

      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        {/* ================= HEADER ================= */}
        <header className="flex flex-col xl:flex-row justify-between items-center bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 sticky top-4 z-50 border border-white/50">
          <div
            className="text-2xl xl:text-3xl font-black text-[#033f63] tracking-tight cursor-pointer flex-shrink-0 mb-4 xl:mb-0"
            onClick={() => handlePageChange('home')}
          >
            {lang === 'fa' || lang === 'ps' ? 'بهائی‌کاوی' : 'Bahai-Kavi'}
          </div>

          <nav className="flex items-center gap-x-3 xl:gap-x-6 text-[#28666e] font-bold text-[13px] xl:text-sm whitespace-nowrap overflow-x-auto xl:overflow-visible no-scrollbar pb-2 xl:pb-0 w-full xl:w-auto justify-center">
            {Object.keys(t.nav).map((key) => {
              const navItem = (t.nav as any)[key];
              const hasSub = 'sub' in navItem && navItem.sub;

              return (
                <div key={key} className="relative group">
                  <button
                    onClick={() => handlePageChange(key)}
                    className={`flex items-center gap-1 py-2 ${
                      page.startsWith(key)
                        ? 'text-[#033f63] border-b-2 border-[#fedc97]'
                        : 'hover:text-[#033f63] hover:-translate-y-0.5'
                    } transition-all duration-300`}
                  >
                    {navItem.title}
                    {hasSub && (
                      <svg
                        className="w-3.5 h-3.5 mt-0.5 opacity-70 group-hover:rotate-180 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>

                  {hasSub && (
                    <div className="absolute top-full right-1/2 translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 w-48">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden flex flex-col p-2">
                        {navItem.sub.map((subItem: any, idx: number) => (
                          <div
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePageChange(subItem.id);
                            }}
                            className={`px-4 py-3 text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                              page === subItem.id
                                ? 'bg-[#f4f6f8] text-[#033f63]'
                                : 'text-gray-600 hover:bg-[#f4f6f8] hover:text-[#033f63]'
                            }`}
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
            <select
              className="bg-gray-100 text-[#033f63] text-xs xl:text-sm font-bold px-3 py-2 rounded-xl outline-none cursor-pointer hover:bg-gray-200 transition-colors"
              value={lang}
              onChange={(e) => setLang(e.target.value as LangKey)}
            >
              <option value="fa">فارسی</option>
              <option value="ps">پښتو</option>
              <option value="en">English</option>
              <option value="tk">Türkmençe</option>
            </select>
            <button className="bg-[#033f63] text-white px-5 py-2 rounded-xl shadow-md hover:bg-[#28666e] transition-all font-medium text-xs xl:text-sm whitespace-nowrap">
              {t.ui.login}
            </button>
          </div>
        </header>

        {/* ================= MAIN CONTENT AREA ================= */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
          }`}
        >
          {page === 'home' ? (
            /* ================= HOME PAGE CONTENT ================= */
            <div className="space-y-24 mt-8">
              {/* --- 1. Hero Slider --- */}
              <section className="relative w-full h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl group border-4 border-white">
                <div className="absolute inset-0 transition-opacity duration-1000">
                  <img
                    src={slides[slide].image}
                    alt="Slider Background"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-[#033f63]/80 mix-blend-multiply"
                    style={{ backgroundImage: newPatternDark }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#033f63] via-[#033f63]/40 to-transparent"></div>
                </div>

                <div className="absolute inset-0 p-10 md:p-20 flex flex-col justify-center items-start z-10">
                  <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-[#fedc97] text-sm font-bold mb-6 backdrop-blur-md shadow-sm">
                    {lang === 'fa' || lang === 'ps'
                      ? 'پایگاه پژوهشی مستقل'
                      : 'Independent Research'}
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
              </section>

              {/* --- 2. اهداف --- */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: lang === 'fa' ? 'گردآوری اسناد' : 'Documents',
                    desc: t.pages.articles.desc,
                    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
                  },
                  {
                    title: lang === 'fa' ? 'تحلیل آکادمیک' : 'Analysis',
                    desc: t.pages.critique.desc,
                    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
                  },
                  {
                    title: lang === 'fa' ? 'ارائه مستند' : 'Output',
                    desc: t.pages.doubts.desc,
                    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex items-start gap-6 group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#f4f6f8] text-[#7c9885] flex items-center justify-center flex-shrink-0 group-hover:bg-[#7c9885] group-hover:text-white transition-colors">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={item.icon}
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#033f63] text-lg mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </section>

              {/* --- 3. بخش جدید رنگی در صفحه اصلی (موضوعات آخر / لیست و کارت) --- */}
              <section className="mt-24 mb-16">
                {/* هدر بخش */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 px-2">
                  <div>
                    <h2 className="text-3xl font-black text-[#033f63] mb-2">
                      {t.ui.latestArticles}
                    </h2>
                    <p className="text-gray-500 font-medium">
                      {t.pages.articles.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => handlePageChange('articles')}
                    className="text-[#28666e] font-bold hover:text-[#033f63] flex items-center gap-2"
                  >
                    مشاهده آرشیو کامل{' '}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                  </button>
                </div>

                {/* تغییر رنگ درخواستی (سبز و زیتونی) با ساختار دوقلو (کارت + لیست) */}
                <div
                  className="bg-gradient-to-br from-[#7c9885] to-[#b5b682] rounded-[3rem] p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col lg:flex-row gap-10"
                  style={{ backgroundImage: newPatternDark }}
                >
                  {/* بخش کارت‌های برجسته */}
                  <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                    {[
                      {
                        img: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=500',
                        t: 'تحلیل تطبیقی متون تاریخی',
                      },
                      {
                        img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=500',
                        t: 'اسناد منتشر نشده قاجار',
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        onClick={() => handlePageChange('articles_docs')}
                        className="bg-white rounded-[2rem] p-5 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="w-full h-44 rounded-xl mb-5 overflow-hidden relative">
                          <img
                            src={item.img}
                            alt="Article"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute top-3 right-3 bg-[#fedc97] text-[#033f63] text-xs font-black px-3 py-1.5 rounded-lg shadow-sm">
                            مقاله ویژه
                          </div>
                        </div>
                        <h3 className="font-bold text-[#033f63] text-lg mb-2">
                          {item.t}
                        </h3>
                        <p className="text-sm text-gray-500">
                          پژوهشی دقیق بر اساس مستندات دست‌اول تاریخی...
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* بخش لیست (مانند سایدبار اما در صفحه اصلی) */}
                  <div className="lg:w-1/3 bg-[#033f63]/90 backdrop-blur-sm rounded-[2rem] p-8 shadow-inner border border-white/10 relative z-10 flex flex-col">
                    <h3 className="text-xl font-black text-[#fedc97] mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14"
                        />
                      </svg>
                      عناوین اخیر
                    </h3>
                    <div className="space-y-6 flex-1">
                      {[
                        {
                          id: 'whatIs_admin',
                          t: t.pages.whatIs_admin?.title || 'ساختار اداری',
                        },
                        {
                          id: 'history_babi',
                          t: t.pages.history_babi?.title || 'دوران بابیگری',
                        },
                        {
                          id: 'doubts_theology',
                          t: t.pages.doubts_theology?.title || 'پاسخ به شبهات',
                        },
                        {
                          id: 'mahdism',
                          t: t.pages.mahdism?.title || 'مفهوم مهدویت',
                        },
                      ].map((itm, idx) => (
                        <div
                          key={idx}
                          className="flex gap-4 items-center group cursor-pointer"
                          onClick={() => handlePageChange(itm.id)}
                        >
                          <div className="w-3 h-3 rounded-full bg-[#7c9885] group-hover:scale-150 group-hover:bg-[#fedc97] transition-all"></div>
                          <div className="flex-1 border-b border-white/5 pb-2 group-hover:border-[#fedc97]/30 transition-colors">
                            <h4 className="font-bold text-sm text-white/90 group-hover:text-[#fedc97] transition-colors">
                              {itm.t}
                            </h4>
                            <p className="text-[11px] text-white/40 mt-1">
                              منتشر شده در بخش پژوهش
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* --- 4. پاسخ به شبهات --- */}
              <section className="bg-white rounded-[3rem] p-8 sm:p-14 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-3xl font-black text-[#033f63]">
                    {t.ui.specificDoubts}
                  </h2>
                  <button
                    onClick={() => handlePageChange('doubts')}
                    className="bg-[#f4f6f8] text-[#28666e] px-6 py-2.5 rounded-xl font-bold hover:bg-[#28666e] hover:text-white transition-colors"
                  >
                    مشاهده همه
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {[
                    {
                      t: 'بررسی ادعاهای تاریخی پیرامون انشعابات اولیه',
                      id: 'doubts_history',
                    },
                    {
                      t: 'تحلیل اسناد مرتبط با ارتباطات سیاسی در دوره قاجار',
                      id: 'doubts_history',
                    },
                    {
                      t: 'نقد و بررسی آموزه‌های اجتماعی و تناقضات متنی',
                      id: 'critique_social',
                    },
                    {
                      t: 'تحلیل مبانی اعتقادی و پاسخ به پرسش‌های کلامی',
                      id: 'doubts_theology',
                    },
                  ].map((q, i) => (
                    <div
                      key={i}
                      className="flex gap-5 p-5 rounded-2xl border border-gray-100 hover:border-[#7c9885] hover:bg-[#f4f6f8]/50 transition-all cursor-pointer group"
                      onClick={() => handlePageChange(q.id)}
                    >
                      <div className="w-14 h-14 bg-[#fedc97]/20 text-[#d9a05b] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#fedc97] group-hover:text-[#033f63] transition-colors shadow-sm">
                        <span className="font-black text-xl">{i + 1}</span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-[#033f63] text-base mb-1.5 group-hover:text-[#28666e] leading-snug">
                          {q.t}
                        </h4>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {lang === 'fa'
                            ? 'جهت مطالعه پاسخ مستند کلیک کنید.'
                            : 'Click to read.'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            /* ================= INTERNAL PAGES TEMPLATE ================= */
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
              {/* SIDEBAR */}
              <aside className="lg:col-span-1">
                <div
                  className="bg-gradient-to-b from-[#033f63] to-[#28666e] text-white p-6 rounded-[2.5rem] shadow-xl sticky top-32 border border-white/10"
                  style={{ backgroundImage: newPatternDark }}
                >
                  <h3 className="text-xl font-black mb-6 flex items-center gap-3 border-b border-white/20 pb-4">
                    <svg
                      className="w-6 h-6 text-[#fedc97]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14"
                      />
                    </svg>
                    {t.ui.sidebarTitle}
                  </h3>
                  <div className="space-y-5">
                    {[
                      {
                        t: t.pages.whatIs_roots?.title || 'ریشه‌های تاریخی',
                        id: 'whatIs_roots',
                      },
                      {
                        t: t.pages.critique_text?.title || 'نقد متون',
                        id: 'critique_text',
                      },
                      {
                        t: t.pages.doubts_history?.title || 'شبهات تاریخی',
                        id: 'doubts_history',
                      },
                      {
                        t: t.pages.articles_docs?.title || 'اسناد پژوهشی',
                        id: 'articles_docs',
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 items-center group cursor-pointer"
                        onClick={() => handlePageChange(item.id)}
                      >
                        <div className="w-14 h-14 bg-white/10 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform border border-white/10">
                          <img
                            src={`https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=150&auto=format&fit=crop&sig=${idx}`}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            alt="thumb"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-white/90 group-hover:text-[#fedc97] transition-colors line-clamp-2">
                            {item.t}
                          </h4>
                          <p className="text-[11px] text-white/50 mt-1">
                            اخیراً بروز شده
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>

              {/* MAIN CONTENT */}
              <main className="lg:col-span-3 bg-white rounded-[3rem] p-10 md:p-14 shadow-xl border border-gray-100 min-h-[60vh]">
                <div className="flex flex-col items-center text-center mb-12">
                  <div className="w-20 h-20 bg-[#f4f6f8] rounded-full flex items-center justify-center text-[#7c9885] mb-6 shadow-inner border border-gray-200">
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-[#033f63] mb-6 relative pb-4 inline-block">
                    {currentPageData.title}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-[#fedc97] rounded-full"></div>
                  </h1>
                  <p className="text-xl text-gray-500 max-w-4xl leading-relaxed mt-4 font-light">
                    {currentPageData.desc}
                  </p>
                </div>

                {page !== 'contact' ? (
                  <div className="space-y-12">
                    <div className="w-full h-[400px] bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-inner relative group border-4 border-[#f4f6f8]">
                      <img
                        src="https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        alt="Content Image"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#033f63]/80 via-[#033f63]/20 to-transparent"></div>
                      <div className="absolute bottom-6 left-8 right-8 text-white font-bold text-2xl drop-shadow-md">
                        {currentPageData.title}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-[#033f63] mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 bg-[#fedc97] rounded flex-shrink-0"></span>
                        {t.ui.section1}
                      </h2>
                      <p className="text-gray-600 leading-loose text-justify text-lg font-light">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و
                        برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با
                        هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت
                        و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و
                        متخصصان را می طلبد.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full max-w-2xl mx-auto bg-gray-50 p-10 rounded-[2.5rem] border border-gray-200 shadow-sm mt-10">
                    <input
                      type="text"
                      placeholder="نام و نام خانوادگی..."
                      className="w-full mb-5 bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-[#7c9885]"
                    />
                    <input
                      type="email"
                      placeholder="آدرس ایمیل..."
                      className="w-full mb-5 bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-[#7c9885]"
                    />
                    <textarea
                      placeholder="پیام یا درخواست پژوهشی خود را بنویسید..."
                      rows={6}
                      className="w-full mb-6 bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-[#7c9885]"
                    ></textarea>
                    <button className="w-full bg-[#28666e] text-white text-lg font-bold py-4 rounded-xl shadow-md hover:bg-[#033f63]">
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
      <footer
        className="bg-[#033f63] text-white mt-24 pt-20 pb-10 rounded-t-[4rem] relative overflow-hidden"
        style={{ backgroundImage: newPatternDark }}
      >
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
              <a
                href="#"
                className="bg-white/10 p-3.5 rounded-2xl hover:bg-red-500 transition-all shadow-sm backdrop-blur-sm"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 00-1.94 2C1 8.17 1 12 1 12s0 3.83.46 5.58a2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 001.94-2C23 15.83 23 12 23 12s0-3.83-.46-5.58z M9.5 15.5v-7l6.5 3.5z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-white/10 p-3.5 rounded-2xl hover:bg-blue-500 transition-all shadow-sm backdrop-blur-sm"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-white/10 p-3.5 rounded-2xl hover:bg-blue-400 transition-all shadow-sm backdrop-blur-sm"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </a>
            </div>
          </div>
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} پایگاه پژوهشی بهائی‌کاوی. تمامی حقوق
            محفوظ است.
          </p>
        </div>
      </footer>
    </div>
  );
}
