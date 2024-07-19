import './App.css';
import AddLinkPage from './page/AddLinkPage';
import HomePage from './page/HomePage';
import './style/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    //ROUTER.index파일과 동일
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/add-link" element={<AddLinkPage />} />
      </Routes>
    </Router>
  );
}
export default App;
