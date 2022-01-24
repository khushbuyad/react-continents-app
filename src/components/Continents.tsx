import React from "react";
import { ApolloClient, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import gql from 'graphql-tag';

/**
 * Create a graphql query to get a list of all continents
 * You can use the IContinentQueryResult to shape the response appropriately
 */



interface IContinent {
  name: string;
  code: string;
}
interface IContinentData{
  continents:IContinent[];
  }
const ALL_CONTITNENTS = gql`
 query Continents {
    continents{
          name
          code
  }
}
`;
export const Continents: React.VFC = () => {
  const history = useNavigate ();
  const { data, loading, error }=
    useQuery<IContinentData>(ALL_CONTITNENTS);

  
    
 
  const onContinentSelect = (code: string) => {
    //Navigate to selected continent
    let path=`/${code}`; 
   
    history(path);
  };

  if (loading || error) {
    return <p>{error ? error.message : 'Loading...'}</p>;
  }

const { continents }:any=data;
  // /**
  //  *  Render the list of continents and their codes
  //  *  The user should be able to click on a continent.
  //  * Upon clicking a continent, navigate the user to /<continent-code>
  //  * where list of countries in that continent should be displayed
  //  */
  return (
    <article>
      <header className="headings"> <h2>List of continents</h2> <h4>Select any to view countries.</h4> </header>
      <aside>
      <nav>
      <ul>
        {continents.map((c:IContinent) => (
          <li key={c.code}>
          <a  onClick={()=>onContinentSelect(c.code)}>
            {c.name} ({c.code})</a></li>
        ))}
      </ul>
      </nav>
      </aside>
    </article>
  );
};

