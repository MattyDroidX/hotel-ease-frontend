import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDados } from "../context/DadosContext";
import { v4 as uuidv4 } from "uuid";
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
    tipo: "Manutenção" as "Manutenção" | "Limpeza",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adicionar({ ...form, id: uuidv4() });
    navigate("/pesquisa");
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Dados</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input placeholder="Número do Quarto" value={form.numero} onChange={(e) => setForm({ ...form, numero: e.target.value })} />
        <input placeholder="Funcionário" value={form.funcionario} onChange={(e) => setForm({ ...form, funcionario: e.target.value })} />
        <input type="datetime-local" value={form.dataHora} onChange={(e) => setForm({ ...form, dataHora: e.target.value })} />
        <input placeholder="Descrição" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} />
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="">Status</option>
          <option value="Pendente">Pendente</option>
          <option value="Concluído">Concluído</option>
        </select>
        <div className="radio-group">
          <label>
            <input type="radio" name="tipo" checked={form.tipo === "Manutenção"} onChange={() => setForm({ ...form, tipo: "Manutenção" })} />
            Manutenção
          </label>
          <label>
            <input type="radio" name="tipo" checked={form.tipo === "Limpeza"} onChange={() => setForm({ ...form, tipo: "Limpeza" })} />
            Limpeza
          </label>
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};
