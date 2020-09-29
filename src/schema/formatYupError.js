export default (err) => {
  const errors = [];
  err.inner.forEach((e) => {
    errors.push({
      path: e.path,
      message: e.message,
    });
  });

  return errors;
};
