import { loveLandingContent } from "../content";
import { OrbitingPhrases } from "./OrbitingPhrases";
import { PhotoCarousel } from "./PhotoCarousel";
import styles from "@/styles/features/love-landing/LoveLanding.module.css";

export function LoveLanding() {
  const { eyebrow, title, subtitle, photos, phrases, dedication } = loveLandingContent;

  return (
    <main className={styles.page}>
      <div className={styles.backgroundGlow} aria-hidden="true" />
      <section className={styles.hero} aria-labelledby="love-landing-title">
        <p className={styles.eyebrow}>{eyebrow}</p>
        <header className={styles.copy}>
          <h1 id="love-landing-title" className={styles.title}>
            {title}
          </h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </header>
        <div className={styles.universe}>
          <OrbitingPhrases phrases={phrases} />
          <PhotoCarousel photos={photos} />
          <div className={styles.coreGlow} aria-hidden="true" />
        </div>
        <div className={styles.mobilePhrases} aria-label="Frases para Aydelin">
          {phrases.slice(0, 8).map((phrase) => (
            <span key={phrase}>{phrase}</span>
          ))}
        </div>
      </section>
      <section className={styles.dedication} aria-labelledby="dedication-title">
        <span className={styles.heart} aria-hidden="true">♥</span>
        <p className={styles.dedicationEyebrow}>Para ti, mi amor</p>
        <h2 id="dedication-title">{dedication.title}</h2>
        <p>{dedication.body}</p>
        <strong>{dedication.signature}</strong>
      </section>
    </main>
  );
}
