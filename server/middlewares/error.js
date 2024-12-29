import { INTERNAL_SERVER_ERROR } from "../utils/helperUtils.js";

export default function (err, req, res, next) {
    console.log('Error object:', err);
    res.status(err?.[0] || INTERNAL_SERVER_ERROR).json({
        status: 0,
        message: err?.[1] || 'Internal Server Error'
    });
}