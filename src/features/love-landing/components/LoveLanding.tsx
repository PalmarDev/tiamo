import { loveLandingContent } from "../content";
import { OrbitingPhrases } from "./OrbitingPhrases";
import { PhotoCarousel } from "./PhotoCarousel";
import styles from "@/styles/features/love-landing/LoveLanding.module.css";

export function LoveLanding() {
  const { title, subtitle, photos, phrases } = loveLandingContent;

  return (
    <main className={styles.page}>
      <div className={styles.backgroundGlow} aria-hidden="true" />
      <section className={styles.hero} aria-labelledby="love-landing-title">
        <p className={styles.eyebrow}>Un universo para nosotros</p>
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
      </section>
    </main>
  );
}
