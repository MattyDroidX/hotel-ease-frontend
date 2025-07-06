import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo-dark.png";
import api from "../services/api";
import "./AtualizacaoDeTarefas.css";
import { useFuncionarios } from "../Hooks/useFuncionarios";

export const AtualizacaoDeTarefas: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tarefa = location.state;
  const funcionarios = useFuncionarios();

   const [form, setForm] = useState({
    id:            tarefa?.id            ?? "",
    numero:        tarefa?.numero        ?? "",
    funcionarioId: tarefa?.funcionarioId ?? "",   
    dataHora:      tarefa?.dataHora?.slice(0,16) ?? "",
    descricao:     tarefa?.descricao     ?? "",
    status:        tarefa?.status        ?? "Em Aberto",
    tipo:          tarefa?.tipo          ?? "Manutenção",
  });

  const [erros, setErros] = useState<{ [campo: string]: string }>({});
  const [mensagem, setMensagem] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErros((prev) => ({ ...prev, [name]: "" }));
    setMensagem(null);
  };

  const validar = () => {
    const novosErros: { [campo: string]: string } = {};
    if (!form.numero.trim()) novosErros.numero = "Número do quarto é obrigatório.";
    if (!form.funcionarioId.trim()) novosErros.funcionarioId = "Funcionário é obrigatório.";
    if (!form.dataHora) novosErros.dataHora = "Data e hora são obrigatórias.";
    if (!form.descricao.trim()) novosErros.descricao = "Descrição é obrigatória.";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;

    try {
      await api.put(`/tarefas/${form.id}`,  {
      numero:        form.numero,
      funcionarioId: form.funcionarioId,
      descricao:     form.descricao,
      dataHora:      form.dataHora,
      status:        form.status,
      tipo:          form.tipo,
    });
      setMensagem("✅ Tarefa atualizada com sucesso!");
      setTimeout(() => navigate("/pesquisa"), 1500);
    } catch (err: any) {
        const msg = err?.response?.data?.erro ?? "Erro ao atualizar tarefa.";
        setMensagem("❌ " + msg);
        console.error(err);
      }
  };

  return (
    <div className="atualizacao-container">
      <div className="header-area">
        <img src={logo} alt="HotelEase Logo" className="logo-central" onClick={() => navigate("/")} />
        <button className="btn-voltar" onClick={() => navigate("/")}>
          Voltar à Home
        </button>
      </div>

      <div className="form-box">
        <h2>Atualização De Dados</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="numero">Número do Quarto:</label>
              <input
                id="numero"
                name="numero"
                value={form.numero}
                onChange={handleChange}
                placeholder="Ex: 101"
                className={erros.numero ? "input-erro" : ""}
              />
            </div>
            <div className="input-group">
              <label htmlFor="funcionarioId">Funcionário:</label>
              <select
                id="funcionarioId"
                name="funcionarioId"
                value={form.funcionarioId}
                onChange={handleChange}
                className={erros.funcionarioId ? "input-erro" : ""}
              >
                <option value="">Selecione</option>
                {funcionarios.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.text}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="dataHora">Data e Hora:</label>
              <input
                id="dataHora"
                name="dataHora"
                type="datetime-local"
                value={form.dataHora}
                onChange={handleChange}
                className={erros.dataHora ? "input-erro" : ""}
              />
            </div>
            <div className="input-group">
              <label htmlFor="descricao">Descrição da Tarefa:</label>
              <input
                id="descricao"
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                placeholder="Ex: Consertar ar-condicionado"
                className={erros.descricao ? "input-erro" : ""}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="status">Status da Tarefa:</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="single-input"
            >
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

          <button className="btn-salvar" type="submit">
            Salvar Alterações
          </button>

          {/* feedback de erro */}
          <div className="erros">
            {Object.values(erros).map((erro, idx) => (
              <div key={idx} className="erro">{erro}</div>
            ))}
          </div>

          {mensagem && <div className="mensagem-feedback">{mensagem}</div>}
        </form>
      </div>
    </div>
  );
};
