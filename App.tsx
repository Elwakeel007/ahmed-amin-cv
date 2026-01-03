import React, { useState, useEffect } from 'react';
import { CV_DATA, CONTACT_INFO } from './data';
import { TranslationData } from './types';
import { Globe, Phone, MapPin, Play, MessageCircle, CheckCircle2, X, Menu, ChevronRight, Sun, Moon } from 'lucide-react';

export default function App() {
  // --- State Management ---
  // Default to 'ar' (Arabic) as primary language
  const [lang, setLang] = useState<'en' | 'ar'>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('cv-lang');
        return saved === 'en' ? 'en' : 'ar';
      }
    } catch (e) {}
    return 'ar';
  });

  // Default to Dark Mode for Cinematic feel, but allow toggle
  const [darkMode, setDarkMode] = useState(true);

  // Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Active Section for Spy
  const [activeSection, setActiveSection] = useState('home');

  // Derived Data
  const t: TranslationData = CV_DATA[lang];
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  // --- Effects ---
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('cv-theme', darkMode ? 'dark' : 'light');
    
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    localStorage.setItem('cv-lang', lang);

    // Font switching for Cinematic feel
    if (lang === 'ar') {
      document.body.classList.remove('font-sans', 'font-serif');
      document.body.classList.add('font-arabicSans');
    } else {
      document.body.classList.remove('font-arabicSans');
      document.body.classList.add('font-sans');
    }
  }, [darkMode, lang, dir]);

  // Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'works', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Actions ---
  const toggleLang = () => setLang(prev => prev === 'en' ? 'ar' : 'en');
  const toggleTheme = () => setDarkMode(prev => !prev);
  
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsSidebarOpen(false);
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100 ${lang === 'ar' ? 'font-arabicSans' : 'font-sans'} relative`}>
      
      {/* --- Global Background Watermark --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 opacity-10 dark:opacity-20">
            <img 
                src="https://i.ibb.co/KxZQzv6q/Picsart-25-12-09-15-37-46-555.jpg" 
                alt="Background Watermark" 
                className="w-full h-full object-cover filter blur-[2px] grayscale-[30%] scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-white/80 dark:bg-dark-900/90 mix-blend-overlay"></div>
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]"></div>
      </div>

      {/* --- Sidebar Navigation --- */}
      {/* Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      
      {/* Drawer */}
      {/* 
         Logic for Sidebar Position:
         - LTR (English): Menu Button is on Right -> Sidebar opens from Right.
         - RTL (Arabic): Menu Button is on Left -> Sidebar opens from Left.
      */}
      <div className={`fixed top-0 h-full w-80 bg-white dark:bg-dark-800 shadow-2xl z-[70] transform transition-transform duration-300 
        ${lang === 'ar' ? 'left-0 border-r dark:border-white/10' : 'right-0 border-l dark:border-white/10'} 
        ${isSidebarOpen ? 'translate-x-0' : (lang === 'ar' ? '-translate-x-full' : 'translate-x-full')}`}>
        
        <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="h-24 flex items-center justify-between px-6 border-b border-gray-200 dark:border-white/10">
                <span className={`text-lg font-bold tracking-widest uppercase text-gray-900 dark:text-gold-400 ${lang === 'en' ? 'font-serif' : 'font-arabic'}`}>
                   {t.hero.role}
                </span>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                    <X size={24} />
                </button>
            </div>

            {/* Sidebar Links */}
            <div className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
                {[
                    { id: 'home', label: t.nav.home },
                    { id: 'about', label: t.nav.about },
                    { id: 'works', label: t.nav.works },
                    { id: 'contact', label: t.nav.contact }
                ].map((item) => (
                    <button 
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-lg transition-all duration-300 group ${activeSection === item.id ? 'bg-gold-500/10 text-gold-600 dark:text-gold-400' : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'}`}
                    >
                        <span className={`text-lg font-medium ${lang === 'en' ? 'font-serif tracking-wider' : 'font-arabic'}`}>{item.label}</span>
                        {/* Chevron Logic: 
                            LTR: Chevron Right (Points to content?). Actually standard is right.
                            RTL: Chevron Left (Points to content?). Standard is Left (flip).
                        */}
                        <ChevronRight size={18} className={`transform transition-transform duration-300 ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} ${activeSection === item.id ? 'text-gold-500' : 'opacity-0 group-hover:opacity-100'}`} />
                    </button>
                ))}
            </div>

             {/* Sidebar Footer */}
             <div className="p-6 border-t border-gray-200 dark:border-white/10 space-y-4">
                {/* Mobile Theme Toggle in Sidebar */}
                <button 
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse py-3 rounded border border-gray-300 dark:border-white/20 hover:border-gold-500 hover:text-gold-500 transition-all text-sm font-bold tracking-wide uppercase"
                >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    <span>{darkMode ? (lang === 'en' ? 'Light Mode' : 'الوضع النهاري') : (lang === 'en' ? 'Dark Mode' : 'الوضع الليلي')}</span>
                </button>

                {/* Lang Switch */}
                <button 
                    onClick={toggleLang}
                    className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse py-3 rounded border border-gray-300 dark:border-white/20 hover:border-gold-500 hover:text-gold-500 transition-all text-sm font-bold tracking-wide uppercase"
                >
                    <Globe size={18} />
                    <span>{lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}</span>
                </button>
             </div>
        </div>
      </div>

      {/* --- Header / Navigation --- */}
      <nav className="fixed w-full z-50 top-0 left-0 transition-all duration-300 glass-panel border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo / Brand - Always goes to Homepage */}
            <div className="flex items-center cursor-pointer group" onClick={() => scrollTo('home')} title={lang === 'en' ? "Home" : "الرئيسية"}>
                {/* Official Logo Small */}
               <div className="relative">
                 <img 
                   src="https://i.ibb.co/KxZQzv6q/Picsart-25-12-09-15-37-46-555.jpg" 
                   alt="Logo" 
                   className="relative h-12 w-12 rounded-full object-cover border border-gold-400/50 shadow-lg group-hover:shadow-gold-500/30 transition-shadow duration-300"
                 />
               </div>
               <div className="ml-3 rtl:mr-3 rtl:ml-0 hidden sm:block">
                 <h1 className={`text-lg font-bold tracking-widest uppercase text-gray-900 dark:text-gold-400 ${lang === 'en' ? 'font-serif' : 'font-arabic'}`}>
                   {t.hero.role}
                 </h1>
               </div>
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
               <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
                    <button onClick={() => scrollTo('home')} className={`text-sm uppercase tracking-wider font-medium hover:text-gold-400 transition-colors ${activeSection === 'home' ? 'text-gold-500' : 'text-gray-600 dark:text-gray-400'}`}>
                        {t.nav.home}
                    </button>
                    <button onClick={() => scrollTo('about')} className={`text-sm uppercase tracking-wider font-medium hover:text-gold-400 transition-colors ${activeSection === 'about' ? 'text-gold-500' : 'text-gray-600 dark:text-gray-400'}`}>
                        {t.nav.about}
                    </button>
                    <button onClick={() => scrollTo('works')} className={`text-sm uppercase tracking-wider font-medium hover:text-gold-400 transition-colors ${activeSection === 'works' ? 'text-gold-500' : 'text-gray-600 dark:text-gray-400'}`}>
                        {t.nav.works}
                    </button>
                    <button onClick={() => scrollTo('contact')} className={`text-sm uppercase tracking-wider font-medium hover:text-gold-400 transition-colors ${activeSection === 'contact' ? 'text-gold-500' : 'text-gray-600 dark:text-gray-400'}`}>
                        {t.nav.contact}
                    </button>
                    {/* Divider */}
                    <div className="h-6 w-px bg-gray-300 dark:bg-white/20 mx-2"></div>
               </div>

               {/* Theme Toggle Button (Desktop) */}
               <button 
                 onClick={toggleTheme}
                 className="hidden md:flex p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gold-400"
                 title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
               >
                 {darkMode ? <Sun size={20} /> : <Moon size={20} />}
               </button>

               {/* Lang Switch (Compact) */}
               <button 
                onClick={toggleLang}
                className="hidden md:flex items-center space-x-2 rtl:space-x-reverse px-3 py-1.5 rounded border border-gray-300 dark:border-white/20 hover:border-gold-500 hover:text-gold-500 transition-all text-xs font-bold tracking-wide uppercase"
               >
                 <Globe size={14} />
                 <span>{lang === 'en' ? 'AR' : 'EN'}</span>
               </button>
               
               {/* Mobile Menu Button (Hamburger) - Opens Sidebar */}
               <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gold-500 transition-colors">
                 <Menu size={28} />
               </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Main Content Wrapper --- */}
      <main className="relative z-10">
          
        {/* --- Hero Section --- */}
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in mt-16">
            {/* Personal Profile Image */}
            <div className="mb-8 flex justify-center">
                <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 to-gold-400 rounded-full blur opacity-50 animate-pulse-slow"></div>
                <img 
                    src="https://i.ibb.co/hJzfgKBj/FB-IMG-1767397100773.jpg" 
                    alt="Profile"
                    className="relative w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-dark-900 shadow-2xl object-cover object-top"
                />
                </div>
            </div>

            <h2 className={`text-gold-400 text-lg md:text-2xl font-bold tracking-[0.2em] mb-4 uppercase ${lang === 'en' ? 'font-serif' : 'font-arabic'}`}>
                {t.hero.role}
            </h2>
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
                {t.hero.tagline}
            </h1>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8 animate-slide-up">
                <a 
                href={CONTACT_INFO.whatsapp} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center space-x-2 rtl:space-x-reverse bg-gold-600 hover:bg-gold-500 text-black px-6 py-3 rounded text-sm font-bold uppercase tracking-wider transition-transform hover:scale-105 shadow-lg shadow-gold-600/20"
                >
                <MessageCircle size={18} />
                <span>{t.hero.actions.whatsapp}</span>
                </a>
                
                <a 
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center space-x-2 rtl:space-x-reverse bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded text-sm font-bold uppercase tracking-wider transition-transform hover:scale-105"
                >
                <Phone size={18} />
                <span>{t.hero.actions.call}</span>
                </a>

                <a 
                href={CONTACT_INFO.map}
                target="_blank" 
                rel="noreferrer"
                className="flex items-center space-x-2 rtl:space-x-reverse bg-transparent border border-white/30 text-white hover:border-gold-400 hover:text-gold-400 px-6 py-3 rounded text-sm font-bold uppercase tracking-wider transition-colors"
                >
                <MapPin size={18} />
                <span>{t.hero.actions.location}</span>
                </a>
            </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-pulse-slow hidden md:block">
            <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gold-400 to-transparent"></div>
            </div>
        </section>

        {/* --- About / Services Section --- */}
        <section id="about" className="py-24 bg-gray-50/90 dark:bg-dark-800/90 border-b border-gray-200 dark:border-white/5 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className={`text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 ${lang === 'en' ? 'font-serif' : 'font-arabic'}`}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-yellow-200">
                    {t.about.title}
                </span>
                </h2>
                <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    {t.about.description}
                </p>
                </div>
            </div>

            <div className="bg-white/80 dark:bg-dark-900/80 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-white/5 backdrop-blur-md">
                <h3 className={`text-xl md:text-2xl font-bold text-gray-900 dark:text-gold-400 mb-8 text-center ${lang === 'en' ? 'font-serif' : 'font-arabic'}`}>
                {t.about.servicesTitle}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.about.services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-400/10 text-gold-500 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-black transition-colors duration-300">
                        <CheckCircle2 size={18} />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-gold-400 transition-colors duration-300">
                        {service}
                    </span>
                    </div>
                ))}
                </div>
            </div>
            </div>
        </section>

        {/* --- Portfolio Section --- */}
        <section id="works" className="py-24 bg-white/90 dark:bg-dark-900/90 relative backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className={`text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 ${lang === 'en' ? 'font-serif' : 'font-arabic'}`}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-yellow-200">
                    {t.works.title}
                </span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                {t.works.subtitle}
                </p>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {t.items.works.map((work) => (
                <div key={work.id} className="group relative bg-gray-100 dark:bg-dark-800 rounded-lg overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-2 border border-gray-200 dark:border-white/5">
                    {/* Video Wrapper 16:9 */}
                    <div className="relative pb-[56.25%] bg-black">
                    <iframe 
                        className="absolute inset-0 w-full h-full"
                        src={`${work.videoUrl}?rel=0&modestbranding=1&playsinline=1&controls=1`}
                        title={work.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                    </div>
                    
                    {/* Info Card */}
                    <div className="p-6 relative bg-white dark:bg-dark-800">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-gold-500 text-xs font-bold tracking-widest uppercase border border-gold-500/20 px-2 py-1 rounded">
                        {work.type}
                        </span>
                        <Play size={16} className="text-gray-400 group-hover:text-gold-400 transition-colors" />
                    </div>
                    
                    <h3 className={`text-xl font-bold text-gray-900 dark:text-white group-hover:text-gold-400 transition-colors ${lang === 'en' ? 'font-serif' : 'font-arabic'}`}>
                        {work.title}
                    </h3>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="py-24 bg-gray-50/90 dark:bg-dark-800/90 border-t border-gray-200 dark:border-white/5 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 ${lang === 'en' ? 'font-serif' : 'font-arabic'}`}>
                {t.contact.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-12 text-lg">
                {t.contact.subtitle}
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                {/* WhatsApp Card */}
                <a 
                href={CONTACT_INFO.whatsapp}
                target="_blank"
                rel="noreferrer" 
                className="w-full md:w-auto min-w-[280px] group bg-white dark:bg-dark-700 p-6 rounded-xl shadow-lg border border-transparent hover:border-green-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
                >
                <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 group-hover:text-white transition-colors">
                    <MessageCircle size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">WhatsApp</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 dir-ltr"><span dir="ltr">{CONTACT_INFO.displayPhone}</span></p>
                </a>

                {/* Phone Card */}
                <a 
                href={`tel:${CONTACT_INFO.phone}`}
                className="w-full md:w-auto min-w-[280px] group bg-white dark:bg-dark-700 p-6 rounded-xl shadow-lg border border-transparent hover:border-gold-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
                >
                <div className="w-12 h-12 bg-gold-500/10 text-gold-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-500 group-hover:text-black transition-colors">
                    <Phone size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{lang === 'en' ? 'Call Me' : 'اتصال'}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 dir-ltr"><span dir="ltr">{CONTACT_INFO.displayPhone}</span></p>
                </a>
                
                {/* Location Card */}
                <a 
                href={CONTACT_INFO.map}
                target="_blank"
                rel="noreferrer"
                className="w-full md:w-auto min-w-[280px] group bg-white dark:bg-dark-700 p-6 rounded-xl shadow-lg border border-transparent hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
                >
                <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <MapPin size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{t.hero.actions.location}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{lang === 'en' ? 'View Map' : 'مشاهدة الخريطة'}</p>
                </a>
            </div>
            </div>
        </section>

        {/* --- Footer --- */}
        <footer className="bg-white/90 dark:bg-black/90 py-8 border-t border-gray-200 dark:border-white/10 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500 uppercase tracking-widest">
                © {new Date().getFullYear()} {t.hero.role}. All rights reserved.
            </p>
            </div>
        </footer>
      </main>
      
    </div>
  );
}