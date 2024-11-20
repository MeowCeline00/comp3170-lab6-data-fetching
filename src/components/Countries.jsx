import React from "react";
import Country from "./Country";

function Countries({ data }) {
  return (
    <div className="countries-container">
      {data
        ? data.map((country) => <Country country={country} key={country.name.official} />)
        : "Loading..."}
    </div>
  );
}

export default Countries;
