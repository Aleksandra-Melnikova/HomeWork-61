import React, { useEffect, useState } from 'react';
import { BASE_URL, ONE_COUNTRIES_URL } from '../../constans.ts';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner.tsx';
import { APICountry, ICountry } from '../../types';
interface Props {
  Alpha3Code: string | null;
}

const OneCountryInfo:React.FC<Props> = ({Alpha3Code}) => {
  const [info, setInfo] = useState<APICountry | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [bordersName, setBordersName] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    const getCountryById = async ()=>{
      try{
        const responseRequest:{data:APICountry } = await axios<APICountry >(BASE_URL + ONE_COUNTRIES_URL + Alpha3Code);
        const postsResponse = responseRequest.data;
        setInfo(postsResponse);
        // postsResponse.borders
        setLoading(false);

      }catch (e){
        console.error(e);
        setLoading(false);
      }

    };
    if(Alpha3Code !==null){void getCountryById();}

  }, [Alpha3Code]);
  console.log(info);


  return (
    <>{ !loading ?
      <> {info  ?
        <div className="border border-black mt-2 p-4">
          <h1>{info.name}</h1>
          <p>{info.capital}</p>
          <p>{info.population}</p>
          <img alt={info.name} src={info.flag}/>

        </div>: <p>
          Select a country to get information about it</p>}</>
      :
      <Spinner/>}
    </>);

};

export default OneCountryInfo;