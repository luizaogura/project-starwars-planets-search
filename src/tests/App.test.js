import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import data from './data';
import TableProvider from '../context/TableProvider';
import FilterProvider from '../context/FilterProvider';

describe('Teste da página inicial', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
          json: jest.fn().mockResolvedValue(data)
      })
    act(() => {
    render(
      <TableProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </TableProvider>
    );
    })
  })
  test('Testa se os componentes são renderizados', async () => {
    const filterName = screen.getByTestId('name-filter');
    expect(filterName).toBeInTheDocument();
    const filterColumn = screen.getByTestId('column-filter');
    expect(filterColumn).toBeInTheDocument();
    const filterComparison = screen.getByTestId('comparison-filter');
    expect(filterComparison).toBeInTheDocument();
    const filterValue = screen.getByTestId('value-filter');
    expect(filterValue).toBeInTheDocument();
    const filterButton = screen.getByTestId('button-filter');
    expect(filterButton).toBeInTheDocument();
  });
  test('Testa se a tabela é renderizada', async () => {
    const columnName =  await screen.findByRole('columnheader', {  name: /name/i});
    expect(columnName).toBeInTheDocument()
    const nameTattoine = await screen.findByRole('cell', {  name: /tatooine/i}); 
    expect(nameTattoine).toBeInTheDocument()
  });
  test('Testa se os filtros são renderizados e é possível selecionar e filtrar', async () => {
    const filterName = screen.getByTestId('name-filter');
    userEvent.type(filterName, 'Tatooine')
    const nameTattoine = await screen.findByRole('cell', {  name: /tatooine/i});
    expect(nameTattoine).toBeInTheDocument()
    userEvent.clear(filterName)
    const nameHoth = await screen.findByRole('cell', {  name: /hoth/i});
    expect(nameHoth).toBeInTheDocument();

    const filterColumn = screen.getByTestId('column-filter');
    userEvent.selectOptions(filterColumn, 'population');
    const filterComparison = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(filterComparison, 'maior que');
    const filterValue = screen.getByTestId('value-filter');
    userEvent.type(filterValue, '0')
    const filterButton = screen.getByTestId('button-filter');
    userEvent.click(filterButton);

    userEvent.selectOptions(filterColumn, 'rotation_period');
    userEvent.selectOptions(filterComparison, 'igual a');
    userEvent.type(filterValue, '0')
    userEvent.click(filterButton);

    userEvent.selectOptions(filterColumn, 'diameter');
    userEvent.selectOptions(filterComparison, 'menor que');
    userEvent.type(filterValue, '5000')
    userEvent.click(filterButton);
  });
  test('Testa se é possível excluir um filtro específico e todos os filtros', async () => {
    const filterColumn = screen.getByTestId('column-filter');
    userEvent.selectOptions(filterColumn, 'population');
    const filterComparison = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(filterComparison, 'maior que');
    const filterValue = screen.getByTestId('value-filter');
    userEvent.type(filterValue, '0')
    const filterButton = screen.getByTestId('button-filter');
    userEvent.click(filterButton);

    const firstFilter = screen.getByTestId('filter');
    userEvent.click(firstFilter);
    const maiorQue = screen.getByAltText('maior que');
    expect(maiorQue).not.toBeInTheDocument();

    const filterColumn2 = screen.getByTestId('column-filter');
    userEvent.selectOptions(filterColumn, 'population');
    const filterComparison2 = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(filterComparison, 'maior que');
    const filterValue2 = screen.getByTestId('value-filter');
    userEvent.type(filterValue, '0')
    const filterButton2 = screen.getByTestId('button-filter');
    userEvent.click(filterButton);

    userEvent.selectOptions(filterColumn, 'rotation_period');
    userEvent.selectOptions(filterComparison, 'igual a');
    userEvent.type(filterValue, '0')
    userEvent.click(filterButton);

    const allFilter = screen.getByTestId('button-remove-filters');
    userEvent.click(allFilter);
    const rotation = screen.getByAltText('rotation_period');
    expect(rotation).not.toBeInTheDocument();

  });
})
