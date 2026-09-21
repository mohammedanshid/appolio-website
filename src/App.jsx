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

const navItems = ['Home', 'About Us', 'Collections', 'Projects', 'Products', 'Contact'];

// Product Collections Data (Door models, styles, finishes with exact category names)
const collectionsPhotos = [
  { id: 1, src: assets.steelDoorGallery, title: 'Signature Steel Entry Door', category: 'Steel Doors' },
  { id: 2, src: assets.upvcDoorGallery, title: 'UPVC Sliding Patio Door', category: 'UPVC Doors' },
  { id: 3, src: assets.steelWindowsGallery, title: 'Architectural Steel Window Suite', category: 'Steel Windows' },
  { id: 4, src: '/assets/hero-mobile-slide-2.jpg', title: 'Heritage Bronze Double Door', category: 'Bronze Series' },
  { id: 5, src: assets.showcaseModern, title: 'Linear Executive Security Door', category: 'Security Doors' },
  { id: 6, src: assets.showcaseElevate, title: 'Grand Timber Armor Entry Door', category: 'Steel Doors' },
  { id: 7, src: assets.showcaseTransform, title: 'Contemporary UPVC Glass Door', category: 'UPVC Doors' },
  { id: 8, src: assets.heroMobile, title: 'Modern Teak Grain Steel Panel', category: 'Steel Doors' },
];

// Completed Projects / Installations Data (Real customer site installations)
const projectsPhotos = [
  { id: 1, src: '/assets/portfolio-1.jpg', title: 'Private Villa Elevation Project', location: 'Luxury Residence' },
  { id: 2, src: '/assets/portfolio-2.jpg', title: 'Sculptural Foyer Entry Installation', location: 'Modern Home' },
  { id: 3, src: '/assets/portfolio-3.jpg', title: 'Architectural Pivot Window Project', location: 'Executive Villa' },
  { id: 4, src: assets.heroDesktop, title: 'Commercial Entrance System', location: 'Corporate Headquarters' },
  { id: 5, src: assets.introDoor, title: 'Custom Villa Double Entry Site', location: 'Private Estate' },
  { id: 6, src: assets.mobilePanel, title: 'Patio UPVC Glass Door Installation', location: 'Contemporary Home' },
];

const products = [
  {
    title: 'Signature Steel Entry',
    category: 'Steel Doors',
    image: assets.heroMobile,
    description: 'Layered steel, warm wood finishes, and bold contemporary hardware for refined entrances.',
  },
  {
    title: 'Heritage Bronze Double Door',
    category: 'Bronze Series',
    image: '/assets/hero-mobile-slide-2.jpg',
    description: 'A sculptural double-door profile designed for residences that need presence and permanence.',
  },
  {
    title: 'Linear Executive Security',
    category: 'Security Doors',
    image: '/assets/hero-mobile-slide-3.jpg',
    description: 'Precise vertical textures and mixed materials with a composed architectural face.',
  },
  {
    title: 'Contemporary Dark Frame',
    category: 'Steel Windows',
    image: assets.showcaseModern,
    description: 'Sleek dark profiles engineered for maximum security with minimalist aesthetics.',
  },
  {
    title: 'Grand Timber Entrance',
    category: 'UPVC Doors',
    image: assets.showcaseElevate,
    description: 'Expansive double-door entry system combining natural timber tones with steel armor.',
  },
];

