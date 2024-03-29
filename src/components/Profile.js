import React, { useState, useEffect } from 'react';
import {
	ScrollView,
	View,
	StyleSheet,
	Dimensions,
	Modal,
	TouchableOpacity,
} from 'react-native';
import { Image, Button, Divider, Avatar, Text } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageViewer from 'react-native-image-zoom-viewer';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const dimensions = Dimensions.get('window');

const Profile = ({ navigation }) => {
	const [openModal, setOpenModal] = useState(false);
	const [modalPost, setModalPost] = useState({
		uri:
			'https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
		id: '',
	});
	const [userDetails, setUserDetails] = useState({
		id: '',
		avatar:
			'https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
		name: '',
		description: '',
	});
	const [allPosts, setAllPosts] = useState([]);
	const UserCollection = firestore().collection('Users');
	const PostCollection = firestore().collection('Posts');

	const modalHandler = (post) => {
		setOpenModal(true);
		setModalPost({ id: post.id, uri: post.image });
	};

	useEffect(() => {
		getUserID();
	}, []);

	const getUserID = async () => {
		const userId = await AsyncStorage.getItem('userID');
		setUserDetails((prev) => {
			return { ...prev, id: userId };
		});
		PostCollection.where('user', '==', userId).onSnapshot(
			getAllPosts,
			onError,
		);
		UserCollection.doc(userId).onSnapshot(getUserDetails, onError);
	};

	const onError = (error) => {
		console.error(error);
	};

	const getUserDetails = async (response) => {
		const user = response.data();
		setUserDetails((prev) => {
			return {
				...prev,
				avatar: user.dp,
				name: user.name,
				description: user.description,
			};
		});
	};

	const getAllPosts = (response) => {
		let data = [];
		response.docs.forEach((doc) => {
			data.push({ id: doc.id, ...doc.data() });
		});
		setAllPosts(data);
	};

	const handleDeletePost = (id) => {
		PostCollection.doc(id)
			.delete()
			.then(() => setModalPost(false))
			.catch((err) => console.error(err));
	};

	const handleLogout = () => {
		AsyncStorage.clear();
		auth()
			.signOut()
			.then(() => navigation.replace('Signin'))
			.catch((e) => console.error(e));
	};

	return (
		<ScrollView style={styles.scrollView}>
			<View style={styles.avatarWrapper}>
				<Avatar
					size="large"
					rounded
					title="DP"
					overlayContainerStyle={{ backgroundColor: 'white' }}
					imageProps={{ resizeMode: 'contain' }}
					source={{ uri: userDetails.avatar }}
				/>
				<View style={styles.userNameWrapper}>
					<Text style={styles.name} h4>
						{userDetails.name}
					</Text>
				</View>
			</View>
			<View style={{ paddingBottom: 10 }}>
				<Text style={styles.descriptionText}>
					{userDetails.description}
				</Text>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'flex-start',
					}}>
					<MaterialCommunityIcons
						name="post-outline"
						color="white"
						size={25}
					/>
					<Text
						style={
							styles.postCount
						}>{` Posts : ${allPosts.length}`}</Text>
				</View>
			</View>
			<View style={styles.buttonWrapper}>
				<TouchableOpacity
					style={styles.editProfileButton}
					onPress={() =>
						navigation.navigate('Edit Profile', {
							user: userDetails,
						})
					}>
					<Text
						style={{
							color: '#dab600',
							fontSize: 20,
							fontWeight: '700',
						}}>
						Edit Profile
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.logoutButton}
					onPress={() => handleLogout()}>
					<Text
						style={{
							color: '#b22222',
							fontSize: 20,
							fontWeight: '700',
						}}>
						Logout
					</Text>
				</TouchableOpacity>
			</View>
			<Divider
				style={{
					color: 'white',
					backgroundColor: 'white',
					marginVertical: 10,
				}}
			/>
			<View style={styles.outerImageWrapper}>
				{allPosts.map((post) => (
					<View key={post.id} style={styles.innerImageWrapper}>
						<Image
							containerStyle={styles.img}
							source={{
								uri: post.image,
							}}
							resizeMode={'contain'}
							onPress={() => modalHandler(post)}
						/>
					</View>
				))}
			</View>
			<Modal visible={openModal} style={{ backgroundColor: '#111' }}>
				<ImageViewer
					style={{ backgroundColor: '#111' }}
					imageUrls={[
						{
							url: modalPost.uri,
						},
					]}
					renderIndicator={() => <></>}
					enableSwipeDown={true}
					onSwipeDown={() => setOpenModal(false)}
					renderFooter={() => (
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}>
							<TouchableOpacity
								style={{
									backgroundColor: '#ffff00',
									alignItems: 'center',
									borderRadius: 7,
									paddingVertical: 7,
									width: '47%',
								}}
								onPress={() => setOpenModal(false)}>
								<Text style={{ fontSize: 20 }}>Close</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									alignItems: 'center',
									backgroundColor: '#b22222',
									borderRadius: 7,
									paddingVertical: 7,
									width: '47%',
								}}
								onPress={() => {
									setOpenModal(false);
									handleDeletePost(modalPost.id);
								}}>
								<Text style={{ color: 'white', fontSize: 20 }}>
									Delete Post
								</Text>
							</TouchableOpacity>
						</View>
					)}
					footerContainerStyle={{
						width: dimensions.width,
						paddingBottom: 10,
						paddingHorizontal: 5,
					}}
				/>
			</Modal>
		</ScrollView>
	);
};

export default Profile;

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: '#111',
		paddingHorizontal: 15,
	},
	innerImageWrapper: {
		borderColor: '#403e40',
		borderWidth: 0.7,
	},
	outerImageWrapper: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: '#111',
		justifyContent: 'center',
	},
	img: {
		height: 180,
		width: dimensions.width / 2 - 20,
		backgroundColor: '#d5d3d5',
	},
	editProfileButton: {
		alignItems: 'center',
		backgroundColor: '#111',
		borderWidth: 1.5,
		borderColor: '#dab600',
		borderRadius: 12,
		paddingVertical: 7,
		width: '47%',
	},
	logoutButton: {
		alignItems: 'center',
		borderColor: '#b22222',
		borderWidth: 1.5,
		borderRadius: 12,
		paddingVertical: 7,
		width: '47%',
	},
	buttonWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 7,
	},
	name: {
		color: 'white',
	},
	avatarWrapper: {
		flexDirection: 'row',
		marginHorizontal: 5,
		marginVertical: 10,
		alignItems: 'center',
	},
	userNameWrapper: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		textAlign: 'center',
		flexGrow: 2,
		paddingLeft: 20,
	},
	descriptionText: {
		fontFamily: 'Arial',
		fontSize: 17,
		textAlign: 'left',
		paddingBottom: 18,
		color: 'white',
	},
	postCount: {
		fontFamily: 'Arial',
		fontSize: 20,
		color: 'white',
		textAlign: 'left',
	},
});
