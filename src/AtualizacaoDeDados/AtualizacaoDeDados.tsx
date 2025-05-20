import React from "react";
import "./AtualizacaoDeDados.css";

export const AtualizacaoDeDados: React.FC = () => {
  return (
    <div className="atualizacao-container">
      <h2>Atualização de Dados</h2>
      <form className="form">
        <input type="text" value="101" placeholder="Número do Quarto" />
        <input type="text" value="Maria" placeholder="Funcionário" />
        <input type="datetime-local" value="2024-06-01T10:00" />
        <input type="text" value="Limpeza completa" />
        <select defaultValue="pendente">
          <option value="pendente">Pendente</option>
          <option value="concluido">Concluído</option>
        </select>
        <div className="radio-group">
          <label><input type="radio" name="tipo" defaultChecked /> Manutenção</label>
          <label><input type="radio" name="tipo" /> Limpeza</label>
        </div>
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
};
