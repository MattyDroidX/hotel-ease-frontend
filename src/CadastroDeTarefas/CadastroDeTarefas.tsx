import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import logo from "../assets/logo-dark.png";
import "./CadastroDeTarefas.css";

export const CadastroDeTarefas: React.FC = () => {
  const navigate = useNavigate();
  const [funcionarios, setFuncionarios] = useState<any[]>([]);

  const [form, setForm] = useState({
    numero: "",
    funcionario: "",
    descricao: "",
    dataHora: "",
    status: "Em Aberto",
    tipo: "Manutenção",
  });

  const [erros, setErros] = useState<{ [campo: string]: string }>({});
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    api.get("/funcionarios")
      .then(res => {
        setFuncionarios(res.data.filter((f: any) => f.ativo));
      })
      .catch(err => {
        console.error("Erro ao buscar funcionários", err);
        alert("Erro ao carregar funcionários");
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErros({ ...erros, [name]: "" });
    setMensagem(null);
  };

  const validar = () => {
    const novosErros: { [campo: string]: string } = {};
    if (!form.numero.trim()) novosErros.numero = "Número do quarto é obrigatório.";
    if (!form.funcionario) novosErros.funcionario = "Funcionário é obrigatório.";
    if (!form.descricao.trim()) novosErros.descricao = "Descrição é obrigatória.";
    if (!form.dataHora) novosErros.dataHora = "Data e hora são obrigatórias.";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async () => {
    if (!validar()) return;

    try {
      await api.post("/tarefas", form);
      setMensagem("✅ Tarefa cadastrada com sucesso!");
      setTimeout(() => navigate("/pesquisa"), 1500);
    } catch (error) {
      console.error("Erro ao cadastrar tarefa", error);
      setMensagem("❌ Erro ao cadastrar tarefa.");
    }
  };

  return (
    <div className="cadastro-container">
      <div className="header-area">
        <img src={logo} alt="HotelEase Logo" className="logo-central" onClick={() => navigate("/")} />
        <div className="botao-duplo">
          <button className="btn-voltar" onClick={() => navigate("/")}>Voltar à Home</button>
          <button className="btn-voltar" onClick={() => navigate("/pesquisa")}>Pesquisa de Tarefas</button>
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
            name="funcionario"
            value={form.funcionario}
            onChange={handleChange}
            className={erros.funcionario ? "input-erro" : ""}
          >
            <option value="">Selecione um Funcionário</option>
            {funcionarios
              .filter(f => f.ativo)
              .map((f) => (
                <option key={f.id} value={`${f.nome} ${f.sobrenome}`}>
                  {f.nome} {f.sobrenome}
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

        {/* Feedback de erro */}
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
