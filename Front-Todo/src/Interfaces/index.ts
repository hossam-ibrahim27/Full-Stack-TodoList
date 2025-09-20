import type { TInputName, TInputType, TLoginName } from "../Types";

export interface IInputs {
    type: TInputType;
    inputName: TInputName;
    id: string;
    inputLabel: string;
    validation: {
        required?: string;
        minLength?: number;
        pattern?: RegExp;
    }
}

export interface IInputsLogin {
    type: TInputType;
    inputName: TLoginName;
    id: string;
    inputLabel: string;
    validation: {
        required?: string;
        minLength?: number;
        pattern?: RegExp;
    }
}

export interface IErrorAxios {
    data: null;
    error: {
        details: object;
        message: string;
        status: number;
    }
}

export interface ITodo {
    id: number,
    title: string,
    description: string;
    publishedAt: string;
    documentId: string
}

