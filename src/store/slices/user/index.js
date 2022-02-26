import { createSlice } from '@reduxjs/toolkit';
import { firebaseConfig } from '../../../../config/database/firebase';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

const initialState = {
  userId: null,
  userData: [],
  currentToken: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.userId = auth.currentUser.uid;
    },
    setToken: (state, action) => {
      state.currentToken = action.payload;
    },
    logOut: (state, action) => {
      state.userData = [];
      state.userId = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData, setToken, logOut } = userSlice.actions;

export default userSlice.reducer;
export const fetchUserData = () => async (dispatch) => {
  try {
    console.log('estoy en dispatch', auth.currentUser.uid);
    const userRef = doc(db, 'User', auth.currentUser.uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    dispatch(setUserData(userData));
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
