import logo from './logo.svg';
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import SearchTable from './components/SearchTable';
import SearchTable2 from './components/SearchTable2';
import Pay from './pages/Pay';

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
              <Route path="/search" element={<SearchTable />} />
              <Route path="/search2" element={<SearchTable2 />} />
              <Route path="/pay" element={<Pay />} />
            </Routes>
          </Router>
        </QueryClientProvider>
    </div>
  );
}

export default App;
