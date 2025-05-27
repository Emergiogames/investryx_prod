import * as Yup from "yup";

export const initialValues = {
    // name: "",
    // email: "",
    password: "",
    confirmPassword: "",
    // phone: "",
};

export const renewPasswordValidation = Yup.object({
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required")
        .matches(/^\S+$/, "Password should not contain spaces") // Disallow spaces
        .max(100, "Maximum 100 characters allowed") // Limit to 100 characters
        .test(
            "password-complexity",
            "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character.",
            (value) => {
                const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).*$/;
                return regex.test(value);
            }
        )
        .test("password-common", "Password is too common.", (value) => {
            const commonPasswords = ["Password123!", "12345678", "qwerty123", "abcdefg1"]; // Add more as needed
            return !commonPasswords.includes(value);
        })
        .test("password-no-username", "Password should not contain the username.", function (value) {
            const username = this.parent.name; // Access the username field
            if (!username || !value) return true; // Skip validation if either is missing
            return !value.toLowerCase().includes(username.toLowerCase()); // Case-insensitive check
        }),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required")
        .matches(/^\S+$/, "Confirm password should not contain spaces") // Disallow spaces
        .max(100, "Maximum 100 characters allowed"), // Limit to 100 characters
});
