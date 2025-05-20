import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Home/Home";
import { CadastroDeDados } from "./CadastroDeDados/CadastroDeDados";
import { PesquisaDeDados } from "./PesquisaDeDados/PesquisaDeDados";
import { AtualizacaoDeDados } from "./AtualizacaoDeDados/AtualizacaoDeDados";
import { DadosProvider } from "./Context/DadosContext";

function App() {
  return (
    <DadosProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<CadastroDeDados />} />
          <Route path="/pesquisa" element={<PesquisaDeDados />} />
          <Route path="/atualizacao" element={<AtualizacaoDeDados />} />
        </Routes>
      </Router>
    </DadosProvider>
  );
}

export default App;
