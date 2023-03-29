const errorStatus = {
    IS_REQUIRED: 400,
    INVALID_FIELDS: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
  };
  
  const errorMessages = {
    IS_REQUIRED: 'Some required fields are missing',
    INVALID_FIELDS: 'Invalid fields',
    USER_NOT_EXIST: 'User does not exist',
    INVALID_CATEGORY: 'one or more "categoryIds" not found',
    POST_NOT_EXIST: 'Post does not exist',
    UNAUTHORIZED_USER: 'Unauthorized user',
  };

  const customError = (status, message) => ({ status, message });
  
  module.exports = {
    errorStatus,
    errorMessages,
    customError,
  };