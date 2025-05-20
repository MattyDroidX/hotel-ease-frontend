import React, { createContext, useContext, useState, ReactNode } from "react";

export type Tarefa = {
  id: string;
  numero: string;
  funcionario: string;
  descricao: string;
  dataHora: string;
  status: string;
  tipo: "Manutenção" | "Limpeza";
};

type ContextType = {
  tarefas: Tarefa[];
  adicionar: (tarefa: Tarefa) => void;
  remover: (id: string) => void;
};

const DadosContext = createContext<ContextType | undefined>(undefined);

export const useDados = () => {
  const context = useContext(DadosContext);
  if (!context) throw new Error("useDados deve ser usado dentro do DadosProvider");
  return context;
};

export const DadosProvider = ({ children }: { children: ReactNode }) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const adicionar = (tarefa: Tarefa) => {
    setTarefas((prev) => [...prev, tarefa]);
  };

  const remover = (id: string) => {
    setTarefas((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <DadosContext.Provider value={{ tarefas, adicionar, remover }}>
      {children}
    </DadosContext.Provider>
  );
};
