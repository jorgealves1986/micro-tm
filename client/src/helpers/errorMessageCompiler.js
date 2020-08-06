export default error => {
  if (error.response.data.errors) {
    const errors = error.response.data.errors;
    let message = '';

    for (let i = 0; i < errors.length; i++) {
      message += errors[i].message;
      if (i < errors.length) {
        message += '\n';
      }
    }

    return message;
  }

  if (error.message) {
    return error.message;
  }

  return 'Something went wrong!';
};
