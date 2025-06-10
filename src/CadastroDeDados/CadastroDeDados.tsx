import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDados } from "../Context/DadosContext";
import logo from "../assets/logo.png";
import "./CadastroDeDados.css";

export const CadastroDeDados: React.FC = () => {
  const { adicionar } = useDados();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    numero: "",
    funcionario: "",
    descricao: "",
    dataHora: "",
    status: "",
    tipo: "Manutenção",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const novaTarefa = { ...form, id: uuidv4() };
    // adicionar(novaTarefa);
    navigate("/pesquisar");
  };

  return (
    <div className="cadastro-container">
      <div className="header-area">
        <img src={logo} alt="HotelEase Logo" className="logo-central" />
        <button className="btn-voltar" onClick={() => navigate("/")}>
          Voltar à Home
        </button>
      </div>

      <div className="form-box">
        <h2>Cadastro De Dados</h2>
        <div className="input-row">
          <input
            placeholder="Número do Quarto"
            name="numero"
            value={form.numero}
            onChange={handleChange}
          />
          <input
            placeholder="Funcionário"
            name="funcionario"
            value={form.funcionario}
            onChange={handleChange}
          />
        </div>

        <div className="input-row">
          <input
            placeholder="Descrição"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
          />
          <input
            placeholder="Data e Hora"
            name="dataHora"
            value={form.dataHora}
            onChange={handleChange}
            type="datetime-local"
          />
        </div>

        <input
          placeholder="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          className="single-input"
        />

        <div className="radio-group">
          <label>Tipo de Tarefa:</label>
          <label>
            <input
              type="radio"
              value="Manutenção"
              name="tipo"
              checked={form.tipo === "Manutenção"}
              onChange={handleChange}
            />
            Manutenção
          </label>
          <label>
            <input
              type="radio"
              value="Limpeza"
              name="tipo"
              checked={form.tipo === "Limpeza"}
              onChange={handleChange}
            />
            Limpeza
          </label>
        </div>

        <button className="btn-salvar" onClick={handleSubmit}>
          Salvar
        </button>
      </div>
    </div>
  );
};
