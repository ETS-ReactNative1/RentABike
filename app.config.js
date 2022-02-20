import 'dotenv/config';
export default {
  name: 'RentaBike',
  version: '1.0.0',
  extra: {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGEINGSENDERID,
    appId: process.env.FIREBASE_APPID,
    publishableKey: process.env.STRIPE_PK,
  },
};
