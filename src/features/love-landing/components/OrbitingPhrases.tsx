import type { CSSProperties } from "react";
import styles from "@/styles/features/love-landing/OrbitingPhrases.module.css";

type OrbitConfig = {
  duration: string;
  height: string;
  mobileLimit: number;
  showOnMobile: boolean;
  startAngle: number;
  tilt: string;
  width: string;
};

const orbitSettings: readonly OrbitConfig[] = [
  {
    width: "min(108vw, 48rem)",
    height: "min(78vw, 33rem)",
    tilt: "10deg",
    duration: "54s",
    startAngle: -84,
    showOnMobile: true,
    mobileLimit: 3,
  },
  {
    width: "min(98vw, 42rem)",
    height: "min(70vw, 28rem)",
    tilt: "-18deg",
    duration: "46s",
    startAngle: -36,
    showOnMobile: true,
    mobileLimit: 3,
  },
  {
    width: "min(88vw, 37rem)",
    height: "min(62vw, 24rem)",
    tilt: "24deg",
    duration: "38s",
    startAngle: 18,
    showOnMobile: false,
    mobileLimit: 0,
  },
  {
    width: "min(78vw, 32rem)",
    height: "min(54vw, 20rem)",
    tilt: "-30deg",
    duration: "30s",
    startAngle: 62,
    showOnMobile: false,
    mobileLimit: 0,
  },
] as const;

type OrbitingPhrasesProps = {
  phrases: readonly string[];
};

function chunkPhrases(phrases: readonly string[]) {
  const baseSize = Math.ceil(phrases.length / orbitSettings.length);
  const groups: string[][] = [];
  let startIndex = 0;

  orbitSettings.forEach((_, orbitIndex) => {
    const remaining = phrases.length - startIndex;
    const remainingOrbits = orbitSettings.length - orbitIndex;
    const size = Math.ceil(remaining / remainingOrbits) || baseSize;

    groups.push(phrases.slice(startIndex, startIndex + size));
    startIndex += size;
  });

  return groups;
}

export function OrbitingPhrases({ phrases }: OrbitingPhrasesProps) {
  const phrasesByOrbit = chunkPhrases(phrases);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      {orbitSettings.map((orbit, orbitIndex) => {
        const orbitPhrases = phrasesByOrbit[orbitIndex] ?? [];

        return (
          <div
            key={`${orbit.width}-${orbit.duration}`}
            className={`${styles.orbitShell} ${
              orbit.showOnMobile ? "" : styles.desktopOnlyOrbit
            }`}
            style={
              {
                "--orbit-width": orbit.width,
                "--orbit-height": orbit.height,
                "--orbit-tilt": orbit.tilt,
                "--orbit-duration": orbit.duration,
                "--orbit-start-angle": `${orbit.startAngle}deg`,
              } as CSSProperties
            }
          >
            <span className={styles.ring} />
            <div className={styles.orbitMotion}>
              {orbitPhrases.map((phrase, phraseIndex) => {
                const angle =
                  orbit.startAngle + (360 / orbitPhrases.length) * phraseIndex;
                const radians = (angle * Math.PI) / 180;
                const itemX = `${Math.cos(radians) * 50}%`;
                const itemY = `${Math.sin(radians) * 50}%`;
                const hideOnMobile =
                  !orbit.showOnMobile || phraseIndex >= orbit.mobileLimit;

                return (
                  <span
                    key={`${phrase}-${orbitIndex}-${phraseIndex}`}
                    className={`${styles.item} ${
                      hideOnMobile ? styles.mobileHidden : ""
                    }`}
                    style={
                      {
                        "--item-x": itemX,
                        "--item-y": itemY,
                      } as CSSProperties
                    }
                  >
                    <span className={styles.phraseText}>{phrase}</span>
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
