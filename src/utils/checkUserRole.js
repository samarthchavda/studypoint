export const checkUserRole = (user, role) => {
    if (!user || !user.role) {
        return false; 
    }
    return user.role === role;
}