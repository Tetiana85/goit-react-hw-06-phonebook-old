import { FilterInput } from './Filter.styled';

const Filter = ({ filter, onUpdateFilter }) => {
  return (
    <>
      <p>Find contacts by name</p>
      <FilterInput
        type="text"
        name="filter"
        value={filter}
        onChange={onUpdateFilter}
        required
      />
    </>
  );
};

export default Filter;
