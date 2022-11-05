
import { useState } from "react";
import {FiSearch} from "react-icons/fi";
import "./styles.css";
import React from "react";
import api from "./services/api";

function App() {

  //this const input pega tudo aquilo que digitar na pesquisa e o setiput vai trocar esse que digitou por outro conteudo
  //input sempre vai esta atrelado ao useState input
  const [input, setInput] = useState(""); 

  const [cep, setCep] = useState({});

  async function handleSearch() {

    if (input === "") {

      alert ("Please enter a valide cep")
      return;

    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");


    }catch{

      alert("ops error");
      setInput("");


    }
  }

  return (
    <div className="container">
      <h1 className="title">Cep Searcher</h1>
      <div className="containerInput">
        <input type="text"
        placeholder="Enter your CEP..."
        value={input}
        onChange={(e) => setInput(e.target.value)}  // onchange recebe o evento "e" e tem acesso pelo e.targetvalue e passando por usestate
          />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
        </div>

        {Object.keys(cep).length > 0 && (  // esse main so aparece quando a condicao for maior que 0, ou seja quando digitar algum cep

        <main className="main">
        <h2>CEP: {cep.cep}</h2>
        <span>{cep.logradouro}</span>
        <span>complemento: {cep.complemento}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
        </main>


        )}
        
        
     
    </div>
  );
}

export default App;
