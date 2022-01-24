import { useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import gql from 'graphql-tag';
interface ILanguage{
  name:string;
}

interface ICountry{
  name:string;
  continent:string;
  capital:string;
  currency:string;
  languages:Array<ILanguage>;
 
}

interface ICountryData{
  countries:ICountry[];
  }

/**
 * update the query to show the country name, capital, currency and languages spoken
 */

//Query working fine  . just get the code from url and replace "EU" with code
const COUNTRIES_IN_CONTINENT = gql`
query Countries ($code:String){
  countries(filter: { continent: { eq: $code } }) {
    name
    currency
    capital
    languages {
      name
    }
  }
}

`;

export const CountryList: React.VFC = () => {
  //TODO 4: extract the continent code from the URL
  const {code}= useParams();

  //TODO 5: query the GraphQL endopoint to get a list of all countries in the continent
  const { data, loading, error }=
    useQuery<ICountryData>(COUNTRIES_IN_CONTINENT,{
      variables: {code}
    });
    if (loading || error) {
      return <p>{error ? error.message : 'Loading...'}</p>;
    }
    const { countries }:any=data;
  //TODO 6: render list of countries from the query
  return (
    <div>
       <h1>List of Countries</h1>
      <figure>
    <table role="grid" className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Capital</th>
              <th>Currency</th>
              <th>Languages</th>
            </tr>
          </thead>
          <tbody>
          {countries.map((c:ICountry) => (
            <tr>
            <td>{c.name}</td>
            <td>
              {c.capital}
            </td>
            <td>
              {c.currency}
            </td>
            <td>
             {c.languages.map((l)=>{
              return l.name 
             }).join(",")}
            </td>
          </tr>
        
        ))}
          </tbody>
        </table>
        </figure>
        {/* TODO 7: render a back button to allow the user to back to the list of continents */}
        <Link className="btn btn-primary" to={"/"}>Back</Link> 
        </div>
  
  )
  
 
};
