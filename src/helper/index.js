export const onHandleLogout = (navigate) => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  navigate("/login");
};
