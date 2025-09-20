import * as yup from "yup"

export const registerSchema = yup.object({
    username: yup.string().required("UserName is Required").min(5, "UserName Must be More Than 5"),
    email: yup.string().required("Email is Required").matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not Valid Email Address"),
    password: yup.string().required("Password is Required").min(4, "Password Length Must between 4 and 8").max(8, "Password Length Must between 4 and 8")
}).required();
export const LoginSchema = yup.object({
    identifier: yup.string().required("Email is Required").matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not Valid Email Address"),
    password: yup.string().required("Password is Required").min(4, "Password Length Must between 4 and 8").max(8, "Password Length Must between 4 and 8")
}).required();

