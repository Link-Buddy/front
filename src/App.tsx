import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginComponent from 'pages/login';
import MainComponent from 'pages/main';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" >
            <Route path="/main" element={<MainComponent />} />
            <Route path="/login" element={<LoginComponent />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
