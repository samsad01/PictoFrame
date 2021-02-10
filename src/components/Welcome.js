import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	ScrollView,
	TouchableOpacity,
	ToastAndroid,
} from 'react-native';
import TypeWriter from 'react-native-typewriter';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const Login = ({ navigation }) => {
	// signin and signout checking
	const [initializing, setInitializing] = useState(true);
	const [hasEmail, setHasEmail] = useState('');
	const [user, setUser] = useState();
	const [userID, setUserID] = useState();
	const [userName, setUserName] = useState('');

	const onAuthStateChanged = async (user) => {
		setUser(user);
		if (initializing) setInitializing(false);
		try {
			const value = await AsyncStorage.getItem('userID');
			if (value != null) {
				setUserID(value);
				firestore()
					.collection('Users')
					.doc(`${value}`)
					.get()
					.then((snapshot) => {
						if (snapshot.exists) {
							setHasEmail(snapshot._data.email);
							setUserName(snapshot.data().name);
							// console.log(snapshot._data.email);
						}
					})
					.catch((e) => console.log(e));
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleNavigation = () => {
		if (user) {
			navigation.replace('Feed');
			ToastAndroid.show(`Welcome, ${userName}`, ToastAndroid.LONG);
		} else {
			if (hasEmail) {
				navigation.replace('Signin');
			} else {
				navigation.replace('Signup');
			}
		}
	};

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	if (initializing) return null;

	return (
		<ImageBackground
			source={require('../img/Mypost.jpg')}
			style={styles.bg}>
			<ScrollView contentContainerStyle={styles.viewStyle}>
				<View style={{ justifyContent: 'center' }}></View>
				<View>
					<TouchableOpacity
						style={styles.btnStyle}
						onPress={() => handleNavigation()}>
						{/* <Text style={{ fontSize: 50, color: 'white' }}>
							{'>'}
						</Text> */}
						<SimpleLineIcons
							name="arrow-right-circle"
							size={60}
							color="white"
						/>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</ImageBackground>
	);
};

export default Login;

const styles = StyleSheet.create({
	bg: {
		flex: 1,
		resizeMode: 'cover',
		alignItems: 'center',
		justifyContent: 'center',
	},
	viewStyle: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnStyle: {
		alignSelf: 'center',
		marginTop: 600,
		// borderStyle: 'solid',
		// borderColor: 'rgba(255, 255, 255, 0.4)',
		// borderWidth: 10,
		// borderRadius: 70,
		// padding: 0,
	},
});
