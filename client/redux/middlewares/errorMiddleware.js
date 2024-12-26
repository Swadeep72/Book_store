import { toast } from "react-toastify";

const errorMiddleware = store => next => ({ type, error: err, payload }) => {
    if (type.endsWith('/rejected')) {
        [err, err?.message, type?.split('/rejected')[0]]?.map((e, i) => console.log(`${i ? (i > 1 ? "Action Name" : "Message") : "Error"}`, ":", e))
        toast.error("Something went wrong. \n Please try again later.");
    }
    return next({ type, payload })
    // return next({ type, error: err })
};

export default errorMiddleware;