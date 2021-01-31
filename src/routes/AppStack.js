import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import BottomTabStack from './BottomTabStack';
import Welcome from '../components/Welcome';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import Comments from './../components/Comments';

const Stack = createStackNavigator();

const getHeaderTitle = (route) => {
	const routeName = getFocusedRouteNameFromRoute(route) ?? 'Pictoframe';
	if (routeName === 'Feed') {
		return 'Pictoframe';
	} else if (routeName === 'Post') {
		return 'Add a Post';
	} else if (routeName === 'Profile') {
		return 'Profile';
	} else {
		return routeName;
	}
};
const AppStack = () => {
	return (
		<>
			<StatusBar hidden />
			<Stack.Navigator
				initialRouteName="Welcome"
				screenOptions={{
					headerShown: false,
					headerStyle: { backgroundColor: '#111' },
					headerTintColor: '#fff',
					headerTitleAlign: 'center',
				}}>
				<Stack.Screen name="Welcome" component={Welcome} />
				<Stack.Screen name="Signin" component={Signin} />
				<Stack.Screen name="Signup" component={Signup} />
				<Stack.Screen
					name="Feed"
					component={BottomTabStack}
					options={({ route }) => ({
						headerShown: true,
						headerTitle: getHeaderTitle(route),
					})}
				/>
				<Stack.Screen
					name="Comments"
					component={Comments}
					options={{ headerShown: true }}
				/>
			</Stack.Navigator>
		</>
	);
};

export default AppStack;
