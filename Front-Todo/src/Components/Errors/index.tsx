interface IProps {
    msg?: string;
}

const Errors = ({ msg }: IProps) => {
    return (
        <>
            {msg && <p className="text-rose-600 text-left">{msg}</p>}
        </>
    );
};

export default Errors;