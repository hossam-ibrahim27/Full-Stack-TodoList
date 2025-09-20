import { useState, type ChangeEvent } from "react";
import useAuthenticatedQuery from "../Hooks";
import type { ITodo } from "../Interfaces";
import Paginator from "../UI/Paginator";
import SkeletonButton from "../UI/SkeletonButton";
import Button from "../UI/Button";
import SelectedPageSize from "../UI/SelectedPageSize";
import SelectedSortBy from "../UI/SelectedSortBy";
import { faker } from '@faker-js/faker';
import axiosInstance from "../configuration/axios.config";
import SkeletonTodos from "../UI/SkeletonTodos";

const Todos = () => {
    //@/*  ---------------------------- *** States *** ------------------------------ */
    const userDataString = localStorage.getItem("loggedUserData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>("DESC");
    const [queryVersion, setQueryVersion] = useState<number>(1)
    const { data, isPending, isFetching, isLoading } = useAuthenticatedQuery({
        url: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortBy}`,
        queryKey: [`todo-page-${page}`, `${pageSize}`, `${sortBy}`, `${queryVersion}`],
        config: {
            headers: {
                Authorization: `Bearer ${userData.jwt}`
            },
        }
    });
    console.log(data);
    //@/*  ---------------------------- *** Handlers *** ------------------------------ */
    const onClickPrev = () => {
        setPage(prev => prev - 1);
    }
    const onClickNext = () => {
        setPage(prev => prev + 1);
    }
    const onChangePageSizeHandler = (evt: ChangeEvent<HTMLSelectElement>) => {
        setPageSize(+evt.target.value);
    }
    const onChangeSortByHandler = (evt: ChangeEvent<HTMLSelectElement>) => {
        setSortBy(evt.target.value);
    }
    const onGenerateTodosHandler = async () => {
        for (let i = 0; i < 10; i++) {
            try {
                const response = await axiosInstance.post(`todos`, {
                    data: { title: faker.word.words(3), description: faker.lorem.paragraph(), users: [userData.user.documentId] }
                }, {
                    headers: {
                        Authorization: `Bearer ${userData.jwt}`,
                    }
                });
                if (response.status === 201) {
                    setQueryVersion(prev => prev + 1);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    if (isPending) return (
        <div className="@container">
            <div role="status" className="w-[90%] @md:w-[85%] @2xl:w-[75%] @4xl:w-[60%] @6xl:w-[40%] mt-15 m-auto font-medium px-4 py-8 space-y-4 border border-gray-200 rounded-md shadow-sm animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                {
                    Array.from({ length: 10 }, (_, idx) => (
                        <SkeletonTodos key={idx} />
                    ))
                }
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
    //@/*  ---------------------------- *** JSX *** ------------------------------ */
    return (
        <main className="@container">
            <div className="w-[90%] @md:w-[85%] @2xl:w-[75%] @4xl:w-[60%] @6xl:w-[40%] mt-15 m-auto font-medium space-y-1">
                {
                    isPending ?
                        <div className="@container">
                            <div role="status" className="w-[90%] @md:w-[85%] @2xl:w-[75%] @4xl:w-[60%] @6xl:w-[40%] m-auto font-medium border py-4 border-gray-200 rounded-md shadow-sm animate-pulse dark:divide-gray-700 dark:border-gray-700">
                                {
                                    Array.from({ length: 1 }, (_, idx) => (
                                        <SkeletonButton key={idx} />
                                    ))
                                }
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        :
                        <div className="flex justify-between items-center space-x-2 mb-5">
                            <Button type="button" buttonWidth="w-fit" onClick={onGenerateTodosHandler}
                                variant="block py-2 px-5 bg-slate-800">
                                Generate 10 FAKE TODOS
                            </Button>
                            <div className="flex justify-center items-center space-x-2">
                                <SelectedSortBy value={sortBy} onChange={onChangeSortByHandler} />
                                <SelectedPageSize title="Page Size" options={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} value={pageSize} onChange={onChangePageSizeHandler} />
                            </div>
                        </div>
                }
                {
                    (data?.data.length) ? (data?.data.map((todo: ITodo) => {
                        if (todo.publishedAt) {
                            return (
                                <div key={todo.id} className="flex flex-col justify-center space-y-1 p-3 rounded-md even:bg-slate-50">
                                    <div className="font-bold">{todo.id}- {todo.title}</div>
                                    <div className="text-gray-600">{todo.description}</div>
                                </div>
                            )
                        }
                    })) : <h3 className="text-slate-800 text-center"> No Todo Created</h3>
                }
                <Paginator load={isLoading || isFetching || data.data.length === 0} page={page} pageCount={data.meta.pagination.pageCount} total={data.meta.pagination.total} onClickPrev={onClickPrev} onClickNext={onClickNext} />
            </div>
        </main >
    );
}

export default Todos;
