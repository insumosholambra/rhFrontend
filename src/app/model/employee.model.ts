import { Department } from "./department.model";
import { Role } from "./role.model";

export interface Employee {
  ID: number;
  PASSWORD: string;
  NOME: string;
  SOBRENOME: string;
  CPF: string;
  RG: string;
  DATA_NASCTO: string;
  ENDERECO: string;
  BAIRRO: string;
  CIDADE: string;
  ESTADO: string;
  TELEFONE: string;
  TEL_COMERCIAL: string;
  DATA_CADASTRO: string;
  RAMAL: string;
  EMAIL: string | null;
  DEPARTAMENTO: Department | null;
  CARGO: Role | null;
  ULTIMO_PERIODO_FERIAS: string | null;
  SALDO_FERIAS: number | null;
  MATRICULA: number;
}
