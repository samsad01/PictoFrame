import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './../components/Profile';

const Stack = createStackNavigator();

const ProfileStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: '#111' },
				headerTintColor: '#fff',
				headerTitleAlign: 'center',
			}}>
			<Stack.Screen
				name="Profile"
				component={Profile}
				options={{ title: 'Profile' }}
			/>
		</Stack.Navigator>
	);
};

export default ProfileStack;
