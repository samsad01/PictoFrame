import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Image,
} from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import Share from 'react-native-share';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import RNFetchBlob from 'rn-fetch-blob';

const dimensions = Dimensions.get('window');

const handleShare = async (url) => {
	let imagePath = null;
	RNFetchBlob.config({
		fileCache: true,
	})
		.fetch('GET', url)
		// the image is now dowloaded to device's storage
		.then((resp) => {
			// the image path you can use it directly with Image component
			imagePath = resp.path();
			return resp.readFile('base64');
		})
		.then(async (base64Data) => {
			var base64Data = `data:image/png;base64,` + base64Data;
			// here's base64 encoded image
			await Share.open({
				message: 'Hey, Checkout my new post on Pictoframe',
				title: 'Share using',
				url: base64Data,
			});
			// remove the file from storage
			return RNFetchBlob.fs.unlink(imagePath);
		})
		.catch((err) => console.error(err));
};

const Card = ({ navigation, post, currentUserID }) => {
	const [liked, setLiked] = useState(false);
	const [user, setUser] = useState({
		dp:
			'https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
		name: '',
		id: '',
	});

	const handleResponse = (response) => {
		setUser({ ...response.data(), id: response.id });
	};

	const onError = (err) => {
		console.error(err);
	};

	const getUserDetails = () => {
		firestore()
			.collection('Users')
			.doc(post.user)
			.onSnapshot(handleResponse, onError);
	};

	const handleLike = () => {
		if (liked) {
			firestore()
				.collection('Posts')
				.doc(post.id)
				.update({
					likes: post.likes.filter((id) => id != currentUserID),
				});
			setLiked(false);
		} else {
			firestore()
				.collection('Posts')
				.doc(post.id)
				.update({
					likes: firestore.FieldValue.arrayUnion(currentUserID),
				});
			setLiked(true);
		}
	};

	useEffect(() => {
		setLiked(post.likes.includes(currentUserID));
		getUserDetails();
	}, []);

	return (
		<View style={styles.cardWrapper}>
			<View style={styles.userView}>
				<Avatar
					rounded
					source={{
						uri: user.dp,
					}}
					resizeMode={'stretch'}
				/>
				<Text style={styles.userName}>{user.name}</Text>
			</View>
			<Image
				source={{
					uri: post.image,
				}}
				style={styles.postImage}
				resizeMode={'contain'}
			/>
			<View style={styles.likeCommentView}>
				<Text
					style={
						styles.likeCommentText
					}>{`Likes: ${post.likes.length}`}</Text>
				<Text
					style={
						styles.likeCommentText
					}>{`Comments: ${post.comments.length}`}</Text>
			</View>
			<View style={styles.actionView} iconContainerStyle={{ flex: 1 }}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => handleLike()}>
					{liked ? (
						<Icon
							name="heart"
							type="antdesign"
							size={30}
							color="#CCCCCC"
						/>
					) : (
						<Icon
							name="hearto"
							type="antdesign"
							size={30}
							color="#CCCCCC"
						/>
					)}
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						navigation.navigate('Comments', {
							post: post,
							currentUserID: currentUserID,
						});
					}}>
					<FaIcon name="comments-o" size={30} color="#CCCCCC" />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={() => handleShare(post.image)}>
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
		backgroundColor: '#d5d3d5',
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
