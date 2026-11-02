import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, MotionConfig, useScroll, useTransform, useSpring, useReducedMotion, useMotionValueEvent, useAnimationFrame, useInView } from 'framer-motion';
import { ArrowUpRight, ArrowDown, ArrowRight, Play, X, Menu, Mail, Phone, MapPin, Instagram, Youtube, Download, Pause, Search, Plus, Minus, ChevronLeft, ChevronRight, ExternalLink, Github, Sparkles } from 'lucide-react';
import archive from './data/projects.json';
import brands from './data/brands.json';
import './styles.css';

const MotionContext = createContext(true);
const EASE = [0.22, 1, 0.36, 1];
const categories = ['All', 'Full Stack', 'Websites', 'Automation', 'Discord Bots', 'AI Systems', '3D Web'];
const featured = ['PIC SAFE FOOD', 'NOTEBOOKLM AI CLONE', 'CYBERPUNK ENVIRONMENT'].map(key => archive.find(p => p.media === key || p.title === key)).filter(Boolean);
const experiences = [
  { date: '2024 · PRESENT', title: 'Full Stack Developer', place: 'Web products & applications', text: 'Building clean, scalable React web applications, dashboards, API integrations, and backend architectures for clients and production platforms.' },
  { date: '2024 – 2025', title: 'Systems & Automation Developer', place: 'Workflow & bot architecture', text: 'Engineered custom Discord bot ecosystems, automated pipeline tooling, and Python data scraping workflows reducing manual operational overhead.' },
  { date: '2023 – 2024', title: 'Frontend Web Developer', place: 'Modern web interfaces & UI', text: 'Crafted performant, responsive web applications, component design systems, and interactive 3D web experiences using React, TypeScript, and Tailwind CSS.' },
  { date: '2022 – 2023', title: 'Backend & API Developer', place: 'Server & database architecture', text: 'Developed RESTful services, database schemas on Supabase/PostgreSQL, authentication flows, and webhook pipelines for real-time applications.' },
  { date: '2022 · PRESENT', title: 'Open Source Creator', place: 'yuvraj-debug · GitHub', text: 'Published 50+ repositories spanning full-stack web applications, AI tools, developer utilities, and web automation systems.' },
];
const certificates = [
  { title: 'Full Stack Web Architecture', year: '2025', image: './Asset/img/SERTIFIKAT/shortmovie.jpeg' },
  { title: 'React & TypeScript Mastery', year: '2024', image: './Asset/img/SERTIFIKAT/juara2.jpg' },
  { title: 'Backend & API Systems', year: '2024', image: './Asset/img/SERTIFIKAT/dalang.jpg' },
  { title: 'Automation & Bot Engineering', year: '2023', image: './Asset/img/SERTIFIKAT/videolabs.jpg' },
];
const awards = [
  { year: '2026', title: '50+ Web Projects', event: 'Full Stack & React Deployments' },
  { year: '2025', title: 'AI Systems & Automation', event: 'Pipeline & Tooling Engineering' },
  { year: '2025', title: 'Discord Bot Architect', event: 'Community & Server Automation' },
  { year: '2024', title: 'Full Stack Products', event: 'End-to-End System Deliveries' },
  { year: '2024', title: 'React & TypeScript Mastery', event: 'Component Architecture & UI' },
  { year: '2023', title: 'Backend & API Solutions', event: 'Database & Integration Pipelines' },
];

function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const enabled = useContext(MotionContext);
  const Component = motion[as];
  return <Component className={className} initial={enabled ? { opacity: 0, y: 32 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.12 }} transition={{ duration: enabled ? 0.75 : 0, delay, ease: EASE }}>{children}</Component>;
}

function MediaImage({ src, alt, className = '', priority = false, ...props }) {
  const [state, setState] = useState('loading');
  const imgRef = useRef(null);
  useEffect(() => {
    const img = imgRef.current;
    setState(img?.complete ? (img.naturalWidth ? 'loaded' : 'error') : 'loading');
  }, [src]);
  return <span className={`media-image ${state} ${className}`}>
    {state === 'error' && <span className="image-fallback"><span className="display">Y.</span><span>Preview not available</span></span>}
    <img ref={imgRef} src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} width="960" height="600" onLoad={() => setState('loaded')} onError={e => {
      if (e.currentTarget.src.includes('maxresdefault.jpg')) e.currentTarget.src = e.currentTarget.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
      else setState('error');
    }} {...props} />
  </span>;
}

function Magnetic({ children, className = '', ...props }) {
  const enabled = useContext(MotionContext);
  const x = useSpring(0, { stiffness: 220, damping: 20 });
  const y = useSpring(0, { stiffness: 220, damping: 20 });
  return <motion.a className={className} style={{ x, y }} onPointerMove={e => {
    if (!enabled || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.12); y.set((e.clientY - r.top - r.height / 2) * 0.2);
  }} onPointerLeave={() => { x.set(0); y.set(0); }} {...props}>{children}</motion.a>;
}

let isSwarmRunning = false;

