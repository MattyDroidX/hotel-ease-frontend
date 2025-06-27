import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Home.css";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <img src={logo} alt="HotelEase Logo" className="logo-topo" />

      <div className="content-wrapper">
        <div className="text-section">
          <h1 className="title">GESTÃO DE HOTEIS</h1>
          <p className="subtitle">
            Um sistema CRUD para gestão hoteleira centraliza e organiza tarefas
            de manutenção e limpeza dos quartos, resolvendo problemas de
            inconsistências de dados, comunicação ineficiente e falta de
            transparência.
          </p>
        </div>

        <div className="button-section">
          <button onClick={() => navigate("/cadastro")}>CADASTRO DE DADOS</button>
          <button onClick={() => navigate("/pesquisa")}>PESQUISA DE DADOS</button>
          <button onClick={() => navigate("/atualizacao")}>ATUALIZAÇÃO DE DADOS</button>
        </div>
      </div>

      <footer className="footer-home" />
    </div>
  );
};
