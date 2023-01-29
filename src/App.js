import { React } from 'react';
import './App.css';
import FilterPlanet from './components/FilterPlanet';
import PlanetsTable from './components/PlanetsTable';
import TableProvider from './context/TableProvider';
import FilterProvider from './context/FilterProvider';

// começando novo projeto

function App() {
  return (
    <TableProvider>
      <FilterProvider>
        <FilterPlanet />
        <PlanetsTable />
      </FilterProvider>
    </TableProvider>

  );
}

export default App;
