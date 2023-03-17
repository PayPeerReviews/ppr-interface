import logo from './logo.svg';
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Payment from './components/Payment';
import Review from './components/Review';
import AverageReview from './components/AverageReview';
import SearchTable from './components/SearchTable';

import { useTheme } from './hooks/useTheme'
import ThemeSelector from './components/ThemeSelector'
import './App.css'

function App() {
  const { mode } = useTheme()

  const queryClient = new QueryClient();
  return (
    <div className={`App ${mode}`}>
        <QueryClientProvider client={queryClient}>
        <ThemeSelector />
          <Router>
            <Routes>
              <Route path="/payment" element={<Payment />} />
              <Route path="/review" element={<Review />} />
              <Route path="/average_review" element={<AverageReview />} />
              <Route path="/search" element={<SearchTable />} />
            </Routes>
          </Router>
        </QueryClientProvider>
    </div>
  );
}

export default App;
