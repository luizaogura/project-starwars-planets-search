function useFilter() {
  const handleFilter = (input, initialArray) => {
    const result = initialArray
      .filter(({ name }) => name.toLowerCase().includes(input.toLowerCase()));
    return result;
  };

  const handleNumberFilter = (filters, arrayInicial) => {
    let result = arrayInicial;
    filters.forEach(({ column, comparision, valueProperty }) => {
      if (comparision === 'maior que') {
        result = result
          .filter((planet) => Number(planet[column]) > Number(valueProperty));
      } else if (comparision === 'igual a') {
        result = result
          .filter((planet) => Number(planet[column]) === Number(valueProperty));
      } else if (comparision === 'menor que') {
        result = result
          .filter((planet) => Number(planet[column]) < Number(valueProperty));
      }
    });
    return result;
  };

  const handleFilterOptions = (filters, filterArray) => {
    const newFilterArray = filters.filter((filterSelected) => !filterArray
      .some((filterCol) => filterCol.column === filterSelected));
    return newFilterArray;
  };

  return {
    handleFilter,
    handleNumberFilter,
    handleFilterOptions,
  };
}

export default useFilter;
