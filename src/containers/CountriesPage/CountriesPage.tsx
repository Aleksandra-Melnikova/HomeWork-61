import  { useCallback, useEffect, useState } from 'react';
import { ICountry } from '../../types';
import axios from 'axios';
import { ALL_COUNTRIES_URL, BASE_URL } from '../../constans.ts';
import OneCountry from '../../components/OneCountry/OneCountry.tsx';
import OneCountryInfo from '../../components/OneCountryInfo/OneCountryInfo.tsx';


const CountriesPage = () => {
  const[countryCode, setCountryCode] = useState('');
  const [allCountries, setAllCountries] = useState<ICountry[]>([]);
  const fetchData = useCallback(async () => {
    const responseRequest:{data:ICountry[]} = await axios<ICountry[]>(BASE_URL + ALL_COUNTRIES_URL);
    let countryResponse = responseRequest.data;
    countryResponse = countryResponse.map((country)=>{
      return{
        name:country.name,
        alpha3Code:country.alpha3Code
      };
    });
    setAllCountries(countryResponse);
  },[]);

  useEffect(() => {
    void fetchData();
  },[fetchData]);
  return (
    <div>
      <div className='row'>
        <ul className='w-25 mt-2 p-3 col-3 list-group'>
          {allCountries.map((country) => (
            <OneCountry onClick={() => setCountryCode(country.alpha3Code)} key={country.alpha3Code} name={country.name}
                        alpha3Code={country.alpha3Code}/>
          ))
          }
        </ul>
        <div className='col-9'>
          <OneCountryInfo Alpha3Code={countryCode}/>
        </div>
      </div>
    </div>
  );
};

export default CountriesPage;