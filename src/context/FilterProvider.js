import { useEffect, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import useFilter from '../hooks/useFilter';
import TableContext from './TableContext';
import FilterContext from './FilterContext';

function FilterProvider({ children }) {
  const { planets, tablePlanets } = useContext(TableContext);
  const { handleFilter, handleNumberFilter } = useFilter();
  const [filter, setFilter] = useState({
    name: '',
    column: 'population',
    comparision: 'maior que',
    valueProperty: '0',
  });
  const [planetsArray, filterPlanets] = useState([]);

  const getNumberFilter = () => {
    filterPlanets(handleNumberFilter(filter, tablePlanets));
  };

  const handleChange = ({ target }) => {
    setFilter({
      ...filter,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    filterPlanets(handleFilter(filter.name, tablePlanets));
  }, [filter.name, planets, tablePlanets]);

  const values = useMemo(() => ({
    planetsArray, filter, handleChange, getNumberFilter,
  }), [planets, tablePlanets, planetsArray, filter]);

  return (
    <FilterContext.Provider value={ values }>
      { children }
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default FilterProvider;
