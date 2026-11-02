import Image from "next/image";
import { IstanbulDate, IstanbulTime } from "@/components/IstanbulClock";
import { site } from "@/lib/site";
import logo from "@/public/brand/heyula-logo.png";
import styles from "./page.module.css";

// "[" bracket from the design (26 × 76, 1px stroke). The right one is the same shape rotated 180°.
function Bracket({ className }: { className: string }) {
  return (
    <svg
      className={className}
      width="26"
      height="76"
      viewBox="0 0 26 76"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M26 0.5H0.5V75.5H26" stroke="currentColor" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <IstanbulDate className={`${styles.navItem} ${styles.date}`} />
        <div className={styles.navRight}>
          <IstanbulTime className={`${styles.navItem} ${styles.time}`} />
          <span className={`${styles.navItem} ${styles.location}`}>{site.location.display}</span>
        </div>
      </header>

      <main className={styles.main}>
        <p className={styles.notice} role="status">
          <Bracket className={`${styles.bracket} ${styles.bracketLeft}`} />
          <span className={styles.noticeText}>This website is currently under construction.</span>
          <Bracket className={`${styles.bracket} ${styles.bracketRight}`} />
        </p>

        <section className={styles.hero} aria-labelledby="brand">
          <h1 id="brand" className={styles.logo}>
            <Image
              src={logo}
              alt={site.name}
              className={styles.logoImage}
              sizes="(max-width: 640px) 75vw, 465px"
              preload
            />
          </h1>
          <p className={styles.tagline}>{site.tagline}</p>
        </section>
      </main>

      <footer className={styles.footer}>
        <a className={styles.contact} href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </footer>
    </div>
  );
}
