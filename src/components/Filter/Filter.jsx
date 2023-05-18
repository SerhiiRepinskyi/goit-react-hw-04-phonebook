import PropTypes from 'prop-types';
import { FilterBlock, FilterLabel, FilterInput } from './Filter.styled';

const Filter = ({ value, onChange }) => {
  return (
    <FilterBlock>
      <FilterLabel>
        Find contacts by name
        <FilterInput
          type="text"
          placeholder="Search..."
          value={value}
          onChange={onChange}
        />
      </FilterLabel>
    </FilterBlock>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
