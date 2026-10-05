function jsonErrorHandler(err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            ok: false,
            status: 400,
            message: "El formato JSON enviado es inválido. Verifica comillas y sintaxis."
        });
    }
    next();
};

export default jsonErrorHandler;