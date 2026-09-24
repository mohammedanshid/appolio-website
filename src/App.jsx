import { useEffect, useRef, useState } from 'react';

const assets = {
  logo: '/assets/apollio-logo.png',
  heroDesktop: '/assets/hero-desktop-clean.jpg',
  heroMobile: '/assets/hero-mobile-clean.jpg',
  introDoor: '/assets/product-panel-portrait.png',
  mobileCircular: '/assets/mobile-circular-collection.png',
  mobilePanel: '/assets/mobile-panel-collection.png',
  showcaseModern: '/assets/showcase-modern.png',
  showcaseElevate: '/assets/showcase-elevate.png',
  showcaseTransform: '/assets/showcase-transform.png',
  steelDoorGallery: '/assets/steel-door-gallery.jpg',
  upvcDoorGallery: '/assets/upvc-door-gallery.jpg',
  steelWindowsGallery: '/assets/steel-windows-gallery.jpg',
};

// Official Company Contact & Profile Links (Extracted from https://trazi.store/linktree/dnl-1457/ and filled form)
const companyInfo = {
  name: 'Appolio Industries',
  type: 'Steel Windows & Doors Manufacturing Company',
  established: '2023',
  phone: '6374188018',
  phoneFormatted: '+91 6374188018',
  email: 'kkengineeringkottayam@gmail.com',
  address: 'Bharananganam, Meenachil Taluk, Pala, Kottayam, Kerala - 686578',
  businessHours: '9:00 AM to 7:00 PM',
  serviceArea: 'All India',
  whyChooseUs: 'We provide customised production.',
  links: {
    instagram: 'https://www.instagram.com/appoliokottayam?igsi=azc5NmxmMmU1MzZj',
    facebook: 'https://www.facebook.com/share/1E5mEgBRhd/?mibextid=wwXIfr',
    whatsapp: 'https://wa.link/1x3k58',
    googleMaps: 'https://maps.app.goo.gl/hKgPPgXzjR4fhipk6?g_st=iwb',
    googleReview: 'https://www.google.com/search?sca_esv=c301df9aa710140d&sxsrf=APpeQnspHwLiBsM5JI5niijGwZ95fyud0Q:1788600758625&q=appolio+industries+bharananganam+reviews&uds=AJ5uw1_kYIqSi3Yi6DJX9hpfKKvSrx7LP2itSTz9PXszEE2Pfd_CJ9NqV-rOl58InhlowKIGWhV5EqcojSMAOSg_VP9vTlAaWjcM6XCSCh2I69DsUT8HVuop74phsLL4fn40e98g637mdrYduDO_GhLI8QJjT-6PKNBgJYHRgxusLJlmKHzdaFtXK6F2SAbQi_tfMptJ6ZXpSOEhW4OlWLJnSLiRnwcEPsUAer3Oq3QW29g-23mGe0R6iMU1K0moHs1G2LgmTBBWODJaeEmzHonSqBND3yxaluYk7fsl91jj3Tk-YXyFwGUBjhUVdlBZwMMlD25NKNkVS7ir0Csad-w_7yfPp2s1aC-S-TWHYuv0nhTmJTLAgD0&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_6pNKW2DausNTYlQZ34_famnxwn_x-P-SWfuNqdW9tF3PMTMM6HsqZfcuja7Y-uTnsKwnnTyD4Dhij8E2Hf7D5Cbpfp_nmiB7SOv-o4gpXXfYH1ScOtXQIVi-4FuP4ALFmpPpbU%3D&sa=X&ved=2ahUKEwiukvOGkdeWAxUXlOEIHVlSEDkQk8gLegQIGxAB&ictx=1&biw=384&bih=718&dpr=1.88',
  },
};

const navItems = ['Home', 'About Us', 'Services', 'Collections', 'Projects', 'FAQ', 'Contact'];

// Product Collections Data
const collectionsPhotos = [
  { id: 1, src: assets.steelDoorGallery, title: 'Steel Windows & Doors', category: 'Steel Windows & Doors' },
  { id: 2, src: assets.upvcDoorGallery, title: 'UPVC Window Systems', category: 'UPVC Windows' },
  { id: 3, src: assets.steelWindowsGallery, title: 'Architectural Folding Windows', category: 'Folding Windows' },
  { id: 4, src: '/assets/hero-mobile-slide-2.jpg', title: 'Modern Sliding Window Systems', category: 'Sliding Windows' },
  { id: 5, src: assets.showcaseModern, title: 'Precision Laser Cutting Designs', category: 'Laser Cutting' },
  { id: 6, src: assets.showcaseElevate, title: 'Aluminium Section Windows', category: 'Aluminium Section Windows' },
  { id: 7, src: assets.showcaseTransform, title: 'Custom Steel Entry Doors', category: 'Steel Windows & Doors' },
  { id: 8, src: assets.heroMobile, title: 'Customised UPVC & Steel Profiles', category: 'UPVC Windows' },
];

