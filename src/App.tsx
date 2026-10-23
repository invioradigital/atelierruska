/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { SALON_CONFIG, isSalonOpenNow } from './config';
import ReservationModal from './ReservationModal';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const currentYear = new Date().getFullYear();
  const salonStatus = isSalonOpenNow();

  const handleLinkClick = () => {
    setNavOpen(false);
  };

  const handleOpenBooking = (serviceName?: string) => {
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  };

  // Récupérer le jour actuel en français pour surligner dans les horaires
  const todayFrenchDay = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(new Date());

  return (
    <>
      {/* TOP NOTE AVEC STATUT OPEN NOW */}
      <div className="topnote">
        ATELIER RUSKA <span>✦</span> BEAUTY & SPA <span>✦</span> CASABLANCA <span>✦</span>
        <span className="inline-flex items-center gap-1.5 text-white font-semibold">
          <span className={`w-2 h-2 rounded-full inline-block ${salonStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-300'}`} />
          {salonStatus.isOpen ? 'OPEN NOW' : 'FERMÉ'} (10:00 – 20:30)
        </span>
      </div>

      {/* HEADER NAV */}
      <header className="header">
        <div className="container nav">
          <a href="#accueil" className="brand" aria-label="Atelier Ruska - Accueil">
            <img src="assets/logo.png" alt="Atelier Ruska Logo" className="brand-logo" />
            <span className="brand-title">
              Atelier Ruska
              <small className="brand-small">RUSSIAN BEAUTY & SPA</small>
            </span>
          </a>

          <nav
            className={`links ${navOpen ? 'open' : ''}`}
            id="navlinks"
            aria-label="Navigation principale"
          >
            <a href="#accueil" onClick={handleLinkClick}>Accueil</a>
            <a href="#apropos" onClick={handleLinkClick}>Notre univers</a>
            <a href="#prestations" onClick={handleLinkClick}>Prestations</a>
            <a href="#horaires" onClick={handleLinkClick}>Horaires</a>
            <a href="#galerie" onClick={handleLinkClick}>Galerie</a>
            <a href="#avis" onClick={handleLinkClick}>Avis</a>
            <a href="#contact" onClick={handleLinkClick}>Contact</a>
          </nav>

          <div className="nav-right">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleOpenBooking()}
            >
              Prendre rendez-vous ↗
            </button>
            <button
              className="menu-toggle"
              id="menuToggle"
              aria-controls="navlinks"
              aria-expanded={navOpen}
              aria-label="Ouvrir le menu"
              onClick={() => setNavOpen(!navOpen)}
            >
              {navOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="accueil">
          <div className="container hero-wrap">
            <div className="hero-copy">
              <span className="eyebrow">Beauty & Spa · Casablanca</span>
              <h1>
                La beauté,
                <br />
                <em>à votre façon.</em>
              </h1>
              <p>
                Bienvenue chez Atelier Ruska, votre parenthèse de beauté et de bien-être à Casablanca.
                Des gestes précis, un accueil chaleureux et une attention portée à chaque détail.
              </p>
              <div className="hero-actions">
                <button
                  type="button"
                  onClick={() => handleOpenBooking()}
                  className="btn btn-primary"
                >
                  Prendre rendez-vous ↗
                </button>
                <a href="#prestations" className="btn btn-outline">
                  Découvrir nos soins
                </a>
              </div>
              <div className="hero-meta">
                <div className="hero-meta-item">
                  <div className="hero-meta-head">
                    <strong className="hero-meta-val">{SALON_CONFIG.rating} / 5</strong>
                    <span className="star">★</span>
                  </div>
                  <span className="hero-meta-sub">{SALON_CONFIG.reviewsCount} avis Google*</span>
                </div>

                <div className="line" />

                <div className="hero-meta-item">
                  <div className="hero-meta-head">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${salonStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                    <strong className="hero-meta-val">{salonStatus.isOpen ? 'Open now' : 'Fermé'}</strong>
                  </div>
                  <span className="hero-meta-sub">10h00 – 20h30 (7j/7)</span>
                </div>

                <div className="line" />

                <div className="hero-meta-item hero-meta-item-city">
                  <div className="hero-meta-head">
                    <strong className="hero-meta-val">Casablanca</strong>
                  </div>
                  <span className="hero-meta-sub">Rue Ain El Aouda</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <img
                className="hero-img-main"
                src="assets/hair-waves.jpg"
                alt="Résultat coiffure Atelier Ruska"
              />
              <img
                className="hero-img-detail"
                src="assets/nails-soft.jpg"
                alt="Manucure réalisée au salon"
              />
              <div className="hero-stamp">
                L'art de
                <br />
                prendre soin
                <br />
                de vous ✧
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <div className="trustbar">
          <div className="container trust-inner">
            <div className="trust-item">
              <span className="trust-icon">✧</span>
              <strong>Beauté & Soins</strong>
              <span>Expérience complète</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✦</span>
              <strong>Manucure Russe</strong>
              <span>Finition haute précision</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">●</span>
              <strong>Ouvert 7j/7</strong>
              <span>10h00 – 20h30</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">◈</span>
              <strong>Sur Rendez-vous</strong>
              <span>WhatsApp & En ligne</span>
            </div>
          </div>
        </div>

        {/* INTRO / UNIVERS */}
        <section className="section" id="apropos">
          <div className="container intro-section">
            <div className="intro-photos">
              <img
                src="assets/hair-caramel.jpg"
                alt="Coiffure et mise en beauté"
                loading="lazy"
              />
              <img
                src="assets/nails.jpg"
                alt="Ongles manucure chez Atelier Ruska"
                loading="lazy"
              />
            </div>
            <div className="intro-copy">
              <span className="eyebrow">Notre univers</span>
              <h2>
                Un moment pour soi,
                <br />
                une beauté révélée.
              </h2>
              <p>
                Au cœur de Casablanca, Atelier Ruska vous accueille dans une atmosphère douce et
                élégante, dédiée à la beauté et à la détente.
              </p>
              <p>
                De la manucure russe aux extensions de cils, en passant par la coiffure, le hammam et
                les massages, nous imaginons chaque rendez-vous comme une parenthèse rien qu'à vous.
              </p>
              <div className="signature">Atelier Ruska ♡</div>
            </div>
          </div>
        </section>

        {/* PRESTATIONS */}
        <section className="section services-section" id="prestations">
          <div className="container">
            <div className="section-intro">
              <span className="eyebrow">Nos prestations</span>
              <h2>
                Des attentions pensées
                <br />
                pour vous
              </h2>
              <p>
                Découvrez nos univers de beauté et réservez le soin qui vous ressemble. Les tarifs et
                disponibilités sont confirmés directement par notre équipe sur WhatsApp.
              </p>
            </div>
            <div className="services-grid">
              <article className="service">
                <img
                  src="assets/nails-white.jpg"
                  alt="Manucure et pédicure russe"
                  loading="lazy"
                />
                <div className="service-body">
                  <span className="service-number">01 / BEAUTÉ DES MAINS</span>
                  <h3>Manucure & pédicure russe</h3>
                  <p>Des ongles élégants et soignés, jusque dans les moindres détails.</p>
                  <button
                    type="button"
                    onClick={() => handleOpenBooking("Manucure & pédicure russe")}
                    className="text-[#9a6754] hover:text-[#544039] font-bold text-xs uppercase tracking-wider border-b border-[#c49b89] pb-1 transition"
                  >
                    Prendre rendez-vous ↗
                  </button>
                </div>
              </article>

              <article className="service">
                <img
                  src="assets/lashes.jpg"
                  alt="Extensions de cils, brow lift et lash lift"
                  loading="lazy"
                />
                <div className="service-body">
                  <span className="service-number">02 / REGARD</span>
                  <h3>Cils & sourcils</h3>
                  <p>Extensions, lash lift et brow lift pour sublimer votre regard.</p>
                  <button
                    type="button"
                    onClick={() => handleOpenBooking("Cils & sourcils (extensions, lash/brow lift)")}
                    className="text-[#9a6754] hover:text-[#544039] font-bold text-xs uppercase tracking-wider border-b border-[#c49b89] pb-1 transition"
                  >
                    Prendre rendez-vous ↗
                  </button>
                </div>
              </article>

              <article className="service">
                <img
                  src="assets/hair-blonde.jpg"
                  alt="Coiffure, brushing et coloration"
                  loading="lazy"
                />
                <div className="service-body">
                  <span className="service-number">03 / COIFFURE</span>
                  <h3>Coiffure & brushing</h3>
                  <p>Coupes, mises en forme et coiffages selon votre style et vos envies.</p>
                  <button
                    type="button"
                    onClick={() => handleOpenBooking("Coiffure & brushing")}
                    className="text-[#9a6754] hover:text-[#544039] font-bold text-xs uppercase tracking-wider border-b border-[#c49b89] pb-1 transition"
                  >
                    Prendre rendez-vous ↗
                  </button>
                </div>
              </article>

              <article className="service">
                <img
                  src="assets/hair-dark.jpg"
                  alt="Soin capillaire et cheveux au salon"
                  loading="lazy"
                />
                <div className="service-body">
                  <span className="service-number">04 / SOIN</span>
                  <h3>Soins beauté</h3>
                  <p>Une sélection de soins pour vous accorder une vraie pause bien-être.</p>
                  <button
                    type="button"
                    onClick={() => handleOpenBooking("Soins beauté & visage")}
                    className="text-[#9a6754] hover:text-[#544039] font-bold text-xs uppercase tracking-wider border-b border-[#c49b89] pb-1 transition"
                  >
                    Prendre rendez-vous ↗
                  </button>
                </div>
              </article>

              <article className="service">
                <img
                  src="assets/nails-soft.jpg"
                  alt="Expérience détente et soin"
                  loading="lazy"
                />
                <div className="service-body">
                  <span className="service-number">05 / DÉTENTE</span>
                  <h3>Hammam & massage</h3>
                  <p>Un moment de relaxation pour retrouver équilibre et douceur.</p>
                  <button
                    type="button"
                    onClick={() => handleOpenBooking("Hammam & massage relaxant")}
                    className="text-[#9a6754] hover:text-[#544039] font-bold text-xs uppercase tracking-wider border-b border-[#c49b89] pb-1 transition"
                  >
                    Prendre rendez-vous ↗
                  </button>
                </div>
              </article>

              <article className="service">
                <img
                  src="assets/hair-layers.jpg"
                  alt="Balayage et couleur Atelier Ruska"
                  loading="lazy"
                />
                <div className="service-body">
                  <span className="service-number">06 / COLORATION</span>
                  <h3>Couleurs & balayages</h3>
                  <p>Reflets subtils, nuances lumineuses et résultats personnalisés.</p>
                  <button
                    type="button"
                    onClick={() => handleOpenBooking("Couleurs, mèches & balayages")}
                    className="text-[#9a6754] hover:text-[#544039] font-bold text-xs uppercase tracking-wider border-b border-[#c49b89] pb-1 transition"
                  >
                    Prendre rendez-vous ↗
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION BANNER (RESPONSIVE CARD) */}
        <section className="banner-section" aria-label="Réservation">
          <div className="container">
            <div className="banner-card">
              <div className="banner-content">
                <span className="eyebrow">Votre prochain rendez-vous</span>
                <h2>Accordez-vous un instant rien qu'à vous.</h2>
                <p>Un conseil, une question, une envie ? Remplissez vos coordonnées pour échanger directement sur WhatsApp.</p>
              </div>
              <div className="banner-action">
                <button
                  type="button"
                  onClick={() => handleOpenBooking()}
                  className="btn btn-light"
                >
                  Prendre rendez-vous ↗
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION HORAIRES D'OUVERTURE DÉTAILLÉE */}
        <section className="section bg-[#fbf8f5]" id="horaires">
          <div className="container">
            <div className="section-intro">
              <span className="eyebrow">Disponibilités & Salon</span>
              <h2>Horaires d'ouverture</h2>
              <div className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full text-xs font-bold bg-[#fffdfb] border border-[#e8ddd6] shadow-sm">
                <span className={`w-2.5 h-2.5 rounded-full ${salonStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <span className="text-[#302923]">{salonStatus.isOpen ? 'Open now' : 'Fermé actuellement'}</span>
                <span className="text-[#756962] font-normal">({salonStatus.nextInfo})</span>
              </div>
            </div>

            <div className="max-w-2xl mx-auto bg-[#fffdfb] rounded-2xl p-3.5 sm:p-8 border border-[#e8ddd6] shadow-sm">
              <div className="divide-y divide-[#f0dfd6]">
                {SALON_CONFIG.schedules.map((item) => {
                  const isToday = todayFrenchDay.toLowerCase().startsWith(item.day.toLowerCase().slice(0, 3));
                  return (
                    <div
                      key={item.day}
                      className={`py-3 px-3 sm:px-4 rounded-xl flex items-center justify-between gap-2 transition-colors ${
                        isToday ? 'bg-[#f7ede7] font-semibold text-[#302923]' : 'text-[#544039]'
                      }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <span className="text-sm font-medium">{item.day}</span>
                        {isToday && (
                          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#9a6754] text-white font-bold shrink-0">
                            Aujourd'hui
                          </span>
                        )}
                      </div>
                      <div className="text-right whitespace-nowrap shrink-0">
                        <span className="text-sm sm:text-[15px] font-serif font-medium text-[#302923] tracking-tight">
                          {item.hours}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-[#e8ddd6] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#756962] text-center sm:text-left m-0">
                  Ouvert 7 jours sur 7. Prise de rendez-vous recommandée.
                </p>
                <button
                  type="button"
                  onClick={() => handleOpenBooking()}
                  className="btn btn-primary text-xs py-3 px-5 w-full sm:w-auto"
                >
                  Prendre rendez-vous ↗
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* GALERIE */}
        <section className="section" id="galerie">
          <div className="container">
            <div className="section-intro">
              <span className="eyebrow">Notre galerie</span>
              <h2>
                Le détail fait toute
                <br />
                la différence.
              </h2>
              <p>Quelques réalisations partagées par Atelier Ruska sur Instagram.</p>
            </div>
            <div className="gallery-grid">
              <div className="item large">
                <img src="assets/hair-waves.jpg" alt="Coiffure wavy" loading="lazy" />
                <span className="gallery-label">COIFFURE</span>
              </div>
              <div className="item">
                <img src="assets/nails-soft.jpg" alt="Ongles nude" loading="lazy" />
              </div>
              <div className="item">
                <img src="assets/lashes.jpg" alt="Extension de cils" loading="lazy" />
              </div>
              <div className="item">
                <img src="assets/hair-blonde.jpg" alt="Balayage blond" loading="lazy" />
              </div>
              <div className="item">
                <img src="assets/nails-white.jpg" alt="Manucure élégante" loading="lazy" />
              </div>
              <div className="item">
                <img src="assets/hair-layers.jpg" alt="Balayage et coiffage soigné" loading="lazy" />
              </div>
              <div className="item">
                <img src="assets/hair-dark.jpg" alt="Manucure russe immaculée" loading="lazy" />
              </div>
              <div className="item">
                <img src="assets/nails.jpg" alt="Nail art" loading="lazy" />
              </div>
              <div className="item">
                <img src="assets/hair-caramel.jpg" alt="Coiffure bouclée" loading="lazy" />
              </div>
            </div>
            <div className="center" style={{ marginTop: '34px' }}>
              <a
                className="btn btn-outline"
                href={SALON_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Plus de photos sur Instagram ↗
              </a>
            </div>
          </div>
        </section>

        {/* AVIS */}
        <section className="section reviews" id="avis">
          <div className="container">
            <div className="section-intro">
              <span className="eyebrow">Vos expériences</span>
              <h2>
                Vos mots, notre plus
                <br />
                belle récompense.
              </h2>
              <p className="star" style={{ fontSize: '17px' }}>
                ★★★★★ <span style={{ color: '#756962', fontSize: '13px' }}>{SALON_CONFIG.rating} / 5 · {SALON_CONFIG.reviewsCount} avis Google*</span>
              </p>
            </div>
            <div className="reviews-grid">
              <div className="review">
                <div className="quote">“</div>
                <p>« Un travail magnifique sur les ongles, un salon propre et un accueil attentionné. »</p>
                <div className="review-bottom">
                  Fadoua A. <span>★★★★★</span>
                </div>
              </div>
              <div className="review">
                <div className="quote">“</div>
                <p>« Tout était parfait : l'accueil, la propreté, le professionnalisme et la gentillesse. »</p>
                <div className="review-bottom">
                  Lina D. <span>★★★★★</span>
                </div>
              </div>
              <div className="review">
                <div className="quote">“</div>
                <p>« Un résultat élégant, un travail minutieux et une grande attention aux détails. »</p>
                <div className="review-bottom">
                  Houda B. <span>★★★★★</span>
                </div>
              </div>
            </div>
            <p style={{ textAlign: 'center', fontSize: '11px', margin: '24px 0 0' }}>
              * Note et nombre d'avis issus des informations fournies pour la maquette, à actualiser avant publication. Témoignages reformulés pour le prototype.
            </p>
          </div>
        </section>

        {/* CONTACT & HORAIRES */}
        <section className="section" id="contact">
          <div className="container contact-section">
            <div>
              <span className="eyebrow">On se retrouve ?</span>
              <h2>
                Votre parenthèse beauté
                <br />
                commence ici.
              </h2>
              <p>
                Une question sur nos prestations ou envie de prendre rendez-vous ? Contactez
                directement l'équipe Atelier Ruska ou renseignez notre formulaire.
              </p>
              
              <div className="contact-facts">
                <div className="fact">
                  <div className="fact-icon">⌖</div>
                  <div>
                    <strong>Notre adresse</strong>
                    <span>{SALON_CONFIG.address}</span>
                  </div>
                </div>

                <div className="fact">
                  <div className="fact-icon">⏱</div>
                  <div className="w-full">
                    <div className="flex items-center gap-2 flex-wrap">
                      <strong>Horaires</strong>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${salonStatus.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${salonStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                        {salonStatus.isOpen ? 'Open now' : 'Fermé'}
                      </span>
                    </div>
                    <span>{SALON_CONFIG.generalHoursText}</span>
                  </div>
                </div>

                <div className="fact">
                  <div className="fact-icon">✆</div>
                  <div>
                    <strong>Par téléphone</strong>
                    <span>
                      <a href={`tel:${SALON_CONFIG.phoneCall}`}>{SALON_CONFIG.phoneDisplay}</a>
                    </span>
                  </div>
                </div>

                <div className="fact">
                  <div className="fact-icon">✧</div>
                  <div>
                    <strong>Sur WhatsApp</strong>
                    <span>
                      <a
                        href={`https://wa.me/${SALON_CONFIG.whatsappNumber}?text=${encodeURIComponent("Bonjour Atelier Ruska, je souhaite échanger avec vous.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#9a6754] hover:underline font-medium text-left inline-block"
                      >
                        {SALON_CONFIG.whatsappDisplay} (Chat direct)
                      </a>
                    </span>
                  </div>
                </div>

                <div className="fact">
                  <div className="fact-icon">◎</div>
                  <div>
                    <strong>Instagram</strong>
                    <span>
                      <a
                        href={SALON_CONFIG.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {SALON_CONFIG.instagramHandle}
                      </a>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 flex-wrap mt-6">
                <a
                  href={SALON_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Voir l'itinéraire ↗
                </a>
                <button
                  type="button"
                  onClick={() => handleOpenBooking()}
                  className="btn btn-primary"
                >
                  Prendre rendez-vous ↗
                </button>
              </div>
            </div>

            <div className="contact-visual">
              <img
                src="assets/hair-caramel.jpg"
                alt="Atelier Ruska Casablanca"
                loading="lazy"
              />
              <div className="contact-card">
                <img src="assets/logo.png" alt="Atelier Ruska Logo" className="contact-card-logo" />
                <span className="eyebrow">Beauty & Spa</span>
                <h3>À très bientôt.</h3>
                <p>Choisissez votre prestation et renseignez vos coordonnées pour bloquer votre créneau.</p>
                <button
                  type="button"
                  onClick={() => handleOpenBooking()}
                  className="btn btn-primary"
                >
                  Prendre rendez-vous ↗
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-row">
            <div>
              <div className="brand">
                <img src="assets/logo.png" alt="Atelier Ruska Logo" className="brand-logo" />
                <span className="brand-title">
                  Atelier Ruska
                  <small className="brand-small">RUSSIAN BEAUTY & SPA</small>
                </span>
              </div>
              <p>L'art de prendre soin de soi, avec délicatesse et savoir-faire, à Casablanca.</p>
              <p className="text-xs text-[#a69488] mt-2">
                Horaires : Tous les jours (Lundi – Dimanche) de 10h00 à 20h30.
              </p>
            </div>
            <nav className="footer-nav" aria-label="Navigation de bas de page">
              <a href="#apropos">Notre univers</a>
              <a href="#prestations">Prestations</a>
              <a href="#horaires">Horaires</a>
              <a href="#galerie">Galerie</a>
              <a href="#contact">Contact</a>
              <a
                href={SALON_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram ↗
              </a>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>© <span id="year">{currentYear}</span> Atelier Ruska. Tous droits réservés.</span>
            <span>Prototype de présentation · Réalisé par INVIORA DIGITAL</span>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON (SENDS DIRECTLY TO WHATSAPP WITHOUT POPUP) */}
      <a
        className="wa-floating"
        href={`https://wa.me/${SALON_CONFIG.whatsappNumber}?text=${encodeURIComponent("Bonjour Atelier Ruska, je souhaite échanger avec vous.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter Atelier Ruska sur WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.52 3.49A11.85 11.85 0 0 0 12.06 0 11.89 11.89 0 0 0 1.81 17.93L.1 24l6.24-1.64a11.85 11.85 0 0 0 5.71 1.46h.01c6.55 0 11.88-5.33 11.89-11.88a11.8 11.8 0 0 0-3.43-8.45ZM12.06 21.8a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.73.98.99-3.64-.23-.37a9.9 9.9 0 1 1 8.36 4.62Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.03-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.66-1.6-.9-2.18-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.48.7.3 1.24.47 1.67.6.7.22 1.34.19 1.85.11.56-.08 1.76-.72 2-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
        </svg>
      </a>

      {/* PROTOTYPE BADGE */}
      <div className="prototype">
        MAQUETTE DE PRÉSENTATION
        <br />
        Visuels & contenu à valider
      </div>

      {/* MODAL DE RÉSERVATION */}
      <ReservationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={selectedService}
      />
    </>
  );
}
