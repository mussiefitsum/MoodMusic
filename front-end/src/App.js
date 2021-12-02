import { Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import PlaylistMood from './components/PlaylistMood';
import Navbar from './components/Navbar';
import './App.css'


function App() {
  return (
    <div className="App">
      <Navbar />
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
