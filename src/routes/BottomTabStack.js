import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IoIcons from 'react-native-vector-icons/Ionicons';
import FeedStack from './FeedStack';
import AddPostStack from './AddPostStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const BottomTabStack = () => {
	const tabBarListeners = ({ navigation, route }) => ({
		tabPress: () => navigation.navigate(route.name),
	});

	return (
		<Tab.Navigator
			tabBarOptions={{
				style: { backgroundColor: '#111' },
				showLabel: false,
			}}>
			<Tab.Screen
				name="Home"
				component={FeedStack}
				options={{
					tabBarIcon: ({ color }) => (
						<IoIcons name="home-outline" color={color} size={26} />
					),
				}}
				listeners={tabBarListeners}
			/>
			<Tab.Screen
				name="Post"
				component={AddPostStack}
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
				component={ProfileStack}
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
