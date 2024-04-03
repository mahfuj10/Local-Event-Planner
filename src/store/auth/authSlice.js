import { createSlice } from '@reduxjs/toolkit';
import { useUtils } from '../../utils/useUtils';
import firebase from 'firebase/compat/app';
import { auth } from '../../services/firebase';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
    loading: true
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});


export const signOut = () => async (dispatch) => {
  try {
    await auth.signOut();
    const utils = useUtils();
    dispatch(setUser(utils.extractUser({})));
  } catch (error) {
    console.error('Sign out error:', error.message);
  }
};

export const signInWithGoogle = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    
    const provider = new firebase.auth.GoogleAuthProvider();
    const userCredential = await auth.signInWithPopup(provider);
    
    const utils = useUtils();
    const extractedUser = utils.extractUser(userCredential.user);

    dispatch(setUser(extractedUser));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const initAuthListener = (dispatch) => {
  dispatch(setLoading(true));
  auth.onAuthStateChanged((user) => {
    if (user) {
      const utils = useUtils();
      const extractedUser = utils.extractUser(user);
      console.log('user ===>', extractedUser);
      dispatch(setUser(extractedUser));
    } else {
      console.log('no user');
    }
    dispatch(setLoading(false));
  });
};

export const { setUser, setError, clearError, setLoading } = authSlice.actions;

export const selectUser = (state) => state.auth?.user;
export const selectError = (state) => state.auth?.error;
export const selectLoading = (state) => state.auth?.loading;


export default authSlice.reducer;
