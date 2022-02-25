import { createSlice } from '@reduxjs/toolkit';
import { firebaseConfig } from '../../../../config/database/firebase';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

const initialState = {
  /*  userId: auth.currentUser.uid, */
  bikeData: [],
  userBikeData: [],
};

export const bikeSlice = createSlice({
  name: 'bike',
  initialState,
  reducers: {
    setBikeData: (state, action) => {
      state.bikeData = action.payload;
    },
    setUserBikeData: (state, action) => {
      state.userBikeData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBikeData, setUserBikeData } = bikeSlice.actions;

export default bikeSlice.reducer;
export const fetchUserBikeData = () => async (dispatch) => {
  try {
    const bikeRef = collection(db, 'Bike');
    const q = query(bikeRef, where('ownerid', '==', auth.currentUser.uid));
    onSnapshot(q, (querySnapshot) => {
      dispatch(
        setUserBikeData(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })),
        ),
      );
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
export const fetchBikeData = () => async (dispatch) => {
  try {
    const bikeRef = collection(db, 'Bike');
    const q = query(bikeRef);
    onSnapshot(q, (querySnapshot) => {
      dispatch(
        setBikeData(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })),
        ),
      );
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