async function runSwarmRebuild(setMotionOn, motionOn) {
  if (isSwarmRunning) return;
  isSwarmRunning = true;

  const root = document.documentElement;
  const wasMotion = motionOn;

  try {
    // 1. Smoothly fade in an obsidian veil to prevent any visual jumps or flashes during scan
    let veil = document.getElementById('swarm-veil');
    if (!veil) {
      veil = document.createElement('div');
      veil.id = 'swarm-veil';
      veil.style.cssText = 'position:fixed;inset:0;background:#090909;z-index:2147483646;opacity:0;transition:opacity 0.16s ease;pointer-events:none;';
      document.body.appendChild(veil);
    }
    await new Promise(r => requestAnimationFrame(() => { veil.style.opacity = '1'; r(); }));
    await new Promise(r => setTimeout(r, 160));

    // 2. Disable motion while hidden behind the veil so blueprint captures elements at full opacity and natural offset
    if (wasMotion) {
      setMotionOn(false);
      root.dataset.motion = 'off';
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    try { await document.fonts.ready; } catch (_) {}

    // 3. Ensure Asset/dist/swarm.js is loaded
    if (!window.__swarmRebuild) {
      await new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = './Asset/dist/swarm.js';
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }

    if (window.__swarmRebuild.app) {
      window.__swarmRebuild.stop(false);
      await new Promise(r => setTimeout(r, 120));
    }

    // 4. Start the authentic Swarm Rebuild
    window.__swarmRebuild.start();

    // 5. Fade out temporary veil as swarm host takes over
    if (veil) {
      veil.style.opacity = '0';
      setTimeout(() => veil.remove(), 250);
    }

    const until = (fn, timeoutMs) => new Promise((resolve, reject) => {
      const t0 = Date.now();
      const check = () => {
        const res = fn();
        if (res) return resolve(res);
        if (Date.now() - t0 > timeoutMs) return reject(new Error('Swarm timed out'));
        setTimeout(check, 80);
      };
      check();
    });

    const app = await until(() => window.__swarmRebuild?.app?.engine?.ready && window.__swarmRebuild.app, 8000);

    // 5. Automatically activate Tour for auto-scrolling synchronization
    const tourBtn = app.view.root.querySelector('[data-a="tour"]');
    if (tourBtn && !app.tour) tourBtn.click();

    // 6. Wait until build completes or user cancels
    await until(() => app.complete || !window.__swarmRebuild?.app, 60000);
    await new Promise(r => setTimeout(r, 1200));

    // 7. Transition back to live page and scroll smoothly back to top
    if (window.__swarmRebuild?.app) {
      window.__swarmRebuild.stop(true);
    }
    await new Promise(r => setTimeout(r, 1000));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    console.error('Swarm playback error:', err);
    try { if (window.__swarmRebuild?.app) window.__swarmRebuild.stop(false); } catch (_) {}
    window.scrollTo({ top: 0, behavior: 'instant' });
  } finally {
    const v = document.getElementById('swarm-veil');
    if (v) v.remove();
    if (wasMotion) {
      setMotionOn(true);
      root.dataset.motion = 'on';
    }
    isSwarmRunning = false;
  }
}

function Header({ enabled, onToggle, onSwarm }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('main > section[id]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);
  return <header className="site-header">
    <a className="wordmark" href="#home" aria-label="Yuvraj, home">YUVRAJ<span>®</span></a>
    <nav className="desktop-nav" aria-label="Main navigation">{[['portfolio', 'Work'], ['awards', 'Milestones'], ['about', 'About'], ['experience', 'Journey'], ['contact', 'Contact']].map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>{label}</a>)}</nav>
    <div className="header-actions">
      <button className="swarm-toggle-btn" onClick={onSwarm} aria-label="Rebuild page with swarm animation (Press F)" title="Rebuild animation (Press 'F')"><Sparkles size={13} /><span>Swarm [F]</span></button>
      <button className="motion-toggle-btn" onClick={onToggle} aria-label={enabled ? 'Pause motion' : 'Enable motion'} aria-pressed={!enabled}>{enabled ? <Pause size={13} /> : <Play size={13} />}<span>Motion {enabled ? 'on' : 'off'}</span></button>
      <a className="header-contact" href="#contact">Let’s talk <ArrowUpRight size={16} /></a>
      <button className="menu-toggle icon-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />} </button>
    </div>
    <AnimatePresence>{open && <motion.nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      {[['home', 'Home'], ['portfolio', 'Work'], ['awards', 'Milestones'], ['about', 'About'], ['experience', 'Journey'], ['contact', 'Contact']].map(([id, label], i) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}<ArrowUpRight size={18} /></a>)}
      <button style={{ display: 'flex', alignItems: 'center', gap: '18px', minHeight: '54px', borderBottom: '1px solid var(--line)', fontSize: '18px', color: 'inherit', textAlign: 'left', width: '100%', cursor: 'pointer' }} onClick={() => { setOpen(false); onSwarm(); }}>
        <span style={{ fontSize: '10px', color: 'var(--red)' }}>07</span>Swarm Rebuild [F]<Sparkles size={18} style={{ marginLeft: 'auto', color: 'var(--red)' }} />
      </button>
    </motion.nav>}</AnimatePresence>
  </header>;
}

