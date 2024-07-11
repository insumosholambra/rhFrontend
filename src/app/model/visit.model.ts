export interface Visit {
  ID: number;
  NOME: string;
  SOBRENOME?: string;
  DATA_VISITA?: Date;
  CLIENTE?: string;
  PROPRIEDADE?: string;
  CIDADE?: string;
  CULTURA?: string;
  OBJETIVO?: string;
  CHEGADA?: string; // Assumindo que seja uma string no formato 'HH:mm'
  SAIDA?: string; // Assumindo que seja uma string no formato 'HH:mm'
  CONTATO?: string;
  MOTIVO?: string;
  ASSUNTO?: string;
  CONDICOES_PROP?: string;
  PROBLEMAS?: string;
  MELHORIAS?: string;
  VISITA_FUTU?: string;
  NEW_DATE?: Date;
  DATA_FORM: Date;

}
