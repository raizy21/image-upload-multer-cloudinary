const errorHandler = (err, req, res, next) => {
  if (process.env.ENVIRONMENT !== "production") console.error(err);
  res
    .status(err.statusCode ?? 500)
    .json({ message: err.message ?? "Something went wrong!" });
};

export default errorHandler;
