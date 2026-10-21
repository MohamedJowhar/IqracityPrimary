import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import {
  ArrowDown,
  ArrowRight,
  BusFront,
  BookOpen,
  BookOpenCheck,
  Check,
  ChevronRight,
  Facebook,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Instagram,
  Lightbulb,
  Languages,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MoonStar,
  Phone,
  Quote,
  ShieldCheck,
  Sprout,
  Target,
  Trophy,
  Youtube,
  X,
} from 'lucide-react'
import { campuses, copy, gallery, sampleNews, school } from './data.js'

const pagePaths = ['/', '/about', '/academics', '/admissions', '/news', '/gallery', '/contact']
const valueIcons = [MoonStar, BookOpenCheck, Handshake, ShieldCheck, Lightbulb, Sprout]
const whyChooseIcons = [BookOpenCheck, GraduationCap, ShieldCheck, Lightbulb, Trophy, HeartHandshake]
const academicStageIcons = [BookOpen, BookOpenCheck, GraduationCap]
const pageTitles = {
  en: ['Iqra City School', 'About us', 'Academics', 'Admissions', 'News & events', 'Gallery', 'Contact us'],
  so: ['Iqra City School', 'Nagu saabsan', 'Waxbarashada', 'Isdiiwaangelinta', 'Wararka iyo munaasabadaha', 'Sawirrada', 'Nala soo xiriir'],
}
const pageDescriptions = {
  en: [
    'Discover Iqra City Primary & Secondary School and explore our learning community.',
    'Learn about Iqra City School, its story, vision and learning community.',
    'Explore primary and secondary learning at Iqra City School.',
    'Find admissions information and learn how to enquire with Iqra City School.',
    'Read school notices, sample announcements and events from Iqra City School.',
    'Browse illustrative school-life photographs for Iqra City School.',
    'Find contact information and send an enquiry to Iqra City School.',
  ],
  so: [
    'Baro Dugsiga Iqra City ee Hoose iyo Sare iyo bulshadeenna waxbarasho.',
    'Baro Dugsiga Iqra City, taariikhdiisa, himiladiisa iyo bulshadiisa waxbarasho.',
    'Baro waxbarashada hoose iyo sare ee Dugsiga Iqra City.',
    'Hel xogta isdiiwaangelinta iyo sida su’aal loo weydiisto Dugsiga Iqra City.',
    'Akhri ogeysiisyada dugsiga, wararka tusaalaha ah iyo munaasabadaha.',
    'Eeg sawirro tusaale ah oo muujinaya nolosha dugsiga.',
    'Hel xogta xiriirka oo su’aal u dir Dugsiga Iqra City.',
  ],
}

function getSavedLanguage() {
  try {
    const saved = window.localStorage.getItem('iqra-city-language')
    return saved === 'so' ? 'so' : 'en'
  } catch {
    return 'en'
  }
}

function getWhatsappUrl() {
  const number = school.whatsapp.replace(/\D/g, '')
  return number ? `https://wa.me/${number}` : ''
}

function getPhoneUrl() {
  const number = school.phone.replace(/\D/g, '')
  if (!number) return ''
  const internationalNumber = number.startsWith('0') ? `252${number.slice(1)}` : number
  return `tel:+${internationalNumber}`
}

function getFormattedPhoneNumber() {
  const number = school.phone.replace(/\D/g, '').replace(/^0/, '')
  return number ? `+252 ${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5)}` : ''
}

function Brand({ language }) {
  return (
    <Link className="brand" to="/" aria-label={`${school.fullName} — ${copy[language].home}`}>
      {school.logoAvailable && (
        <img className="brand__logo" src={school.logoPath} alt={school.fullName} />
      )}
      <span className="brand__copy">
        <span className="brand__name">{school.name}</span>
        <span className="brand__subtitle">{copy[language].brandSubtitle}</span>
      </span>
    </Link>
  )
}

