import React, { useState, useCallback, useEffect } from 'react';
import { Keyboard, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

const Chat = ({ currentUser }) => {
	const chatsCollection = firestore().collection('Chats');

	const [messages, setMessages] = useState([]);

	useEffect(() => {
		getAllMessages();
	}, []);

	const handleSnapshot = async (response) => {
		const tempArray = [];
		response.forEach((chat) => {
			tempArray.push({
				...chat.data(),
				createdAt: new Date(chat.data().createdAt),
				_id: chat.id,
			});
		});
		tempArray.sort((a, b) => b.createdAt - a.createdAt);
		setMessages(tempArray);
	};

	const getAllMessages = async () => {
		chatsCollection.onSnapshot(handleSnapshot, (err) => console.error(err));
	};

	const onSend = useCallback((newMessage = []) => {
		Keyboard.dismiss();
		const { _id, createdAt, text, user } = newMessage[0];
		const tempObj = {
			createdAt: `${createdAt}`,
			text,
			user,
		};
		chatsCollection.doc(_id).set(tempObj);
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, newMessage),
		);
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: '#111' }}>
			<GiftedChat
				messages={messages}
				onSend={(newMessage) => onSend(newMessage)}
				user={currentUser}
				renderUsernameOnMessage={true}
			/>
		</View>
	);
};

export default Chat;
