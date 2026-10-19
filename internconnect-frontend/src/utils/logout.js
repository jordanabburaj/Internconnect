const logout = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/");
};

export default logout;