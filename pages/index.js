import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

export default function Home() {
  const [isSelected, setSelected] = useState("All");
  const mediaTypes = ["All","Movies","Podcasts","Music Videos","Audiobooks", "Short Films", "TV Shows", "Software", "Ebooks"]

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
    <form>
      <input type="text" value="Paul Graham" className={styles.searchInput} />
      <button type="submit">Search</button>
    </form>
  </div>

  <div className={styles.mediaButtonsRow}>
    {mediaTypes.map(m => (<span key={m} onClick={() => setSelected(m)} className={`${styles.mediaButton} ${isSelected === m ? styles.selectedMediaType : ""}`}>{m}</span>))}
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
