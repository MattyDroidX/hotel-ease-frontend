import { useEffect, useState } from "react";
import api from "../services/api";
import { Funcionario } from "../Models/Funcionario";

export const useFuncionarios = () => {
  const [dados, setDados] = useState<Funcionario[]>([]);

  useEffect(() => {
    api.get("/funcionarios")
      .then(res => setDados(res.data.dados ?? []))
      .catch(err => {
        console.error("Erro ao buscar funcionários:", err);
        setDados([]);
      });
  }, []);

  const options = dados
    .filter(f => f.ativo)
    .map(f => ({
      id:   f.id,                    
      text: `${f.nome} ${f.sobrenome}`
  }));


  return options;
};