function Hero({ onProject }) {
  const ref = useRef(null);
  const enabled = useContext(MotionContext);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 85]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  return <section id="home" className="hero" ref={ref}>
    <div className="hero-top"><span>FULL STACK DEVELOPER<br/><span className="muted">AUTOMATION & SYSTEMS ARCHITECT</span></span><span className="availability"><i />AVAILABLE FOR COLLABORATION</span></div>
    <motion.div className="hero-title display" aria-hidden="true" style={enabled ? { y: titleY } : {}} initial={enabled ? { clipPath: 'inset(0 0 100% 0)' } : false} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: 1.4, ease: EASE }}>PORTFOLIO</motion.div>
    <motion.div className="hero-portrait" style={enabled ? { y: portraitY, scale: portraitScale } : {}} initial={enabled ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.2 }}><img src="./Asset/img/yuvraj-portrait.png" alt="Yuvraj full stack developer avatar" width="1024" height="1536" fetchPriority="high" /></motion.div>
    <motion.div className="hero-intro" style={enabled ? { y: copyY } : {}} initial={enabled ? { opacity: 0, x: -35 } : false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: EASE }}>
      <p className="handwriting">Hello, I’m</p><h1 className="display">YUVRAJ<span>.</span></h1><p className="hero-role">FULL STACK &<br />WEB DEVELOPER</p><p className="hero-description">Building clean, scalable web applications and reliable backend systems. Crafting practical software from modern React interfaces to resilient APIs.</p>
      <Magnetic href="#portfolio" className="primary-link">View my work <ArrowDown size={17}/></Magnetic>
      <span className="hero-location"><MapPin size={12} /> REWARI, HARYANA, INDIA</span>
    </motion.div>
    <motion.div className="hero-side" initial={enabled ? { opacity: 0, x: 30 } : false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.55, ease: EASE }}>
      <div className="hero-manifesto"><span className="crosshair" aria-hidden="true">✳</span><p>Every line.<br />A purposeful architecture.</p></div>
      <div className="hero-stats"><div><span className="display">2<span>+</span></span><p>YEARS IN FULL STACK<br/>DEVELOPMENT</p></div><div><span className="display">50<span>+</span></span><p>PROJECTS & REPOS<br/>COMPLETED</p></div><div className="hero-award-stat"><span className="display">8<span>+</span></span><a href="#awards" aria-label="View developer milestones">CORE TECH<ArrowUpRight size={12}/></a></div><a href="https://github.com/yuvraj-debug" target="_blank" rel="noopener noreferrer"><Github size={16}/><span>VIEW GITHUB</span></a></div>
    </motion.div>
    <div className="hero-bottom"><button className="reel-button" onClick={() => onProject(featured[0])}><span className="play-circle"><Play size={12} fill="currentColor" /></span>FEATURED PROJECT<span className="muted">FULL STACK / REACT</span></button><span className="hero-scroll">SCROLL TO EXPLORE <ArrowDown size={13}/></span><span className="edition">ENGINEERING WORK / 2024–2026</span></div>
  </section>;
}

function ProjectCard({ project, index, onOpen }) {
  const enabled = useContext(MotionContext);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const video = ['youtube', 'drive'].includes(project.type);
  return <motion.article ref={ref} className="project-card" layout initial={enabled ? { opacity: 0, y: 32 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.08 }} transition={{ duration: enabled ? 0.6 : 0, delay: (index % 3) * 0.06, ease: EASE }} exit={{ opacity: 0, scale: 0.96 }}>
    <button className="project-open" onClick={() => onOpen(project)} aria-label={`View ${project.title}`}><motion.div className="project-picture" style={enabled ? { y } : {}}><MediaImage src={project.image} alt={project.title}/></motion.div><span className="project-type">{project.type === 'render' ? '3D BREAKDOWN' : video ? 'FILM / VIDEO' : project.type === 'website' ? 'LIVE PRODUCT / REPO' : 'STILL / SCREEN'}</span><span className="project-hover">{video ? <Play fill="currentColor" size={18}/> : <ArrowUpRight size={22}/>}</span><span className="project-frame" aria-hidden="true" /></button>
    <button className="project-caption" onClick={() => onOpen(project)}><span className="project-number display">{String(index + 1).padStart(2, '0')}</span><span><h3>{project.title}</h3><span className="project-category">{project.category}{project.year ? ` / ${project.year}` : ''}</span></span><ArrowUpRight size={20}/></button>
  </motion.article>;
}

