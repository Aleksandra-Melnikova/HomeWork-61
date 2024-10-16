import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../constans.ts';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner.tsx';
interface Props {
  Alpha3Code: string | null;
}

const OneCountryInfo:React.FC<Props> = ({Alpha3Code}) => {
  const [post, setPost] = useState<APICountry | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getCountryById = async ()=>{
      try{
        const responseRequest:{data:AAPICountry } = await axios<APICountry >(BASE_URL + Alpha3Code);
        const postsResponse = responseRequest.data;
        setPost(postsResponse);
        setLoading(false);

      }catch (e){
        console.error(e);
        setLoading(false);
      }

    };
    if(Alpha3Code !==null){void getCountryById();}

  }, [Alpha3Code]);
  return (
    <>{ !loading ?
      <> {post  ?
        <div className="border border-black mt-2 p-4">
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>: null}</>
      :
      <Spinner/>}
    </>);

};

export default OneCountryInfo;