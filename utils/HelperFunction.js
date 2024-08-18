// class HelperFunction {
//     function wrapAsync(fn) {
//         return function (req, res, next) {
//           fn(req, res, next).catch(next);
//         };
//       }
// }

class HelperFunction {
  wrapAsync(fn) {
    return function (req, res, next) {
      fn(req, res, next).catch(next);
    };
  }

  calculateAge = (dob) => {
    console.log("run", dob);
    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    } else if (months === 0 && today.getDate() < birthDate.getDate()) {
      years--;
      months = 11;
    }

    return `${years} Tahun ${months} Bulan`;
  };
}

module.exports = new HelperFunction();
