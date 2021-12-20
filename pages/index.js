import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

export default function Home() {
  let innerHeight = null; // Init viewport var here, and grab from window object in useEffect

  const [mediaFilter, setMediaFilter] = useState('All');
  const [searchInput, setSearchInput] = useState('Paul Graham'); // TODO: Random trending item on landing
  const [searchFilter, setSearchFilter] = useState({
    term: 'Paul Graham',
    country: 'US',
    media: mediaFilter,
    entity: null,
    attribute: null,
    callback: null,
    limit: 10,
    lang: 'en-us',
    version: 2,
    explicit: 'yes',
  });

  const [searchResults, setSearchResults] = useState({ results: [] });

  const mediaTypes = [
    'All',
    'Movies',
    'Podcasts',
    'Music Videos',
    'Audiobooks',
    'Short Films',
    'TV Shows',
    'Software',
    'Ebooks',
  ];

  useEffect(() => (innerHeight = window.innerHeight));

  const Cards = () => {
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
      explicit,
    } = searchFilter;

    let filterCopy = { ...searchFilter };

    // Term and country are required
    // Optional params default to null
    if (!term || !country)
      console.log('Term and Country are required parameters');

    filterCopy.term = term.toLowerCase().replace(/\s/g, '%20');
    filterCopy.media = (() => {
      // Bunch of string mutations to get the media type the apple api expects... all, musicVideo, etc...
      let mutableMedia = [media[0].toLowerCase(), ...media.slice(1)]
        .join('')
        .replace(' ', '');
      if (mutableMedia[mutableMedia.length - 1] === 's')
        mutableMedia = media.slice(0, -1);
      return mutableMedia;
    })();;

    // TODO: Check for valid enums on other args

    let argsArray = Object.entries(filterCopy);
    let definedArgs = argsArray.filter((entry) => entry[1]);
    let paramStr = definedArgs.map((entry) => entry.join('=')).join('&');

    const fetcher = async (url) => {
      return fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'text/plain' },
      }).then(async (res) => {
        //let out = await res.json();
        return res;
      });
    };

    const response = useSWR(
      `https://ohq-cors.herokuapp.com/https://itunes.apple.com/search?${paramStr}`,
      fetcher
    );
    let { data = [], error } = response;
    return <div style={{ color: 'red' }}>{JSON.stringify(response.data)}</div>;

    if (error)
      return (
        <div style={{ color: 'red' }}>
          Failed to load results {JSON.stringify(response)} {error.message}
          {paramStr}
        </div>
      );
    if (!data.length) return <div style={{ color: 'yellow' }}>loading...</div>;
    return <div style={{ color: 'red' }}>{typeof data}</div>;
    // return data.map((item, idx) => (
    //   <span key={idx} className={styles.card}>
    //     <Image className={styles.thumb} src={item.artworkUrl100} />
    //   </span>
    // ));
  };

  return (
    <div
      className={styles.container}
      style={{ height: innerHeight ? innerHeight + 'px' : '100vw' }}
    >
      <div className={styles.floatContainer}>
        <div className={styles.headerRow}>
          <span className={styles.headLogo}>Ramani</span>
          <span className={styles.headRight}>
            <span className={styles.headProfile}>&#x2699;</span>
          </span>
        </div>

        <div className={styles.searchRow}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchFilter({ ...searchFilter, term: searchInput });
            }}
          >
            <input
              type="text"
              value={searchInput}
              className={styles.search}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className={styles.searchSubmit}>
              Search
            </button>
          </form>
        </div>

        <div className={styles.mediaButtonsRow}>
          {mediaTypes.map((m) => (
            <span
              key={m}
              onClick={() => setMediaFilter(m)}
              className={`${styles.mediaButton} ${
                mediaFilter === m ? styles.selectedMediaType : ''
              }`}
            >
              {m}
            </span>
          ))}
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
            ${innerHeight}
            <Cards search={searchInput} />
          </div>
        </div>

        <div className={styles.footerRow}>
          <span className={styles.footerButton}>
            &#x2661; Ramani 2021 &#x2661;
          </span>
        </div>
      </div>
    </div>
  );
}
