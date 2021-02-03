import React, { useState } from 'react';
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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Signup = ({ navigation }) => {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [image, setImage] = useState('image nai gorib manush');
	const [password, setPassword] = useState('');

	const storeData = async (value) => {
		try {
			await AsyncStorage.setItem('isLoggedIn', value);
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

	const validateName = (name) => {
		if (name == '') {
			ToastAndroid.show("Name can't be empty", ToastAndroid.LONG);
			return false;
		} else {
			return true;
		}
	};

	const userDetails = () => {
		if (
			validateName(userName) &&
			validateEmail(email) &&
			validatePassword(password)
		) {
			auth()
				.createUserWithEmailAndPassword(email, password)
				.then(async () => {
					const user = auth().currentUser;
					user.sendEmailVerification();
					ToastAndroid.show(
						'A varification email has been sent to your registered email id',
						ToastAndroid.LONG,
					);
					firestore()
						.collection('Users')
						.doc(`${user.uid}`)
						.set({
							name: userName,
							email: email,
							image: image,
						})
						.then(() => {
							ToastAndroid.show(
								'User Account Created, please login',
								ToastAndroid.LONG,
							);
							navigation.replace('Signin');
						})
						.catch((e) => {
							console.log(e);
						});
					storeData(user.uid);
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

					console.error(error);
				});
		}
	};

	return (
		<ImageBackground
			style={styles.lowerPart}
			source={require('../img/signup.jpg')}>
			<ScrollView
				contentContainerStyle={{
					alignItems: 'center',
					marginTop: 50,
				}}>
				<View
					style={{ alignItems: 'center', justifyContent: 'center' }}>
					<Text style={styles.headingStyle}>Hey, welcome</Text>
				</View>
				<View style={styles.inputStyle}>
					{/* name */}
					<TextInput
						placeholder="Name"
						textAlign="center"
						onChangeText={(d) => setUserName(d)}
						style={styles.textInputStyle}
						keyboardType="default"
					/>
					{/* email */}
					<TextInput
						placeholder="Email"
						textAlign="center"
						onChangeText={(d) => setEmail(d)}
						style={styles.textInputStyle}
						keyboardType="email-address"
					/>
					{/* password */}
					<TextInput
						placeholder="Password"
						textAlign="center"
						onChangeText={(d) => setPassword(d)}
						style={styles.textInputStyle}
						keyboardType="default"
						secureTextEntry
					/>
				</View>
				<View>
					<Text style={{ marginTop: 5 }}>
						<Text style={{ color: '#fff700' }}>
							Already have an account?
						</Text>{' '}
						<Text
							style={{ color: 'white' }}
							onPress={() => navigation.navigate('Signin')}>
							Sign In Here
						</Text>
					</Text>
				</View>
				<TouchableOpacity
					style={styles.signUpStyle}
					onPress={() => userDetails()}>
					<Text style={{ fontSize: 20, color: 'white' }}>
						Sign Up
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</ImageBackground>
	);
};

export default Signup;

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