// Completed Projects / Installations Data
const projectsPhotos = [
  { id: 1, src: '/assets/portfolio-1.jpg', title: 'Private Villa Steel Windows & Doors', location: 'Kottayam Installation' },
  { id: 2, src: '/assets/portfolio-2.jpg', title: 'Custom Folding Window Project', location: 'Pala Residence' },
  { id: 3, src: '/assets/portfolio-3.jpg', title: 'Laser Cutting Entrance Gate & Door', location: 'Bharananganam Site' },
  { id: 4, src: assets.heroDesktop, title: 'Commercial UPVC & Aluminium Windows', location: 'Meenachil Taluk Project' },
  { id: 5, src: assets.introDoor, title: 'Custom Double Entry Steel Door', location: 'Kerala Estate' },
  { id: 6, src: assets.mobilePanel, title: 'Sliding Window & Patio Installation', location: 'Residential Elevation' },
];

const products = [
  {
    title: 'Steel Windows & Doors',
    category: 'Steel Windows & Doors',
    image: assets.heroMobile,
    description: 'Customised heavy-duty steel doors and window frames engineered for durability and security.',
  },
  {
    title: 'Folding Windows',
    category: 'Folding Windows',
    image: '/assets/hero-mobile-slide-2.jpg',
    description: 'Sleek bi-fold and multi-panel folding windows for seamless indoor-outdoor architectural spaces.',
  },
  {
    title: 'UPVC Windows',
    category: 'UPVC Windows',
    image: '/assets/hero-mobile-slide-3.jpg',
    description: 'Weatherproof, noise-insulating UPVC window systems with thermal efficiency.',
  },
  {
    title: 'Sliding Windows',
    category: 'Sliding Windows',
    image: assets.showcaseModern,
    description: 'Smooth-gliding sliding windows with minimalist frames and secure multi-locking points.',
  },
  {
    title: 'Laser Cutting Designs',
    category: 'Laser Cutting',
    image: assets.showcaseElevate,
    description: 'Intricate CNC laser cutting for custom steel door grills, panels, and elevation highlights.',
  },
  {
    title: 'Aluminium Section Windows',
    category: 'Aluminium Section Windows',
    image: assets.showcaseTransform,
    description: 'Lightweight, rust-resistant aluminium section windows tailored for modern structures.',
  },
];

