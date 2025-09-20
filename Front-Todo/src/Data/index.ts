import type { IInputs, IInputsLogin } from "../Interfaces";

export const RegisterInputs: IInputs[] = [
    {
        type: "text", id: "username", inputLabel: "Username", inputName: "username",
        validation: {
            required: "Username is Required",
            minLength: 5
        }
    },
    {
        type: "email", id: "email", inputLabel: "Email", inputName: "email",
        validation: {
            required: "Email is Required",
            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
        }
    },
    {
        type: "password", id: "password", inputLabel: "Password", inputName: "password",
        validation: {
            required: "Password is Required",
            minLength: 6
        }
    },
]
export const LoginInputs: IInputsLogin[] = [
    {
        type: "email", id: "email", inputLabel: "Email", inputName: "identifier",
        validation: {
            required: "Email is Required",
            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
        }
    },
    {
        type: "password", id: "password", inputLabel: "Password", inputName: "password",
        validation: {
            required: "Password is Required",
            minLength: 6
        }
    },
]