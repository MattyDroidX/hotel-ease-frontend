export interface Tarefa {
  id: string;
  numero: string;
  funcionario: string;
  descricao: string;
  dataHora: string;
  status: "Em Aberto" | "Em Procedimento" | "Com Complicacoes" | "Concluído";
  tipo: "Limpeza" | "Manutenção";
}
