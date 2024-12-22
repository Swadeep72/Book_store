export const validateUser = ({ userName, email, password, address }) => {
    if (!userName) {
        throw new Error('User name is required');
    } else if (!email) {
        throw new Error("Email is required");
    } else if (!password) {
        throw new Error("Password is required");
    } else if (!address) {
        throw new Error("Address is required");
    } else {
        if (!(userName?.length > 3 && userName?.length < 20)) {
            throw new Error('User name must be between 3 and 20 characters long');
        }
        if (password?.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
    }
    return true;
}

export const validateBook = ({ url, title, author, description, price, language }) => {
    if (!url) {
        throw new Error('URL is required');
    } else if (!title) {
        throw new Error("Title is required");
    } else if (!author) {
        throw new Error("Author is required");
    } else if (!description) {
        throw new Error("Description is required");
    } else if (!price) {
        throw new Error("Price is required");
    } else if (!language) {
        throw new Error("Language is required");
    } else {
        if (price < 0) {
            throw new Error('Price must be a positive number');
        }
    }
    return true;
}