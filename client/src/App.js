import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelsomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
