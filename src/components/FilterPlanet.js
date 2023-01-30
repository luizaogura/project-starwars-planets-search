import { useContext } from 'react';
import FilterContext from '../context/FilterContext';

function FilterPlanet() {
  const { handleChange, filter, getNumberFilter, filterOptions,
    filterArray, remove, removeAll } = useContext(FilterContext);
  console.log(filterArray);
  return (
    <div>
      <input
        data-testid="name-filter"
        value={ filter.name }
        name="name"
        onChange={ handleChange }
        type="text"
      />
      <select
        name="column"
        id="column"
        data-testid="column-filter"
        onChange={ handleChange }
        value={ filter.column }
      >
        {filterOptions.map((option) => (
          <option key={ option } value={ option }>{option}</option>
        ))}
      </select>
      <select
        name="comparision"
        id="comparision"
        data-testid="comparison-filter"
        onChange={ handleChange }
        value={ filter.comparision }
      >
        <option
          value="maior que"
        >
          maior que
        </option>
        <option
          value="menor que"
        >
          menor que
        </option>
        <option
          value="igual a"
        >
          igual a
        </option>
      </select>
      <input
        type="number"
        name="valueProperty"
        id="valueProperty"
        data-testid="value-filter"
        onChange={ handleChange }
        value={ filter.valueProperty }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ getNumberFilter }
      >
        Filtrar
      </button>
      <button
        type="button"
        onClick={ removeAll }
        data-testid="button-remove-filters"
      >
        Remover filtros
      </button>
      {filterArray.map((filterSelected) => (
        <div key={ filterSelected.column } data-testid="filter">
          <div>
            {`${filterSelected.column} ${filterSelected.comparision}
             ${filterSelected.valueProperty}`}
          </div>
          <button
            type="button"
            onClick={ remove }
            name={ filterSelected.column }
          >
            Remover filtro
          </button>
        </div>
      ))}
    </div>
  );
}

export default FilterPlanet;
