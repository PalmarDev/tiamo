"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { LovePhoto } from "../content";
import styles from "@/styles/features/love-landing/PhotoCarousel.module.css";

const SLIDE_INTERVAL_MS = 4500;

type PhotoCarouselProps = {
  photos: readonly LovePhoto[];
};

export function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [failedIndexes, setFailedIndexes] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (photos.length <= 1 || reducedMotion) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % photos.length);
    }, SLIDE_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [photos.length, reducedMotion]);

  const handleImageError = (index: number) => {
    setFailedIndexes((currentIndexes) => {
      if (currentIndexes.includes(index)) {
        return currentIndexes;
      }

      return [...currentIndexes, index];
    });
  };

  return (
    <div className={styles.frame}>
      <div className={styles.innerGlow} aria-hidden="true" />
      {photos.map((photo, index) => {
        const isActive = index === activeIndex;
        const hasFailed = failedIndexes.includes(index);

        return (
          <div
            key={photo.src}
            className={`${styles.slide} ${isActive ? styles.active : ""}`}
            aria-hidden={!isActive}
          >
            {hasFailed ? (
              <div className={styles.fallback}>
                <span>Coloca aquí una de tus fotos favoritas</span>
              </div>
            ) : (
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 767px) 58vw, (max-width: 1023px) 18rem, 20rem"
                className={styles.image}
                onError={() => handleImageError(index)}
              />
            )}
          </div>
        );
      })}
      <div className={styles.frameBorder} aria-hidden="true" />
    </div>
  );
}
