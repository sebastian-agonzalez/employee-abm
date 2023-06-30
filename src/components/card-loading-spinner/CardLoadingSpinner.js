import LoadingSpinner from "../loading-spinner/LoadingSpinner";

const CardLoadingSpinner = () => {
    return (

        <div className="flex justify-center items-center my-3 p-8 card-shadow-no-animation bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 h-96 max-w-xl w-full">
            <LoadingSpinner size={20} />
        </div>

    );
}

export default CardLoadingSpinner;