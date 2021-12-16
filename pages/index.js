import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'


export default function Home() {
  const [mediaFilter, setMediaFilter] = useState("All");
  const [searchFilter, setSearchFilter] = useState({
                                                    term: null,
                                                    country: "US",
                                                    media: mediaFilter, 
                                                    entity: null,
                                                    attribute: null,
                                                    callback: null,
                                                    limit: 10,
                                                    lang: "en-us",
                                                    version: 2,
                                                    explicit: "yes"
                                                   });

  const [searchResults, setSearchResults] = useState({results: []});

  const mediaTypes = ["All","Movies","Podcasts","Music Videos","Audiobooks", "Short Films", "TV Shows", "Software", "Ebooks"]
  
  useEffect(() => {
  let {
    term,
    country,
    media,
    entity,
    attribute,
    callback,
    limit,
    lang,
    version,
    explicit
  } = searchFilter;

  // Term and country are required
  // Optional params default to null
  if (!term || !country)
    return { error: "Term and Country are required parameters." };

  term = term.toLowerCase().replace(/\s/g,"")
  // TODO: Check for valid enums on other args

  let argsArray = Object.entries(params);
  let definedArgs = argsArray.filter(entry => entry[1]);
  let paramStr = definedArgs.map(entry => entry.join("=")).join("&");

  let response = (async () => await fetch(
    `https://itunes.apple.com/search?${paramStr}`
  ).then(res => res.json()))();

  setSearchResults(response);
 
  }, [mediaFilter, searchFilter])

  const Cards = ({data}) => data.map((item,idx) =>  (
    <span key={idx} className={styles.card}>
    <img className={styles.thumb} src={item.artworkUrl100} />
    </span>));

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
      <input type="text" value={(searchFilter.term ?? "Paul Graham")} onSubmit={(e)=>{e.preventDefault(); setSearchFilter({...searchFilter, term: e.target.value})}} className={styles.search} />
      <button type="submit" className={styles.searchButton} >Search</button>
    </form>
  </div>

  <div className={styles.mediaButtonsRow}>
    {mediaTypes.map(m => (<span key={m} onClick={() => setMediaFilter(m)} className={`${styles.mediaButton} ${mediaFilter === m ? styles.selectedMediaType : ""}`}>{m}</span>))}
   </div>


  <div className={styles.recentsRow}>
    <span className={styles.rowTitle}>Recent Searches</span>
    <span className={styles.recentTermsRow}>
      <span className={styles.term}>Cool Movie</span>
      <span className={styles.term}>Cool Song</span>
    </span>
  </div>

  <div className={styles.cardsRow}>
    <div className={styles.cards}>
      <Cards data={searchResults.results}/>
    </div>
  </div>

  <div className={styles.footerRow}>
   
    <span className={styles.footerButton}>&#x2661; Ramani 2021 &#x2661;</span>
  </div>

</div>
</div>
   
  )
}
