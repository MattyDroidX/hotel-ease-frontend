import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDados } from "../Context/DadosContext";
import { v4 as uuidv4 } from "uuid";
import logo from "../assets/logo-dark.png";
import "../CadastroDeTarefas/CadastroDeTarefas.css";

export const CadastroFuncionario: React.FC = () => {
  const navigate = useNavigate();
  const { adicionarFuncionario } = useDados();

  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    cargo: "",
  });

  const [erros, setErros] = useState<{ [key: string]: string }>({});
  const [mensagem, setMensagem] = useState<string | null>(null);

  const validar = () => {
    const novosErros: { [key: string]: string } = {};

    if (!form.nome.trim()) novosErros.nome = "Nome é obrigatório.";
    if (!form.sobrenome.trim()) novosErros.sobrenome = "Sobrenome é obrigatório.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) novosErros.email = "Email inválido.";
    if (!form.telefone.trim()) novosErros.telefone = "telefone é obrigatório.";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErros({ ...erros, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;

    try {
      adicionarFuncionario({ id: uuidv4(), ...form, ativo: true });
      setMensagem("✅ Funcionário cadastrado com sucesso!");
      setTimeout(() => {
        setMensagem(null);
        navigate("/funcionarios");
      }, 1500);
    } catch {
      setMensagem("❌ Erro ao cadastrar funcionário.");
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
        <h2>Cadastro de Funcionário</h2>
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
          <button className="btn-salvar" type="submit">Cadastrar</button>
        </form>

        {/* Erros exibidos abaixo do formulário, sem quebrar inputs */}
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
