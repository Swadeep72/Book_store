export const TryCatch = fn => async (...rest) => {
    try {
        await fn(...rest);
    } catch (error) {
        console.log(error)
        next([500, error?.message])
    }
}