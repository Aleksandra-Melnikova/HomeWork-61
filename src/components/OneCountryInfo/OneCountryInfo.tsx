import React, { useEffect, useState } from "react";
import { BASE_URL, ONE_COUNTRIES_URL } from "../../constans.ts";
import axios from "axios";
import Spinner from "../../UI/Spinner/Spinner.tsx";
import { APICountry } from "../../types";
import MakeRequest from "../../helpers/MakeRequest.ts";
interface Props {
  Alpha3Code: string | null;
}

const OneCountryInfo: React.FC<Props> = ({ Alpha3Code }) => {
  const [info, setInfo] = useState<APICountry | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [bordersName, setBordersName] = useState<{ name: string }[]>([]);

  useEffect(() => {
    setLoading(true);
    const getCountryByCode = async () => {
      try {
        const responseRequest: { data: APICountry } = await axios<APICountry>(
          BASE_URL + ONE_COUNTRIES_URL + Alpha3Code,
        );
        const countryResponse = responseRequest.data;
        setInfo(countryResponse);
        const borders = countryResponse.borders;
        if (borders !== undefined) {
          const promises = borders.map(async (border) => {
            const responseBorderName = await MakeRequest<APICountry>(
              BASE_URL + ONE_COUNTRIES_URL + border,
            );
            return { name: responseBorderName.name };
          });
          const postToState = await Promise.all(promises);

          setBordersName(postToState);
        }

        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    if (Alpha3Code !== null) {
      void getCountryByCode();
    }
  }, [Alpha3Code]);

  return (
    <>
      {!loading ? (
        <>
          {" "}
          {info && bordersName.length !== 0 && Alpha3Code !== null ? (
            <div className="border border-black mt-2 p-5">
              <div className="row">
                <div className="col-6">
                  <h1 className="fs-1 mb-4">{info.name}</h1>
                  <p className="fs-4">
                    <strong>Capital: </strong>Capital: {info.capital}
                  </p>
                  <p className="fs-4">
                    <strong>Population:</strong> {info.population}
                  </p>
                  <p className="fs-4">
                    <strong>Region: </strong>
                    {info.region}
                  </p>
                </div>

                <img
                  className="w-50 col col-6"
                  alt={info.name}
                  src={info.flag}
                />
              </div>

              <p className="fs-3 fw-semibold"> Borders with :</p>
              <ul>
                {bordersName.map((border) => (
                  <li className="fs-4" key={border.name}>
                    {border.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default OneCountryInfo;
