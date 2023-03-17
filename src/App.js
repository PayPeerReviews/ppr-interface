import logo from './logo.svg';
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Payment from './components/Payment';
import Review from './components/Review';
import AverageReview from './components/AverageReview';
import SearchTable from './components/SearchTable';

function App() {
  const queryClient = new QueryClient();
  return (
    <>

      <>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="/payment" element={<Payment />} />
              <Route path="/review" element={<Review />} />
              <Route path="/average_review" element={<AverageReview />} />
              <Route path="/search" element={<SearchTable />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </>
    </>
  );
}

export default App;
