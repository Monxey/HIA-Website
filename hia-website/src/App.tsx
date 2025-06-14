import './App.css'
import { BrowserRouter as _, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Donate from './pages/Donate.tsx';
import Team from './pages/Team.tsx';
import AI_Census from './pages/AI_Census.tsx';
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />         {/* default page */}
      <Route path="/about" element={<About />} />   {/* another page */}
      <Route path="/donate" element={<Donate />} />
      <Route path="/team" element={<Team />} />
      <Route path="/ai" element={<AI_Census />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
