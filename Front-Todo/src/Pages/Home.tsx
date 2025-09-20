import { useState, type ChangeEvent, type FormEvent } from "react";
import useAuthenticatedQuery from "../Hooks";
import Button from "../UI/Button";
import Model from "../UI/Model";
import Input from "../UI/Input";
import TextArea from "../UI/TextArea";
import type { ITodo } from "../Interfaces";
import axiosInstance from "../configuration/axios.config";
import toast from "react-hot-toast";
import Skeleton from "../UI/Skeleton";
import SkeletonButton from "../UI/SkeletonButton";
import { faker } from '@faker-js/faker';



const Home = () => {
    //@/*  ---------------------------- *** Constants *** ------------------------------ */
    let counter = 1; //* Because V5 Of Strapi
    const defaultTodo = {
        id: 0, title: "", description: "", publishedAt: "", documentId: ""
    }
    const defaultAddTodo = {
        title: "", description: "", publishedAt: "", documentId: "",
    }
    //@/*  ---------------------------- *** States *** ------------------------------ */
    //@ 1) Edit.
    const [todoToEdit, setTodoToEdit] = useState<ITodo>(defaultTodo);
    const userDataString = localStorage.getItem("loggedUserData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const [queryVersion, setQueryVersion] = useState<number>(1)
    const { data, isPending } = useAuthenticatedQuery({
        url: "/users/me?populate=todos",
        queryKey: ['todoList', `${queryVersion}`],
        config: {
            headers: {
                Authorization: `Bearer ${userData.jwt}`
            },
        }
    })
    const [isOpenEditModel, setIsOpenEditModel] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    // @ 2) Removed.
    const [isOpenRemoveModel, setIsOpenRemoveModel] = useState<boolean>(false);
    // @ 3) Add 
    const [isOpenAddModel, setIsOpenAddModel] = useState<boolean>(false);
    const [todoToAdd, setTodoToAdd] = useState(defaultAddTodo);
    //@/*  ---------------------------- *** Handler *** ------------------------------ */
    //@ 1) Editing
    const onOpenModel = (todo: ITodo) => {
        setIsOpenEditModel(true);
        setTodoToEdit(todo)
    }
    const onCloseModel = () => {
        setTodoToEdit(defaultTodo)
        setIsOpenEditModel(false);
    }
    const onChangeHandler = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = evt.target;
        setTodoToEdit({ ...todoToEdit, [name]: value });
    }
    const onSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        setIsUpdating(true);
        try {
            const { description, title, documentId } = todoToEdit;
            const response = await axiosInstance.put(`todos/${documentId}`, {
                data: { title, description, }
            }, {
                headers: {
                    Authorization: `Bearer ${userData.jwt}`,
                }
            });
            console.log(response);
            if (response.status === 200) {
                onCloseModel();
                setQueryVersion(prev => prev + 1);
                toast("The Todo has been successfully Updated", {
                    duration: 2500,
                    position: 'bottom-center',
                    style: {
                        backgroundColor: "#1d293d ",
                        color: "#fff"
                    },
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsUpdating(false);
        }
    }
    // @ 2) Remove
    const openRemoveModel = (todo: ITodo) => {
        setIsOpenRemoveModel(true);
        setTodoToEdit(todo)
    }
    const closeRemoveModel = () => {
        setTodoToEdit(defaultTodo)
        setIsOpenRemoveModel(false);
    }
    const submitRemoveHandler = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        setIsUpdating(true);
        //* Remove Element In Todo List by api
        const { documentId } = todoToEdit;
        try {
            const response = await axiosInstance.delete(`todos/${documentId}`, {
                headers: {
                    Authorization: `Bearer ${userData.jwt}`
                }
            });
            if (response.status === 204) {
                closeRemoveModel();
                setQueryVersion(prev => prev + 1);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsUpdating(false);
        }
        toast("The Todo has been successfully removed from your store", {
            duration: 2500,
            position: 'bottom-center',
            style: {
                backgroundColor: "#a50036",
                color: "#fff"
            },
        });
    }
    const OnCancelRemoveHandler = (): void => {
        closeRemoveModel();
    }
    //@ 3) Add 
    const onOpenAddModel = () => {
        setIsOpenAddModel(true);
    }
    const onCloseAddModel = () => {
        setTodoToAdd(defaultAddTodo)
        setIsOpenAddModel(false);
    }
    const onChangeAddHandler = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = evt.target;
        setTodoToAdd({ ...todoToAdd, [name]: value });
    }
    const onSubmitAddHandler = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        setIsUpdating(true);
        try {
            const { description, title } = todoToAdd;
            const response = await axiosInstance.post(`todos`, {
                data: { title, description, users: [userData.user.documentId] }
            }, {
                headers: {
                    Authorization: `Bearer ${userData.jwt}`,
                }
            });
            if (response.status === 201) {
                onCloseAddModel();
                setQueryVersion(prev => prev + 1);
                toast("The Todo has been successfully Created", {
                    duration: 2500,
                    position: 'bottom-center',
                    style: {
                        backgroundColor: "#1d293d ",
                        color: "#fff"
                    },
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsUpdating(false);
        }
    }
    const onGenerateTodosHandler = async () => {
        setIsUpdating(true);
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
            } finally {
                setIsUpdating(false);
            }
        }
    }
    if (isPending) return (
        <div className="@container">
            <div role="status" className="w-[90%] @md:w-[85%] @2xl:w-[75%] @4xl:w-[60%] @6xl:w-[40%] mt-15 m-auto font-medium px-4 py-8 space-y-2 border border-gray-200 rounded-md shadow-sm animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                {
                    Array.from({ length: 10 }, (_, idx) => (
                        <Skeleton key={idx} />
                    ))
                }
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
    //@/*  ---------------------------- *** JSX *** ------------------------------ */
    return (
        <main className="@container">
            <div className="w-[90%] @md:w-[85%] @2xl:w-[75%] @4xl:w-[60%] @6xl:w-[40%] mt-15 m-auto font-medium space-y-2">
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
                        <div className="flex justify-center items-center space-x-2 mb-5">
                            <Button type="button" buttonWidth="w-fit"
                                variant="block py-2 px-5 bg-slate-800" onClick={onOpenAddModel}
                            >ADD NEW TODO</Button>
                            <Button type="button" buttonWidth="w-fit" onClick={onGenerateTodosHandler}
                                variant="block text-slate-800 py-2 px-5 border border-slate-800 hover:bg-slate-800 hover:text-gray-50">
                                Generate 10 Fake TODOS
                            </Button>
                        </div>
                }
                {
                    (data?.todos.length) ? (data?.todos.map((todo: ITodo) => {
                        if (todo.publishedAt) {
                            return <div key={todo.id} className="flex justify-between items-center p-3 rounded-md even:bg-gray-100">
                                <div>{counter++}- {todo.title}</div>
                                <div className="space-x-2">
                                    <Button type="button" buttonWidth="w-fit" variant="py-2 px-5 bg-slate-800"
                                        onClick={() => onOpenModel(todo)}>
                                        Edit
                                    </Button>
                                    <Button type="button" buttonWidth="w-fit" variant="py-2 px-5 bg-rose-700"
                                        onClick={() => openRemoveModel(todo)}>Remove</Button>
                                </div>
                            </div>
                        }
                    })) : <h3 className="text-slate-800"> No Todo Created</h3>
                }
            </div>
            {/*//@ 1) Editing Model */}
            <Model isOpen={isOpenEditModel} close={onCloseModel} title="EDIT THIS TODO">
                <form className="space-y-3" onSubmit={onSubmitHandler}>
                    <Input type="text" id="title" inputName="title" value={todoToEdit.title} inputLabel="Enter Title of Todo"
                        onChange={onChangeHandler} />
                    <TextArea inputName="description" value={todoToEdit.description} areaTitle="Enter Title of Todo"
                        onChange={onChangeHandler} />
                    <div className="space-x-3 flex items-center" >
                        <Button type="submit" buttonWidth="w-fit" variant="py-2 px-5 bg-slate-800 flex justify-center items-center"
                            isLoading={isUpdating} >Update</Button>
                        <Button type="button" buttonWidth="w-fit" variant="py-2 px-5 text-slate-800 bg-gray-300" onClick={() => onCloseModel()}>Cancel</Button>
                    </div>
                </form>
            </Model>
            {/*//@ 2) Remove Model*/}
            <Model isOpen={isOpenRemoveModel} title="Are You Sure You Want To Remove this Todo?" close={closeRemoveModel}>
                <form className="space-y-3" onSubmit={submitRemoveHandler}>
                    <p className="text-gray-600">Removing this Todo will permanently delete it from your store, including all of its details and associated information. This action is irreversible and cannot be undone, so please ensure you no longer need this Todo before proceeding.</p>
                    <div className="flex space-x-3 mt-5">
                        <Button type='submit' buttonWidth='w-full' isLoading={isUpdating}
                            variant="py-2 px-5 bg-rose-700 flex justify-center items-center"
                        >Yes, remove</Button>
                        <Button type='button' variant="text-slate-800 bg-gray-300 py-2 px-5" buttonWidth='w-full' onClick={OnCancelRemoveHandler}>Cancel</Button>
                    </div>
                </form>
            </Model>
            {/*//@ 3) Add Model */}
            <Model isOpen={isOpenAddModel} close={onCloseAddModel} title="ADD NEW TODO">
                <form className="space-y-3" onSubmit={onSubmitAddHandler}>
                    <Input type="text" id="title" inputName="title" value={todoToAdd.title} inputLabel="Enter Title of Todo"
                        onChange={onChangeAddHandler} />
                    <TextArea inputName="description" value={todoToAdd.description} areaTitle="Enter Title of Todo"
                        onChange={onChangeAddHandler} />
                    <div className="space-x-3 flex items-center" >
                        <Button type="submit" buttonWidth="w-fit" variant="py-2 px-5 bg-slate-800 flex justify-center items-center"
                            isLoading={isUpdating} >Done</Button>
                        <Button type="button" buttonWidth="w-fit" variant="py-2 px-5 text-slate-800 bg-gray-300" onClick={() => onCloseAddModel()}>Cancel</Button>
                    </div>
                </form>
            </Model>
        </main>
    );
};

export default Home;