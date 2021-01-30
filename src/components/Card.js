import React from 'react';
import {
	View,
	Text,
	ScrollView,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Image,
} from 'react-native';
import { Avatar, Divider, Button, Icon } from 'react-native-elements';
import FaIcon from 'react-native-vector-icons/FontAwesome';

const dimensions = Dimensions.get('window');

const Card = ({ navigation }) => {
	return (
		<View style={styles.cardWrapper}>
			<View style={styles.userView}>
				<Avatar
					rounded
					source={{
						uri:
							'https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
					}}
					resizeMode={'stretch'}
				/>
				<Text style={styles.userName}>Joe Biden</Text>
			</View>
			<Image
				source={{
					uri:
						'https://curlytales.com/wp-content/uploads/2020/09/892712d1-637d-4ec5-8b00-5e969c9a1603-2-1170x614.jpg',
				}}
				style={styles.postImage}
			/>
			<View style={styles.likeCommentView}>
				<Text style={styles.likeCommentText}>Likes: 60</Text>
				<Text style={styles.likeCommentText}>Comments: 60</Text>
			</View>
			<View style={styles.actionView} iconContainerStyle={{ flex: 1 }}>
				<TouchableOpacity style={styles.button}>
					<Icon
						name="hearto"
						type="antdesign"
						size={30}
						color="#CCCCCC"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						navigation.navigate('Comments');
					}}>
					<FaIcon name="comments-o" size={30} color="#CCCCCC" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<FaIcon name="share-square-o" size={30} color="#CCCCCC" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Card;

const styles = StyleSheet.create({
	cardWrapper: {
		paddingVertical: 15,
	},
	userView: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 10,
	},
	postImage: {
		height: 270,
		marginVertical: 15,
		width: dimensions.width,
		backgroundColor: '#fff',
	},
	userName: {
		marginLeft: 10,
		fontSize: 18,
		letterSpacing: 1,
		fontWeight: '700',
		color: '#fff',
	},
	likeCommentView: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginBottom: 15,
	},
	likeCommentText: {
		color: '#fff',
		fontWeight: '500',
		letterSpacing: 2,
		fontSize: 15,
	},
	actionView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginHorizontal: 15,
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
	},
});
