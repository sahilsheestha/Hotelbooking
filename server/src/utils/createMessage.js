export const createError = (res, status, message) => {
  const err = new Error(message || "Something went wrong");
  err.status = status || 500;

  if (res && typeof res.status === "function") {
    return res.status(err.status).send({ message: err.message });
  } else {
    console.error("Response object is undefined in createError:", err.message);
    // Instead of crashing the app, just return the error object
    return err;
  }
};
