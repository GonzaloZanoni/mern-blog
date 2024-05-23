export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
  };


//   export const errorHandler = (statusCode, message) => {
//     const error = new Error(message);
//     error.statusCode = statusCode;
//     return error;
// };