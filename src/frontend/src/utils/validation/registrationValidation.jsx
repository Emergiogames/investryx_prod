import * as Yup from "yup";

export const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
};

export const validationSchema = Yup.object({
    name: Yup.string()
        .trim() // Removes leading and trailing spaces
        .matches(/^[A-Za-z]+(\s[A-Za-z]+)*$/, "Name can contain letters and a single space between words")
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(100, "Maximum 100 characters allowed"), // Limit to 100 characters

    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .max(100, "Maximum 100 characters allowed")
        .matches(/^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "Invalid email format.")
        .matches(
            /\.(com|net|org|gov|edu|info|io|co|biz|us|uk|in|ca|au|de|fr|jp|cn|ru|br|mx|es)$/,
            "Invalid or unknown domain extension"
        )
        .matches(/^\S+$/, "Email should not contain spaces"),

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

    phone: Yup.string()
        .required("Phone number is required")
        .transform((value) => value.replace(/\s+/g, "")) // Trim spaces
        .matches(/^\d{10}$/, "Phone number must contain exactly 10 digits and only numbers"),
});
