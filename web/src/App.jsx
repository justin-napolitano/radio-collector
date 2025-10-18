import React, { useEffect, useMemo, useRef, useState } from 'react'

function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial } catch { return initial }
  })
  useEffect(() => { localStorage.setItem(key, JSON.stringify(state)) }, [key, state])
  return [state, setState]
}

async function apiSearch({ q, country = '', codec = '', order = 'clickcount', limit = 50 }) {
  const params = new URLSearchParams()
  if (q) params.set('name', q)
  if (country) params.set('country', country)
  if (codec) params.set('codec', codec)
  params.set('order', order)
  params.set('limit', String(limit))
  params.set('hidebroken', 'true')
  const res = await fetch(`/api/stations/search?${params.toString()}`)
  return res.json()
}

export default function App() {
  const [query, setQuery] = useState('lofi')
  const [stations, setStations] = useState([])
  const [current, setCurrent] = useState(null)
  const [favorites, setFavorites] = useLocalStorage('rc_favs', [])
  const audioRef = useRef(null)

  useEffect(() => { performSearch() }, [])

  async function performSearch() {
    const data = await apiSearch({ q: query })
    setStations(data)
  }

  function toggleFav(st) {
    const exists = favorites.some(f => f.stationuuid === st.stationuuid)
    if (exists) setFavorites(favorites.filter(f => f.stationuuid !== st.stationuuid))
    else setFavorites([{ stationuuid: st.stationuuid, name: st.name, url: st.url_resolved || st.url, favicon: st.favicon, codec: st.codec, bitrate: st.bitrate, country: st.country }, ...favorites].slice(0, 200))
  }

  function play(st) {
    setCurrent(st)
    const url = st.url_resolved || st.url
    if (audioRef.current) {
      audioRef.current.src = url
      audioRef.current.play().catch(() => {})
    }
  }

  const isFav = (st) => favorites.some(f => f.stationuuid === st.stationuuid)

  return (
    <div className="container">
      <header className="header">
        <span className="brand">🎧 Radio Collector</span>
        <span className="badge">Ad-free client</span>
      </header>

      <div className="searchbar">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search stations (e.g., jazz, NPR, techno)…"
          onKeyDown={e => e.key === 'Enter' && performSearch()}
          style={{ flex: 1 }}
        />
        <button onClick={performSearch}>Search</button>
      </div>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
        {stations.map(st => (
          <div className="station" key={st.stationuuid}>
            <img src={st.favicon || 'https://dummyimage.com/48x48/1e1e22/ffffff.png&text=♫'} alt="" />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <strong>{st.name}</strong>
                {st.country && <span className="badge">{st.country}</span>}
                {st.codec && <span className="badge">{st.codec}</span>}
                {st.bitrate ? <span className="badge">{st.bitrate} kbps</span> : null}
              </div>
              <div className="meta">{st.language || ''}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => play(st)}>Play</button>
              <button onClick={() => toggleFav(st)}>{isFav(st) ? '★' : '☆'}</button>
            </div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 16 }}>
        <h3>Favorites</h3>
        <div style={{ display: 'grid', gap: 8 }}>
          {favorites.map(st => (
            <div className="station" key={st.stationuuid}>
              <img src={st.favicon || 'https://dummyimage.com/48x48/1e1e22/ffffff.png&text=★'} alt="" />
              <div>
                <div><strong>{st.name}</strong> {st.country && <span className="badge">{st.country}</span>}</div>
                <div className="meta">{st.codec || ''} {st.bitrate ? `· ${st.bitrate} kbps` : ''}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => play(st)}>Play</button>
                <button onClick={() => setFavorites(favorites.filter(f => f.stationuuid !== st.stationuuid))}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="playbar">
        <audio ref={audioRef} controls preload="none" style={{ width: '100%' }} />
      </div>
    </div>
  )
}
