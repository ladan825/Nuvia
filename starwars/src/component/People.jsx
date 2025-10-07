import { useQuery } from '@tanstack/react-query';
import Locations from './Locations';
import { useState } from 'react';

const fetchLocations = async ({ queryKey }) => {
  const [_key, page] = queryKey;
  const res = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`);
  return res.json();
};

const Planet = () => {
  const [page, setPage] = useState(1);
  const { data, status, isFetching, isPreviousData } = useQuery({
    queryKey: ['planets', page],
    queryFn: fetchLocations,
    keepPreviousData: true,
  });

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Locations</h2>

      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}

      {/* ✅ Wrap all controls together */}
      <div className="flex items-center gap-4 mt-6">
        <button
          className="btn px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage(old => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span>Page {page}</span>

        <button
          className="btn px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => {
            if (!isPreviousData && data?.info?.next) {
              setPage(old => old + 1);
            }
          }}
          disabled={isPreviousData || !data?.info?.next}
        >
          Next
        </button>

        {isFetching && <span className="ml-4 text-sm">Updating...</span>}
      </div>

      {status === 'success' && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.results.map(location => (
            <Locations key={location.id} locate={location} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planet;
