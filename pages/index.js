import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useState, useEffect, useRef } from 'react';
import useSWR from 'swr';

import countries from '../data/countries.json';

//import googleTrends from 'google-trends-api';

export default function Home() {
  const innerHeight = useRef(null); // Init viewport var here, and grab from window object in useEffect

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
  const [localStorage, setLocalStorage] = useState({
    recentSearches: [],
  });

  console.log('!!!', countries);
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

  useEffect(() => {
    innerHeight.current = window.innerHeight;
    setLocalStorage({
      recentSearches: JSON.parse(window.localStorage?.recentSearches || '[]'),
    });
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      'recentSearches',
      JSON.stringify(localStorage.recentSearches)
    );
  }, [localStorage.recentSearches]);

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

    const mediaKeys = {
      ['All']: 'all',
      ['Movies']: 'movies',
      ['Podcasts']: 'podcast',
      ['Music Videos']: 'musicVideo',
      ['Audiobooks']: 'audiobook',
      ['Short Films']: 'shortFilm',
      ['TV Shows']: 'tvShow',
      ['Software']: 'software',
      ['Ebooks']: 'ebook',
    };

    filterCopy.media = mediaKeys[media];

    // TODO: Check for valid enums on other args

    let argsArray = Object.entries(filterCopy);
    let definedArgs = argsArray.filter((entry) => entry[1]);
    let paramStr = definedArgs.map((entry) => entry.join('=')).join('&');

    const fetcher = async (url, contentType = 'text/javascript') => {
      return fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': contentType },
      }).then((res) => {
        if (contentType === 'image/jpeg') return res.blob();
        return res.json();
      });
    };

    const { data, error } = useSWR(
      `https://ohq-cors.herokuapp.com/https://itunes.apple.com/search?${paramStr}`,
      fetcher
    );

    if (data) {
      // console.log('!!', data);
      const images = data.results.map(
        (i) => `https://ohq-cors.herokuapp.com/${i.artworkUrl100}`
      );

      const Thumb = ({ src }) => {
        let { data: image } = useSWR(
          'https://ohq-cors.herokuapp.com/' + src,
          (url) => fetcher(url, 'image/jpeg')
        );
        if (!image) return <div>Loading...</div>;
        if (image.type === 'error') return <div>Error</div>;

        image = URL.createObjectURL(image);
        // console.log('!!!', image);
        return (
          <Image
            className={styles.thumb}
            src={image}
            unoptimized={true}
            alt={term}
            width={100}
            height={100}
          />
        );
      };

      return images.map((imageURL, idx) => (
        <span key={idx} className={styles.card}>
          <h2>{data.results[idx]?.trackName ?? data.results[idx]?.collectionName}</h2>
          <div><a href={data.results[idx].trackViewUrl}>
            <Thumb src={imageURL} /></a></div>
          <div className={styles.cardDesc}>
            {data.results[idx].longDescription}
          </div>

        </span>
      ));
    }
    return <div></div>;
  };

  return (
    <div
      className={styles.container}
      style={{ height: innerHeight ? innerHeight + 'px' : '100vw' }}
    >
      <div className={styles.floatContainer}>
        <div className={styles.mainContent}>
          <div className={styles.headerRow}>
            <span className={styles.headLogo}>Ramani</span>
            <span className={styles.headRight}>
              <span className={styles.headProfile}>&#x2699;</span>
            </span>
          </div>

          <div className={styles.searchRow}>
            <form>
              <input
                type="text"
                id="searchBar"
                placeholder={searchInput}
                className={styles.search}
                // onChange={(e) => setSearchInput(e.target.value)}
              />
              <select
                className={styles.select}
                value={searchFilter.country}
                onChange={(e) =>
                  setSearchFilter({ ...searchFilter, country: e.target.value })
                }
              >
                {countries.countries.map((country) => {
                  return (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  );
                })}
              </select>
              <button
                type="button"
                className={styles.searchSubmit}
                onClick={(e) => {
                  let searchTerm = document.getElementById('searchBar').value;
                  setLocalStorage({
                    ...localStorage,
                    recentSearches: [
                      ...localStorage.recentSearches.slice(0, 10),
                      searchTerm,
                    ],
                  });
                  setSearchFilter({ ...searchFilter, term: searchTerm });
                  //console.log(e.target.value);
                }}
              >
                Search
              </button>
            </form>
          </div>

          <div className={styles.mediaButtonsRow}>
            {mediaTypes.map((m) => (
              <button
                type="button"
                key={m}
                onClick={(e) => {
                  setMediaFilter(m);
                  setSearchFilter({ ...searchFilter, media: m });
                }}
                className={`${styles.mediaButton} ${
                  mediaFilter === m ? styles.selectedMediaType : ''
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className={styles.recentsRow}>
            <span className={styles.rowTitle}>Recent Searches</span>
            <span className={styles.recentTermsRow}>
              {localStorage.recentSearches.map((term) => (
                <span key={term} className={styles.term}>
                  {term}
                </span>
              ))}
            </span>
          </div>

          <div className={styles.cardsRow}>
            <span className={styles.cards}>
              <Cards /> 
            </span>
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
