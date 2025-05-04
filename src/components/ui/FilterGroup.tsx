import { Input, Select } from "@/lib/fluid";

interface FilterGroupProps {
  filterText: string;
  filterPlaceholder: string;
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sortBy: string;
  sortbyData: Array<{
    label: string;
    value: string;
  }>;
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterGroup = ({
  filterText,
  filterPlaceholder,
  handleFilterChange,
  sortBy,
  sortbyData,
  handleSortChange,
}: FilterGroupProps) => {
  return (
    <div className="filter-group">
      <Input
        type="search"
        placeholder={filterPlaceholder}
        value={filterText}
        onChange={handleFilterChange}
        className="input-filter"
      />
      <Select
        value={sortBy}
        options={sortbyData}
        onChange={handleSortChange}
        className="select-order"
      />
    </div>
  );
};

export default FilterGroup;
