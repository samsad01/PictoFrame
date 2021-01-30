import React, { useState } from 'react';
import {
	Text,
	StyleSheet,
	View,
	SafeAreaView,
	Dimensions,
	StatusBar,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import { Card, Image, Button } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';

const dimension = Dimensions.get('window');

const AddPost = () => {
	const [imageUri, setImageUri] = useState(
		'https://superawesomevectors.com/wp-content/uploads/2017/10/person-outline-free-vector-icon-800x566.jpg',
	);

	const imageSelector = (src) => {
		try {
			if (src === 'camera') {
				ImagePicker.openCamera({
					cropping: true,
					includeBase64: true,
				}).then((image) => {
					setImageUri(`data:image/jpg;base64,${image.data}`);
					console.log(`data:image/jpg;base64,${image.data}`);
				});
			} else {
				ImagePicker.openPicker({
					cropping: true,
					includeBase64: true,
				}).then((image) => {
					setImageUri(`data:image/jpg;base64,${image.data}`);
					console.log(`data:image/jpg;base64,${image.data}`);
				});
			}
		} catch (err) {
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
						<TouchableOpacity
							style={styles.uploadButton}
							onPress={() => imageSelector('library')}>
							<MaterialCommunityIcons
								name="cloud-upload"
								size={20}
								color="white"
								style={styles.buttonIcon}
							/>
							<Text
								style={{
									...styles.buttonText,
									color: '#fff',
								}}>
								Upload
							</Text>
						</TouchableOpacity>
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
		height: dimension.height / 2,
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
		marginTop: 10,
		width: dimension.width,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
