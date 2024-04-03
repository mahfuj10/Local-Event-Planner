const extractUser = (user) => {
  return {
    name: user.displayName,
    accessToken: user.accessToken,
    email: user.email,
    uid: user.uid,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
    emailVerified: user.emailVerified
  };
};
  
export const useUtils = () => {
  return {
    extractUser
  };
};
  