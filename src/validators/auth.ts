import User, { IUser } from "../models/User";

export const signUpValidation = async (data: any) => {
    const errors: string[] = [];

    // 1) All fields should exist on the object
    const requiredFields = ["name", "surname", "nickname", "email", "password"];
    for (const field of requiredFields) {
        if (!(data?.[field])) {
            errors.push(`${field} is required.`);
        }
    }

    // 2) Email should be in a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data?.email) {
        const existingUser = await User.findOne({ nickname: data?.nickname })

        if (existingUser) {
            errors.push("User with this nickname is already exist");
        }

        if (!emailRegex.test(data?.email)) {
            errors.push("Invalid email format.");
        }
    }

    // 3) Name and surname must only contain letters
    const nameSurnameRegex = /^[a-zA-Z]+$/;
    if (data?.name && !nameSurnameRegex.test(data?.name)) {
        errors.push("Name should only contain letters.");
    }

    if (data?.surname && !nameSurnameRegex.test(data?.surname)) {
        errors.push("Surname should only contain letters.");
    }


    // 4) Nickname should contain only numbers, letters, and character "_"
    const nicknameRegex = /^[a-zA-Z0-9_]+$/;
    if (data?.nickname) {
        const existingUser = await User.findOne({ email: data?.email })

        if (existingUser) {
            errors.push("User with this email is already exist");
        }

        if (!nicknameRegex.test(data?.nickname)) {
            errors.push("Nickname should only contain numbers, letters, and underscores.");
        }
    }

    // 5) Password must be at least 8 characters
    if (data.password && data.password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }

    return errors
};
