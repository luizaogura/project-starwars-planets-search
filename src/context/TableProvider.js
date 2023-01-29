import { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import TableContext from './TableContext';

function TableProvider({ children }) {
  const { planets, handleFetch } = useFetch();
  const [tablePlanets, setTablePlanets] = useState([]);

  useEffect(() => {
    const initialFetch = async (pageURL) => {
      const responseFinal = await handleFetch(pageURL);
      setTablePlanets(responseFinal.results);
    };
    initialFetch('https://swapi.dev/api/planets');
  }, []);

  const values = useMemo(() => ({
    planets, tablePlanets,
  }), [planets, tablePlanets]);
  return (
    <TableContext.Provider value={ values }>
      { children }
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default TableProvider;
