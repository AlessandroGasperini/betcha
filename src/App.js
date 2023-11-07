import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Login from './Pages/Login';
import CreateAccount from './Pages/CreateAccount';
import Arena from './Pages/Arena';
import CreateBet from './Pages/CreateBet';
import MyStats from './Pages/MyStats';
import Standings from './Pages/Standings';
import AllGames from './Pages/AllGames';
import MyProfile from './Pages/MyProfile';
import AllBets from './Pages/AllBets';
function App() {


  return (
    <>

      <Router>

        <Link to="/"></Link>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/arena" element={<Arena />} />
          <Route path="/create-bet" element={<CreateBet />} />
          <Route path="/stats" element={<MyStats />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/all-games" element={<AllGames />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/personalBets" element={<AllBets />} />

        </Routes>
      </Router >



    </>
  );
}

export default App;
