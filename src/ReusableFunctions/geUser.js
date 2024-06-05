const userInfo = () => {
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem("user"));
    }
    return null;
};

export default userInfo;