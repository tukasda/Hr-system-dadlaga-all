function LoginValidation(values) {
    let errors = {};

    if (!values.email) {
        errors.email = 'И-мэйл хаяг оруулна уу.';
    }

    if (!values._password) {
        errors._password = 'Нууц үгээ оруулна уу.';
    }

    return errors;
}

export default LoginValidation;