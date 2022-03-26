import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Contacts from './pages/contact/Contact';
import Home from './pages/home/Home';
import Pattern from './pages/pattern/Pattern';
import './index.css'
import Header from './components/Header';
import PatternEdit from './pages/patternEdit/PatternEdit';



ReactDOM.render(
  <React.StrictMode>
   <BrowserRouter>
        <Header/>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/contact' element={<Contacts />} />
            <Route path='/pattern' element={<Pattern />} />
            <Route path='/patternedit' element={<PatternEdit />} />
        </Routes>
   </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);