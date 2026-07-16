"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const photos = [
  {
    src: "/images/momento-01.webp",
    alt: "Dos manos entrelazadas bajo la luz cálida del atardecer",
    eyebrow: "Nuestro lugar seguro",
    title: "Donde todo se siente hogar",
  },
  {
    src: "/images/momento-02.webp",
    alt: "Una pareja contemplando las luces durante el atardecer",
    eyebrow: "Tú, yo y el tiempo",
    title: "Cada momento contigo",
  },
  {
    src: "/images/momento-03.webp",
    alt: "Una carta de amor junto a rosas y luz de velas",
    eyebrow: "Lo que aún nos espera",
    title: "Todo lo que nos falta por vivir",
  },
  {
    src: "/images/love/photo-1.jpg",
    alt: "Recuerdo 01 de Gabriel y Aydelin",
    eyebrow: "Nuestra historia",
    title: "Un recuerdo que siempre quiero guardar",
  },
  {
    src: "/images/love/photo-2.jpg",
    alt: "Recuerdo 02 de Gabriel y Aydelin",
    eyebrow: "Nuestra historia",
    title: "Un recuerdo que siempre quiero guardar",
  },
  {
    src: "/images/love/photo-3.jpg",
    alt: "Recuerdo 03 de Gabriel y Aydelin",
    eyebrow: "Nuestra historia",
    title: "Un recuerdo que siempre quiero guardar",
  },
  {
    src: "/images/love/photo-4.jpg",
    alt: "Recuerdo 04 de Gabriel y Aydelin",
    eyebrow: "Nuestra historia",
    title: "Un recuerdo que siempre quiero guardar",
  },
  {
    src: "/images/love/photo-5.jpg",
    alt: "Recuerdo 05 de Gabriel y Aydelin",
    eyebrow: "Nuestra historia",
    title: "Un recuerdo que siempre quiero guardar",
  },
  {
    src: "/images/love/photo-6.jpg",
    alt: "Recuerdo 06 de Gabriel y Aydelin",
    eyebrow: "Nuestra historia",
    title: "Un recuerdo que siempre quiero guardar",
  },
  {
    src: "/images/love/photo-7.jpg",
    alt: "Recuerdo 07 de Gabriel y Aydelin",
    eyebrow: "Nuestra historia",
    title: "Un recuerdo que siempre quiero guardar",
  },
  {
    src: "/images/love/photo-8.jpg",
    alt: "Recuerdo 08 de Gabriel y Aydelin",
    eyebrow: "Nuestra historia",
    title: "Un recuerdo que siempre quiero guardar",
  },
  {
    src: "/images/love/photo-9.jpg",
    alt: "Recuerdo 09 de Gabriel y Aydelin",
    eyebrow: "Nuestra historia",
    title: "Un recuerdo que siempre quiero guardar",
  },
  {
    src: "/images/love/photo-10.jpg",
    alt: "Recuerdo 10 de Gabriel y Aydelin",
    eyebrow: "Nuestra historia",
    title: "Un recuerdo que siempre quiero guardar",
  },
  {
    src: "/images/love/photo-11.jpg",
    alt: "Recuerdo 11 de Gabriel y Aydelin",
    eyebrow: "Nuestra historia",
    title: "Un recuerdo que siempre quiero guardar",
  },
  {
    src: "/images/love/photo-12.jpg",
    alt: "Recuerdo 12 de Gabriel y Aydelin",
    eyebrow: "Nuestra historia",
    title: "Un recuerdo que siempre quiero guardar",
  },
  {
    src: "/images/love/photo-13.jpg",
    alt: "Recuerdo 13 de Gabriel y Aydelin",
    eyebrow: "Nuestra historia",
    title: "Un recuerdo que siempre quiero guardar",
  },
  {
    src: "/images/love/photo-14.jpg",
    alt: "Recuerdo 14 de Gabriel y Aydelin",
    eyebrow: "Nuestra historia",
    title: "Un recuerdo que siempre quiero guardar",
  },
  {
    src: "/images/love/photo-15.jpg",
    alt: "Recuerdo 15 de Gabriel y Aydelin",
    eyebrow: "Nuestra historia",
    title: "Un recuerdo que siempre quiero guardar",
  },
  {
    src: "/images/love/photo-16.jpg",
    alt: "Recuerdo 16 de Gabriel y Aydelin",
    eyebrow: "Nuestra historia",
    title: "Un recuerdo que siempre quiero guardar",
  },
];

const phrases = [
  { text: "Contigo, hasta lo cotidiano se vuelve especial.", ring: "outer", start: "2%" },
  { text: "Tu risa sigue siendo mi lugar favorito.", ring: "outer", start: "26%" },
  { text: "Elegirte es la parte más bonita de mis días.", ring: "outer", start: "52%" },
  { text: "Quiero seguir guardando momentos a tu lado.", ring: "outer", start: "76%" },
  { text: "Gracias por llegar y quedarte.", ring: "inner", start: "10%" },
  { text: "Somos calma, aventura y hogar.", ring: "inner", start: "36%" },
  { text: "Te amo en los días simples y en los inolvidables.", ring: "inner", start: "62%" },
  { text: "Mi futuro siempre se ve mejor contigo.", ring: "inner", start: "86%" },
];

const AUTOPLAY_MS = 5600;

