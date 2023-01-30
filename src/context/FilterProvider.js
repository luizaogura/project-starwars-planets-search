import { useEffect, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import useFilter from '../hooks/useFilter';
import TableContext from './TableContext';
import FilterContext from './FilterContext';

function FilterProvider({ children }) {
  const { planets, tablePlanets } = useContext(TableContext);
  const { handleFilter, handleNumberFilter, handleFilterOptions } = useFilter();
  const [filterOptions, setFiltersOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [filter, setFilter] = useState({
    name: '',
    column: filterOptions[0],
    comparision: 'maior que',
    valueProperty: '0',
  });
  const [planetsArray, filterPlanets] = useState([]);
  const [filterArray, handleFilterArray] = useState([]);
  const initialState = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const getNumberFilter = () => {
    const newFilterArray = [...filterArray, filter];
    handleFilterArray(newFilterArray);
    filterPlanets(handleNumberFilter(newFilterArray, tablePlanets));

    /* const newFilterArrayOptions = filterOptions
      .filter((items) => items !== filter.column);
    setFiltersOptions(newFilterArrayOptions); */

    filterPlanets(handleNumberFilter(newFilterArray, tablePlanets));
    const newFilterArrayOptions = handleFilterOptions(
      initialState,
      newFilterArray,
    );
    setFiltersOptions(newFilterArrayOptions);
    setFilter({ name: '',
      column: filterOptions[1],
      comparision: 'maior que',
      valueProperty: '0' });

    console.log('newfilter', newFilterArrayOptions);
    console.log('filterArray', filterArray);
  };

  const handleChange = ({ target }) => {
    setFilter({
      ...filter,
      [target.name]: target.value,
    });
    console.log('filter', filter);
  };

  const remove = ({ target: { name } }) => {
    const newFilterArray = filterArray
      .filter((filterSelected) => filterSelected.column !== name);
    handleFilterArray(newFilterArray);
    filterPlanets(handleNumberFilter(newFilterArray, tablePlanets));
    const newFilterOpt = handleFilterOptions(initialState, newFilterArray);
    setFiltersOptions(newFilterOpt);
  };

  const removeAll = () => {
    const newFilterArray = [];
    handleFilterArray(newFilterArray);
    filterPlanets(handleNumberFilter(newFilterArray, tablePlanets));
    const newFilterOpt = handleFilterOptions(initialState, newFilterArray);
    setFiltersOptions(newFilterOpt);
  };

  useEffect(() => {
    filterPlanets(handleFilter(filter.name, tablePlanets));
  }, [filter.name, planets, tablePlanets]);

  const values = useMemo(() => ({
    planetsArray,
    filter,
    handleChange,
    getNumberFilter,
    filterArray,
    filterOptions,
    remove,
    removeAll,
  }), [
    planets,
    tablePlanets,
    planetsArray,
    filter,
    filterArray,
    filterOptions,
    remove,
    removeAll,
  ]);

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
