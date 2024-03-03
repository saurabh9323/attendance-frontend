// import decodeJWT from "./decodejwt";

// // Helper function to check if the token is valid
// const isTokenValid = () => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     const decoded = decodeJWT(token); // Use decodeJWT function
//     const currentTime = Date.now() / 1000;
//     return decoded.exp > currentTime;
//   }
//   return false;
// };

// export default isTokenValid;

// Check if token is valid
// Get token from cookies
const getTokenFromCookies = () => {
  console.log(document.cookie);
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
