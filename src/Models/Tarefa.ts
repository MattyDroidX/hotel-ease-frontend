export interface Tarefa {
  id: string;
  numero: string;
  funcionario: string;
  funcionarioId: string;
  descricao: string;
  dataHora: string;
  status: "Em Aberto" | "Em Procedimento" | "Com Complicacoes" | "Concluído";
  tipo: "Limpeza" | "Manutenção";
}
