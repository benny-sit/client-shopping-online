export interface loginRequestInterface{
    username: string;
    password: string;
}

export interface registerRequestInterface {
    username: string;
    password: string;
    userDetails: {
        firstName: string;
        lastName: string;
        email: string;
        idNumber: string;
        address: {
            city: string;
            street: string;
        }
    }
}

export interface AuthStateInterface {
    isSubmitting: boolean;
    CurrentUser: CurrentUserInterface | null;
    error: {
        message: string;
    } | null;
}

export interface CurrentUserInterface {
    username: string;
    id: string;
    isAdmin: boolean;
    token: string;  
}