import { useEffect, useRef, useState } from "react";
import "./styles.css";

function Heading({ title }) {
  return <h1>{title}</h1>;
}

function SongPlayer({
  showControls = false,
  song,
  songfor,
  ...remainingAudioProps
}) {
  const audioRef = useRef();
  const audioRefform = useRef();
  var [showControls, setshow] = useState(false);

  const { audioUrlform, coverUrlform } = songfor;
  const { audioUrl, coverUrl } = song;
  console.log(audioRef, audioRefform);
  return (
    <section className="SongPlayer">
      <Heading title="Music Player" />
      <img width="250" height="250" src={coverUrl} alt="Song cover" />
      <audio
        ref={audioRef}
        key={audioUrl}
        controls={showControls}
        {...remainingAudioProps}
      >
        <source src={audioUrl} />
      </audio>

      <audio ref={audioRefform} key={audioUrlform}>
        <source src={audioUrlform} />
      </audio>
      <div>
        <button onClick={() => audioRefform.current.play()}>former</button>
        <button onClick={() => audioRef.current.play()}>Play</button>
        <button onClick={() => audioRef.current.pause()}>Pause</button>
        <button onClick={() => setshow(!showControls)}>hide/show</button>
      </div>
    </section>
  );
}
function SongListItem({ song, isCurrent, onSelect }) {
  function handleClick() {
    onSelect(song);
  }
  return (
    <li
      className={`SongListItem ${isCurrent ? "selected" : ""}`}
      onClick={handleClick}
    >
      {song.title} by {song.artist}
    </li>
  );
}
function Songs({ children }) {
  return <section className="Songs">{children}</section>;
}

export default function App() {
  const URL = "https://examples.devmastery.pl/songs-api/songs";
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    fetch(URL).then((response) => {
      if (response.ok) {
        response.json().then(setSongs);
      }
    });
  }, []);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [formerSongInd, setFormerInd] = useState(0);
  const currentSong = songs[currentSongIndex];
  const formerSong = songs[formerSongInd];

  function handleSelectSong(selectedSong) {
    const audioIndex = songs.findIndex(
      (song) => song.audioUrl === selectedSong.audioUrl
    );
    if (audioIndex >= 0) {
      setCurrentSongIndex(audioIndex); //
      setFormerInd(currentSongIndex); //setFormerIndex
      console.log(formerSongInd, currentSongIndex);
    }
  }
  return (
    <div className="App">
      {songs.length === 0 ? (
        "Loading..."
      ) : (
        <>
          <SongPlayer song={currentSong} songfor={formerSong} loop />
          <Songs>
            <Heading title="Songs" />
            <ul>
              {songs.map((song) => (
                <SongListItem
                  key={song.audioUrl}
                  song={song}
                  isCurrent={currentSong.audioUrl === song.audioUrl} //highlihted
                  onSelect={handleSelectSong}
                  currentSongIndex
                />
              ))}
            </ul>
          </Songs>
        </>
      )}
    </div>
  );
}
