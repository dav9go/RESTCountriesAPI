import { Link } from "react-router-dom";
export default function Country({
  name,
  population,
  region,
  capital,
  alt,
  img,
}) {
  return (
    <article className="item-wrapper">
      <Link to={name}>
        <img src={img} alt={alt} />
        <div className="info">
          <h2>{name}</h2>
          <div className="info-summary">
            <h3>
              Population:{" "}
              <span> {new Intl.NumberFormat("de-DE").format(population)}</span>
            </h3>
            <h3>
              Region: <span>{region}</span>
            </h3>
            <h3>
              Capital: <span>{capital}</span>
            </h3>
          </div>
        </div>
      </Link>
    </article>
  );
}
