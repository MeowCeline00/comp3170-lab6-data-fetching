import { useEffect, useState } from "react";
import "./App.css";
import Countries from "./components/Countries";

function App() {
  useEffect(() => {
    async function getCountries() {
      const _data = await fetch("https://restcountries.com/v3.1/all").then((resp) =>
        resp.json()
      );
      setAllCountries(_data);
      setData(_data);
    }
    getCountries();
  }, []);

  const [ALL_COUNTRIES, setAllCountries] = useState(null);
  const [data, setData] = useState(null);

  const [continent, setContinent] = useState("All");
  const [subregion, setSubregion] = useState("All");

  const [isAlphabetical, setAlphabetical] = useState(false);
  const [population, setPopulation] = useState(false);
  const [area, setArea] = useState(false);

  function handleFilterContinent(e) {
    setSubregion("All");
    setContinent(e.target.value);
    if (e.target.value === "All") {
      setData(ALL_COUNTRIES);
      return;
    }
    setData(
      ALL_COUNTRIES.filter((country) =>
        country.continents.includes(e.target.value)
      )
    );
  }

  function handleFilterRegion(e) {
    setContinent("All");
    setSubregion(e.target.value);
    if (e.target.value === "All") {
      setData(ALL_COUNTRIES);
      return;
    }
    setData(
      ALL_COUNTRIES.filter((country) => country.subregion === e.target.value)
    );
  }

  function handleAlphabetical(e) {
    setAlphabetical(e.target.checked);
    setPopulation(false);
    setArea(false);
  }

  function handlePopulation(e) {
    setPopulation(e.target.checked);
    setAlphabetical(false);
    setArea(false);
  }

  function handleArea(e) {
    setArea(e.target.checked);
    setPopulation(false);
    setAlphabetical(false);
  }

  function getData() {
    const _TOP_X_NUMBER = 10;
    if (isAlphabetical) {
      return [...data].sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (population) {
      return [...data]
        .sort((a, b) => b.population - a.population)
        .slice(0, _TOP_X_NUMBER);
    } else if (area) {
      return [...data]
        .sort((a, b) => b.area - a.area)
        .slice(0, _TOP_X_NUMBER);
    } else {
      return data;
    }
  }

  return (
    <div className="app-container">
      <h1>Countries of the World</h1>
      <div className="filter-sort">
        <h3>Filter & sort</h3>
        <div className="filter-options">
          {/* Sorting Options */}
          <div>
            <label>
              <input
                type="checkbox"
                checked={isAlphabetical}
                onChange={handleAlphabetical}
              />
              Alpha
            </label>
            <label>
              <input
                type="checkbox"
                checked={population}
                onChange={handlePopulation}
              />
              Top 10 by population
            </label>
            <label>
              <input type="checkbox" checked={area} onChange={handleArea} />
              Top 10 by area
            </label>
          </div>

          {/* Filtering Options */}
          <div>
            <select value={continent} onChange={handleFilterContinent}>
              <option value="All">By continent</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="Oceania">Oceania</option>
              <option value="South America">South America</option>
              <option value="Antarctica">Antarctica</option>
            </select>
            <select value={subregion} onChange={handleFilterRegion}>
              <option value="All">By subregion</option>
              <option value="Caribbean">Caribbean</option>
              <option value="Western Europe">Western Europe</option>
              <option value="Western Africa">Western Africa</option>
              <option value="Central Europe">Central Europe</option>
              <option value="Eastern Asia">Eastern Asia</option>
              <option value="Polynesia">Polynesia</option>
              <option value="Northern Africa">Northern Africa</option>
              <option value="Southern Europe">Southern Europe</option>
              <option value="South-Eastern Asia">South-Eastern Asia</option>
              <option value="Eastern Africa">Eastern Africa</option>
              <option value="Southern Africa">Southern Africa</option>
              <option value="North America">North America</option>
              <option value="Middle Africa">Middle Africa</option>
              <option value="Micronesia">Micronesia</option>
              <option value="Southeast Europe">Southeast Europe</option>
              <option value="Western Asia">Western Asia</option>
              <option value="Northern Europe">Northern Europe</option>
              <option value="Melanesia">Melanesia</option>
              <option value="Central Asia">Central Asia</option>
              <option value="Southern Asia">Southern Asia</option>
              <option value="South America">South America</option>
              <option value="Australia and New Zealand">
                Australia and New Zealand
              </option>
              <option value="Central America">Central America</option>
              <option value="Eastern Europe">Eastern Europe</option>
            </select>
          </div>
        </div>
      </div>
      <Countries data={getData()} />
    </div>
  );
}

export default App;
