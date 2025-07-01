import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo-dark.png";
import "../CadastroDeTarefas/CadastroDeTarefas.css";
import api from "../services/api";

export const AtualizacaoFuncionario: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const funcionario = location.state;

  const [form, setForm] = useState({
    id: funcionario?.id || "",
    nome: funcionario?.nome || "",
    sobrenome: funcionario?.sobrenome || "",
    email: funcionario?.email || "",
    telefone: funcionario?.telefone || "",
    cargo: funcionario?.cargo || "",
    ativo: funcionario?.ativo ?? true,
  });

  const [erros, setErros] = useState<{ [key: string]: string }>({});
  const [mensagem, setMensagem] = useState<string | null>(null);

  const validar = () => {
    const novosErros: { [key: string]: string } = {};

    if (!form.nome.trim()) novosErros.nome = "Nome é obrigatório.";
    if (!form.sobrenome.trim()) novosErros.sobrenome = "Sobrenome é obrigatório.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) novosErros.email = "Email inválido.";
    if (!form.telefone.trim()) novosErros.telefone = "Telefone é obrigatório.";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "ativo" ? value === "true" : value,
    }));
    setErros((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;

    try {
      await api.put(`/funcionarios/${form.id}`, form);
      setMensagem("✅ Funcionário atualizado com sucesso!");
      setTimeout(() => {
        setMensagem(null);
        navigate("/funcionarios");
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar funcionário.", error);
      setMensagem("❌ Erro ao atualizar funcionário.");
    }
  };

  return (
    <div className="cadastro-container">
      <div className="header-area">
        <img src={logo} alt="HotelEase Logo" className="logo-central" onClick={() => navigate("/")} />
        <div className="botao-duplo">
          <button className="btn-voltar" onClick={() => navigate("/")}>
            Voltar à Home
          </button>
          <button className="btn-voltar" onClick={() => navigate("/funcionarios")}>
            Lista de Funcionários
          </button>
        </div>
      </div>

      <div className="form-box">
        <h2>Atualizar Funcionário</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <input
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              className={erros.nome ? "input-erro" : ""}
            />
            <input
              name="sobrenome"
              placeholder="Sobrenome"
              value={form.sobrenome}
              onChange={handleChange}
              className={erros.sobrenome ? "input-erro" : ""}
            />
          </div>

          <div className="input-row">
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={erros.email ? "input-erro" : ""}
            />
            <input
              name="telefone"
              placeholder="Telefone"
              value={form.telefone}
              onChange={handleChange}
              className={erros.telefone ? "input-erro" : ""}
            />
          </div>

          <div className="input-row">
            <input
              name="cargo"
              placeholder="Cargo"
              value={form.cargo}
              onChange={handleChange}
            />
          </div>

          <select
            name="ativo"
            value={String(form.ativo)}
            onChange={handleChange}
            className="single-input"
          >
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>

          <button className="btn-salvar" type="submit">Salvar</button>
        </form>

        <div className="erros">
          {Object.values(erros).map((erro, idx) => (
            <div key={idx} className="erro">{erro}</div>
          ))}
        </div>

        {mensagem && <div className="mensagem-feedback">{mensagem}</div>}
      </div>
    </div>
  );
};
