import React from "react";
import "./PesquisaDeDados.css";
import { useDados } from "../Context/DadosContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export const PesquisaDeDados: React.FC = () => {
  const { tarefas, remover } = useDados();
  const navigate = useNavigate();

  return (
    <div className="pesquisa-container">
      <div className="header-area">
        <img src={logo} alt="HotelEase Logo" className="logo-central" onClick={() => navigate("/")}/>
        <button className="btn-voltar" onClick={() => navigate("/")}>
          Voltar à Home
        </button>
      </div>


      <h2>Pesquisa De Dados</h2>
      <div className="filtro-wrapper">
        <input placeholder="Busca..." />
        <input placeholder="Funcionário" />
        <input placeholder="Status" />
        <input type="datetime-local" />
        <button>Pesquisar</button>
      </div>

      <div className="tabela-wrapper">
        <table>
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Quarto</th>
              <th>Data</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map((t) => (
              <tr key={t.id}>
                <td>{t.funcionario}</td>
                <td>{t.numero}</td>
                <td>{t.dataHora}</td>
                <td>{t.tipo}</td>
                <td>
                  <span className={t.tipo === "Limpeza" ? "status-limpeza" : "status-manutencao"}>
                    {t.tipo.toUpperCase()}
                  </span>
                </td>
                <td>
                  <button onClick={() => remover(t.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