function BrandStrip() {
  const enabled = useContext(MotionContext);
  const ref = useRef(null);
  const loopWidth = useRef(0);
  const inView = useInView(ref);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    if (!ref.current || showAll) return;
    const update = () => { loopWidth.current = ref.current?.querySelector('.brand-set')?.getBoundingClientRect().width || 0; };
    const observer = new ResizeObserver(update);
    observer.observe(ref.current); update();
    return () => observer.disconnect();
  }, [showAll]);
  useAnimationFrame((time, delta) => {
    if (!enabled || paused || interacting || !inView || showAll || !ref.current || !loopWidth.current) return;
    const el = ref.current;
    el.scrollLeft += Math.min(delta, 40) * 0.038;
    if (el.scrollLeft >= loopWidth.current) el.scrollLeft -= loopWidth.current;
  });
  const move = direction => { setPaused(true); ref.current?.scrollBy({ left: direction * ref.current.clientWidth * .7, behavior: enabled ? 'smooth' : 'instant' }); };
  return <Reveal className="brand-section"><div className="brand-heading"><p>TECH ECOSYSTEM &<br/><strong>CORE ARCHITECTURES.</strong></p><div><button className="brand-all" onClick={() => setShowAll(v => !v)} aria-expanded={showAll} aria-controls="brand-collection">{showAll ? 'SHOW RAIL' : `VIEW ALL (${brands.length})`}{showAll ? <Minus size={14}/> : <Plus size={14}/>}</button>{!showAll && <><button className="icon-button brand-pause" aria-label={paused ? 'Resume animation' : 'Pause animation'} aria-pressed={paused} onClick={() => setPaused(v => !v)}>{paused ? <Play size={13}/> : <Pause size={13}/>}</button><button className="icon-button" onClick={() => move(-1)} aria-label="Previous logo"><ChevronLeft size={17}/></button><button className="icon-button" onClick={() => move(1)} aria-label="Next logo"><ChevronRight size={17}/></button></>}</div></div><div id="brand-collection" className={showAll ? 'brand-full-grid' : 'brand-viewport'} ref={ref} onPointerEnter={e => { if(e.pointerType==='mouse') setInteracting(true); }} onPointerLeave={() => setInteracting(false)} onPointerDown={() => setPaused(true)} onFocusCapture={() => setInteracting(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false); }} tabIndex={showAll ? undefined : 0} role={showAll ? 'list' : 'region'} aria-label="Tech stacks and tools, scroll to see all">
      {showAll ? brands.map(b => <div className="brand-logo" key={b.file} role="listitem"><img src={`./Asset/svg/brand/${b.file}`} alt={b.name} title={b.name} width="150" height="60" loading="eager"/><span>{b.name}</span></div>) : <div className="brand-rail">{[0,1].map(copy => <div className="brand-set" key={copy} aria-hidden={copy === 1 ? true : undefined}>{brands.map(b => <div className="brand-logo" key={b.file}><img src={`./Asset/svg/brand/${b.file}`} alt={copy ? '' : b.name} title={b.name} width="150" height="60" loading="eager" draggable="false"/></div>)}</div>)}</div>}
    </div></Reveal>;
}

function Portfolio({ onProject }) {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [limit, setLimit] = useState(9);
  const results = archive.filter(p => (category === 'All' || p.category === category) && `${p.title} ${p.category} ${p.role}`.toLowerCase().includes(query.toLowerCase()));
  const projects = expanded || category !== 'All' || query ? results.slice(0, limit) : featured;
  return <section id="portfolio" className="portfolio section-wrap">
    <Reveal className="section-heading"><div><span className="eyebrow">01 / SELECTED WORK</span><h2>CODE THAT PERFORMS<span className="accent">.</span></h2></div><button className="text-link" onClick={() => { if (expanded) { setExpanded(false); setCategory('All'); setQuery(''); } else { setExpanded(true); setLimit(9); } }}>{expanded ? 'FEATURED WORK' : 'ALL PROJECTS'}<ArrowRight size={21}/></button></Reveal>
    <Reveal className="portfolio-toolbar">
      <div className="filters" role="group" aria-label="Project categories">
        {categories.map(c => <button key={c} className={category === c ? 'selected' : ''} aria-pressed={category === c} onClick={() => { setCategory(c); setExpanded(true); setLimit(9); }}>{c}{c === category && <motion.span className="filter-line" layoutId="filter-line"/>}</button>)}
      </div>
      <label className="search-box"><Search size={15}/><span>Search</span><input aria-label="Search projects" type="search" placeholder="Title or category…" value={query} onChange={e => { setQuery(e.target.value); setExpanded(true); setLimit(9); }}/></label>
    </Reveal>
    <motion.div className="project-grid" layout><AnimatePresence mode="popLayout">{projects.map((p, i) => <ProjectCard key={p.category + p.title + p.media} project={p} index={i} onOpen={onProject}/>)}</AnimatePresence></motion.div>
    {projects.length === 0 && <div className="empty-state"><p>No projects found for “{query}”.</p><button className="text-link" onClick={() => { setQuery(''); setCategory('All'); }}>Reset search <X size={15}/></button></div>}
    {expanded && results.length > limit && <div className="load-more"><button className="outline-button" onClick={() => setLimit(v => v + 9)}>Show more projects <Plus size={16}/></button><span>{projects.length} of {results.length} projects</span></div>}
    <BrandStrip/>
  </section>;
}

const processSteps = [
  ['01', 'DISCOVERY & ARCHITECTURE', 'Understanding your vision, business requirements, user flows, and system specifications.'],
  ['02', 'SYSTEM DESIGN & PROTOTYPE', 'Structuring database schemas, API contracts, interactive component wireframes, and tech stack choices.'],
  ['03', 'FULL STACK DEVELOPMENT', 'Writing clean, typed frontend code in React/TypeScript paired with dependable backend APIs and logic.'],
  ['04', 'TESTING & OPTIMIZATION', 'Rigorous cross-device testing, API latency profiling, accessibility checks, and performance optimization.'],
  ['05', 'DEPLOYMENT & SUPPORT', 'Production deployment on modern cloud platforms, CI/CD setup, monitoring, and ongoing feature iterations.'],
];

