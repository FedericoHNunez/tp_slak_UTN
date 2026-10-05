function errorHandler(error, req, res, next) {
    //error controlado
    if (error.status) {
        return res.status(error.status).json({
            ok: false,
            status: error.status,
            message: error.message,
        });
    }
    //error no controlado
    else {
        console.error("Error no controlado:", error);
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "internal server error",
        });
    }
};

export default errorHandler;
