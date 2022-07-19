import { useSearchParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import Home from './routes/Home';
import QuickGuides from './routes/QuickGuides';
import MergedSFR from './routes/MergedSFR';
import AlaskaSFR from './routes/AlaskaSFR';
import GlobalSFR from './routes/GlobalSFR';


function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(<Home />);

  useEffect(() => {
    switch (searchParams.get('page')) {
      case null:
        setSearchParams({ page: 'home' });
        setPage(<Home />);
        break;
      case 'home':
        setPage(<Home />);
        break;
      case 'quick_guides':
        setPage(<QuickGuides />);
        break;
      case 'merged_sfr':
        setPage(<MergedSFR />);
        break;
      case 'alaska_sfr':
        setPage(<AlaskaSFR />);
        break;
      case 'global_sfr':
        setPage(<GlobalSFR />);
        break;
      default:
        setSearchParams({ page: 'home' });
        setPage(<Home />);
        break;
    }
  }, [searchParams, setSearchParams])

  return (
    <div>
      {page}
    </div>
  );
}

export default App;