function Awards({onProject}) {
  const [expanded,setExpanded] = useState(false);
  const laurelPath = 'M48 94C8 68 9 30 35 5M22 61C8 60 3 49 3 44c12 0 19 6 19 17zm-5-19C5 35 6 23 8 19c11 5 13 14 9 23zm7-20C15 12 20 3 24 0c7 8 6 16 0 22zM31 79C17 79 8 70 7 64c13-2 22 4 24 15zm-3-18c-5-10-2-19 7-25 5 11 1 20-7 25zm10 24c-6-11-4-20 5-27 6 9 5 20-5 27z';
  return <section id="awards" className={`recognition section-wrap ${expanded ? 'awards-expanded' : ''}`}>
    <Reveal className="recognition-intro">
      <span className="eyebrow">RECOGNITION & MILESTONES</span>
      <h2 className="display">THE CODE.<br/><span className="accent">THE MILESTONES.</span></h2>
      <div className="award-total">
        <svg viewBox="0 0 60 100" aria-hidden="true"><path d={laurelPath} fill="currentColor"/></svg>
        <span className="display">50<span>+</span></span>
        <svg viewBox="0 0 60 100" aria-hidden="true"><g transform="translate(60 0) scale(-1 1)"><path d={laurelPath} fill="currentColor"/></g></svg>
        <span className="award-total-label">PROJECTS BUILT</span>
      </div>
      <p>Engineered with precision, built for usability.<br/>Milestones that drive continuous software excellence.</p>
      <button className="text-link award-proof" onClick={()=>onProject({...certificates[0],type:'image',media:certificates[0].image,category:'Certification',description:'Full Stack Web Architecture & Certified Competency, 2025.'})}>VIEW CERTIFICATES<ArrowUpRight size={18}/></button>
    </Reveal>
    <div className="recognition-list">
      <div className="recognition-list-head"><span>SELECTED MILESTONES</span><span>2023 – 2026</span></div>
      <ol id="recognition-list">{awards.map((award,i)=><Reveal as="li" className={`recognition-row ${i>2?'additional-award':''}`} key={award.year + award.title} delay={i*.045}>
        <span className="award-index">0{i+1}</span>
        <div><h3>{award.title}</h3><p>{award.event}</p></div>
        <span className="award-year display">{award.year}</span>
      </Reveal>)}</ol>
      <button className="award-expand" aria-expanded={expanded} aria-controls="recognition-list" onClick={()=>setExpanded(v=>!v)}>{expanded?'Collapse milestones':'View all milestones'}{expanded?<Minus size={16}/>:<Plus size={16}/>}</button>
    </div>
  </section>;
}

function Breakdown() {
  const scene = featured.find(p => p.type === 'render');
  const ref = useRef(null);
  const enabled = useContext(MotionContext);
  const [manual, setManual] = useState(false);
  const [cut, setCut] = useState(65);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  useMotionValueEvent(scrollYProgress, 'change', v => { if (!manual && enabled) setCut(Math.round(90 - v * 80)); });
  const titleX = useTransform(scrollYProgress, [0, 1], [30, -30]);
  if (!scene) return null;
  const resize = url => url.replace('/upload/', '/upload/c_scale,w_1200,q_auto,f_auto/');
  return <section className="breakdown section-wrap" ref={ref} aria-labelledby="breakdown-title"><Reveal className="breakdown-copy"><span className="eyebrow">UNDER THE HOOD</span><motion.h2 id="breakdown-title" className="display" style={enabled ? { x: titleX } : {}}>FROM RAW.<br/><span className="accent">TO REAL.</span></motion.h2><p>One scene. Layered pipeline.<br/>See how a 3D WebGL environment transitions from wireframe geometry to interactive realism.</p><span className="breakdown-credit">THREE.JS 3D ENVIRONMENT / 2025<br/>WEBGL · SHADERS · THREE.JS</span></Reveal><Reveal className="comparison"><div className="comparison-stage" style={{'--cut': `${enabled || manual ? cut : 50}%`}}><MediaImage src={resize(scene.renders[0].solid)} alt="3D environment wireframe before material and shaders"/><div className="comparison-final"><MediaImage src={resize(scene.renders[0].final)} alt="3D environment final shader render"/></div><span className="comparison-label raw-label">SOLID VIEW</span><span className="comparison-label final-label">FINAL RENDER</span><div className="comparison-divider"><span><ChevronLeft size={14}/><ChevronRight size={14}/></span></div><input aria-label="Before and after render comparison" aria-valuetext={`${cut}% solid, ${100-cut}% final render`} type="range" min="0" max="100" value={cut} onChange={e => { setManual(true); setCut(Number(e.target.value)); }}/></div><div className="comparison-caption"><span>SWIPE TO SEE THE PROCESS</span><span>DRAG / SCROLL</span></div></Reveal></section>;
}

