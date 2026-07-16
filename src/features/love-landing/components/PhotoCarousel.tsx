"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, TouchEvent } from "react";
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
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + photos.length) % photos.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % photos.length);
  };

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
    if (photos.length <= 1 || reducedMotion || isPaused) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % photos.length);
    }, SLIDE_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [photos.length, reducedMotion, isPaused]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      showPrevious();
    }
    if (event.key === "ArrowRight") {
      showNext();
    }
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(distance) > 45) {
      if (distance > 0) {
        showPrevious();
      } else {
        showNext();
      }
    }
    touchStartX.current = null;
  };

  const handleImageError = (index: number) => {
    setFailedIndexes((currentIndexes) => {
      if (currentIndexes.includes(index)) {
        return currentIndexes;
      }

      return [...currentIndexes, index];
    });
  };

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-label="Nuestros recuerdos"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={handleTouchEnd}
    >
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
      <button
        className={`${styles.arrow} ${styles.previous}`}
        onClick={showPrevious}
        aria-label="Foto anterior"
      >
        ‹
      </button>
      <button
        className={`${styles.arrow} ${styles.next}`}
        onClick={showNext}
        aria-label="Foto siguiente"
      >
        ›
      </button>
      <div
        className={styles.dots}
        aria-label={`Foto ${activeIndex + 1} de ${photos.length}`}
      >
        {photos.map((photo, index) => (
          <button
            key={`dot-${photo.src}`}
            className={index === activeIndex ? styles.activeDot : ""}
            onClick={() => setActiveIndex(index)}
            aria-label={`Ver foto ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