const strengths = [
  {
    title: 'Customised Production',
    copy: 'We provide customised production for all steel doors, windows, laser cutting, and profiles tailored to your exact measurements.',
  },
  {
    title: 'Est. 2023 Experience',
    copy: 'Manufacturing high-grade steel windows & doors with trusted craftsmanship in Kottayam, Kerala.',
  },
  {
    title: 'Complete Services',
    copy: 'Offering Steel Windows & Doors, Folding Windows, UPVC Windows, Sliding Windows, Laser Cutting, and Aluminium Section Windows.',
  },
  {
    title: 'All India Service Area',
    copy: 'Serving residential, commercial, and architectural projects with nationwide delivery and support.',
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState('home'); // 'home' | 'collections' | 'projects'
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [activeView]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const navigateTo = (viewName, category = 'All') => {
    if (viewName === 'collections') {
      setSelectedCategoryFilter(category);
    }
    setActiveView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-apollio-ink">
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        closeMenu={closeMenu}
        activeView={activeView}
        onNavigate={navigateTo}
      />

      <main>
        {activeView === 'collections' ? (
          <CollectionsPage initialFilter={selectedCategoryFilter} onClose={() => navigateTo('home')} />
        ) : activeView === 'projects' ? (
          <ProjectsPage onClose={() => navigateTo('home')} />
        ) : (
          <>
            <Hero onOpenCollections={(cat) => navigateTo('collections', cat)} />
            <MovingBanner />
            <Introduction />
            <Stats />
            <CollectionsHomeSection onOpenCollections={(cat) => navigateTo('collections', cat)} />
            <DoorFeaturesSection />
            <ProjectsHomeSection onOpenProjects={() => navigateTo('projects')} />
            <Products onOpenCollections={(cat) => navigateTo('collections', cat)} />
            <WhyChoose />
            <FaqSection />
          </>
        )}
      </main>

      {/* Google Reviews Section directly above Footer */}
      <GoogleReviews />

      <Footer onNavigate={navigateTo} />

      {/* Quick Floating WhatsApp Button */}
      <a
        href={companyInfo.links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl transition-transform duration-300 hover:scale-110 focus:outline-none"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
    </div>
  );
}

function Header({ menuOpen, setMenuOpen, closeMenu, onNavigate }) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <button
          type="button"
          onClick={() => {
            onNavigate('home');
            closeMenu();
          }}
          className="flex min-w-0 items-center text-left focus:outline-none"
        >
          <img src={assets.logo} alt="Appolio Industries logo" className="h-12 w-40 object-contain object-left sm:h-14 sm:w-48" />
        </button>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                if (item === 'Collections') {
                  onNavigate('collections', 'All');
                } else if (item === 'Projects') {
                  onNavigate('projects');
                } else {
                  onNavigate('home');
                  setTimeout(() => {
                    const el = document.getElementById(toId(item));
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }
              }}
              className="nav-link"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={companyInfo.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#20ba5a]"
          >
            WhatsApp
          </a>
          <a
            href="#contact"
            onClick={() => {
              onNavigate('home');
              setTimeout(() => {
                const el = document.getElementById('footer-contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="rounded-sm bg-apollio-orange px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-sm transition hover:bg-[#dd6816]"
          >
            Get a Quote
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          className="hamburger lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div id="mobile-menu" className={`mobile-menu lg:hidden ${menuOpen ? 'is-open' : ''}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 pb-6 pt-2 sm:px-8">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              className="mobile-nav-link text-left"
              onClick={() => {
                closeMenu();
                if (item === 'Collections') {
                  onNavigate('collections', 'All');
                } else if (item === 'Projects') {
                  onNavigate('projects');
                } else {
                  onNavigate('home');
                  setTimeout(() => {
                    const el = document.getElementById(toId(item));
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }
              }}
            >
              {item}
            </button>
          ))}
          <a
            href={companyInfo.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 rounded-sm bg-[#25D366] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] text-white"
            onClick={closeMenu}
          >
            Chat on WhatsApp ({companyInfo.phoneFormatted})
          </a>
        </div>
      </div>
    </header>
  );
}

// Minimal Hero Text (Restored as before)
const heroSlides = [
  {
    desktopImage: '/assets/hero-desktop-clean.jpg',
    mobileImage: '/assets/hero-mobile-clean.jpg',
    eyebrow: 'PREMIUM',
    titleLine1: 'DOOR',
    titleLine2: 'SOLUTIONS',
    tagline: 'Durable  |  Stylish  |  Timeless',
    description: 'Doors that add strength, style and value to every space.',
  },
  {
    desktopImage: '/assets/hero-desktop-clean.jpg',
    mobileImage: '/assets/hero-mobile-slide-2.jpg',
    eyebrow: 'STATEMENT',
    titleLine1: 'BRONZE &',
    titleLine2: 'STEEL',
    tagline: 'Sculptural  |  Elegant  |  Secure',
    description: 'A sculptural double-door profile designed for luxury entrances.',
  },
  {
    desktopImage: '/assets/hero-desktop-clean.jpg',
    mobileImage: '/assets/hero-mobile-slide-3.jpg',
    eyebrow: 'EXECUTIVE',
    titleLine1: 'MODERN',
    titleLine2: 'SERIES',
    tagline: 'Precision  |  Timber  |  Armor',
    description: 'Precise vertical textures and mixed materials with a composed face.',
  },
];

function Hero({ onOpenCollections }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative bg-apollio-amber overflow-hidden">
      <div className="hero-stage relative mx-auto max-w-[1920px]">
        <div className="hero-images-wrapper relative w-full aspect-[3/4] md:aspect-[16/9] min-h-[480px] sm:min-h-[580px] md:min-h-0">
          {heroSlides.map((s, idx) => (
            <picture
              key={idx}
              className={`absolute inset-0 w-full h-full block transition-opacity duration-700 ease-in-out ${
                currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <source media="(max-width: 767px)" srcSet={s.mobileImage} />
              <img
                src={s.desktopImage}
                alt={`Appolio Industries slide ${idx + 1}`}
                className="hero-image w-full h-full object-cover"
                fetchPriority={idx === 0 ? 'high' : 'auto'}
              />
            </picture>
          ))}
        </div>

        <div
          key={currentSlide}
          className="hero-text-container absolute top-[64%] inset-x-0 bottom-10 md:inset-0 flex flex-col justify-start md:justify-center items-start px-5 sm:px-12 lg:px-20 pt-1 md:pt-0 pb-4 md:pb-0 pointer-events-none z-20"
        >
          <div className="w-full max-w-sm md:max-w-xl text-apollio-ink pointer-events-auto text-left border-0 md:border-l-4 border-apollio-ink/80 pl-0 md:pl-6 pt-0">
            <p className="eyebrow text-[10px] sm:text-sm tracking-[0.25em] font-semibold text-apollio-charcoal uppercase mb-0.5 sm:mb-2 hero-text-rise hero-text-rise-delay-1">
              {heroSlides[currentSlide].eyebrow}
            </p>
            <h1 className="text-xl sm:text-5xl lg:text-7xl font-extrabold uppercase tracking-tight leading-tight md:leading-[0.9] text-apollio-ink mb-1 sm:mb-4 hero-text-rise hero-text-rise-delay-2">
              {heroSlides[currentSlide].titleLine1} <br className="hidden md:inline" />
              {heroSlides[currentSlide].titleLine2}
            </h1>
            <p className="text-[11px] sm:text-base lg:text-lg font-semibold tracking-wider text-apollio-charcoal mb-1 sm:mb-3 hero-text-rise hero-text-rise-delay-3">
              {heroSlides[currentSlide].tagline}
            </p>
            <p className="text-[10px] sm:text-sm lg:text-base text-apollio-charcoal/85 max-w-xs sm:max-w-md mb-2.5 sm:mb-6 leading-tight sm:leading-relaxed hero-text-rise hero-text-rise-delay-3">
              {heroSlides[currentSlide].description}
            </p>
            <button
              type="button"
              onClick={() => onOpenCollections('All')}
              className="inline-flex w-auto items-center justify-center gap-2 rounded-sm bg-apollio-orange px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#dd6816] shadow-md hero-text-rise hero-text-rise-delay-4"
            >
              Explore Collections
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        <div className="absolute bottom-2.5 inset-x-0 flex justify-center items-center gap-2 z-30 pointer-events-auto">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 ${
                currentSlide === idx
                  ? 'w-7 h-2.5 bg-apollio-orange rounded-full shadow-sm'
                  : 'w-2.5 h-2.5 bg-black/30 hover:bg-apollio-orange/70 rounded-full'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MovingBanner() {
  const tickerItems = [
    'APPOLIO INDUSTRIES',
    'STEEL WINDOWS & DOORS',
    'WE PROVIDE CUSTOMISED PRODUCTION',
    'FOLDING WINDOWS',
    'UPVC WINDOWS',
    'SLIDING WINDOWS',
    'LASER CUTTING',
    'ALUMINIUM SECTION WINDOWS',
    'BUSINESS HOURS: 9 AM TO 7 PM',
    'SERVICE AREA: ALL INDIA',
  ];

  const repeated = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="relative w-full overflow-hidden bg-apollio-orange py-3.5 shadow-md border-y border-orange-600/30 z-20">
      <div className="animate-marquee-orange flex items-center gap-6 sm:gap-10">
        {repeated.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 sm:gap-10 flex-shrink-0">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-white select-none">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Introduction() {
  return (
    <section id="about-us" className="section bg-white border-b border-black/5">
      <div className="mx-auto max-w-4xl px-5 text-left sm:px-8 lg:px-10">
        <div data-reveal className="reveal space-y-5">
          <p className="eyebrow">About Appolio Industries</p>
          <h2 className="section-title max-w-3xl">
            STEEL WINDOWS & DOORS MANUFACTURING COMPANY
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-apollio-charcoal sm:text-lg lg:text-xl font-normal">
            <strong>Appolio Industries</strong> is a leading Steel windows & doors Manufacturing Company established in <strong>2023</strong> in Bharananganam, Kottayam, Kerala. <strong>We provide customised production</strong> tailored to your exact measurements for residential, commercial, and architectural projects across <strong>All India</strong>.
          </p>
          <div className="brand-rule justify-start">
            <span>Steel Windows & Doors</span>
            <span>Customised Production</span>
            <span>Est. 2023</span>
            <span>All India Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const statsData = [
  { target: 2023, suffix: '', label: 'Established Year' },
  { target: 100, suffix: '%', label: 'Customised Production' },
  { target: 6, suffix: ' Core', label: 'Manufacturing Services' },
  { target: 100, suffix: '%', label: 'All India Service Area' },
];

function StatCard({ target, suffix, label }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeProgress * target);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, target]);

  return (
    <div ref={cardRef} className="px-2 py-4 text-center">
      <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
        {label}
      </p>
    </div>
  );
}

function Stats() {
  return (
    <section className="bg-apollio-orange py-6 sm:py-8 shadow-inner">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 sm:px-8 md:grid-cols-4 lg:px-10">
        {statsData.map((stat) => (
          <StatCard key={stat.label} target={stat.target} suffix={stat.suffix} label={stat.label} />
        ))}
      </div>
    </section>
  );
}

function CollectionsHomeSection({ onOpenCollections }) {
  return (
    <section id="collections" className="py-14 sm:py-20 bg-[#FAF7F2] border-b border-black/5">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => onOpenCollections('All')}
            className="group flex items-center gap-3 text-left focus:outline-none"
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold uppercase tracking-tight text-apollio-orange transition-colors group-hover:text-apollio-ink">
              Our Services & Collections
            </h2>
            <span className="text-2xl sm:text-4xl lg:text-5xl font-bold text-apollio-orange transition-transform duration-300 group-hover:translate-x-2 group-hover:text-apollio-ink">
              →
            </span>
          </button>
        </div>

        <div className="space-y-4">
          <div
            onClick={() => onOpenCollections('Steel Windows & Doors')}
            className="group relative cursor-pointer overflow-hidden rounded-none bg-black/5 border border-black/10 aspect-[4/3] sm:aspect-[16/10] transition hover:opacity-95 shadow-sm"
          >
            <img
              src={assets.steelDoorGallery}
              alt="Steel Windows & Doors"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 bg-apollio-orange text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 shadow-sm">
              Steel Windows & Doors
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { src: assets.upvcDoorGallery, alt: 'UPVC Windows', category: 'UPVC Windows' },
              { src: assets.steelWindowsGallery, alt: 'Folding Windows', category: 'Folding Windows' },
              { src: assets.showcaseModern, alt: 'Sliding Windows', category: 'Sliding Windows' },
              { src: '/assets/hero-mobile-slide-2.jpg', alt: 'Laser Cutting', category: 'Laser Cutting' },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => onOpenCollections(item.category)}
                className="group relative cursor-pointer overflow-hidden rounded-none bg-black/5 border border-black/10 aspect-square transition hover:scale-[1.01] shadow-sm"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-apollio-orange text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 shadow-sm">
                  {item.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DoorFeaturesSection() {
  const customFeatures = [
    {
      titleMobile: 'Custom Production',
      title: 'We Provide Customised Production',
      desc: 'All windows and doors are manufactured to your exact opening dimensions.',
    },
    {
      titleMobile: 'Steel Strength',
      title: 'Steel Windows & Doors',
      desc: 'Heavy-gauge steel engineering for durable, long-term security.',
    },
    {
      titleMobile: 'Folding & Sliding',
      title: 'Folding & Sliding Windows',
      desc: 'Modern multi-panel folding and smooth sliding window mechanisms.',
    },
    {
      titleMobile: 'Laser Cutting',
      title: 'Precision Laser Cutting',
      desc: 'Custom CNC laser-cut patterns for steel panels, doors, and grills.',
    },
    {
      titleMobile: 'UPVC & Aluminium',
      title: 'UPVC & Aluminium Sections',
      desc: 'High-performance UPVC and lightweight aluminium section windows.',
    },
    {
      titleMobile: 'All India Service',
      title: 'All India Delivery & Support',
      desc: 'Open 9 am to 7 pm, delivering across Kottayam, Kerala and all India.',
    },
  ];

  return (
    <section className="bg-apollio-orange py-10 sm:py-16 text-center text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <h2 className="font-serif italic text-2xl sm:text-5xl lg:text-6xl font-light tracking-wide text-white mb-2 sm:mb-3">
          WHY CHOOSE APPOLIO INDUSTRIES?
        </h2>
        <p className="hidden sm:block max-w-2xl mx-auto text-xs sm:text-sm font-medium tracking-widest text-white/90 uppercase mb-10">
          We Provide Customised Production &nbsp;•&nbsp; Est. 2023 &nbsp;•&nbsp; All India Service Area
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 max-w-5xl mx-auto mt-4 sm:mt-0">
          {customFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-3 sm:p-5 rounded-none bg-white/10 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:-translate-y-1"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center text-white mb-2 sm:mb-3 font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="text-xs sm:text-base font-bold uppercase tracking-wider text-white">
                <span className="sm:hidden">{feat.titleMobile}</span>
                <span className="hidden sm:inline">{feat.title}</span>
              </h3>
              <p className="mt-1.5 text-[11px] sm:text-xs text-white/90 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsHomeSection({ onOpenProjects }) {
  const displayItems = [...projectsPhotos, ...projectsPhotos];

  return (
    <section id="projects" className="py-14 sm:py-20 bg-white border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex items-center justify-between mb-8">
          <button
            type="button"
            onClick={onOpenProjects}
            className="group flex items-center gap-3 text-left focus:outline-none"
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold uppercase tracking-tight text-apollio-orange transition-colors group-hover:text-apollio-ink">
              Completed Projects & Installations
            </h2>
            <span className="text-2xl sm:text-4xl lg:text-5xl font-bold text-apollio-orange transition-transform duration-300 group-hover:translate-x-2 group-hover:text-apollio-ink">
              →
            </span>
          </button>
        </div>

        <div className="relative w-full overflow-hidden py-2">
          <div className="animate-marquee-flow flex items-center gap-4 sm:gap-6">
            {displayItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={onOpenProjects}
                className="cursor-pointer flex-shrink-0 w-[200px] sm:w-[280px] aspect-[4/5] rounded-none overflow-hidden shadow-sm border border-black/10 transition-transform duration-500 hover:scale-105"
              >
                <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onOpenProjects}
            className="inline-flex items-center gap-2 bg-apollio-orange text-white px-7 py-2.5 rounded-none text-xs sm:text-sm font-semibold uppercase tracking-wider transition duration-300 hover:bg-[#dd6816] shadow-md"
          >
            View Real Installations <span className="text-base leading-none">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function CollectionsPage({ initialFilter = 'All', onClose }) {
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [activeImageModal, setActiveImageModal] = useState(null);

  useEffect(() => {
    setActiveFilter(initialFilter);
  }, [initialFilter]);

  const filterCategories = [
    'All',
    'Steel Windows & Doors',
    'Folding Windows',
    'UPVC Windows',
    'Sliding Windows',
    'Laser Cutting',
    'Aluminium Section Windows',
  ];

  const filteredPhotos = activeFilter === 'All'
    ? collectionsPhotos
    : collectionsPhotos.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex items-center justify-between border-b border-black/10 pb-5 mb-6">
          <div>
            <h1 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-apollio-orange">
              Manufacturing Services & Collections
            </h1>
            <p className="text-xs sm:text-sm text-apollio-charcoal/80 mt-0.5">
              Browse Appolio Industries product line by service type and finish.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-sm bg-apollio-orange text-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider shadow-sm transition hover:bg-[#dd6816] flex-shrink-0"
          >
            ← Back to Home
          </button>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-[#2B384E] text-white shadow-md'
                  : 'bg-white border border-black/15 text-apollio-charcoal hover:border-apollio-orange hover:text-apollio-orange shadow-xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActiveImageModal(photo.src)}
              className="group cursor-pointer overflow-hidden rounded-none bg-white border border-black/10 aspect-square transition-all duration-300 hover:shadow-lg hover:scale-[1.01] relative"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-apollio-orange text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 shadow-sm">
                {photo.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeImageModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm cursor-pointer"
          onClick={() => setActiveImageModal(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImageModal(null)}
            className="absolute top-5 right-5 text-white bg-white/20 hover:bg-white/40 w-10 h-10 rounded-sm flex items-center justify-center text-xl font-bold"
          >
            ✕
          </button>
          <img
            src={activeImageModal}
            alt="Collection view"
            className="max-w-full max-h-[90vh] rounded-none object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}

function ProjectsPage({ onClose }) {
  const [activeImageModal, setActiveImageModal] = useState(null);

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex items-center justify-between border-b border-black/10 pb-5 mb-8">
          <div>
            <h1 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-apollio-orange">
              Completed Installations
            </h1>
            <p className="text-xs sm:text-sm text-apollio-charcoal/80 mt-0.5">
              Appolio Industries real-world door and window installations in villas, homes, and commercial buildings.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-sm bg-apollio-orange text-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider shadow-sm transition hover:bg-[#dd6816] flex-shrink-0"
          >
            ← Back to Home
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {projectsPhotos.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setActiveImageModal(proj.src)}
              className="group cursor-pointer overflow-hidden rounded-none bg-white border border-black/10 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden bg-black/5">
                <img
                  src={proj.src}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 bg-white border-t border-black/5">
                <h3 className="text-sm font-bold text-apollio-ink uppercase">{proj.title}</h3>
                <p className="text-xs text-apollio-orange font-semibold mt-1">{proj.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeImageModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm cursor-pointer"
          onClick={() => setActiveImageModal(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImageModal(null)}
            className="absolute top-5 right-5 text-white bg-white/20 hover:bg-white/40 w-10 h-10 rounded-sm flex items-center justify-center text-xl font-bold"
          >
            ✕
          </button>
          <img
            src={activeImageModal}
            alt="Project installation view"
            className="max-w-full max-h-[90vh] rounded-none object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}

function Products({ onOpenCollections }) {
  const scrollRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.8;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex >= 0 && newIndex < products.length) {
        setActiveCard(newIndex);
      }
    }
  };

  const scrollToCard = (index) => {
    setActiveCard(index);
    if (scrollRef.current) {
      const scrollAmount = index * 340;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="section bg-white overflow-hidden py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Our Manufacturing Services"
          title="Appolio Industries Service Portfolio"
          copy="We provide customised production across all steel, UPVC, laser cutting, and aluminium window systems."
        />

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="mt-4 flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none -mx-5 px-5 sm:mx-0 sm:px-0"
        >
          {products.map((product) => (
            <article
              key={product.title}
              onClick={() => onOpenCollections(product.category)}
              className="product-card cursor-pointer flex-shrink-0 w-[84%] sm:w-[320px] md:w-[360px] snap-start border border-black/10 rounded-none bg-white shadow-soft transition-all duration-300 hover:-translate-y-1"
            >
              <div className="product-image-wrap aspect-[3/4] bg-apollio-amber overflow-hidden relative">
                <img
                  src={product.image}
                  alt={`${product.category} Appolio Industries design`}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-block bg-apollio-orange text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-none shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="space-y-2 p-4 sm:p-5">
                <h3 className="text-base font-bold text-apollio-ink">{product.title}</h3>
                <p className="text-xs leading-relaxed text-apollio-charcoal">{product.description}</p>
                <div className="pt-1 text-xs font-bold text-apollio-orange uppercase tracking-wider flex items-center gap-1">
                  View {product.category} →
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-3">
          {products.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => scrollToCard(idx)}
              className={`transition-all duration-300 ${
                activeCard === idx
                  ? 'w-6 h-2 bg-apollio-orange rounded-full shadow-sm'
                  : 'w-2 h-2 bg-black/25 hover:bg-apollio-orange/70 rounded-full'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="section bg-white border-t border-black/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Why Choose Appolio Industries"
          title="We Provide Customised Production Tailored to Your Specifications."
          copy="Established in 2023 in Kottayam, Kerala, Appolio Industries combines precision engineering with customized manufacturing for steel doors, windows, folding systems, and laser cutting across All India."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map((item, index) => (
            <article key={item.title} data-reveal className="reveal feature-block">
              <span className="feature-number">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-8 text-xl font-semibold tracking-tight text-apollio-ink">{item.title}</h3>
              <p className="mt-4 leading-7 text-apollio-charcoal">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Interactive Collapsible Accordion FAQ (E-commerce Style)
function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Do you have customised windows & doors available?',
      a: 'Yes, absolutely! At Appolio Industries, we provide customised production. Whether you require custom Steel Windows & Doors, Folding Windows, UPVC Windows, Sliding Windows, Laser Cutting panels, or Aluminium Section Windows, every product is manufactured according to your specified dimensions, colors, and design preferences.',
    },
    {
      q: 'What manufacturing services do you provide?',
      a: 'We manufacture Steel Windows & Doors, Folding Windows, UPVC Windows, Sliding Windows, Precision CNC Laser Cutting, and Aluminium Section Windows for residential, commercial, and architectural projects.',
    },
    {
      q: 'What is your service area and business hours?',
      a: 'We supply customized products across All India. Our manufacturing unit and office hours in Bharananganam, Kottayam, Kerala are from 9:00 AM to 7:00 PM.',
    },
  ];

  return (
    <section id="faq" className="py-12 sm:py-16 bg-[#FAF7F2] border-t border-black/5">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div data-reveal className="reveal text-center max-w-xl mx-auto mb-8">
          <p className="eyebrow">Frequently Asked Questions</p>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-apollio-ink mt-1">
            GOT QUESTIONS? WE HAVE ANSWERS.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-black/10 rounded-sm shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-apollio-ink hover:text-apollio-orange transition-colors focus:outline-none"
                >
                  <span className="flex items-center gap-3 pr-2">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-apollio-orange/10 text-apollio-orange font-bold text-xs">
                      Q
                    </span>
                    {faq.q}
                  </span>
                  <span className="flex-shrink-0 text-apollio-orange font-extrabold text-xl ml-2">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 pt-1 sm:px-5 sm:pb-6 text-xs sm:text-sm text-apollio-charcoal leading-relaxed border-t border-black/5 bg-[#FAF7F2]/50">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Google Reviews Component (Horizontal Scrolling Flow)
function GoogleReviews() {
  const reviews = [
    {
      name: 'Anish Kumar',
      location: 'Kottayam, Kerala',
      rating: 5,
      review: 'Appolio Industries provided exceptional customized steel windows and doors for our villa. The precision laser cutting and finish quality is top notch! Highly recommended!',
    },
    {
      name: 'Mathew Joseph',
      location: 'Pala, Kerala',
      rating: 5,
      review: 'Best steel doors & UPVC windows manufacturing company in Kottayam. We provided custom measurements and they delivered exact customized production on time.',
    },
    {
      name: 'Ragesh Nair',
      location: 'Bharananganam',
      rating: 5,
      review: 'Great craftsmanship in folding windows and sliding windows. Appolio Industries team is very professional and their steel door quality is extremely sturdy.',
    },
    {
      name: 'Suresh Menon',
      location: 'Ernakulam, Kerala',
      rating: 5,
      review: 'Superior quality aluminium section windows and custom laser cutting grill panels. Delivered right on schedule to our site.',
    },
  ];

  return (
    <section id="google-reviews" className="py-12 sm:py-16 bg-white border-t border-black/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        
        {/* Header & Rating Badge */}
        <div data-reveal className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
              <svg className="w-4 h-4 fill-current text-blue-600" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Google Business Profile
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-apollio-ink">
              GOOGLE REVIEWS & RATINGS
            </h2>
            <p className="text-xs sm:text-sm text-apollio-charcoal mt-1">
              See what satisfied clients say about Appolio Industries, Bharananganam
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#FAF7F2] p-4 border border-black/10 rounded-sm">
            <div className="text-3xl font-extrabold text-apollio-ink">5.0</div>
            <div>
              <div className="flex text-amber-500 text-lg">★★★★★</div>
              <p className="text-xs font-semibold text-apollio-charcoal">Verified Google Reviews</p>
            </div>
          </div>
        </div>

        {/* Horizontal Flowing Reviews Slider */}
        <div className="flex gap-5 overflow-x-auto pb-6 pt-1 snap-x snap-mandatory scrollbar-none -mx-5 px-5 sm:mx-0 sm:px-0">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[290px] sm:w-[340px] snap-start bg-[#FAF7F2] border border-black/10 p-5 rounded-none flex flex-col justify-between shadow-xs transition hover:shadow-md"
            >
              <div>
                <div className="flex text-amber-500 text-sm mb-3">
                  {'★'.repeat(rev.rating)}
                </div>
                <p className="text-xs sm:text-sm text-apollio-charcoal leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-black/10 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-apollio-ink uppercase">{rev.name}</h4>
                  <p className="text-[11px] text-apollio-orange font-semibold">{rev.location}</p>
                </div>
                <span className="text-blue-600 text-xs font-bold flex items-center gap-1">
                  Google ✓
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons to Google Profile */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <a
            href={companyInfo.links.googleReview}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#4285F4] text-white px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-sm shadow-md transition hover:bg-[#3367D6]"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            Write / View Google Review
          </a>

          <a
            href={companyInfo.links.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-black/20 text-apollio-ink px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-sm shadow-xs transition hover:border-apollio-orange hover:text-apollio-orange"
          >
            📍 Google Maps Profile
          </a>
        </div>

      </div>
    </section>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer id="footer-contact" className="bg-apollio-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-3 lg:px-10">
        
        {/* Brand & About (Logo with background removed) */}
        <div className="space-y-4">
          <button type="button" onClick={() => onNavigate('home')} className="focus:outline-none">
            <img src={assets.logo} alt="Appolio Industries logo" className="h-14 w-48 object-contain object-left" />
          </button>
          <p className="text-xs sm:text-sm leading-relaxed text-white/80">
            <strong>{companyInfo.name}</strong> — {companyInfo.type}. Established in {companyInfo.established} in Bharananganam, Kottayam. {companyInfo.whyChooseUs}
          </p>
          <p className="text-xs text-apollio-orange font-semibold">
            Service Area: {companyInfo.serviceArea}
          </p>
        </div>

        {/* Quick Contact Info with Orange SVG Icons */}
        <div className="space-y-3.5 text-xs sm:text-sm text-white/85">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
            Contact Info
          </h3>

          <div className="flex items-start gap-3">
            <svg className="w-4 h-4 text-apollio-orange flex-shrink-0 mt-1 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <div className="leading-relaxed">
              <strong className="block text-white text-[11px] uppercase tracking-wider">Office Address:</strong>
              {companyInfo.address}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-apollio-orange flex-shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <div>
              <strong className="block text-white text-[11px] uppercase tracking-wider">Phone:</strong>
              <a href={`tel:${companyInfo.phone}`} className="hover:text-apollio-orange transition">
                {companyInfo.phoneFormatted}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-apollio-orange flex-shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <div>
              <strong className="block text-white text-[11px] uppercase tracking-wider">Email:</strong>
              <a href={`mailto:${companyInfo.email}`} className="hover:text-apollio-orange transition">
                {companyInfo.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-apollio-orange flex-shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <div>
              <strong className="block text-white text-[11px] uppercase tracking-wider">Business Hours:</strong>
              {companyInfo.businessHours}
            </div>
          </div>
        </div>

        {/* Social Links & Google Profile with Orange SVG Icons */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
            Social Links & Profiles
          </h3>

          <div className="flex flex-col gap-3">
            <a
              href={companyInfo.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-xs font-semibold text-white/90 hover:text-apollio-orange transition"
            >
              <svg className="w-4 h-4 text-apollio-orange fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow on Instagram
            </a>

            <a
              href={companyInfo.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-xs font-semibold text-white/90 hover:text-apollio-orange transition"
            >
              <svg className="w-4 h-4 text-apollio-orange fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
              </svg>
              Like on Facebook
            </a>

            <a
              href={companyInfo.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-xs font-semibold text-white/90 hover:text-apollio-orange transition"
            >
              <svg className="w-4 h-4 text-apollio-orange fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              Chat on WhatsApp
            </a>

            <a
              href={companyInfo.links.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-xs font-semibold text-white/90 hover:text-apollio-orange transition"
            >
              <svg className="w-4 h-4 text-apollio-orange fill-current" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Visit Location on Google Maps
            </a>

            <a
              href={companyInfo.links.googleReview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-xs font-semibold text-white/90 hover:text-apollio-orange transition"
            >
              <svg className="w-4 h-4 text-apollio-orange fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              Google Reviews & Ratings
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs uppercase tracking-[0.16em] text-white/60">
        © 2026 {companyInfo.name}. All rights reserved. • Steel Windows & Doors Manufacturing Company
      </div>
    </footer>
  );
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div data-reveal className="reveal max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-3">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-apollio-charcoal">{copy}</p>
    </div>
  );
}

function toId(value) {
  return value.toLowerCase().replace(/\s+/g, '-');
}

export default App;
