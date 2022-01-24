import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Continents } from "./components/Continents";
import { CountryList } from "./components/CountryList";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache(),
});

function App() {
  
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Continents />} />
            <Route path="/:code" element={<CountryList/>} />
          </Routes>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
