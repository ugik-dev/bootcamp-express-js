module.exports = (func) => {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
};
