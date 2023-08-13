// external imports
const { check, validationResult } = require('express-validator');

const addCustomerValidator = [
  check('firstName')
    .isLength({ min: 1 })
    .withMessage('Name is required')
    .isAlpha('en-US', { ignore: ' -' })
    .withMessage('Name must not contain anything other then alphabet')
    .trim(),
  check('lastName')
    .isLength({ min: 1 })
    .withMessage('Name is required')
    .isAlpha('en-US', { ignore: ' -' })
    .withMessage('Name must not contain anything other then alphabet')
    .trim(),
  check('email').isEmail().withMessage('Invalid email address').trim(),

];

const addCustomerValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(500).json({ errors: mappedErrors });
  }
};

module.exports = { addCustomerValidator, addCustomerValidationHandler };

// if (req.files?.length > 0) {
//   const fileName = req.files[0].filename;
//   unlink(
//     path.join(__dirname, `/../../public/uploads/avatars/${fileName}`),
//     (err) => {
//       if (err) console.log(err);
//     },
//   );
// }
