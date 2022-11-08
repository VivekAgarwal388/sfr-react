import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Home from './routes/Home';
import SFR from './routes/SFR';
import MergedSFR from './routes/MergedSFR';
import Animations from './routes/Animations';
import Publication from './routes/Publication';
import Team from './routes/Team';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    switch (searchParams.get('page')) {
      case null:
        setSearchParams({ page: 'SFR-CONUS' });
        setPage(<SFR area={0} />);
        break;
      case 'Home':
        setPage(<Home />);
        break;
      case 'SFR-CONUS':
        setPage(<SFR area={0} />);
        break;
      case 'SFR-Alaska':
        setPage(<SFR area={1} />);
        break;
      case 'mSFR-CONUS':
        setPage(<MergedSFR />);
        break;
      case 'Animations':
        setPage(<Animations />);
        break;
      case 'Publication':
        setPage(<Publication />);
        break;
      case 'Team':
        setPage(<Team />);
        break;
      default:
        setSearchParams({ page: 'SFR-CONUS' });
        setPage(<SFR area={0} />);
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
