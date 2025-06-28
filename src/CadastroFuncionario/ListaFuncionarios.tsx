import React, { useState } from "react";
import "../PesquisaDeTarefas/PesquisaDeTarefas.css";
import { useDados } from "../Context/DadosContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-dark.png";

export const ListaFuncionarios: React.FC = () => {
  const { funcionarios, removerFuncionario } = useDados();
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    busca: "",
    cargo: "",
    ativo: "",
  });

  const [resultados, setResultados] = React.useState(funcionarios);

  React.useEffect(() => {
    setResultados(funcionarios);
  }, [funcionarios]);

  const aplicarFiltro = () => {
    const termo = filtros.busca.toLowerCase();
    const filtrados = funcionarios.filter((f) =>
      (!filtros.busca || `${f.nome} ${f.sobrenome}`.toLowerCase().includes(termo)) &&
      (!filtros.cargo || f.cargo.toLowerCase().includes(filtros.cargo.toLowerCase())) &&
      (!filtros.ativo || String(f.ativo) === filtros.ativo)
    );
    setResultados(filtrados);
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
          <button className="btn-voltar" onClick={() => navigate("/cadastro-funcionario")}>
            Adicionar Funcionário
          </button>
        </div>
      </div>

      <h2>Funcionários Ativos</h2>

      <div className="filtro-wrapper">
        <select
          value={filtros.busca}
          onChange={(e) => setFiltros({ ...filtros, busca: e.target.value })}
        >
          <option value="">Todos os Funcionários</option>
          {funcionarios.map((f) => (
            <option key={f.id} value={`${f.nome} ${f.sobrenome}`}>
              {f.nome} {f.sobrenome}
            </option>
          ))}
        </select>
        <input
          placeholder="Cargo"
          value={filtros.cargo}
          onChange={(e) => setFiltros({ ...filtros, cargo: e.target.value })}
        />
        <select
          value={filtros.ativo}
          onChange={(e) => setFiltros({ ...filtros, ativo: e.target.value })}
        >
          <option value="">Todos</option>
          <option value="true">Ativos</option>
          <option value="false">Inativos</option>
        </select>
        <button onClick={aplicarFiltro}>Pesquisar</button>
      </div>

      <div className="tabela-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Cargo</th>
              <th>Situacao</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((f) => (
              <tr key={f.id}>
                <td>{`${f.nome} ${f.sobrenome}`}</td>
                <td>{f.email}</td>
                <td>{f.telefone}</td>
                <td>{f.cargo}</td>
                <td>
                  <span className={`status-tag ${f.ativo ? "ativo" : "inativo"}`}>
                    {f.ativo ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => {
                      const confirmar = window.confirm("Tem certeza que deseja excluir este funcionário?");
                      if (confirmar) removerFuncionario(f.id);
                    }}
                  >
                    Excluir
                  </button>
                  <button onClick={() => navigate("/atualizar-funcionario", { state: f })}>
                    Atualizar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
