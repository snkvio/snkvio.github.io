import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Testnet from './components/Testnet/Testnet'

function App() {
  return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="app h-100" style={{"backgroundColor": "rgb(244, 246, 248)"}}>
          <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path="/testnet" exact element={<Testnet/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
