import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import TypeWriter from 'react-native-typewriter';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
	// signin and signout checking
	const [initializing, setInitializing] = useState(true);
	const [hasEmail, setHasEmail] = useState('');
	const [user, setUser] = useState();
	const [userID, setUserID] = useState();

	const onAuthStateChanged = async (user) => {
		setUser(user);
		if (initializing) setInitializing(false);
		try {
			const value = await AsyncStorage.getItem('isLoggedIn');
			if (value != null) {
				setUserID(value);
				firestore()
					.collection('Users')
					.doc(`${value}`)
					.get()
					.then((snapshot) => {
						if (snapshot.exists) {
							setHasEmail(snapshot._data.email);
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
		<ImageBackground source={require('../img/bckg.jpg')} style={styles.bg}>
			<ScrollView contentContainerStyle={styles.viewStyle}>
				<View style={{ justifyContent: 'center' }}>
					<TypeWriter typing={1}>
						<Text
							style={{
								color: 'white',
								fontSize: 40,
								fontWeight: 'bold',
							}}>
							PictoFrame
						</Text>
					</TypeWriter>
					<TypeWriter typing={1}>
						<Text
							style={{
								color: 'white',
								fontSize: 60,
								fontWeight: 'bold',
							}}>
							Welcomes
						</Text>
					</TypeWriter>
					<TypeWriter typing={1}>
						<Text
							style={{
								color: 'white',
								fontSize: 50,
								fontWeight: 'bold',
							}}>
							you
						</Text>
					</TypeWriter>
				</View>
				<View>
					<TouchableOpacity
						style={styles.btnStyle}
						onPress={() => handleNavigation()}>
						<Text style={{ fontSize: 50, color: 'white' }}>
							{'>'}
						</Text>
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
		marginTop: 200,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 1,
		paddingHorizontal: 25,
		backgroundColor: 'transparent',
		borderWidth: 2,
		borderColor: 'white',
		borderRadius: 50,
	},
});
