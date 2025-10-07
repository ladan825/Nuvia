import { useQuery } from '@tanstack/react-query';
import Character from './Character';


const fetchPlanets = async () => {
  const res = await fetch('https://rickandmortyapi.com/api/character');
  return res.json();
};

const Planet = () => {
  const { data, status } = useQuery({
    queryKey: ['planets'],
    queryFn: fetchPlanets,
  });

  return (
    <div>
      <h2>Planets</h2>
        {status === 'loading' && (
        <div>Loading data.....</div>
    )}
    {status === 'error' && (
        <div>Error fetching data</div>
    )}

      {status === 'success' && (
        <div>
            {data.results.map(char => <Character key={char.id} character={char} />
    )}
        </div>
    )}
    </div>
  );
};

export default Planet;
