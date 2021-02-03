import React from 'react';
import { StatusBar, View } from 'react-native';
import { Text } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import BottomTabStack from './BottomTabStack';
import Welcome from '../components/Welcome';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import Comments from './../components/Comments';
import EditProfile from './../components/EditProfile';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();

const getHeaderTitle = (route) => {
	const routeName = getFocusedRouteNameFromRoute(route) ?? 'PICTOFRAME';
	if (routeName === 'Home') {
		return 'PICTOFRAME';
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
				<Stack.Screen
					name="Edit Profile"
					component={EditProfile}
					options={{
						headerShown: true,
						headerTitle: () => (
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
								}}>
								<AntDesign
									name="profile"
									color="white"
									size={25}
								/>
								<Text
									style={{ color: '#fff', marginLeft: 10 }}
									h4>
									Edit Profile
								</Text>
							</View>
						),
					}}
				/>
			</Stack.Navigator>
		</>
	);
};

export default AppStack;