const strengths = [
  {
    title: 'Steel Strength',
    copy: 'Engineered for daily performance with dependable structure, secure frames, and long-term durability.',
  },
  {
    title: 'Modern Finishes',
    copy: 'Refined textures, wood-inspired surfaces, and crisp profiles designed for premium architecture.',
  },
  {
    title: 'Precision Fit',
    copy: 'Built around clean alignment, smooth operation, and details that feel considered at every touchpoint.',
  },
  {
    title: 'Crafted Service',
    copy: 'A consultative process that helps match door systems to each project, elevation, and lifestyle.',
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
            <Consultation />
          </>
        )}
      </main>

      <Footer onNavigate={navigateTo} />
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
          <img src={assets.logo} alt="APOLLIO Steel Doors logo" className="h-12 w-40 object-contain object-left sm:h-14 sm:w-48" />
        </button>

        <div className="hidden items-center gap-9 lg:flex">
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

        <a
          href="#contact"
          onClick={() => onNavigate('home')}
          className="hidden rounded-sm bg-apollio-orange px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-sm transition hover:bg-[#dd6816] focus:outline-none focus-visible:ring-2 focus-visible:ring-apollio-orange focus-visible:ring-offset-2 lg:inline-flex"
        >
          Get a Consultation
        </a>

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
            href="#contact"
            className="mt-3 rounded-sm bg-apollio-orange px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] text-white"
            onClick={() => {
              onNavigate('home');
              closeMenu();
            }}
          >
            Get a Consultation
          </a>
        </div>
      </div>
    </header>
  );
}

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
                alt={`Apollio steel doors slide ${idx + 1}`}
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
    'STEEL DOORS',
    'UPVC DOORS & WINDOWS',
    'LUXURY PIVOT ENTRANCES',
    'HIGH SECURITY LOCKING',
    'CUSTOM STEEL FABRICATION',
    'WEATHERPROOF DUAL SEALS',
    'ARCHITECTURAL HARDWARE',
    'HERITAGE BRONZE FINISHES',
  ];

  const repeated = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

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
          <p className="eyebrow">About Us</p>
          <h2 className="section-title max-w-3xl">
            CRAFTING DOORS. DEFINING SPACES.
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-apollio-charcoal sm:text-lg lg:text-xl font-normal">
            APOLLIO Steel Doors creates durable, design-led steel door & window systems engineered for strength, security, and refined modern architecture.
          </p>
          <div className="brand-rule justify-start">
            <span>Precision</span>
            <span>Craftsmanship</span>
            <span>Modern Protection</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const statsData = [
  { target: 6500, suffix: '+', label: 'Doors Installed' },
  { target: 2300, suffix: '+', label: 'Satisfied Clients' },
  { target: 150, suffix: '+', label: 'Awards & Recognition' },
  { target: 20, suffix: '+', label: 'Years of Experience' },
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

{/* Collections Section on Main Page (Clicking cards redirects to that specific section on Collections Page!) */}
function CollectionsHomeSection({ onOpenCollections }) {
  return (
    <section id="collections" className="py-14 sm:py-20 bg-[#FAF7F2] border-b border-black/5">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        
        {/* Title "COLLECTIONS →" */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => onOpenCollections('All')}
            className="group flex items-center gap-3 text-left focus:outline-none"
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold uppercase tracking-tight text-apollio-orange transition-colors group-hover:text-apollio-ink">
              Collections
            </h2>
            <span className="text-2xl sm:text-4xl lg:text-5xl font-bold text-apollio-orange transition-transform duration-300 group-hover:translate-x-2 group-hover:text-apollio-ink">
              →
            </span>
          </button>
        </div>

        {/* 1 Main Product Design Image + 4 Square Product Design Grid (Clicking card opens that category section!) */}
        <div className="space-y-4">
          
          <div
            onClick={() => onOpenCollections('Steel Doors')}
            className="group relative cursor-pointer overflow-hidden rounded-none bg-black/5 border border-black/10 aspect-[4/3] sm:aspect-[16/10] transition hover:opacity-95 shadow-sm"
          >
            <img
              src={assets.steelDoorGallery}
              alt="Steel Doors Collection"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 bg-apollio-orange text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 shadow-sm">
              Steel Doors
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { src: assets.upvcDoorGallery, alt: 'UPVC Doors', category: 'UPVC Doors' },
              { src: assets.steelWindowsGallery, alt: 'Steel Windows', category: 'Steel Windows' },
              { src: assets.showcaseModern, alt: 'Security Doors', category: 'Security Doors' },
              { src: '/assets/hero-mobile-slide-2.jpg', alt: 'Bronze Series', category: 'Bronze Series' },
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

{/* Projects Section on Main Page (Real Installations & Sites) */}
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
              Projects
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

{/* Separate Dedicated Page for COLLECTIONS (With Sectioned Pill Tags matching Reference Image 4) */}
function CollectionsPage({ initialFilter = 'All', onClose }) {
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [activeImageModal, setActiveImageModal] = useState(null);

  useEffect(() => {
    setActiveFilter(initialFilter);
  }, [initialFilter]);

  const filterCategories = ['All', 'Steel Doors', 'UPVC Doors', 'Steel Windows', 'Security Doors', 'Bronze Series'];

  const filteredPhotos = activeFilter === 'All'
    ? collectionsPhotos
    : collectionsPhotos.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Compact Page Header with adjusted Title size & sleek Back to Home button */}
        <div className="flex items-center justify-between border-b border-black/10 pb-5 mb-6">
          <div>
            <h1 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-apollio-orange">
              Product Collections
            </h1>
            <p className="text-xs sm:text-sm text-apollio-charcoal/80 mt-0.5">
              Browse our catalog by door type, style, and finish.
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

        {/* Sectioned Name Filter Pills (Matching Reference Image 4 styling) */}
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

        {/* Clean Grid of Product Collections */}
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

      {/* Lightbox Modal */}
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

{/* Separate Dedicated Page for PROJECTS (Completed site installations with adjusted button & title sizes) */}
function ProjectsPage({ onClose }) {
  const [activeImageModal, setActiveImageModal] = useState(null);

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Projects Page Header with compact button & adjusted title */}
        <div className="flex items-center justify-between border-b border-black/10 pb-5 mb-8">
          <div>
            <h1 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-apollio-orange">
              Completed Projects
            </h1>
            <p className="text-xs sm:text-sm text-apollio-charcoal/80 mt-0.5">
              Real-world door installations in luxury villas, modern residences, and commercial buildings.
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

        {/* Clean Grid of Real Projects */}
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

      {/* Lightbox Modal */}
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

const doorFeatures = [
  {
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    titleMobile: 'Steel Armor',
    title: 'Steel Armor Protection',
    desc: 'Heavy-gauge steel core engineered for maximum security.',
  },
  {
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    titleMobile: 'Smart Locks',
    title: 'Smart Lock Ready',
    desc: 'Compatible with biometric, PIN & multi-point locking.',
  },
  {
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    titleMobile: 'Timber Finishes',
    title: 'Modern Timber Finishes',
    desc: 'Vibrant wood grains, matte charcoal & custom tones.',
  },
  {
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11a7 7 0 01-7 7m0 0a7 7m-7-7a7 7 0 017-7m0 0a7 7 0 017 7z" />
      </svg>
    ),
    titleMobile: 'Weatherproof',
    title: 'Weather & Sound Proof',
    desc: 'Double perimeter seals for acoustic & thermal comfort.',
  },
  {
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2V4zm-6 8a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zm12 0a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zM7 17a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1z" />
      </svg>
    ),
    titleMobile: 'Precision Fit',
    title: 'Precision Fit',
    desc: 'Laser-measured alignment for effortless operation.',
  },
  {
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    titleMobile: 'Solid Hardware',
    title: 'Solid Hardware',
    desc: 'Stainless steel handles, concealed hinges & fittings.',
  },
];

{/* Solid non-curved orange block section matching Reference Image 3 request */}
function DoorFeaturesSection() {
  return (
    <section className="bg-apollio-orange py-10 sm:py-16 text-center text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <h2 className="font-serif italic text-2xl sm:text-5xl lg:text-6xl font-light tracking-wide text-white mb-2 sm:mb-3">
          WHAT MAKES APOLLIO EXCEPTIONAL?
        </h2>
        <p className="hidden sm:block max-w-2xl mx-auto text-xs sm:text-sm font-medium tracking-widest text-white/90 uppercase mb-10">
          Precision Engineering &nbsp;•&nbsp; Architectural Beauty &nbsp;•&nbsp; Uncompromising Security
        </p>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-3 sm:gap-10 max-w-5xl mx-auto mt-4 sm:mt-0">
          {doorFeatures.map((feat) => (
            <div
              key={feat.title}
              className="flex flex-col items-center text-center p-1.5 sm:p-4 rounded-none bg-transparent md:bg-white/10 border-0 md:border md:border-white/20 transition-all duration-300 hover:bg-white/20 hover:-translate-y-1"
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center text-white mb-2 sm:mb-3 shadow-inner">
                {feat.icon}
              </div>
              <h3 className="text-[11px] sm:text-base font-bold uppercase tracking-wider text-white">
                <span className="sm:hidden">{feat.titleMobile}</span>
                <span className="hidden sm:inline">{feat.title}</span>
              </h3>
              <p className="hidden md:block mt-1 text-[11px] sm:text-xs text-white/85 leading-relaxed max-w-[220px]">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
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
    <section id="products" className="section bg-white overflow-hidden py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Premium Door Collection"
          title="Door systems with steel confidence and architectural polish."
          copy="Browse the supplied APOLLIO visual range, preserving the original door designs, finishes, hardware, and proportions."
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
                  alt={`${product.category} Apollio steel door design`}
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
    <section className="section bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Why Choose Apollio"
          title="A premium entrance should feel secure, precise, and beautifully resolved."
          copy="APOLLIO brings durability, modern design language, and attentive craftsmanship into every steel door solution."
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

function Consultation() {
  return (
    <section id="contact" className="section bg-apollio-ink text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div data-reveal className="reveal">
          <p className="eyebrow text-apollio-orange">Consultation</p>
          <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">Plan your entrance with APOLLIO.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/76">
            Share your project style, opening size, preferred finish, and security needs. APOLLIO can help shape a door
            solution that fits the architecture and stands up to everyday use.
          </p>
        </div>
        <div data-reveal className="reveal flex flex-col gap-4 rounded-sm border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <a href="tel:+910000000000" className="cta-button">
            Call for Consultation
          </a>
          <a href="mailto:hello@apolliodoors.com" className="rounded-sm border border-white/20 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-apollio-orange hover:text-apollio-orange">
            Email APOLLIO
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto] lg:px-10">
        <div>
          <button type="button" onClick={() => onNavigate('home')} className="focus:outline-none">
            <img src={assets.logo} alt="APOLLIO Steel Doors logo" className="h-14 w-48 object-contain object-left" />
          </button>
          <p className="mt-4 max-w-xl leading-7 text-apollio-charcoal">
            Premium steel doors & windows for durable, stylish, and timeless entrances.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-apollio-charcoal">
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
                }
              }}
              className="transition hover:text-apollio-orange"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-black/5 px-5 py-5 text-center text-xs uppercase tracking-[0.16em] text-apollio-charcoal/60">
        © 2026 APOLLIO Steel Doors. All rights reserved.
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
