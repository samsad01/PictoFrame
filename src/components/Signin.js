import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	ImageBackground,
} from 'react-native';

const Signup = ({ navigation }) => {
	const [name, setName] = useState('Bhaskar');

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
					<Text style={styles.headingStyle}>Hey, {name}</Text>
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
					/>
					<TextInput
						placeholder="Password"
						textAlign="center"
						style={styles.textInputStyle}
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
					onPress={() => navigation.navigate('Feed')}>
					<Text style={{ fontSize: 20, color: 'white' }}>
						Sign In
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
		fontSize: 60,
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
