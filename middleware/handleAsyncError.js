function handleAsyncError(func) {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = handleAsyncError
