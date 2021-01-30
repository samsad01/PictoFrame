import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IoIcons from 'react-native-vector-icons/Ionicons';
import Feed from './../components/Feed';
import AddPost from './../components/AddPost';
import Profile from './../components/Profile';

const Tab = createBottomTabNavigator();

const BottomTabStack = () => {
	return (
		<Tab.Navigator
			tabBarOptions={{
				style: { backgroundColor: '#111' },
				showLabel: false,
			}}>
			<Tab.Screen
				name="Home"
				component={Feed}
				options={{
					tabBarIcon: ({ color }) => (
						<IoIcons name="home-outline" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Post"
				component={AddPost}
				options={{
					tabBarIcon: ({ color }) => (
						<IoIcons
							name="add-circle-outline"
							color={color}
							size={26}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ color }) => (
						<IoIcons
							name="person-circle-outline"
							color={color}
							size={26}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default BottomTabStack;
