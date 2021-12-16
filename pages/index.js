import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
<div className={styles.container}>
<div className={styles.floatContainer}>
  <div className={styles.headerRow}>
    <span className={styles.headLogo}>Ramani</span>
    <span className={styles.headRight}>
      
      <span className={styles.headProfile}>&#x2699;</span>
    </span>
  </div>

  <div className={styles.searchRow}>
    viewof termInput
  </div>

  <div className={styles.mediaButtonsRow}>
    <span className={[styles.mediaButton,styles.selectedMediaType]}>All</span>
    <span className={styles.mediaButton}>Movies</span>
<span className={styles.mediaButton}>Podcasts</span>
    <span className={styles.mediaButton}>Music Videos</span>
<span className={styles.mediaButton}>Audiobooks</span>
    <span className={styles.mediaButton}>Short Films</span>
<span className={styles.mediaButton}>TV Shows</span>
<span className={styles.mediaButton}>Software</span>
<span className={styles.mediaButton}>Ebooks</span>
  </div>


  <div className={styles.recentsRow}>
    <span className={styles.rowTitle}>Recent Searches</span>
    <span className={styles.recentTermsRow}>
      <span className={styles.term}>Cool Movie</span>
      <span className={styles.term}>Cool Song</span>
    </span>
  </div>

  <div className={styles.cardsRow}>
    cardsHtml
  </div>

  <div className={styles.footerRow}>
   
    <span className={styles.footerButton}>&#x2661; Ramani 2021 &#x2661;</span>
  </div>

</div>
</div>
   
  )
}
