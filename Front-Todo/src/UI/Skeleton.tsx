const Skeleton = () => {
    return (
        <>
            <div className="flex items-center px-3 justify-between">
                <div className="py-1.5 px-20 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                <div className="flex items-center space-x-2">
                    <div className="py-3 px-8 bg-gray-300 rounded-md dark:bg-gray-400"></div>
                    <div className="py-3 px-8 bg-gray-300 rounded-md dark:bg-gray-400"></div>
                </div>
            </div>
        </>
    );
}

export default Skeleton;
