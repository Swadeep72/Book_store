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
        if(password?.length<8){
            throw new Error('Password must be at least 8 characters long');
        }
    }
    return true;
}