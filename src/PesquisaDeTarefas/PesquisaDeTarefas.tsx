import React, { useState,useEffect } from "react";
import "./PesquisaDeTarefas.css";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-dark.png";
import { useFuncionarios } from "../Hooks/useFuncionarios";
import { Tarefa } from "../Models/Tarefa";

export const PesquisaDeTarefas: React.FC = () => {
  const navigate = useNavigate();
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [resultados, setResultados] = useState<Tarefa[]>([]);
  const funcionarios = useFuncionarios();

  const [filtros, setFiltros] = useState({
    busca: "",
    funcionario: "",
    status: "",
    tipo: "",
    dataHora: "",
  });


  useEffect(() => {
    api.get("/tarefas")
      .then(res => {
        setTarefas(res.data);
        setResultados(res.data);
      })
      .catch(err => {
        console.error("Erro ao carregar tarefas:", err);
        alert("Erro ao carregar tarefas");
      });
  }, []);

  const aplicarFiltros = () => {
    const filtradas = tarefas.filter((t) =>
        (!filtros.busca || t.descricao.toLowerCase().includes(filtros.busca.toLowerCase())) &&
        (!filtros.funcionario || t.funcionario.toLowerCase().includes(filtros.funcionario.toLowerCase())) &&
        (!filtros.status || t.status === filtros.status) &&
        (!filtros.tipo || t.tipo === filtros.tipo) &&
        (!filtros.dataHora || t.dataHora.startsWith(filtros.dataHora))
      );
    setResultados(filtradas);
  };

  const removerTarefa = async (id: string) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir esta tarefa?");
    if (!confirmar) return;

    try {
      await api.delete(`/tarefas/${id}`);
      setResultados(prev => prev.filter(t => t.id !== id));
      setTarefas(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error("Erro ao excluir tarefa:", err);
      alert("Erro ao excluir tarefa");
    }
  };

  return (
    <div className="pesquisa-container">
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
          <button className="btn-voltar" onClick={() => navigate("/cadastro")}>
            Adicionar novo registro de Tarefa
          </button>
        </div>
      </div>

      <h2>Pesquisa De Tarefas</h2>
      <div className="filtro-wrapper">
        <input
          placeholder="Busca..."
          value={filtros.busca}
          onChange={(e) => setFiltros({ ...filtros, busca: e.target.value })}
        />
        <select
          value={filtros.funcionario}
          onChange={(e) => setFiltros({ ...filtros, funcionario: e.target.value })}
        >
          <option value="">Todos os Funcionários</option>
          {funcionarios.map((f) => (
              <option key={f.id} value={`${f.nome} ${f.sobrenome}`}>
                {f.nome} {f.sobrenome}
              </option>
            ))}
        </select>
        <select
          value={filtros.tipo}
          onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
        >
          <option value="">Tipo</option>
          <option value="Limpeza">Limpeza</option>
          <option value="Manutenção">Manutenção</option>
        </select>
        <select
          value={filtros.status}
          onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
        >
          <option value="">Status</option>
          <option value="Em Aberto">Em Aberto</option>
          <option value="Em Procedimento">Em Procedimento</option>
          <option value="Com Complicacoes">Com Complicacoes</option>
          <option value="Concluído">Concluído</option>
        </select>
        <input
          type="datetime-local"
          value={filtros.dataHora}
          onChange={(e) => setFiltros({ ...filtros, dataHora: e.target.value })}
        />
        <button onClick={aplicarFiltros}>Pesquisar</button>
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
            {resultados.map((t) => (
              <tr key={t.id}>
                <td>{t.funcionario}</td>
                <td>{t.numero}</td>
                <td>{new Date(t.dataHora).toLocaleString()}</td>
                <td>
                  <span className={t.tipo === "Limpeza" ? "status-limpeza" : "status-manutencao"}>
                    {t.tipo.toUpperCase()}
                  </span>
                </td>
                <td>
                  <span className={`status-tag ${t.status?.toLowerCase().replace(/\s/g, "-")}`}>
                    {t.status}
                  </span>
                </td>
                <td>
                  <button onClick={() => removerTarefa(t.id)}>Excluir</button>
                  <button onClick={() => navigate("/atualizacao", { state: t })}>Atualizar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
