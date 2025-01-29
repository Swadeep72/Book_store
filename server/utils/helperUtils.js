export const TryCatch = fn => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        console.log(error)
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)?.[0];
            return next([INTERNAL_SERVER_ERROR, `The ${field} "${err.keyValue[field]}" already exists.`])
            // return res.status(400).json({
            // message: `The ${field} "${err.keyValue[field]}" already exists.`,
            // });
        }
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

// Function to get all routes
export function printAllRoutes(app) {
    let routes = [];

    function extractRoutes(stack, basePath = '') {
        stack?.forEach(function (middleware) {
            if (middleware?.route) {
                routes.push({
                    path: basePath + middleware?.route?.path,
                    methods: Object?.keys(middleware?.route?.methods)?.join(", ")
                });
            } else if (middleware?.name === 'router') {
                extractRoutes(middleware?.handle?.stack, basePath + middleware?.regexp?.source);
            }
        });
    }

    extractRoutes(app?._router?.stack);
    return routes?.map(({ path, methods }) => `${path}: ${methods}`);
}