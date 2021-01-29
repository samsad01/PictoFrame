import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';
import Signin from '../components/Signin';
import Signup from '../components/Signup';

const stack = createStackNavigator();

const AppStack = () => {
	return (
		<>
			<StatusBar hidden={true} />

			<stack.Navigator
				initialRouteName="Login"
				screenOptions={{ headerShown: false }}>
				<stack.Screen name="Login" component={Login} />
				<stack.Screen name="Signin" component={Signin} />
				<stack.Screen name="Signup" component={Signup} />
			</stack.Navigator>
		</>
	);
};

export default AppStack;

const styles = StyleSheet.create({});
