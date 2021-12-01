import Home from './components/Home';
import PlaylistMood from './components/PlaylistMood';
import { Route, Routes } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="playlists" element={<PlaylistMood />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
