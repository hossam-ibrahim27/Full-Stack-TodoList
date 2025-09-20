import Button from "./Button";
interface IProps {
    page: number;
    pageCount: number;
    total: number;
    onClickPrev: () => void;
    onClickNext: () => void;
    load: boolean
}
const Paginator = ({ page, pageCount, onClickPrev, onClickNext, total, load }: IProps) => {

    return (
        <div className="flex flex-col justify-center items-center m-5 space-y-3">
            <div>
                <p className="text-center font-bold text-gray-500">Page <span className="text-slate-950">{page}</span>  to <span className="text-slate-950">{pageCount}</span>  of <span className="text-slate-950">{total}</span> Records</p>
            </div>
            <div className="flex justify-center items-center space-x-3">
                <Button type="button" buttonWidth="w-fit" isLoading={page === 1 || load} paginator={false} onClick={onClickPrev}
                    variant="py-2 px-4 space-x-3 bg-slate-800 flex justify-evenly items-center hover:bg-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    <span>Prev</span>
                </Button>
                <Button type="button" buttonWidth="w-fit" isLoading={page === pageCount || load} paginator={false} onClick={onClickNext}
                    variant="py-2 px-4 space-x-3 bg-slate-800 flex justify-evenly items-center hover:bg-slate-600">
                    <span>Next</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </Button>
            </div>

        </div>
    );
}

export default Paginator;
