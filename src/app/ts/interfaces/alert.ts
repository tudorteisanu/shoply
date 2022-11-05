export interface AlertInterface {
  id?: number;
  type: string;
  title: string;
  message: string;
  accept?: () => void;
  reject?: () => void;
  close?: () => void;
  withoutClosing: boolean;
  timeout: number;
}
