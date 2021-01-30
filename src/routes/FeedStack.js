import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Feed from './../components/Feed';
import Comments from './../components/Comments';

const Stack = createStackNavigator();

const FeedStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: '#111' },
				headerTintColor: '#fff',
				headerTitleAlign: 'center',
			}}
			initialRouteName="Feed">
			<Stack.Screen
				name="Feed"
				component={Feed}
				options={{ title: 'Pictoframe' }}
			/>
			<Stack.Screen name="Comments" component={Comments} />
		</Stack.Navigator>
	);
};

export default FeedStack;
