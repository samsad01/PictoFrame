import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IoIcons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feed from './../components/Feed';
import AddPost from './../components/AddPost';
import Profile from './../components/Profile';
import Chat from './../components/Chat';

const Tab = createBottomTabNavigator();

const BottomTabStack = () => {
	const usersCollection = firestore().collection('Users');

	const [userDetails, setUserDetails] = useState({});

	useEffect(() => {
		getUserDetials();
	}, []);

	const getUserDetials = async () => {
		try {
			const userID = await AsyncStorage.getItem('userID');
			const user = await usersCollection.doc(userID).get();
			setUserDetails({
				_id: user.id,
				name: user.data().name,
				avatar: user.data().dp,
			});
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Tab.Navigator
			tabBarOptions={{
				style: { backgroundColor: '#111' },
				showLabel: false,
			}}>
			<Tab.Screen
				name="Home"
				component={Feed}
				options={{
					tabBarIcon: ({ color }) => (
						<IoIcons name="home-outline" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Post"
				component={AddPost}
				options={{
					tabBarIcon: ({ color }) => (
						<IoIcons
							name="add-circle-outline"
							color={color}
							size={26}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ color }) => (
						<IoIcons
							name="person-circle-outline"
							color={color}
							size={26}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Chat"
				children={() => <Chat currentUser={userDetails} />}
				options={{
					tabBarIcon: ({ color }) => (
						<Entypo name="chat" color={color} size={26} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default BottomTabStack;
