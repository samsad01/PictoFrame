import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	ImageBackground,
	ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Signin = ({ navigation }) => {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [userID, setUserID] = useState('');

	const getData = async () => {
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
							setUserName(snapshot._data.name);
						}
					})
					.catch((e) => console.log(e));
			}
		} catch (e) {
			console.log(e);
		}
	};

	const validateEmail = (email) => {
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const result = re.test(email);
		if (!result) {
			ToastAndroid.show('Invalid email', ToastAndroid.LONG);
		}
		return result;
	};

	const validatePassword = (pass) => {
		const result = String(pass).length > 5;
		if (!result) {
			ToastAndroid.show(
				'Password must have minimum length of 6',
				ToastAndroid.LONG,
			);
		}
		return result;
	};

	const userDetails = () => {
		if (validateEmail(email) && validatePassword(password)) {
			auth()
				.signInWithEmailAndPassword(email, password)
				.then(() => {
					const user = auth().currentUser;
					AsyncStorage.setItem('userID', user.uid);
					if (user.emailVerified) {
						ToastAndroid.show(
							`Welcome, ${userName}`,
							ToastAndroid.LONG,
						);
						navigation.replace('Feed');
					} else {
						ToastAndroid.show(
							"Email hasn't verified yet. Check you mail",
							ToastAndroid.LONG,
						);
					}
				})
				.catch((error) => {
					if (error.code === 'auth/email-already-in-use') {
						ToastAndroid.show(
							'That email address is already in use!',
							ToastAndroid.LONG,
						);
						console.log('That email address is already in use!');
					}

					if (error.code === 'auth/invalid-email') {
						ToastAndroid.show(
							'That email address is invalid!',
							ToastAndroid.LONG,
						);
						console.log('That email address is invalid!');
					}

					if (error.code === 'auth/user-not-found') {
						ToastAndroid.show(
							'Please check your email address and try again',
							ToastAndroid.LONG,
						);
						console.log('User not found! Try again!');
					}

					// console.error(error);
				});
		} else {
			console.log('Fail');
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<ImageBackground
			style={styles.lowerPart}
			source={require('../img/signin.jpg')}>
			<ScrollView
				contentContainerStyle={{
					alignItems: 'center',
					marginTop: 50,
				}}>
				<View
					style={{ alignItems: 'center', justifyContent: 'center' }}>
					<Text style={styles.headingStyle}>
						Hey, {userName.split(' ')[0]}
					</Text>
				</View>
				<View style={styles.inputStyle}>
					{/* <TextInput
						placeholder="Name"
						textAlign="center"
						style={styles.textInputStyle}
					/> */}
					<TextInput
						placeholder="Email"
						textAlign="center"
						style={styles.textInputStyle}
						keyboardType="email-address"
						onChangeText={(d) => setEmail(d)}
					/>
					<TextInput
						placeholder="Password"
						textAlign="center"
						style={styles.textInputStyle}
						secureTextEntry
						keyboardType="default"
						onChangeText={(d) => setPassword(d)}
					/>
				</View>
				<View>
					<Text style={{ marginTop: 5 }}>
						<Text style={{ color: '#000' }}>
							Have'nt registered yet?
						</Text>{' '}
						<Text
							style={{ color: 'white' }}
							onPress={() => navigation.navigate('Signup')}>
							Sign Up Here
						</Text>
					</Text>
				</View>
				<TouchableOpacity
					style={styles.signUpStyle}
					onPress={() => userDetails()}>
					<Text style={{ fontSize: 20, color: 'white' }}>
						Sign In
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</ImageBackground>
	);
};

export default Signin;

const styles = StyleSheet.create({
	lowerPart: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 6,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
	},
	headingStyle: {
		fontSize: 50,
		color: 'white',
	},
	inputStyle: {
		marginTop: 70,
	},
	textInputStyle: {
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		padding: 20,
		width: 290,
		borderWidth: 2,
		borderColor: 'white',
		borderRadius: 10,
		opacity: 1,
		marginBottom: 20,
		// shadowColor: '#000',
		// shadowOffset: { width: 0, height: 1 },
		// shadowOpacity: 0.8,
		// shadowRadius: 2,
		// elevation: 5,
	},
	signUpStyle: {
		backgroundColor: 'transparent',
		padding: 15,
		width: 120,
		alignItems: 'center',
		marginTop: 60,
		borderWidth: 2,
		borderColor: 'white',
		borderRadius: 10,
		// shadowColor: '#000',
		// shadowOffset: { width: 0, height: 1 },
		// shadowOpacity: 0.8,
		// shadowRadius: 2,
		// elevation: 5,
	},
	linearGradient: {
		flex: 2,
	},
});
