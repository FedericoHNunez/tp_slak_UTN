const successResponse = (res, message, data = null, status = 200) => {
    return res.status(status).json({
        ok: true,
        status,
        message,
        data,
    });
};

export default successResponse;