import React from "react";
import "./PesquisaDeDados.css";
import { useDados } from "../context/DadosContext";

export const PesquisaDeDados: React.FC = () => {
  const { tarefas, remover } = useDados();

  return (
    <div className="pesquisa-container">
      <h2>Pesquisa de Dados</h2>
      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
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
            {tarefas.map((t) => (
              <tr key={t.id}>
                <td>{t.funcionario}</td>
                <td>{t.numero}</td>
                <td>{t.dataHora}</td>
                <td>{t.tipo}</td>
                <td>{t.status}</td>
                <td>
                  <button onClick={() => remover(t.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
