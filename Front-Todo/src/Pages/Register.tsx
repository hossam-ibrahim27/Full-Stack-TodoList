import { RegisterInputs } from "../Data";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { IErrorAxios, IInputs } from "../Interfaces";
import Errors from "../Components/Errors";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../Validation";
import axiosInstance from "../configuration/axios.config";
import toast from 'react-hot-toast';
import { useState } from "react";
import type { AxiosError } from "axios";
import { Link, useNavigate } from "react-router";

interface IFormInput {
    username: string;
    email: string;
    password: string;
}


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({ resolver: yupResolver(registerSchema), });
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const navigate = useNavigate();
    //@/*  ---------------------------- *** Handler *** ------------------------------ */
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log("hossam");
        setIsLogin(true)
        //* Handel Register 
        try {
            const response = await axiosInstance.post("/auth/local/register", data);
            if (response.status === 200) {
                toast.success('You Will Navigate to the login after 3 seconds to login', {
                    duration: 2000,
                    style: {
                        padding: '16px',
                        color: '#FFFAEE',
                        backgroundColor: "#1d293d",
                        width: "fit-content"
                    },
                    iconTheme: {
                        primary: '#FFFAEE',
                        secondary: '#1d293d',
                    },
                })
            }
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (error) {
            const axiosError = error as AxiosError<IErrorAxios>;
            toast.error(`${axiosError.response?.data.error.message}`, {
                duration: 2000,
                style: {
                    padding: '16px',
                    color: '#FFFAEE',
                    backgroundColor: "oklch(45.5% 0.188 13.697)",
                    width: "fit-content"
                },
                iconTheme: {
                    primary: '#FFFAEE',
                    secondary: 'oklch(45.5% 0.188 13.697)',
                },
            })
        } finally {
            setIsLogin(false)
        }
    }
    //@/*  ---------------------------- *** Renders *** ------------------------------ */
    const renderFormInputs = RegisterInputs.map(({ id, inputLabel, type, inputName, validation }: IInputs) => (
        <div key={id}>
            <Input id={id} inputLabel={inputLabel} inputName={inputName} type={type}
                {...register(inputName, validation)} />
            {errors[inputName] && <Errors msg={errors[inputName]?.message} />} {/*//* ?. == because it option*/}
        </div>
    ))
    //@/*  ---------------------------- *** JSX *** ------------------------------ */
    return (
        <main className="@container">
            <div className="w-[90%] @md:w-[85%] @2xl:w-[75%] @4xl:w-[60%] @6xl:w-[40%] m-auto text-center mt-15 grid grid-flow-row space-y-4">
                <h2 className="font-medium text-slate-800 text-2xl">Register To Get Access !</h2>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    {renderFormInputs}
                    <p className="text-left font-bold">Have an Account ? <Link className="text-indigo-600" to={"/login"}>Go to login</Link></p>
                    <Button type="submit" buttonWidth="w-full" isLoading={isLogin}
                        variant="py-3 bg-slate-800 disabled flex justify-center items-center">
                        Register
                    </Button>
                </form>
            </div>

        </main>
    );
}

export default Register;