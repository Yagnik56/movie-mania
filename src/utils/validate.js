export const checkValidData = (email, password, name = null) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/

    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = passwordRegex.test(password);
    const isNameValid = nameRegex.test(name);

    if (!isEmailValid) return "Email is not a valid."
    if (!isPasswordValid) return "Password is not a valid."
    if (name!=null && !isNameValid) return "Name is not a valid."

    return null;
}