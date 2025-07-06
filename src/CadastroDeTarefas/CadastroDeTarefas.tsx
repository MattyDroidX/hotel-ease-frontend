import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import logo from "../assets/logo-dark.png";
import "./CadastroDeTarefas.css";
import { useFuncionarios } from "../Hooks/useFuncionarios";

type FormData = {
  numero: string;
  funcionarioId: string;                     
  descricao: string;
  dataHora: string;                          
  status: "Em Aberto" | "Em Procedimento" | "Com Complicacoes" | "Concluído";
  tipo: "Limpeza" | "Manutenção";
};

export const CadastroDeTarefas: React.FC = () => {
  const navigate       = useNavigate();
  const funcionarios   = useFuncionarios();

  const [form,  setForm ]  = useState<FormData>({
    numero: "",
    funcionarioId: "",
    descricao: "",
    dataHora: "",
    status: "Em Aberto",
    tipo:   "Manutenção",
  });

  const [erros,    setErros]    = useState<Record<string,string>>({});
  const [mensagem, setMensagem] = useState<string|null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErros(prev => ({ ...prev, [name]: "" }));
    setMensagem(null);
  };

  const validar = (): boolean => {
    const novo: Record<string,string> = {};
    if (!form.numero.trim())        novo.numero        = "Número é obrigatório.";
    if (!form.funcionarioId)        novo.funcionarioId = "Selecione o funcionário.";
    if (!form.descricao.trim())     novo.descricao     = "Descrição é obrigatória.";
    if (!form.dataHora)             novo.dataHora      = "Data/hora obrigatória.";
    setErros(novo);
    return Object.keys(novo).length === 0;
  };

  const handleSubmit = async () => {
    if (!validar()) return;
    try {
      await api.post("/tarefas", form);
      setMensagem("✅ Tarefa cadastrada com sucesso!");
      setTimeout(() => navigate("/pesquisa"), 1500);
    } catch (error: any) {
      console.error("Erro ao cadastrar tarefa", error);
      const msg = error?.response?.data?.erro ?? "❌ Erro ao cadastrar tarefa.";
      setMensagem(msg);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="header-area">
        <img
          src={logo}
          alt="HotelEase Logo"
          className="logo-central"
          onClick={() => navigate("/")}
        />
        <div className="botao-duplo">
          <button className="btn-voltar" onClick={() => navigate("/")}>
            Voltar à Home
          </button>
          <button className="btn-voltar" onClick={() => navigate("/pesquisa")}>
            Pesquisa de Tarefas
          </button>
        </div>
      </div>

      <div className="form-box">
        <h2>Cadastro De Tarefas</h2>

        <div className="input-row">
          <input
            name="numero"
            placeholder="Número do Quarto"
            value={form.numero}
            onChange={handleChange}
            className={erros.numero ? "input-erro" : ""}
          />

          <select
            name="funcionarioId"               
            value={form.funcionarioId}
            onChange={handleChange}
            className={erros.funcionarioId ? "input-erro" : ""}
          >
            <option value="">Selecione um Funcionário</option>
            {funcionarios.map(opt => (
              <option key={opt.id} value={opt.id}>
                {opt.text}
              </option>
            ))}
          </select>
        </div>

        <div className="input-row">
          <input
            name="descricao"
            placeholder="Descrição"
            value={form.descricao}
            onChange={handleChange}
            className={erros.descricao ? "input-erro" : ""}
          />

          <input
            type="datetime-local"
            name="dataHora"
            value={form.dataHora}
            onChange={handleChange}
            className={erros.dataHora ? "input-erro" : ""}
          />
        </div>

        <div className="input-row">
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="Em Aberto">Em Aberto</option>
            <option value="Em Procedimento">Em Procedimento</option>
            <option value="Com Complicacoes">Com Complicacoes</option>
            <option value="Concluído">Concluído</option>
          </select>
        </div>

        <div className="radio-group">
          <label>Tipo de Tarefa:</label>
          {["Manutenção", "Limpeza"].map(tipo => (
            <label key={tipo}>
              <input
                type="radio"
                name="tipo"
                value={tipo}
                checked={form.tipo === tipo}
                onChange={handleChange}
              />
              {tipo}
            </label>
          ))}
        </div>

        <button className="btn-salvar" onClick={handleSubmit}>
          Salvar
        </button>

        {/* feedback de validação */}
        <div className="erros">
          {Object.values(erros).map((e, i) => (
            <div className="erro" key={i}>{e}</div>
          ))}
        </div>

        {mensagem && <div className="mensagem-feedback">{mensagem}</div>}
      </div>
    </div>
  );
};
