export const TryCatch = fn => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        console.log(error)
        next([INTERNAL_SERVER_ERROR, error?.message])
    }
}


// Successful Responses
export const OK = 200;
export const CREATED = 201;

// Client Error Responses
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const PAYMENT_REQUIRED = 402;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;

// Server Error Responses
export const INTERNAL_SERVER_ERROR = 500;
export const BAD_GATEWAY = 502;
export const SERVICE_UNAVAILABLE = 503;
export const GATEWAY_TIMEOUT = 504;