function About() {
  const enabled = useContext(MotionContext);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 75%'] });
  return <section id="about" className="about section-wrap" ref={ref}>
    <Reveal className="about-lead"><div><span className="eyebrow">02 / BEHIND THE SCREENS</span><h2 className="display">NOT JUST CODE.<br/>BUT A WAY TO <span className="accent">SOLVE PROBLEMS.</span></h2></div><p>I’m Yuvraj, a full stack developer from Rewari, Haryana. I build software that feels clean on the surface and dependable underneath, combining React interfaces, TypeScript structure, and backend APIs into usable products.</p></Reveal>
    <div className="studio-grid">
      <Reveal className="education-panel"><h3 className="panel-heading">EDUCATION & STACK</h3><p className="eyebrow accent">BACKGROUND</p><div className="education-row"><strong>Full Stack Engineering</strong><span>Rewari, Haryana</span><p>React, TypeScript, Node.js, Python, APIs, and modern system architectures.</p></div><div className="education-row"><strong>Systems & Automation</strong><span>2024</span><p>Discord bots, web automation, data pipelines, and developer tooling.</p></div><div className="education-row"><strong>Certifications & Continuous Learning</strong><p>Full Stack Development · Web APIs · Advanced React</p></div><p className="eyebrow accent skills-heading">TECHNICAL TOOLKIT</p><div className="skill-tags">{['React & TypeScript', 'Node.js & APIs', 'Python Automation', 'Backend Systems', 'Supabase & SQL', 'Discord Systems', 'Tailwind CSS', 'Git & CI/CD'].map(s => <span key={s}>{s}</span>)}</div><div className="software-row">{[['react', 'React'], ['ts', 'TypeScript'], ['node', 'Node.js'], ['python', 'Python'], ['tailwind', 'Tailwind CSS'], ['vs', 'VS Code']].map(([file, name]) => <img key={file} src={`./Asset/svg/${file}.svg`} alt={name} title={name} loading="eager" width="28" height="28"/>)}</div></Reveal>
      <div className="process-panel"><Reveal><h3 className="panel-heading">FROM CONCEPT TO PRODUCTION</h3></Reveal><div className="process-list"><div className="process-track"><motion.div style={{ scaleY: enabled ? scrollYProgress : 1 }}/></div>{processSteps.map(([num, title, text], i) => <Reveal key={num} className="process-row" delay={i * 0.035}><span className="process-num display">{num}</span><span className="process-node"/><div><h4>{title}</h4><p>{text}</p></div></Reveal>)}</div></div>
      <Reveal className="quote-panel"><span className="quote-mark display">“</span><blockquote>From clean APIs<br/>and architecture,<br/><em>to interfaces<br/>users love.</em></blockquote><span className="handwriting">Yuvraj</span><div className="quote-bottom">LET’S MAKE<br/>THE NEXT SYSTEM COUNT.<span className="quote-symbol" aria-hidden="true">✳</span></div></Reveal>
    </div>
  </section>;
}

