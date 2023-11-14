const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;

// app.get('/example', async (req, res, next) => {
//   try {
//     const result = await someAsyncOperation();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });
