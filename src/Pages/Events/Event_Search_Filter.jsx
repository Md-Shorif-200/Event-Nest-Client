import React, { useState } from "react";
import useEvents from "../../Hooks/useEvents";

const Event_Search_Filter = ({setSearchValue ,searchValue}) => {
    
   





  return (

      <div className="mb-14 flex gap-x-6">
        <div className="search w-full sm:w-[50%] md:w-[30%] lg:w-[20%]">
            <input type="search" className="input"  placeholder="Search By Title " value={searchValue} onChange={(e) => setSearchValue(e.target.value) } />
     
        </div>
<select defaultValue="Filter By" className="select">
  <option disabled={true}>Filter by</option>
  <option>to day</option>
  <option>Currect Week</option>
  <option>Current Month</option>
</select>
    
      </div>

  );
};

export default Event_Search_Filter;
