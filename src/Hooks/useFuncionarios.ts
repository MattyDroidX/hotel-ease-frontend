import { useEffect, useState } from "react";
import api from "../services/api";
import { Funcionario } from "../Models/Funcionario";

export const useFuncionarios = () => {
  const [dados, setDados] = useState<Funcionario[]>([]);

  useEffect(() => {
    api.get("/funcionarios")
      .then(res => setDados(res.data.filter((f: Funcionario) => f.ativo)))
      .catch(err => console.error("Erro ao buscar funcionários:", err));
  }, []);

  return dados;
};