import 'dotenv/config';
export default {
  expo: {
    scheme: 'rentabike',
    name: 'rentabikejs',
    slug: 'rentabikejs',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    plugins: [
      [
        'expo-image-picker',
        {
          photosPermission:
            'The app accesses your photos to let you share them with bikers near tu you!',
        },
      ],
      [
        '@stripe/stripe-react-native',
        {
          enableGooglePay: true,
        },
      ],
      [
        'expo-notifications',
        {
          icon: './assets/adaptive-icon.png',
        },
      ],
    ],
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      package: 'com.fabrizziodbc.rentabike',
      googleServicesFile: './google-services.json',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      apiKey: process.env.FIREBASE_APIKEY,
      authDomain: process.env.FIREBASE_AUTHDOMAIN,
      projectId: process.env.FIREBASE_PROJECTID,
      storageBucket: process.env.FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGEINGSENDERID,
      appId: process.env.FIREBASE_APPID,
      publishableKey: process.env.STRIPE_PK,
    },
  },
};
