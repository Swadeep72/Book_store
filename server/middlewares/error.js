export default function (err, req, res, next) {
    console.log('Error object:', err);
    res.status(err?.[0] || 500).json({
        status: 0,
        message: err?.[1] || 'Internal Server Error'
    });
}