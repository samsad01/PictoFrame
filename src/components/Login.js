import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import TypeWriter from 'react-native-typewriter';

const Login = ({ navigation }) => {
	return (
		<ImageBackground source={require('../img/bckg.jpg')} style={styles.bg}>
			<ScrollView contentContainerStyle={styles.viewStyle}>
				<View style={{ justifyContent: 'center' }}>
					<TypeWriter typing={1}>
						<Text
							style={{
								color: 'white',
								fontSize: 40,
								fontWeight: 'bold',
							}}>
							PictoFrame
						</Text>
					</TypeWriter>
					<TypeWriter typing={1}>
						<Text
							style={{
								color: 'white',
								fontSize: 80,
								fontWeight: 'bold',
							}}>
							Welcomes
						</Text>
					</TypeWriter>
					<TypeWriter typing={1}>
						<Text
							style={{
								color: 'white',
								fontSize: 50,
								fontWeight: 'bold',
							}}>
							you
						</Text>
					</TypeWriter>
				</View>
				<View>
					<TouchableOpacity
						style={styles.btnStyle}
						onPress={() => navigation.replace('Signup')}>
						<Text style={{ fontSize: 50, color: 'white' }}>
							{'>'}
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</ImageBackground>
	);
};

export default Login;

const styles = StyleSheet.create({
	bg: {
		flex: 1,
		resizeMode: 'cover',
		alignItems: 'center',
		justifyContent: 'center',
	},
	viewStyle: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnStyle: {
		marginTop: 200,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 1,
		paddingHorizontal: 25,
		backgroundColor: 'transparent',
		borderWidth: 2,
		borderColor: 'white',
		borderRadius: 50,
	},
});
