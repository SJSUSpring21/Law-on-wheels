const Token = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
};

export default Token;
