import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import countries from "i18n-iso-countries";
import language from "i18n-iso-countries/langs/en.json";
export default function DetailPage() {
  countries.registerLocale(language);
  const { country } = useParams();
  //All the data from API
  const { data } = useContext(DataContext);
  //Store the item
  const [countryItem, setCountryItem] = useState(null);

  useEffect(() => {
    //Find the item
    const currentCountry = data?.find((item) =>
      item.name.official.includes(country)
    );
    setCountryItem(currentCountry);
  }, [data]);

  //handle multiple currencies
  function handleCurrencies() {
    const currArray = [];
    for (let key in countryItem.currencies) {
      const currName = countryItem.currencies[key].name;
      currArray.push(currName);
    }
    return currArray.join(", ");
  }

  //Hanlde Native name with different keys in each item
  function handleNativeName() {
    const nameArr = [];
    for (let key in countryItem.name.nativeName) {
      const currName = countryItem.name.nativeName[key].official;
      nameArr.push(currName);
    }
    return nameArr.join(", ");
  }

  //Handle format complete name of border countries
  function handleBorders(name) {
    //Convert ISO Alpha3 in ISO Alpha2
    const alpha2 = countries.alpha3ToAlpha2(name);
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    if (regionNames.of(alpha2).split(" ").length > 1) {
      return name;
    } else {
      return regionNames.of(alpha2);
    }
  }

  //Handle no capital
  function handleNoCapital() {
    if (countryItem.hasOwnProperty("capital")) {
      return countryItem.capital[0];
    } else {
      return <></>;
    }
  }

  //Handle top-level domain
  function handleNoTld() {
    if (countryItem.hasOwnProperty("tld")) {
      return countryItem.tld[0];
    } else {
      return <></>;
    }
  }

  //Hanlde Languages with different keys in each item
  function handleLanguages() {
    const nameArr = [];
    for (let key in countryItem.languages) {
      const currLan = countryItem.languages[key];
      nameArr.push(currLan);
    }
    return nameArr.join(", ");
  }

  console.log(countryItem);

  return (
    <section className="items-detail-wrapper">
      {countryItem && (
        <>
          <Link className="back-link" to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="back-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            <p>Back</p>
          </Link>
          <div className="desktop-container">
            <img
              className="details-img"
              src={countryItem.flags.png}
              alt={countryItem.flags.alt}
            />
            <div className="data-container-details">
              <h2>{countryItem.name.official}</h2>
              <div className="first-info">
                <div>
                  <h3>
                    Native Name: <span>{handleNativeName()}</span>
                  </h3>
                  <h3>
                    Population:{" "}
                    <span>
                      {new Intl.NumberFormat("de-DE").format(
                        countryItem.population
                      )}
                    </span>
                  </h3>
                  <h3>
                    Region: <span>{countryItem.region}</span>
                  </h3>
                  <h3>
                    Sub Region: <span>{countryItem.subregion}</span>
                  </h3>
                  <h3>
                    Capital: <span>{handleNoCapital()}</span>{" "}
                  </h3>
                </div>
                <div className="currencies-container">
                  <h3>
                    Top Level Domain: <span>{handleNoTld()}</span>{" "}
                  </h3>
                  <h3>
                    Currencies: <span>{handleCurrencies()}</span>{" "}
                  </h3>
                  <h3>
                    Language: <span>{handleLanguages()}</span>{" "}
                  </h3>
                </div>
              </div>
              <div className="borders">
                <h3 className="border-countries">Border Countries:</h3>
                <div className="border-items-wrapper">
                  {countryItem.borders?.map((item) => (
                    <div className="border-item" key={item}>
                      <p>{handleBorders(item)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
