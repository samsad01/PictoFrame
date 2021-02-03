import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const Profile = ({ navigation }) => {
	const clearAll = async () => {
		try {
			// await AsyncStorage.clear();
			auth()
				.signOut()
				.then(() => console.log('Sign out done ... '))
				.catch((e) => console.log(e));
		} catch (e) {
			console.log(e);
		}
		console.log('Done .. ');
	};

	const clearData = () => {
		clearAll();
		navigation.replace('Signin');
	};

	return (
		<View>
			<Text>profile</Text>
			<TouchableOpacity
				onPress={() => clearData()}
				style={{ backgroundColor: 'black', alignSelf: 'center' }}>
				<Text style={{ color: 'white', padding: 30 }}>Logout</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({});
