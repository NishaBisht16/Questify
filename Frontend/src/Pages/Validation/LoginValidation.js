

export default function LoginValidation({ Email, Password }) {
    let errors = {};

    // Validate Email
    if (!Email) {
        errors.Email = "Email is required";
    }

    // Validate Password
    if (!Password) {
        errors.Password = "Password is required";
    }

    return errors;
}
