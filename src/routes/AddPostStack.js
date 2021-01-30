import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AddPost from './../components/AddPost';

const Stack = createStackNavigator();

const AddPostStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: '#111' },
				headerTintColor: '#fff',
				headerTitleAlign: 'center',
			}}>
			<Stack.Screen
				name="Post"
				component={AddPost}
				options={{ title: 'Add a Post' }}
			/>
		</Stack.Navigator>
	);
};

export default AddPostStack;
