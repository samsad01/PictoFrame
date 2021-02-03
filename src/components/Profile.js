import React, { useState, useEffect } from 'react';
import {
	ScrollView,
	View,
	StyleSheet,
	Dimensions,
	SafeAreaView,
	Modal,
	TouchableOpacity,
} from 'react-native';
import { Image, Button, Divider, Avatar, Text } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageViewer from 'react-native-image-zoom-viewer';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dimensions = Dimensions.get('window');

const Profile = ({ navigation }) => {
	const [openModal, setOpenModal] = useState(false);
	const [modalPost, setModalPost] = useState({
		uri:
			'https://firebasestorage.googleapis.com/v0/b/pictoframe-be0ff.appspot.com/o/PFeHZyfIlPv6r4a4T5mO%2FpostImage%2FaOtQFm390gvT8VQRexEJ?alt=media&token=7295ef2b-6769-4e02-8f36-a5e50786c7c0',
		id: '',
	});
	const [userDetails, setUserDetails] = useState({
		id: '',
		avatar:
			'https://firebasestorage.googleapis.com/v0/b/pictoframe-be0ff.appspot.com/o/PFeHZyfIlPv6r4a4T5mO%2FpostImage%2FaOtQFm390gvT8VQRexEJ?alt=media&token=7295ef2b-6769-4e02-8f36-a5e50786c7c0',
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

		PostCollection.orderBy('user')
			.startAt(userDetails.id)
			.endAt(userDetails.id + '\uf8ff')
			.onSnapshot(getAllPosts, onError);
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

	return (
		<ScrollView style={styles.scrollView}>
			<View style={styles.avatarWrapper}>
				<Avatar
					size="large"
					rounded
					title="DP"
					overlayContainerStyle={{ backgroundColor: 'grey' }}
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
				<TouchableOpacity style={styles.logoutButton}>
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
							style={styles.img}
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
		borderColor: '#666666',
		borderWidth: 0.7,
	},
	outerImageWrapper: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: '#111',
	},
	img: {
		height: 180,
		width: dimensions.width / 2 - 23,
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
