import { AlertTypes } from '@/ts/enum';

export interface AlertInterface {
  id?: number;
  type: AlertTypes;
  title: string;
  message: string;
  accept?: () => void;
  reject?: () => void;
  close?: () => void;
  withoutClosing: boolean;
  timeout: number;
}
