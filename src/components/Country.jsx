import React from "react";

function Country({ country }) {
  return (
    <div className="country-card">
      <img src={country.flags.svg} alt={`${country.name.common} flag`} />
      <h2>{country.name.common}</h2>
      <p><strong>Official name:</strong> {country.name.official}</p>
      <p><strong>Capital:</strong> {country.capital?.[0] || "None"}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(", ")}</p>
      <p><strong>Currency:</strong> {Object.values(country.currencies || {}).map(curr => `${curr.name} (${curr.symbol})`).join(", ")}</p>
      <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
      <p><strong>Subregion:</strong> {country.subregion || "None"}</p>
      <p><strong>Borders:</strong> {country.borders?.join(", ") || "None"}</p>
      <a href={`https://www.google.com/maps/search/?api=1&query=${country.name.common}`} target="_blank" rel="noopener noreferrer">Show on Google Maps</a>
    </div>
  );
}

export default Country;
