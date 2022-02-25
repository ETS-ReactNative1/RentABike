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

  const { rentId, ownerName, bikeModel } = props.navigation.route.params;
  console.log('mis params :', rentId, ownerName, bikeModel);
  const [messages, setMessages] = useState([]);

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

  const onSend = useCallback((messages = []) => {
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
        _id: auth?.currentUser?.email, //user.id , luego usar redux para el id
        avatar: userData.img, // user.img
      }}
    />
    // <>
    //   {messages.map(message => (
    //     <Text key={message._id}>{message.text}</Text>
    //   ))}
    // </>
  );
}
