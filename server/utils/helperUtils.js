export const TryCatch = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        res.status(500).send({ status: 0, message: error?.message })
    }
}