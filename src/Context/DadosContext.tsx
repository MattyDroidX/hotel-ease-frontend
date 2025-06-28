import React, { createContext, useContext, useState, ReactNode } from "react";

// ---------- TIPOS ----------
export type Tarefa = {
  id: string;
  numero: string;
  funcionario: string;
  descricao: string;
  dataHora: string;
  status: string;
  tipo: "Manutenção" | "Limpeza";
};

export type Funcionario = {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  cargo: string;
  ativo: boolean;
};

// ---------- CONTEXTO ----------
type ContextType = {
  // Tarefas
  tarefas: Tarefa[];
  adicionar: (tarefa: Tarefa) => void;
  remover: (id: string) => void;
  atualizar: (tarefa: Tarefa) => void;

  // Funcionários
  funcionarios: Funcionario[];
  adicionarFuncionario: (funcionario: Funcionario) => void;
  removerFuncionario: (id: string) => void;
  atualizarFuncionario: (f: Funcionario) => void;
};

const DadosContext = createContext<ContextType | undefined>(undefined);

export const useDados = () => {
  const context = useContext(DadosContext);
  if (!context) throw new Error("useDados deve ser usado dentro do DadosProvider");
  return context;
};

// ---------- PROVIDER ----------
export const DadosProvider = ({ children }: { children: ReactNode }) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  // TAREFAS
  const adicionar = (tarefa: Tarefa) => {
    setTarefas((prev) => [...prev, tarefa]);
  };

  const remover = (id: string) => {
    setTarefas((prev) => prev.filter((t) => t.id !== id));
  };

  const atualizar = (tarefaAtualizada: Tarefa) => {
    setTarefas((prev) =>
      prev.map((t) => (t.id === tarefaAtualizada.id ? tarefaAtualizada : t))
    );
  };

  // FUNCIONÁRIOS
  const adicionarFuncionario = (funcionario: Funcionario) => {
    setFuncionarios((prev) => [...prev, funcionario]);
  };

  const removerFuncionario = (id: string) => {
    setFuncionarios((prev) => prev.filter((f) => f.id !== id));
  };

  const atualizarFuncionario = (funcionarioAtualizado: Funcionario) => {
  setFuncionarios((prev) =>
    prev.map((f) => (f.id === funcionarioAtualizado.id ? funcionarioAtualizado : f))
  );
};

  return (
    <DadosContext.Provider
      value={{
        tarefas,
        adicionar,
        remover,
        atualizar,
        funcionarios,
        adicionarFuncionario,
        removerFuncionario,
        atualizarFuncionario,
      }}
    >
      {children}
    </DadosContext.Provider>
  );
};
