import React from "react";
interface IProps {
  name: string;
  alpha3Code: string;
  onClick: React.MouseEventHandler;
}

const OneCountry: React.FC<IProps> = ({ alpha3Code, name, onClick }) => {
  return (
    <div>
      <li
        onClick={onClick}
        className="mt-2 p-3 list-group-item fs-5 one-country"
        id={alpha3Code}
      >
        {name}
      </li>
    </div>
  );
};

export default OneCountry;
