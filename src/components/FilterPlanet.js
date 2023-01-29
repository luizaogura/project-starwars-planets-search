import { useContext } from 'react';
import FilterContext from '../context/FilterContext';

function FilterPlanet() {
  const { handleChange, filter, getNumberFilter } = useContext(FilterContext);
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
        <option
          value="population"
        >
          population
        </option>
        <option
          value="orbital_period"
        >
          orbital_period
        </option>
        <option
          value="diameter"
        >
          diameter
        </option>
        <option
          value="rotation_period"
        >
          rotation_period
        </option>
        <option
          value="surface_water"
        >
          surface_water
        </option>
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
    </div>
  );
}

export default FilterPlanet;
