import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Portfolios from './pages/Portfolios/Portfolios';
import CreatePortfolio from './pages/CreatePortfolio/CreatePortfolio';
import PortfolioDetail from './components/PortfolioDetail/PortfolioDetail';
import Funds from './pages/Funds/Funds';
import './styles/main.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="portfolios" element={<Portfolios />} />
          <Route path="portfolios/new" element={<CreatePortfolio />} />
          <Route path="portfolios/:id" element={<PortfolioDetail />} />
          <Route path="funds" element={<Funds />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
