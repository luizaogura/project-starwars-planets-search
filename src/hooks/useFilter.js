function useFilter() {
  const handleFilter = (input, initialArray) => {
    const result = initialArray
      .filter(({ name }) => name.toLowerCase().includes(input.toLowerCase()));
    return result;
  };
  const handleNumberFilter = ({ column, comparision, valueProperty }, arrayInicial) => {
    const result = arrayInicial.filter((planet) => {
      if (comparision === 'maior que') {
        return Number(planet[column]) > Number(valueProperty);
      } if (comparision === 'igual a') {
        return Number(planet[column]) === Number(valueProperty);
      }
      return Number(planet[column]) < Number(valueProperty);
    });
    return result;
  };
  return {
    handleFilter,
    handleNumberFilter,
  };
}

export default useFilter;