export default function Home() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerStart = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    setActive((index + photos.length) % photos.length);
  }, []);

  const next = useCallback(() => {
    setActive((current) => (current + 1) % photos.length);
  }, []);

  const previous = useCallback(() => {
    setActive((current) => (current - 1 + photos.length) % photos.length);
  }, []);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [next, paused]);

  function handlePointerDown(event: React.PointerEvent) {
    pointerStart.current = event.clientX;
  }

  function handlePointerUp(event: React.PointerEvent) {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;

    if (Math.abs(distance) < 45) return;
    if (distance > 0) {
      previous();
    } else {
      next();
    }
  }

  return (
    <main id="inicio" className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="site-header">
        <a className="monogram" href="#inicio" aria-label="Ir al inicio">
          <span>G</span>
          <i aria-hidden="true">♥</i>
          <span>A</span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#momentos">Momentos</a>
          <a href="#mensaje">Para ti</a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="kicker"><span /> Nuestra historia, en pequeños instantes</p>
          <h1 id="hero-title">
            Hay personas que se sienten como
            <em> volver a casa.</em>
          </h1>
          <p className="hero-lead">
            Este rincón guarda un poco de nosotros: las miradas, las risas y
            todos esos momentos que hacen que elegirte siga siendo tan fácil.
          </p>
          <a className="primary-action" href="#momentos">
            Recorrer nuestra historia
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="hero-side" aria-hidden="true">
          <span className="vertical-note">PARA RECORDAR SIEMPRE</span>
          <div className="year-seal">
            <span>G + A</span>
            <small>∞</small>
          </div>
        </div>
      </section>

      <section id="momentos" className="moments" aria-labelledby="moments-title">
        <div className="section-intro">
          <p className="section-number">01</p>
          <div>
            <p className="kicker"><span /> Instantes que se quedan</p>
            <h2 id="moments-title">Nuestro pequeño universo</h2>
          </div>
          <p className="section-note">
            Desliza, usa las flechas o deja que los recuerdos avancen solos.
          </p>
        </div>

        <div className="orbit-stage">
          <div className="orbit-line orbit-line-outer" aria-hidden="true" />
          <div className="orbit-line orbit-line-inner" aria-hidden="true" />

          <div className="desktop-phrases" aria-label="Frases de amor">
            {phrases.map((phrase, index) => (
              <p
                className={`orbit-phrase orbit-phrase-${phrase.ring}`}
                key={phrase.text}
                style={{
                  "--start": phrase.start,
                  "--delay": `${index * -0.75}s`,
                } as React.CSSProperties}
              >
                <span aria-hidden="true">♥</span> {phrase.text}
              </p>
            ))}
          </div>

          <div
            className="carousel"
            role="region"
            aria-roledescription="carrusel"
            aria-label="Nuestros momentos"
            aria-live="polite"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
            }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => { pointerStart.current = null; }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") next();
              if (event.key === "ArrowLeft") previous();
            }}
            tabIndex={0}
          >
            <div className="photo-frame">
              {photos.map((photo, index) => (
                <figure
                  key={photo.src}
                  className={`photo-slide ${index === active ? "is-active" : ""}`}
                  aria-hidden={index !== active}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.src} alt={index === active ? photo.alt : ""} draggable={false} />
                  <figcaption>
                    <span>{photo.eyebrow}</span>
                    <strong>{photo.title}</strong>
                  </figcaption>
                </figure>
              ))}

              <div className="photo-shine" aria-hidden="true" />
              <span className="slide-count" aria-hidden="true">
                0{active + 1} <i /> 0{photos.length}
              </span>
            </div>

            <div className="carousel-controls">
              <button type="button" onClick={previous} aria-label="Ver foto anterior">←</button>
              <div className="carousel-dots" aria-label="Elegir una foto">
                {photos.map((photo, index) => (
                  <button
                    type="button"
                    key={photo.src}
                    className={index === active ? "is-active" : ""}
                    onClick={() => goTo(index)}
                    aria-label={`Ver foto ${index + 1}: ${photo.title}`}
                    aria-current={index === active ? "true" : undefined}
                  >
                    <span />
                  </button>
                ))}
              </div>
              <button type="button" onClick={next} aria-label="Ver foto siguiente">→</button>
            </div>
          </div>
        </div>

        <div className="mobile-phrases" aria-label="Frases de amor">
          <div className="mobile-phrase-track">
            {[...phrases, ...phrases].map((phrase, index) => (
              <span key={`${phrase.text}-${index}`} aria-hidden={index >= phrases.length}>
                <i aria-hidden="true">♥</i> {phrase.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="mensaje" className="love-note" aria-labelledby="note-title">
        <div className="note-meta">
          <p className="section-number">02</p>
          <span>Una nota para ti</span>
        </div>
        <div className="note-card">
          <p className="quote-mark" aria-hidden="true">“</p>
          <h2 id="note-title">
            No necesito que cada día sea perfecto. Solo quiero que sigamos
            encontrándonos, eligiéndonos y construyendo algo bonito a nuestra manera.
          </h2>
          <p>
            Gracias por hacer de los días sencillos recuerdos que quiero conservar.
            Por todo lo vivido y por cada aventura que todavía nos espera.
          </p>
          <div className="signature">
            <span>Con todo mi amor,</span>
            <strong>Gabriel</strong>
          </div>
        </div>
      </section>

      <footer>
        <p>Hecho para Aydelin, con amor y un poquito de magia.</p>
        <a href="#inicio">Volver arriba <span aria-hidden="true">↑</span></a>
      </footer>
    </main>
  );
}
