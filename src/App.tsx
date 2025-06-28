import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Home/Home";
import { CadastroDeTarefas } from "./CadastroDeTarefas/CadastroDeTarefas";
import { CadastroFuncionario } from "./CadastroFuncionario/CadastroFuncionario";
import { ListaFuncionarios } from "./CadastroFuncionario/ListaFuncionarios";
import { AtualizacaoFuncionario } from "./CadastroFuncionario/AtualizacaoFuncionario";
import { PesquisaDeTarefas } from "./PesquisaDeTarefas/PesquisaDeTarefas";
import { AtualizacaoDeTarefas } from "./AtualizacaoDeTarefas/AtualizacaoDeTarefas";
import { DadosProvider } from "./Context/DadosContext";

function App() {
  return (
    <DadosProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<CadastroDeTarefas />} />
          <Route path="/pesquisa" element={<PesquisaDeTarefas />} />
          <Route path="/atualizacao" element={<AtualizacaoDeTarefas />} />
          <Route path="/cadastro-funcionario" element={<CadastroFuncionario />} />
          <Route path="/funcionarios" element={<ListaFuncionarios />} />
          <Route path="/atualizar-funcionario" element={<AtualizacaoFuncionario />} />
        </Routes>
      </Router>
    </DadosProvider>
  );
}

export default App;
