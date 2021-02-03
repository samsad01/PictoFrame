import React, { useState, useEffect } from 'react';
import {
	Text,
	StyleSheet,
	View,
	SafeAreaView,
	Dimensions,
	StatusBar,
	TouchableOpacity,
	ScrollView,
	Alert,
} from 'react-native';
import { Card, Image, Button } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const dimension = Dimensions.get('window');

const AddPost = ({ navigation }) => {
	const postCollection = firestore().collection('Posts');

	const [imageUri, setImageUri] = useState(
		'https://superawesomevectors.com/wp-content/uploads/2017/10/person-outline-free-vector-icon-800x566.jpg',
	);
	const [userID, setUserID] = useState('');

	const [base64String, setBase64String] = useState('');

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		navigation.addListener('tabPress', (e) => {
			setImageUri(
				'https://superawesomevectors.com/wp-content/uploads/2017/10/person-outline-free-vector-icon-800x566.jpg',
			);
		});
		getUserID();
	}, []);

	const getUserID = async () => {
		try {
			const user = await AsyncStorage.getItem('userID');
			setUserID(user);
		} catch (e) {
			// saving error
			console.error(e);
		}
	};

	const imageSelector = (src) => {
		if (src === 'camera') {
			ImagePicker.openCamera({
				cropping: true,
				includeBase64: true,
			})
				.then((image) => {
					setImageUri(`data:image/jpg;base64,${image.data}`);
					setBase64String(image.data);
					//console.log(`data:image/jpg;base64,${image.data}`);
				})
				.catch((err) => console.error(err));
		} else {
			ImagePicker.openPicker({
				cropping: true,
				includeBase64: true,
			})
				.then((image) => {
					setImageUri(`data:image/jpg;base64,${image.data}`);
					setBase64String(image.data);
					//console.log(`data:image/jpg;base64,${image.data}`);
				})
				.catch((err) => console.error(err));
		}
	};

	const uploadImage = async () => {
		setLoading(true);
		try {
			const post = await postCollection.add({
				user: userID,
				comments: [],
				likes: [],
				image: '',
			});
			const postID = post._documentPath._parts[1];

			const storageReference = storage().ref(
				`${userID}/postImage/${postID}`,
			);

			const upload = storageReference.putString(base64String, 'base64', {
				contentType: 'image/jpg',
			});

			upload.then(async () => {
				console.log('Image uploaded to the bucket!');
				const url = await storageReference.getDownloadURL();
				await postCollection
					.doc(postID)
					.update({
						image: url,
					})
					.then(() => {
						console.log(`post updated`);
						Alert.alert(
							'Post',
							'Image uploaded successfully',
							[
								{
									text: 'OK',
									onPress: () => setLoading(false),
								},
							],
							{ cancelable: false },
						);
					})
					.catch((err) => {
						Alert.alert(
							'Error',
							'Something went wrong!! Please try again',
							[
								{
									text: 'OK',
									onPress: () => setLoading(false),
								},
							],
							{ cancelable: false },
						);
						console.error(err);
					});
			});
		} catch (error) {
			Alert.alert(
				'Error',
				'Something went wrong!! Please try again',
				[
					{
						text: 'OK',
						onPress: () => setLoading(false),
					},
				],
				{ cancelable: false },
			);
			console.error(err);
		}
	};

	return (
		<SafeAreaView style={styles.addPostView}>
			<ScrollView>
				<StatusBar hidden />
				<Card containerStyle={styles.imageCardView}>
					<Image
						source={{ uri: imageUri }}
						style={styles.avatarImage}
						resizeMode="cover"
					/>
				</Card>
				<View style={styles.actionView}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => imageSelector('camera')}>
						<MaterialCommunityIcons
							name="camera-iris"
							size={25}
							color="black"
							style={styles.buttonIcon}
						/>
						<Text style={styles.buttonText}>Click a photo</Text>
					</TouchableOpacity>

					<Text style={styles.orText}>OR</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={() => imageSelector('library')}>
						<MaterialCommunityIcons
							name="folder-image"
							size={25}
							color="black"
							style={styles.buttonIcon}
						/>
						<Text style={styles.buttonText}>
							Pick an existing image
						</Text>
					</TouchableOpacity>
				</View>
				{imageUri ===
				'https://superawesomevectors.com/wp-content/uploads/2017/10/person-outline-free-vector-icon-800x566.jpg' ? (
					<></>
				) : (
					<View style={styles.uploadWrapper}>
						<Button
							onPress={() => uploadImage()}
							icon={
								<MaterialCommunityIcons
									name="cloud-upload"
									size={20}
									color="#ffff00"
									style={styles.buttonIcon}
								/>
							}
							title="Upload"
							type="outline"
							buttonStyle={{
								borderColor: '#ffff00',
								paddingVertical: 10,
								paddingHorizontal: 30,
							}}
							loadingProps={{ color: '#ffff00' }}
							titleStyle={{ color: '#ffff00' }}
							loading={loading}
						/>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default AddPost;

const styles = StyleSheet.create({
	avatarImage: {
		height: '100%',
	},
	addPostView: {
		backgroundColor: '#111',
		paddingVertical: 10,
		height: '100%',
	},
	imageCardView: {
		backgroundColor: '#111',
		height: dimension.height / 2.3,
	},
	actionView: {
		alignItems: 'center',
		backgroundColor: '#111',
		width: dimension.width,
		marginTop: 5,
		paddingHorizontal: 15,
	},
	orText: {
		color: '#fff',
		fontSize: 20,
		fontWeight: '700',
	},
	button: {
		width: '100%',
		marginVertical: 15,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#0ebfe9',
		flexDirection: 'row',
		borderRadius: 5,
	},

	buttonText: {
		fontSize: 20,
		fontWeight: '600',
		color: '#111',
		paddingVertical: 7,
	},
	buttonIcon: {
		marginRight: 5,
	},
	uploadButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#ffff00',
		borderWidth: 2,
		borderRadius: 5,
		width: '40%',
	},
	uploadWrapper: {
		width: dimension.width,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
