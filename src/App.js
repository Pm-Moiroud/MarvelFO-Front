import "./App.css";

import Header from "./components/header/Header";
import NoMatch from "./Pages/NoMatch/NoMatch";
import Home from "./Pages/Home/Home";
import Personnages from "./Pages/Personnages/Personnages";
import Favoris from "./Pages/Favoris/Favoris";
import Comics from "./Pages/Comics/Comics";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import PersonnagesComics from "./Pages/PersonnagesComics/PersonnagesComics";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState({});
  const [skipNumber, setSkipNumber] = useState(0);

  // Fonction qui gère le token des users dans les cookies.
  const giveToken = (token) => {
    const tokenExist = Cookies.get("Token");
    if (!tokenExist) {
      Cookies.set("Token", token);
    }
  };
  return (
    <Router>
      <Header giveToken={giveToken} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login giveToken={giveToken} />} />
        <Route path="/signup" element={<Signup giveToken={giveToken} />} />

        <Route
          path="/personnages"
          element={
            <Personnages
              setParams={setParams}
              params={params}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              skipNumber={skipNumber}
              setSkipNumber={setSkipNumber}
            />
          }
        />

        <Route
          path="/comics/:characterId"
          element={<PersonnagesComics />}
        ></Route>

        <Route
          path="/comics"
          element={
            <Comics
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              skipNumber={skipNumber}
              setSkipNumber={setSkipNumber}
            />
          }
        />
        <Route path="/favoris" element={<Favoris />} />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
