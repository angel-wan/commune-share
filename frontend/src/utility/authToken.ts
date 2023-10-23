// get user auth token from local storage
const getAuthToken = () => {
  const authToken = localStorage.getItem("persist:auth");
  if (authToken) {
    const token = JSON.parse(JSON.parse(authToken).userInfo).token;
    return token;
  }
  return null;
};

export { getAuthToken };
