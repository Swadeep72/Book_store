export const TryCatch = fn => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        console.log(error)
        next([500, error?.message])
    }
}