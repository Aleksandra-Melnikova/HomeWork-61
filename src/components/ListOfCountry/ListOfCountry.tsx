import React from "react";
import OneCountry from "../OneCountry/OneCountry.tsx";
import { ICountry } from "../../types";
interface IProps {
  allCountries: ICountry[];
  onCLick: () => void;
}

const ListOfCountry: React.FC<IProps> = ({ allCountries, onCLick }) => {
  return (
    <div>
      <ul className="w-25 mt-2 p-3 col-3 list-group">
        {allCountries.map((country) => (
          <OneCountry
            onClick={onCLick}
            key={country.alpha3Code}
            name={country.name}
            alpha3Code={country.alpha3Code}
          />
        ))}
      </ul>
    </div>
  );
};

export default ListOfCountry;
