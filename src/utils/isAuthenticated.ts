// import jwtDecode from 'jwt-decode';

// Simple check for JWT existence
export const isAuthenticated = () => {
  const token = localStorage.getItem('jwtToken');
  return !!token;
};

export const logout = () => {
  localStorage.removeItem('jwtToken');
  // TODO: additional cleanup like resetting store states if using Redux/MobX etc.
};

// TODO: Add a more complex check with expiration
// interface MyToken {
//   name: string;
//   exp: number;
//   // whatever else is in the JWT.
// }
// export function isAuthenticatedWithExpirationCheck() {
//   const token = localStorage.getItem('jwtToken');
//   if (!token) return false;

//   try {
//     const { exp } = jwtDecode(token);
//     const isExpired = Date.now() >= exp * 1000;
//     return !isExpired;
//   } catch (error) {
//     return false; // if the token is invalid or expired
//   }
// }
