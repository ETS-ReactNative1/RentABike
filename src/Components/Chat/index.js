import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  getFirestore,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { firebaseConfig } from '../../../config/database/firebase';
import { useSelector } from 'react-redux';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
export function Chat(props) {
  const { userData } = useSelector((state) => state.user);
  console.log(props.navigation.route.params);
  const navigation = useNavigation();

  const { rentId, ownerName, bikeModel, ownerDeviceToken } =
    props.navigation.route.params;
  console.log('mis params :', rentId, ownerName, ownerDeviceToken, bikeModel);
  const [messages, setMessages] = useState([]);
  const notificationUri =
    'https://us-central1-rent-abike.cloudfunctions.net/sendPushNotification';
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${ownerName.split(' ')[0]} (${bikeModel})`,
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(db, `Rent/${rentId}/Chat`); // en vez de "chats", "Rent/:id/Chat"
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log('querySnapshot unsusbscribe');
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })),
      );
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback(async (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
    // setMessages([...messages, ...messages]);
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, `Rent/${rentId}/Chat`), {
      // en vez de "chats", "Rent/:id/Chat"
      _id,
      createdAt,
      text,
      user,
    });

    await fetch(notificationUri, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pushToken: ownerDeviceToken,
        message: `New message from: ${userData.name}.`,
      }),
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={(messages) => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: '#fff',
      }}
      textInputStyle={{
        backgroundColor: '#fff',
        borderRadius: 20,
      }}
      user={{
        _id: auth?.currentUser?.email,
        avatar: userData.img,
      }}
    />
  );
}
