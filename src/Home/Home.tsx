import React from "react";
import "./Home.css";
import logo from "./logo.png";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <img src={logo} alt="HotelEase logo" className="logo" />
        <h1 className="title">GESTÃO DE HOTEIS</h1>
        <p className="description">
          Um sistema CRUD para gestão hoteleira centraliza e organiza tarefas de manutenção e
          limpeza dos quartos, resolvendo problemas de inconsistências de dados, comunicação
          ineficiente e falta de transparência.
        </p>
      </header>

      <div className="buttons">
        <Link to="/cadastro"><button>CADASTRO DE DADOS</button></Link>
        <Link to="/pesquisa"><button>PESQUISA DE DADOS</button></Link>
        <Link to="/atualizacao"><button>ATUALIZAÇÃO DE DADOS</button></Link>
      </div>

      <footer className="footer" />
    </div>
  );
};
