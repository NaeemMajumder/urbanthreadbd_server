/**
 * middlewares/validate.js

    Request body সঠিক format এ আছে কিনা চেক করে — ভুল হলে error দেয়

    const { error } = schema.validate(req.body);
    if (error) throw new AppError(error.message, 400);
 * 
 */