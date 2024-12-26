
export interface IProfile {
    id: string | null;
    first_name: string;
    last_name: string;
    email: string;
    contact_number: string;
    profile_pic: string;
    role: string;
    status: string;
}
export const defaultProfile: IProfile = {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    profile_pic: "",
    role: "",
    status: "ACTIVE",
}

export interface IResetPassword {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const defaultResetPassword: IResetPassword = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
}