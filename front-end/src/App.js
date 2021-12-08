import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import PlaylistMood from './components/PlaylistMood';
import Success from './components/Success';
import Navbar from './components/Navbar';
import './App.css'


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="playlists" element={<PlaylistMood />} />
            <Route path="complete" element={<Success />} />
          </Route>
        </Routes>
      </div>
    );
  }
}

export default App;
