import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import Country from "../Country";

export default function HomePage() {
  //All the data from API
  const { data } = useContext(DataContext);
  //Save the data here from @data to make filter and search operations on it without lose all the data from the API
  const [localData, setLocalData] = useState();
  //Search value
  const [search, setSearch] = useState("");
  //Filter value
  const [filterRegion, setFilterRegion] = useState("");

  //Set the all the data as default and able to be filtered
  useEffect(() => {
    setLocalData(data);
  }, [data]);

  //When searching, the search is made on all the local data available, this available data change if we filter by region,
  //when we set the region filter to "", we set again the local data to all the data from api
  useEffect(() => {
    //To change the region, we need to reset the local data in case we have filtered before already with other region. Or we are
    //going to filter europe inside asia for example that will result in any country displayed
    setLocalData(data);
    if (filterRegion) {
      setLocalData((prev) =>
        prev?.filter((item) => item.region.toLowerCase().includes(filterRegion))
      );
    } else {
      setLocalData(data);
    }
  }, [filterRegion]);

  return (
    <section className="home-page">
      <section role="search" className="search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="search-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field"
          type="text"
          placeholder="Search for a country..."
        />
      </section>
      <section className="dropdown-menu-wrapper">
        <select
          className="region-select"
          name="region"
          id="region"
          value={filterRegion}
          onChange={(e) => setFilterRegion(e.target.value)}
        >
          <option value="">Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </section>
      <section className="items-wrapper">
        {search
          ? localData
              ?.filter((item) => {
                return item.name.official
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((item) => (
                <Country
                  key={item.name.official}
                  name={item.name.official}
                  population={item.population}
                  region={item.region}
                  capital={item.capital}
                  alt={item.flags.alt}
                  img={item.flags.png}
                />
              ))
          : localData?.map((item) => (
              <Country
                key={item.name.official}
                name={item.name.official}
                population={item.population}
                region={item.region}
                capital={item.capital}
                alt={item.flags.alt}
                img={item.flags.png}
              />
            ))}
      </section>
    </section>
  );
}