function LanguageSwitch({ language, setLanguage }) {
  return (
    <div className="language-switch" aria-label="Choose website language">
      {['en', 'so'].map((code) => (
        <button
          aria-pressed={language === code}
          className={language === code ? 'language-switch__active' : ''}
          key={code}
          onClick={() => setLanguage(code)}
          type="button"
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

function Header({ language, setLanguage, t }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const whatsApp = getWhatsappUrl()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 8)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="utility-bar">
        <div className="container utility-bar__inner">
          <span className="utility-bar__note">{t.footerNote}</span>
          <div className="utility-bar__actions">
            <LanguageSwitch language={language} setLanguage={setLanguage} />
            {whatsApp ? (
              <a className="utility-whatsapp" href={whatsApp} rel="noreferrer" target="_blank">
                <Phone size={15} aria-hidden="true" />
                {t.whatsapp}
              </a>
            ) : (
              <span className="utility-whatsapp utility-whatsapp--missing" aria-label={t.whatsappMissing} title={t.whatsappMissing}>
                <Phone size={15} aria-hidden="true" />
                {t.whatsappMissing}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="container nav-row">
        <Brand language={language} />
        <button
          aria-expanded={open}
          aria-label={open ? t.closeMenu : t.menu}
          className="menu-toggle"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
        <nav aria-label={t.exploreLabel} className={`main-nav${open ? ' main-nav--open' : ''}`}>
          {pagePaths.map((path, index) => (
            <NavLink
              className={({ isActive }) => `main-nav__link${isActive ? ' main-nav__link--active' : ''}`}
              end={path === '/'}
              key={path}
              to={path}
            >
              {t.nav[index]}
            </NavLink>
          ))}
          <div className="mobile-nav-language">
            <LanguageSwitch language={language} setLanguage={setLanguage} />
          </div>
        </nav>
      </div>
    </header>
  )
}

function FloatingWhatsApp({ t }) {
  const whatsappUrl = getWhatsappUrl()
  if (!whatsappUrl) return null

  return (
    <a
      aria-label={t.whatsapp}
      className="floating-whatsapp"
      href={whatsappUrl}
      rel="noreferrer"
      target="_blank"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path d="M16.04 3.2A12.72 12.72 0 0 0 5.1 22.43L3.3 28.8l6.53-1.71A12.75 12.75 0 1 0 16.04 3.2Zm0 23.2a10.4 10.4 0 0 1-5.3-1.45l-.38-.22-3.87 1.02 1.03-3.77-.25-.39a10.42 10.42 0 1 1 8.77 4.81Zm5.72-7.8c-.31-.16-1.83-.91-2.11-1.01-.28-.1-.49-.16-.7.16-.21.31-.8 1.01-.98 1.22-.18.21-.36.23-.67.08-.31-.16-1.31-.49-2.5-1.55-.92-.82-1.55-1.83-1.73-2.14-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.69-.96-2.31-.25-.6-.5-.52-.7-.53l-.6-.01c-.21 0-.55.08-.83.39-.28.31-1.09 1.06-1.09 2.58s1.12 2.99 1.27 3.2c.16.21 2.2 3.36 5.33 4.71.75.32 1.33.51 1.79.65.75.24 1.43.21 1.97.13.6-.09 1.83-.75 2.09-1.48.26-.73.26-1.35.18-1.48-.08-.13-.28-.21-.6-.36Z" />
      </svg>
      <span className="floating-whatsapp__tooltip">{t.whatsapp}</span>
    </a>
  )
}

function Footer({ language, t }) {
  const socials = [
    { label: 'Facebook', Icon: Facebook, href: school.socials.facebook },
    { label: 'Instagram', Icon: Instagram, href: school.socials.instagram },
    { label: 'YouTube', Icon: Youtube, href: school.socials.youtube },
  ]
  const activeSocials = socials.filter(({ href }) => href)
  const schoolLocation = language === 'so' ? school.addressSo : school.address
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(school.address)}`

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Brand language={language} />
          <p>{t.footerNote}</p>
        </div>
        <div className="footer-column">
          <h2 className="footer-heading">{t.quickLinks}</h2>
          <div className="footer-links">
            {pagePaths.map((path, index) => (
              <Link key={path} to={path}>{t.nav[index]}</Link>
            ))}
          </div>
        </div>
        <div className="footer-column">
          <h2 className="footer-heading">{t.getInTouch}</h2>
          <div className="footer-contact-list">
            {school.email ? (
              <a className="footer-contact-link" href={`mailto:${school.email}`}><Mail size={17} />{school.email}</a>
            ) : (
              <span className="footer-contact-link footer-contact-link--muted"><Mail size={17} />{t.notConfigured}</span>
            )}
            {getPhoneUrl() && (
              <a className="footer-contact-link" href={getPhoneUrl()}><Phone size={17} />{school.phone}</a>
            )}
            {getWhatsappUrl() && (
              <a className="footer-contact-link" href={getWhatsappUrl()} rel="noreferrer" target="_blank">
                <MessageCircle size={17} />{t.whatsapp}
              </a>
            )}
            {schoolLocation && (
              <a className="footer-contact-link" href={mapUrl} rel="noreferrer" target="_blank">
                <MapPin size={17} />{schoolLocation}
              </a>
            )}
            <Link className="footer-contact-link" to="/contact"><ArrowRight size={17} />{t.contactLabel}</Link>
          </div>
        </div>
        <div className="footer-column">
          <h2 className="footer-heading">{t.followUs}</h2>
          {activeSocials.length === 0 && <p className="footer-contact-placeholder">{t.socialMissing}</p>}
          <div aria-label={t.followUs} className="social-links">
            {activeSocials.map(({ label, Icon, href }) => (
              <a aria-label={label} href={href} key={label} rel="noreferrer" target="_blank"><Icon size={18} /></a>
            ))}
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {school.fullName}. {t.footerRights}</span>
        <span>{language === 'so' ? 'Luqadda:' : 'Language:'} {language.toUpperCase()}</span>
      </div>
    </footer>
  )
}

function PlaceholderNotice({ t }) {
  return <div className="placeholder-notice"><span aria-hidden="true">i</span>{t.placeholderNotice}</div>
}

function PageIntro({ eyebrow, title, text, t }) {
  return (
    <section className="page-intro">
      <div className="container page-intro__inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-intro__lead">{text}</p>
        <PlaceholderNotice t={t} />
      </div>
    </section>
  )
}

function Picture({ item, language, className = '' }) {
  return (
    <img
      alt={item.alt[language]}
      className={`editorial-image ${className}`}
      loading="lazy"
      src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=1000&q=78`}
    />
  )
}

function NewsCards({ language, t, compact = false }) {
  return (
    <div className={`news-grid${compact ? ' news-grid--compact' : ''}`}>
      {sampleNews.map((item, index) => (
        <article className="news-card" key={item.title.en}>
          <div className={`news-card__image news-card__image--${index + 1}`} aria-hidden="true">
            <BookOpen size={29} strokeWidth={1.5} />
          </div>
          <div className="news-card__body">
            <div className="news-card__meta"><span>{item.date[language]}</span><span>{item.tag[language]}</span></div>
            <h3>{item.title[language]}</h3>
            <p>{item.description[language]}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

function ValuesCards({ t }) {
  return (
    <div className="values-grid values-grid--about">
      {t.valueCards.map((value, index) => {
        const Icon = valueIcons[index]
        return (
          <article className="value-card value-card--about" key={value.title}>
            <div className="value-card__topline">
              <span className="value-card__icon" aria-hidden="true"><Icon size={23} strokeWidth={1.8} /></span>
              <span className="value-card__number">0{index + 1}</span>
            </div>
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </article>
        )
      })}
    </div>
  )
}

function WhyChooseCards({ t }) {
  return (
    <div className="values-grid values-grid--about">
      {t.whyChooseCards.map((item, index) => {
        const Icon = whyChooseIcons[index]
        return (
          <article className="value-card value-card--about" key={item.title}>
            <div className="value-card__topline">
              <span className="value-card__icon" aria-hidden="true"><Icon size={23} strokeWidth={1.8} /></span>
              <span className="value-card__number">0{index + 1}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        )
      })}
    </div>
  )
}

function GalleryGrid({ language, preview = false }) {
  const images = preview ? gallery.slice(0, 3) : gallery
  return (
    <div className={`gallery-grid${preview ? ' gallery-grid--preview' : ''}`}>
      {images.map((item, index) => (
        <figure className={`gallery-item gallery-item--${index + 1}`} key={item.image}>
          <Picture item={item} language={language} />
          <figcaption>
            <span>{item.caption[language]}</span>
            <small>{language === 'so' ? 'Sawir tusaale ah' : 'Illustrative stock photo'}</small>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

function Home({ language, t }) {
  const heroImage = {
    alt: {
      en: 'Students reading the Qur’an together in their classroom.',
      so: 'Arday si wadajir ah Qur’aanka ugu akhrinaya fasalkooda.',
    },
  }
  return (
    <>
      <section className="hero">
        <div className="hero__photo-wrap">
          <img
            alt={heroImage.alt[language]}
            className="hero__photo"
            decoding="async"
            height="417"
            src="/images/hero%20image.jpg"
            width="735"
          />
        </div>
        <div className="hero__shade" />
        <div className="container hero__content">
          <p className="eyebrow eyebrow--light"><span />{t.heroEyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero__intro">{t.heroIntro}</p>
          <div className="hero__actions">
            <Link className="button button--green" to="/about">{t.explore}<ArrowRight size={17} /></Link>
            <Link className="button button--outline" to="/admissions">{t.admissionInfo}<ChevronRight size={17} /></Link>
          </div>
        </div>
        <a className="hero__discover" href="#welcome"><ArrowDown size={15} />{t.scroll}</a>
      </section>

      <section className="welcome-section section" id="welcome">
        <div className="container welcome-grid">
          <div className="welcome-copy">
            <p className="eyebrow">{t.aboutEyebrow}</p>
            <h2>{t.welcomeTitle}</h2>
            <p className="body-copy">{t.welcomeText}</p>
            <Link className="text-link" to="/about">{t.explore}<ArrowRight size={16} /></Link>
          </div>
          <div className="welcome-card">
            <div className="welcome-card__mark" aria-hidden="true">“</div>
            <p>{t.welcomeText}</p>
            <div className="welcome-card__author">
              <span className="author-mark"><GraduationCap size={20} /></span>
              <span><strong>{t.welcomeName}</strong><small>{t.welcomeRole}</small></span>
            </div>
          </div>
        </div>
      </section>

      <section className="school-video-section section section--soft" aria-labelledby="school-video-title">
        <div className="container school-video-layout">
          <div className="school-video-copy">
            <p className="eyebrow">{t.schoolVideoEyebrow}</p>
            <h2 id="school-video-title">{t.schoolVideoTitle}</h2>
            <p className="body-copy">{t.schoolVideoText}</p>
          </div>
          <video aria-label={t.schoolVideoTitle} className="school-video" controls playsInline preload="metadata">
            <source src={school.videoPath} type="video/mp4" />
            <a href={school.videoPath}>{t.schoolVideoFallback}</a>
          </video>
        </div>
      </section>

      <section className="campuses-section section" aria-labelledby="campuses-title">
        <div className="container campuses-layout">
          <div className="campuses-copy">
            <p className="eyebrow">{t.campusesEyebrow}</p>
            <h2 id="campuses-title">{t.campusesTitle}</h2>
            <h3>{t.campusesLeadTitle}</h3>
            <p>{t.campusesText}</p>
            <p className="campuses-closing">{t.campusesClosing}</p>
            <Link className="button button--green" to="/contact">{t.campusesCta}<ArrowRight size={17} /></Link>
          </div>
          <div className="campuses-list">
            {campuses.map((campus, index) => (
              <article className="campus-card" key={campus}>
                <span className="campus-card__icon"><MapPin size={21} /></span>
                <span className="campus-card__name">{campus}</span>
                <span className="campus-card__number">0{index + 1}</span>
              </article>
            ))}
            <p className="campuses-city">{language === 'so' ? 'Muqdisho, Soomaaliya' : 'Mogadishu, Somalia'}</p>
          </div>
        </div>
      </section>

      <section className="ministry-section section" aria-labelledby="ministry-title">
        <div className="container ministry-card">
          <div className="ministry-card__seal">
            <img src={school.ministryLogoPath} alt={t.ministryLogoAlt} loading="lazy" />
          </div>
          <div className="ministry-card__content">
            <p className="eyebrow">{t.ministryEyebrow}</p>
            <h2 id="ministry-title">{t.ministryTitle}</h2>
            <p className="ministry-card__description">{t.ministryText}</p>
            <div className="ministry-card__identity">
              <strong>{t.ministryName}</strong>
              <span>{t.ministryCountry}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="learning-section section section--soft">
        <div className="container">
          <div className="section-heading section-heading--split">
            <div><p className="eyebrow">{t.learningEyebrow}</p><h2>{t.learningTitle}</h2></div>
            <Link className="text-link" to="/academics">{t.learnMore}<ArrowRight size={16} /></Link>
          </div>
          <div className="learning-grid">
            <article className="learning-card learning-card--primary">
              <div className="learning-card__icon"><BookOpen size={25} /></div>
              <p className="learning-card__level">01 / {language === 'so' ? 'HEERKA KOOWAAD' : 'FOUNDATION YEARS'}</p>
              <h3>{t.primary}</h3><p>{t.primaryText}</p>
              <Link className="card-link" to="/academics">{t.learnMore}<ArrowRight size={16} /></Link>
            </article>
            <article className="learning-card learning-card--secondary">
              <div className="learning-card__icon"><GraduationCap size={26} /></div>
              <p className="learning-card__level">02 / {language === 'so' ? 'HEERKA SARE' : 'SECONDARY YEARS'}</p>
              <h3>{t.secondary}</h3><p>{t.secondaryText}</p>
              <Link className="card-link" to="/academics">{t.learnMore}<ArrowRight size={16} /></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="language-learning-section section" aria-labelledby="language-learning-title">
        <div className="container language-learning-layout">
          <div className="language-learning-copy">
            <p className="eyebrow">{t.languageLearningEyebrow}</p>
            <h2 id="language-learning-title">{t.languageLearningTitle}</h2>
            <h3>{t.languageLearningLeadTitle}</h3>
            <p>{t.languageLearningText}</p>
            <p>{t.languageLearningApproach}</p>
            <p className="language-learning-cta">{t.languageLearningCta}</p>
            <Link className="text-link" to="/academics">{t.learnMore}<ArrowRight size={16} /></Link>
          </div>
          <div className="language-list">
            <p className="language-list__label">{t.languageLearningLabel}</p>
            {t.languages.map((item, index) => (
              <article className="language-card" key={item.name}>
                <span className="language-card__icon"><Languages size={20} /></span>
                <span className="language-card__copy"><strong>{item.name}</strong><small>{item.text}</small></span>
                <span className="language-card__number">0{index + 1}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="transport-section section section--soft" aria-labelledby="transport-title">
        <div className="container transport-layout">
          <span className="transport-icon" aria-hidden="true"><BusFront size={34} /></span>
          <div className="transport-copy">
            <p className="eyebrow">{t.transportEyebrow}</p>
            <h2 id="transport-title">{t.transportTitle}</h2>
            <h3>{t.transportLeadTitle}</h3>
            <p>{t.transportText}</p>
            <p className="transport-copy__cta">{t.transportCta}</p>
            <p className="transport-copy__contact">{t.transportContact}</p>
          </div>
          <Link className="button button--green transport-button" to="/contact">{t.transportButton}<ArrowRight size={17} /></Link>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-heading section-heading--center values-heading">
            <p className="eyebrow">{t.whyChooseEyebrow}</p>
            <h2>{t.whyChooseTitle}</h2>
            <p className="body-copy">{t.whyChooseText}</p>
          </div>
          <WhyChooseCards t={t} />
        </div>
      </section>

      <section className="highlights-section section" aria-labelledby="highlights-heading">
        <div className="container">
          <div className="section-heading section-heading--center values-heading">
            <p className="eyebrow">{t.highlightsEyebrow}</p>
            <h2 id="highlights-heading">{t.highlightsTitle}</h2>
            <p className="body-copy">{t.highlightsText}</p>
          </div>
          <div className="highlights-grid">
            {t.highlightCards.map((item) => (
              <article className="highlight-card" key={item.label}>
                <p className="highlight-card__number">{item.number}</p>
                <h3>{item.label}</h3>
                <p className="highlight-card__description">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="values-section section">
        <div className="container">
          <div className="section-heading section-heading--center">
            <p className="eyebrow">{t.valuesEyebrow}</p><h2>{t.valuesTitle}</h2><p className="body-copy">{t.valuesText}</p>
          </div>
          <ValuesCards t={t} />
        </div>
      </section>

      <section className="testimonials-section section section--soft" aria-labelledby="testimonials-title">
        <div className="container">
          <div className="section-heading section-heading--center values-heading">
            <p className="eyebrow">{t.testimonialsEyebrow}</p>
            <h2 id="testimonials-title">{t.testimonialsTitle}</h2>
          </div>
          <div className="testimonials-grid">
            {t.testimonials.map((item, index) => (
              <article className="testimonial-card" key={item.title}>
                <div className="testimonial-card__topline">
                  <span className="testimonial-card__icon"><Quote size={21} /></span>
                  <span className="testimonial-card__number">0{index + 1}</span>
                </div>
                <h3>{item.title}</h3>
                <blockquote>{item.quote}</blockquote>
                <p className="testimonial-card__author">{item.by}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-heading section-heading--split">
            <div><p className="eyebrow">{t.newsEyebrow}</p><h2>{t.newsTitle}</h2></div>
            <Link className="text-link" to="/news">{t.viewAll}<ArrowRight size={16} /></Link>
          </div>
          <NewsCards language={language} t={t} compact />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading section-heading--split">
            <div><p className="eyebrow">{t.galleryEyebrow}</p><h2>{t.galleryTitle}</h2></div>
            <Link className="text-link" to="/gallery">{t.galleryAll}<ArrowRight size={16} /></Link>
          </div>
          <GalleryGrid language={language} preview />
        </div>
      </section>
      <ContactCta t={t} />
    </>
  )
}

function ContactCta({ t }) {
  return (
    <section className="contact-cta">
      <div className="container contact-cta__inner">
        <div><p className="eyebrow eyebrow--light">{t.contactEyebrow}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p></div>
        <Link className="button button--green" to="/contact">{t.contactButton}<ArrowRight size={17} /></Link>
      </div>
    </section>
  )
}

function AboutPage({ language, t }) {
  return (
    <>
      <PageIntro eyebrow={t.aboutEyebrow} title={t.aboutTitle} text={t.aboutLead} t={t} />
      <section className="section">
        <div className="container about-layout">
          <div className="about-photo"><Picture item={gallery[1]} language={language} /><span>{t.imageNote}</span></div>
          <div className="about-story">
            <p className="eyebrow">{t.historyTitle}</p><h2>{t.welcomeTitle}</h2><p className="body-copy">{t.historyText}</p>
            <div className="story-note"><Check size={18} /><p>{t.placeholderNotice}</p></div>
          </div>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container">
          <div className="section-heading section-heading--center direction-heading">
            <p className="eyebrow">{t.directionEyebrow}</p>
            <h2>{t.directionTitle}</h2>
          </div>
          <div className="vision-grid">
          {[['01', t.visionTitle, t.visionText], ['02', t.missionTitle, t.missionText]].map(([num, title, text]) => (
            <article className={`vision-card vision-card--${num === '01' ? 'vision' : 'mission'}`} key={num}>
              <div className="vision-card__topline"><span className="vision-card__icon">{num === '01' ? <Target size={24} /> : <HeartHandshake size={24} />}</span><span className="vision-card__number">{num}</span></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container about-values">
          <div className="section-heading section-heading--center values-heading">
            <p className="eyebrow">{t.valuesEyebrow}</p>
            <h2>{t.valuesTitlePage}</h2>
            <p className="body-copy">{t.valuesPageText}</p>
          </div>
          <ValuesCards t={t} />
        </div>
      </section>
      <section className="section">
        <div className="container principal-message">
          <span className="principal-message__icon"><GraduationCap size={27} /></span>
          <div><p className="eyebrow">{t.principalTitle}</p><h2>{t.welcomeName}</h2><p className="body-copy">{t.principalText}</p></div>
        </div>
      </section>
    </>
  )
}

function AcademicsPage({ t }) {
  return (
    <>
      <PageIntro eyebrow={t.learningEyebrow} title={t.academicTitle} text={t.academicLead} t={t} />
      <section className="section">
        <div className="container">
          <div className="academic-stages-grid">
            {t.academicStages.map((stage, index) => {
              const Icon = academicStageIcons[index]
              return (
                <article className={`academic-stage-card academic-stage-card--${index + 1}`} key={stage.title}>
                  <div className="academic-stage-card__topline">
                    <span className="academic-stage-card__icon"><Icon size={24} strokeWidth={1.8} /></span>
                    <span className="academic-stage-card__number">0{index + 1}</span>
                  </div>
                  <h2>{stage.title}</h2>
                  <p>{stage.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>
      <section className="section religious-education-section">
        <div className="container religious-education">
          <figure className="religious-education__figure">
            <img
              src="/images/quran-manuscript.jpg"
              alt={t.religiousEducationImageAlt}
              width="1280"
              height="890"
              loading="lazy"
              decoding="async"
            />
            <figcaption>{t.religiousEducationImageCaption}</figcaption>
          </figure>
          <div className="religious-education__copy">
            <span className="religious-education__icon"><BookOpenCheck size={24} strokeWidth={1.8} /></span>
            <p className="eyebrow">{t.learningEyebrow}</p>
            <h2>{t.religiousEducationTitle}</h2>
            <p>{t.religiousEducationText}</p>
          </div>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container subjects-layout">
          <div><p className="eyebrow">{t.subjectsEyebrow}</p><h2>{t.subjectsTitle}</h2><p className="body-copy">{t.subjectsText}</p></div>
          <ul className="subject-list">{t.subjectNames.map((subject) => <li key={subject}><Check size={17} />{subject}</li>)}</ul>
        </div>
      </section>
      <section className="section">
        <div className="container approach-card"><span className="approach-card__icon"><BookOpen size={25} /></span><div><p className="eyebrow">{t.learningEyebrow}</p><h2>{t.approachTitle}</h2><p>{t.approachText}</p></div><Link className="text-link" to="/contact">{t.contactButton}<ArrowRight size={16} /></Link></div>
      </section>
    </>
  )
}

function AdmissionsPage({ t }) {
  return (
    <>
      <PageIntro eyebrow={t.admissionInfo} title={t.admissionsTitle} text={t.admissionsLead} t={t} />
      <section className="section">
        <div className="container admissions-layout">
          <div><p className="eyebrow">{t.admissionStepsTitle}</p><h2>{t.admissionStepsTitle}</h2>
            <div className="admission-steps">{t.admissionSteps.map((step, index) => <article className="admission-step" key={step.title}><span>{`0${index + 1}`}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div>
          </div>
          <aside className="requirements-card"><span className="requirements-card__icon"><GraduationCap size={24} /></span><h2>{t.requirementsTitle}</h2><p>{t.requirementsText}</p><Link className="button button--green" to="/contact">{t.admissionsCta}<ArrowRight size={17} /></Link></aside>
        </div>
      </section>
    </>
  )
}

function NewsPage({ language, t }) {
  return <><PageIntro eyebrow={t.newsEyebrow} title={t.newsTitlePage} text={t.newsLead} t={t} /><section className="section"><div className="container"><NewsCards language={language} t={t} /></div></section></>
}

function GalleryPage({ language, t }) {
  return <><PageIntro eyebrow={t.galleryEyebrow} title={t.galleryTitlePage} text={t.galleryLead} t={t} /><section className="section"><div className="container"><GalleryGrid language={language} /></div></section></>
}

function ContactPage({ language, t }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('')
  const schoolLocation = language === 'so' ? school.addressSo : school.address
  const contactItems = [
    { id: 'email', Icon: Mail, value: school.email || t.notConfigured },
    { id: 'whatsapp', Icon: MessageCircle, value: `${t.whatsappLabel} ${getFormattedPhoneNumber()}`.trim(), href: getWhatsappUrl(), external: true },
    { id: 'address', Icon: MapPin, value: schoolLocation || t.notConfigured },
  ]

  function updateForm(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    setStatus('')
  }

  function submitForm(event) {
    event.preventDefault()
    const formElement = event.currentTarget
    if (!formElement.reportValidity()) {
      setStatus('invalid')
      return
    }
    if (![form.name, form.email, form.subject, form.message].every((value) => value.trim())) {
      setStatus('invalid')
      return
    }

    const channel = event.nativeEvent.submitter?.value
    const message = [
      `${t.nameLabel}: ${form.name.trim()}`,
      `${t.emailField}: ${form.email.trim()}`,
      `${t.subjectLabel}: ${form.subject.trim()}`,
      '',
      form.message.trim(),
    ].join('\n')

    if (channel === 'whatsapp') {
      const whatsappUrl = getWhatsappUrl()
      if (!whatsappUrl) {
        setStatus('invalid')
        return
      }
      window.open(`${whatsappUrl}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
      setStatus('whatsapp-ready')
      return
    }

    if (channel === 'email' && school.email) {
      const emailUrl = `mailto:${school.email}?subject=${encodeURIComponent(form.subject.trim())}&body=${encodeURIComponent(message)}`
      window.open(emailUrl, '_blank', 'noopener,noreferrer')
      setStatus('email-ready')
      return
    }

    setStatus('invalid')
  }

  return (
    <>
      <PageIntro eyebrow={t.contactEyebrow} title={t.contactTitlePage} text={t.contactLead} t={t} />
      <section className="section">
        <div className="container contact-layout">
          <div className="contact-details">
            <p className="eyebrow">{t.getInTouch}</p><h2>{t.contactTitle}</h2>
            <div className="contact-list">{contactItems.map(({ id, Icon, value, href, external }) => <div className="contact-item" key={id}><span className="contact-item__icon"><Icon size={20} /></span>{href ? <a className="contact-item__value" href={href} rel={external ? 'noreferrer' : undefined} target={external ? '_blank' : undefined}><strong>{value}</strong></a> : <strong className="contact-item__text">{value}</strong>}</div>)}</div>
          </div>
          <form className="contact-form" onSubmit={submitForm} noValidate>
            <h2>{t.formTitle}</h2>
            <label>{t.nameLabel}<input autoComplete="name" name="name" onChange={updateForm} placeholder={t.namePlaceholder} required value={form.name} /></label>
            <label>{t.emailField}<input autoComplete="email" name="email" onChange={updateForm} placeholder={t.emailPlaceholder} required type="email" value={form.email} /></label>
            <label>{t.subjectLabel}<input name="subject" onChange={updateForm} placeholder={t.subjectPlaceholder} required value={form.subject} /></label>
            <label>{t.messageLabel}<textarea name="message" onChange={updateForm} placeholder={t.messagePlaceholder} required rows="5" value={form.message} /></label>
            {status && <p className={`form-status form-status--${status}`} role="status">
              {status === 'invalid' ? t.formRequired : status === 'whatsapp-ready' ? t.whatsappReady : t.emailReady}
            </p>}
            <div className="contact-form__actions">
              <button className="button button--whatsapp" type="submit" value="whatsapp"><MessageCircle size={18} />{t.sendWhatsapp}</button>
              <button className="button button--email" type="submit" value="email"><Mail size={18} />{t.sendEmail}</button>
            </div>
            <p className="form-disclaimer">{t.sendDisclaimer}</p>
          </form>
        </div>
      </section>
    </>
  )
}

function NotFound({ t }) {
  return <section className="page-intro not-found"><div className="container"><p className="eyebrow">404</p><h1>{t.notFoundTitle}</h1><Link className="button button--green" to="/">{t.backHome}<ArrowRight size={17} /></Link></div></section>
}

export default function App() {
  const [language, setLanguage] = useState(getSavedLanguage)
  const location = useLocation()
  const t = copy[language]

  useEffect(() => {
    try {
      window.localStorage.setItem('iqra-city-language', language)
    } catch {
      // The selected language still works for this session when storage is unavailable.
    }
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    const pathIndex = Math.max(pagePaths.indexOf(location.pathname), 0)
    document.title = `${pageTitles[language][pathIndex]} | ${school.fullName}`
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', pageDescriptions[language][pathIndex])
  }, [language, location.pathname])

  useEffect(() => {
    const targets = document.querySelectorAll(
      '#main-content .hero__content, #main-content .page-intro__inner, #main-content > section:not(.page-intro)',
    )
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.setAttribute('data-reveal', 'visible'))
      return undefined
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.setAttribute('data-reveal', 'visible')
        currentObserver.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })

    targets.forEach((target) => {
      target.setAttribute('data-reveal', 'pending')
      observer.observe(target)
    })

    return () => observer.disconnect()
  }, [location.pathname])

  return (
    <>
      <a className="skip-link" href="#main-content">{t.skip}</a>
      <Header language={language} setLanguage={setLanguage} t={t} />
      <main id="main-content">
        <Routes>
          <Route element={<Home language={language} t={t} />} path="/" />
          <Route element={<AboutPage language={language} t={t} />} path="/about" />
          <Route element={<AcademicsPage t={t} />} path="/academics" />
          <Route element={<AdmissionsPage t={t} />} path="/admissions" />
          <Route element={<NewsPage language={language} t={t} />} path="/news" />
          <Route element={<GalleryPage language={language} t={t} />} path="/gallery" />
          <Route element={<ContactPage language={language} t={t} />} path="/contact" />
          <Route element={<NotFound t={t} />} path="*" />
        </Routes>
      </main>
      <FloatingWhatsApp t={t} />
      <Footer language={language} t={t} />
    </>
  )
}
