import React from "react";
import "./PesquisaDeDados.css";
import { useDados } from "../Context/DadosContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-dark.png";

export const PesquisaDeDados: React.FC = () => {
  const { tarefas, remover } = useDados();
  const navigate = useNavigate();

  const [filtros, setFiltros] = React.useState({
    busca: "",
    funcionario: "",
    status: "",
    tipo: "",
    dataHora: "",
  });

  const [resultados, setResultados] = React.useState(tarefas);

  React.useEffect(() => {
    setResultados(tarefas);
  }, [tarefas]);

  const aplicarFiltros = () => {
    const filtradas = tarefas.filter((t) => {
      return (
        (!filtros.busca || t.descricao.toLowerCase().includes(filtros.busca.toLowerCase())) &&
        (!filtros.funcionario || t.funcionario.toLowerCase().includes(filtros.funcionario.toLowerCase())) &&
        (!filtros.status || t.status === filtros.status) &&
        (!filtros.tipo || t.tipo === filtros.tipo) &&
        (!filtros.dataHora || t.dataHora.startsWith(filtros.dataHora))
      );
    });
    setResultados(filtradas);
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
            Adicionar novo registro
          </button>
        </div>
      </div>

      <h2>Pesquisa De Dados</h2>
      <div className="filtro-wrapper">
        <input
          placeholder="Busca..."
          value={filtros.busca}
          onChange={(e) => setFiltros({ ...filtros, busca: e.target.value })}
        />
        <input
          placeholder="Funcionário"
          value={filtros.funcionario}
          onChange={(e) => setFiltros({ ...filtros, funcionario: e.target.value })}
        />
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
          <option value="Com Complicações">Com Complicações</option>
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
                <td>{t.dataHora}</td>
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
                  <button
                    onClick={() => {
                      const confirmado = window.confirm("Tem certeza que deseja excluir este registro?");
                      if (confirmado) remover(t.id);
                    }}
                  >
                    Excluir
                  </button>
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
