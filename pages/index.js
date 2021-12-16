import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

const [isActive, setActive] = useState(true);
const mediaTypes = ["All","Movies","Podcasts","Music Videos","Audiobooks", "Short Films", "TV Shows", "Software", "Ebooks"]

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
    ${mediaTypes.map(m => ( <span onClick={() => setActive(m)} className={`${styles.mediaButton} ${selected === m ? styles.selectedMediaType : ""}`}>${m}</span>))}
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