function Journey({ onProject }) {
  const [open, setOpen] = useState(0);
  return <section id="experience" className="journey section-wrap">
    <Reveal className="section-heading"><div><span className="eyebrow">03 / THE JOURNEY</span><h2>CONTINUOUS GROWTH. CONSTANT REFACTORING<span className="accent">.</span></h2></div><a className="text-link" href="https://github.com/yuvraj-debug" target="_blank" rel="noopener noreferrer">GITHUB<Github size={16}/></a></Reveal>
    <div className="journey-grid"><div className="experience-list">{experiences.map((job, i) => <Reveal className={`experience-row ${open === i ? 'is-open' : ''}`} key={job.title}><button aria-expanded={open === i} aria-controls={`job-${i}`} onClick={() => setOpen(open === i ? null : i)}><span className="experience-date">{job.date}</span><span><h3>{job.title}</h3><span className="experience-place">{job.place}</span></span>{open === i ? <Minus size={18}/> : <Plus size={18}/>}</button><AnimatePresence initial={false}>{open === i && <motion.div id={`job-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}><p>{job.text}</p></motion.div>}</AnimatePresence></Reveal>)}</div>
    <Reveal className="awards-panel"><p className="eyebrow">KEY MILESTONES</p><h3 className="display">LITTLE WINS.<br/><span className="accent">BIG MEANING.</span></h3><div className="award-list">{certificates.map((cert, i) => <button key={cert.title} onClick={() => onProject({ ...cert, type: 'image', media: cert.image, category: 'Milestone', description: 'Technical certifications and developer milestones by Yuvraj.' })}><span>{String(i + 1).padStart(2, '0')}</span><span>{cert.title}<small>{cert.year}</small></span><ArrowUpRight size={19}/></button>)}</div></Reveal></div>
  </section>;
}

function Contact({ onProject }) {
  const [sent, setSent] = useState(false);
  const send = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = `Hi Yuvraj, I am ${data.get('name')}.\n\nProject Type: ${data.get('type')}\n${data.get('message')}`;
    window.open(`https://wa.me/918397892012?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };
  return <section id="contact" className="contact section-wrap">
    <div className="contact-grid"><Reveal className="contact-intro"><span className="eyebrow">04 / YOUR NEXT PROJECT</span><h2 className="display">LET’S BUILD<br/>TOGETHER<span className="accent">.</span></h2><p>Have an idea or web product you want to bring to life?<br/>Let's build something scalable and reliable.</p><Magnetic href="https://wa.me/918397892012" target="_blank" rel="noopener noreferrer" className="contact-cta"><span className="round-arrow"><ArrowUpRight size={21}/></span>START A CONVERSATION</Magnetic></Reveal>
    <Reveal className="contact-links" delay={0.1}><a href="mailto:yuvrajbold2012@gmail.com"><Mail/><span><small>EMAIL</small>yuvrajbold2012@gmail.com</span><ArrowUpRight size={16}/></a><a href="https://www.instagram.com/yuvraj._201/" target="_blank" rel="noopener noreferrer"><Instagram/><span><small>INSTAGRAM</small>@yuvraj._201</span><ArrowUpRight size={16}/></a><a href="tel:+918397892012"><Phone/><span><small>PHONE / WHATSAPP</small>+91 83978 92012</span><ArrowUpRight size={16}/></a><div><MapPin/><span><small>BASED IN</small>Rewari, Haryana, India</span></div></Reveal>
    <Reveal className="contact-reel" delay={0.2}><button onClick={() => onProject(featured[0])} aria-label="View featured project by Yuvraj"><div className="reel-screen"><span className="reel-screen-top">YUVRAJ®<span>FULL STACK / LIVE</span></span><MediaImage src={featured[0]?.image} alt="Featured project by Yuvraj"/><span className="reel-screen-title display">MAKE IT<br/><span>DEPENDABLE.</span></span><span className="play-circle"><Play size={18} fill="currentColor"/></span></div><span className="reel-caption">EXPLORE FEATURED FULL-STACK WORK.</span></button></Reveal></div>
    <Reveal><details className="project-brief"><summary>Tell me about your project <Plus size={19}/></summary><form onSubmit={send}><label>Your Name<input name="name" required placeholder="Name or company" autoComplete="name" maxLength="100"/></label><label>Project Type<select name="type"><option>Full Stack Web Application</option><option>React & Frontend Development</option><option>Backend API & Systems</option><option>Automation & Bot Workflows</option><option>3D Web / Interactive Experiences</option><option>Other Collaboration</option></select></label><label className="brief-message">Project Details<textarea name="message" required rows="3" placeholder="Tell me about your goals, tech stack, and timeline…" maxLength="3000"/></label><button className="solid-button" type="submit">Continue to WhatsApp <ArrowUpRight size={18}/></button><p className="form-note" role="status">{sent ? 'Message draft opened in WhatsApp. Press Send there to start.' : 'Your brief will open as a formatted draft on WhatsApp.'}</p></form></details></Reveal>
  </section>;
}

function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  const [renderMode, setRenderMode] = useState('final');
  const [shot, setShot] = useState(0);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [mediaFailed, setMediaFailed] = useState(false);
  const [retried, setRetried] = useState(0);
  const enabled = useContext(MotionContext);
  const activeShot = project.type === 'render' ? project.renders[shot] : null;
  const embedType = activeShot?.video ? 'youtube' : activeShot?.drive ? 'drive' : project.type;
  const embedMedia = activeShot?.video || activeShot?.drive?.match(/\/d\/([^/]+)/)?.[1] || project.media;
  const isVideo = ['youtube', 'drive'].includes(embedType);
  const availableModes = [['layout', 'Layout'], ['solid', 'Solid'], ['material', 'Material'], ['lighting', 'Lighting'], ['final', 'Final render']].filter(([mode]) => activeShot?.[mode] && !(mode === 'solid' && activeShot.hideSolidMode));
  const effectiveMode = activeShot?.[renderMode] ? renderMode : availableModes[0]?.[0];
  const rendered = activeShot?.[effectiveMode] || activeShot?.image || project.image;
  const sourceUrl = embedType === 'youtube' ? `https://www.youtube.com/watch?v=${embedMedia}` : embedType === 'drive' ? `https://drive.google.com/file/d/${embedMedia}/view` : project.type === 'render' ? rendered : project.media || project.image;
  const changeShot = next => { setMediaLoaded(false); setMediaFailed(false); setShot(next); };
  useEffect(() => {
    const previous = document.activeElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    const listener = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const nodes = [...ref.current.querySelectorAll('button, a[href], input, select, textarea, iframe')].filter(n => !n.disabled && n.getClientRects().length);
        const first = nodes[0]; const last = nodes.at(-1);
        if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener('keydown', listener);
    return () => { document.body.style.overflow = old; window.removeEventListener('keydown', listener); previous?.focus(); };
  }, [onClose]);
  useEffect(() => {
    if (!isVideo) return;
    const timer = setTimeout(() => { if (!mediaLoaded) setMediaFailed(true); }, 14000);
    return () => clearTimeout(timer);
  }, [mediaLoaded, retried, isVideo, embedMedia]);
  return <motion.div className="dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <motion.div ref={ref} className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabIndex="-1" initial={enabled ? { y: 45, scale: 0.97 } : false} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
      <div className="dialog-heading"><span className="eyebrow">{project.category} {project.year && ` / ${project.year}`}</span><button onClick={onClose} className="icon-button" aria-label="Close project modal"><X/></button></div>
      <div className={`dialog-media ${!isVideo ? 'still' : ''}`}>
        {isVideo ? <>{!mediaLoaded && <div className="media-loading" role="status">{mediaFailed ? <><p>Preview not loaded yet. Open the original link.</p><button className="outline-button" onClick={() => { setMediaFailed(false); setMediaLoaded(false); setRetried(v => v + 1); }}>Retry</button></> : <><span className={enabled ? 'loading-ring' : 'loading-ring paused'}/><p>Loading media…</p></>}</div>}<iframe key={`${embedMedia}-${retried}`} src={embedType === 'youtube' ? `https://www.youtube-nocookie.com/embed/${embedMedia}?autoplay=1&rel=0` : `https://drive.google.com/file/d/${embedMedia}/preview`} title={project.title} width="1280" height="720" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen onLoad={() => { setMediaLoaded(true); setMediaFailed(false); }} onError={() => setMediaFailed(true)}/></> : <MediaImage src={rendered} alt={project.title} priority/>}
      </div>
      {project.type === 'render' && (availableModes.length > 0 || project.renders.length > 1) && <div className="render-controls"><div role="group" aria-label="Render stage">{availableModes.map(([mode, label]) => <button key={mode} className={effectiveMode === mode ? 'selected' : ''} onClick={() => setRenderMode(mode)} aria-pressed={effectiveMode === mode}>{label}</button>)}</div>{project.renders.length > 1 && <div className="shot-controls"><button className="icon-button" aria-label="Previous shot" onClick={() => changeShot((shot - 1 + project.renders.length) % project.renders.length)}><ChevronLeft/></button><span>SHOT {shot + 1} / {project.renders.length}</span><button className="icon-button" aria-label="Next shot" onClick={() => changeShot((shot + 1) % project.renders.length)}><ChevronRight/></button></div>}</div>}
      <div className="dialog-description"><div><h2 id="dialog-title">{project.title}</h2>{project.role && <span className="accent">{project.role}</span>}<p>{project.description}</p></div>{sourceUrl && <a className="outline-button" href={sourceUrl} target="_blank" rel="noopener noreferrer">{project.type === 'website' ? 'View live / repository' : 'Open original source'}<ExternalLink size={15}/></a>}</div>
      {isVideo && <p className="embed-note">If video playback is restricted by source, click "Open original source".</p>}
    </motion.div>
  </motion.div>;
}

function App() {
  const reduced = useReducedMotion();
  const [motionOn, setMotionOn] = useState(() => { try { return localStorage.getItem('renando-motion') !== 'off'; } catch { return true; } });
  const enabled = motionOn && !reduced;
  const [project, setProject] = useState(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 28, restDelta: 0.001 });
  useEffect(() => { document.documentElement.dataset.motion = enabled ? 'on' : 'off'; }, [enabled]);
  const toggle = () => { setMotionOn(!motionOn); try { localStorage.setItem('renando-motion', motionOn ? 'off' : 'on'); } catch {} };
  const close = React.useCallback(() => setProject(null), []);

  const triggerSwarm = React.useCallback(() => {
    runSwarmRebuild(setMotionOn, motionOn);
  }, [motionOn]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'f' || e.key === 'F') {
        const tag = document.activeElement?.tagName?.toLowerCase();
        if (tag === 'input' || tag === 'textarea' || tag === 'select' || document.activeElement?.isContentEditable) {
          return;
        }
        if (document.querySelector('.project-dialog')) return;
        e.preventDefault();
        triggerSwarm();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [triggerSwarm]);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('swarm') === 'true' || params.get('swarm') === '1') {
        setTimeout(triggerSwarm, 600);
      }
    } catch {}
  }, [triggerSwarm]);

  return <MotionContext.Provider value={enabled}>
    <MotionConfig reducedMotion={enabled ? 'user' : 'always'} transition={{ ease: EASE }}>
      <a className="skip-link" href="#portfolio">Skip to projects</a>
      <motion.div className="reading-progress" style={{ scaleX: enabled ? progress : scrollYProgress }}/>
      <Header enabled={enabled} onToggle={toggle} onSwarm={triggerSwarm}/>
      <main>
        <Hero onProject={setProject}/>
        <Portfolio onProject={setProject}/>
        <Awards onProject={setProject}/>
        <Breakdown/>
        <About/>
        <Journey onProject={setProject}/>
        <Contact onProject={setProject}/>
      </main>
      <footer className="footer">
        <a className="wordmark" href="#home">YUVRAJ<span>®</span></a>
        <span>© {new Date().getFullYear()} YUVRAJ. CRAFTING DEPENDABLE SOFTWARE.</span>
        <div>
          <a href="https://github.com/yuvraj-debug" target="_blank" rel="noopener noreferrer" aria-label="GitHub yuvraj-debug"><Github size={17}/></a>
          <a href="https://www.instagram.com/yuvraj._201/" target="_blank" rel="noopener noreferrer" aria-label="Instagram yuvraj._201"><Instagram size={17}/></a>
          <a href="#home" aria-label="Back to top"><ArrowUpRight size={18}/></a>
        </div>
      </footer>
      <AnimatePresence>{project && <ProjectDialog key={project.title} project={project} onClose={close}/>}</AnimatePresence>
    </MotionConfig>
  </MotionContext.Provider>;
}

createRoot(document.getElementById('root')).render(<App/>);
