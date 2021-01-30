import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabStack from './BottomTabStack';
import Login from '../components/Login';
import Signin from '../components/Signin';
import Signup from '../components/Signup';

const Stack = createStackNavigator();

const AppStack = () => {
	return (
		<>
			<StatusBar hidden />
			<Stack.Navigator
				initialRouteName="Login"
				screenOptions={{
					headerShown: false,
				}}>
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Signin" component={Signin} />
				<Stack.Screen name="Signup" component={Signup} />
				<Stack.Screen name="Feed" component={BottomTabStack} />
			</Stack.Navigator>
		</>
	);
};

export default AppStack;
