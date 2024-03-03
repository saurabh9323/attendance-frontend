const getTokenFromCookies = () => {
  return document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("authToken="));
};
// Decode JWT token
const decodeJWT = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    return null;
  }
};

const isTokenValid = () => {
  const tokenCookie = getTokenFromCookies();
  if (tokenCookie) {
    const token = tokenCookie.split("=")[1];
    const decodedToken = decodeJWT(token);
    if (decodedToken && decodedToken.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTime;
    }
  }
  return false;
};
export default isTokenValid;
