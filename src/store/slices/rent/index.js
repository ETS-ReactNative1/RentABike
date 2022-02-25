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
  rentData: [],
  rentOwnerData: [],
};

export const rentSlice = createSlice({
  name: 'rent',
  initialState,
  reducers: {
    setRentData: (state, action) => {
      state.rentData = action.payload;
    },
    setRentOwnerData: (state, action) => {
      state.rentOwnerData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRentData, setRentOwnerData } = rentSlice.actions;

export default rentSlice.reducer;
export const fetchRentData = () => async (dispatch) => {
  try {
    const rentRef = collection(db, 'Rent');
    const q = query(rentRef, where('userId', '==', auth.currentUser.uid));
    onSnapshot(q, (querySnapshot) => {
      dispatch(
        setRentData(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            rentId: doc.id,
          })),
        ),
      );
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
export const fetchRentOwnerData = () => async (dispatch) => {
  try {
    const rentRef = collection(db, 'Rent');
    const q = query(rentRef, where('ownerId', '==', auth.currentUser.uid));
    onSnapshot(q, (querySnapshot) => {
      dispatch(
        setRentOwnerData(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            rentId: doc.id,
          })),
        ),
      );
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
