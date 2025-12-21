import React from "react";

const FilterComponent = ({
  handleSort,
}: {
  handleSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className="w-full flex justify-center mb-8">
      <div className="items-center flex flex-col">
        <p>Filter</p>
        <select
          onChange={handleSort}
          className="text-black bg-mainBg rounded-lg p-2 border border-gray-700 px-8"
        >
          <option value="">Default</option>
          <option value="Title">Title</option>
          <option value="Price">Price</option>
        </select>
      </div>
    </div>
  );
};

export default FilterComponent;
