import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import {
	Input,
	Text,
	Avatar,
	Accessory,
	BottomSheet,
	ListItem,
} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const dimensions = Dimensions.get('window');

const EditProfile = ({ route, navigation }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [changed, setChanged] = useState(false);
	const [userDetails, setUserDetails] = useState({
		id: '',
		avatar:
			'https://firebasestorage.googleapis.com/v0/b/pictoframe-be0ff.appspot.com/o/PFeHZyfIlPv6r4a4T5mO%2FpostImage%2FaOtQFm390gvT8VQRexEJ?alt=media&token=7295ef2b-6769-4e02-8f36-a5e50786c7c0',
		name: '',
		description: '',
	});
	const { user } = route.params;

	const UserCollection = firestore().collection('Users');

	useEffect(() => {
		setUserDetails(user);
	}, []);

	const list = [
		{
			title: 'Click a Picture',
			icon: {
				name: 'camera',
				type: 'antdesign',
				color: '#111',
				size: 25,
			},
			titleStyle: { fontSize: 20 },
			onPress: () => imageSelector('camera'),
		},
		{
			title: 'Choose from existing pictures',
			icon: {
				name: 'photo',
				type: 'font-awesome',
				color: '#111',
				size: 25,
			},
			titleStyle: { fontSize: 20 },
			onPress: () => imageSelector('picker'),
		},
		{
			title: 'Cancel',
			containerStyle: { backgroundColor: 'red' },
			titleStyle: { color: 'white', fontSize: 20 },
			icon: {
				name: 'cancel',
				type: 'material-community',
				color: 'white',
				size: 25,
			},
			onPress: () => setIsVisible(false),
		},
	];

	const imageSelector = (src) => {
		setChanged(true);
		setIsVisible(false);
		const storageReference = storage().ref(`/${userDetails.id}/dp.jpg`);
		if (src === 'camera') {
			ImagePicker.openCamera({
				cropping: true,
			})
				.then(async (image) => {
					const upload = storageReference.putFile(image.path);
					upload.then(async () => {
						const url = await storageReference.getDownloadURL();
						console.log(url);
						setUserDetails((prev) => {
							return { ...prev, avatar: url };
						});
					});
				})
				.catch((err) => console.error(err));
		} else {
			ImagePicker.openPicker({
				cropping: true,
			})
				.then(async (image) => {
					const upload = storageReference.putFile(image.path);
					upload.then(async () => {
						const url = await storageReference.getDownloadURL();
						// console.log(url);
						setUserDetails((prev) => {
							return { ...prev, avatar: url };
						});
						await UserCollection.doc(userDetails.id).update({
							dp: url,
						});
					});
				})
				.catch((err) => console.error(err));
		}
	};

	const handleSaveChanges = async () => {
		await UserCollection.doc(userDetails.id)
			.update({
				name: userDetails.name,
				description: userDetails.description,
				dp: userDetails.avatar,
			})
			.then(() => navigation.goBack());
	};

	return (
		<View style={styles.mainView}>
			<View style={styles.avaterWrapper}>
				<Avatar
					rounded
					source={{
						uri: userDetails.avatar,
					}}
					size="xlarge"
					title="DP"
					imageProps={{ resizeMode: 'contain' }}
					activeOpacity={0.5}
					overlayContainerStyle={{ backgroundColor: 'white' }}
					onPress={() => setIsVisible(true)}>
					<Accessory size={30} />
				</Avatar>
			</View>
			<View style={styles.inputWrapper}>
				<Input
					label="NAME"
					leftIcon={{ type: 'entypo', name: 'user', color: 'white' }}
					inputStyle={{ color: 'white' }}
					inputContainerStyle={{ borderColor: '#b3b3b3' }}
					labelStyle={{ color: '#b3b3b3', letterSpacing: 1 }}
					value={userDetails.name}
					onChangeText={(value) => {
						setChanged(true);
						setUserDetails((prev) => {
							return { ...prev, name: value };
						});
					}}
				/>
			</View>
			<View style={styles.inputWrapper}>
				<Input
					label="DESCRIPTION"
					leftIcon={{
						type: 'font-awesome-5',
						name: 'pencil-alt',
						color: 'white',
					}}
					inputStyle={{ color: 'white' }}
					inputContainerStyle={{ borderColor: '#b3b3b3' }}
					labelStyle={{ color: '#b3b3b3', letterSpacing: 1 }}
					value={userDetails.description}
					onChangeText={(value) => {
						setChanged(true);
						setUserDetails((prev) => {
							return { ...prev, description: value };
						});
					}}
				/>
			</View>
			<View>
				<TouchableOpacity
					style={styles.buttonstyle}
					disabled={!changed}
					onPress={() => handleSaveChanges()}>
					<View style={styles.saveButtonWrapper}>
						<FontAwesome5 name="save" color="white" size={25} />
						<Text
							style={{
								fontFamily: 'Arial',
								fontSize: 20,
								color: 'white',
								marginLeft: 10,
							}}>
							Save Changes
						</Text>
					</View>
				</TouchableOpacity>
			</View>
			<BottomSheet
				isVisible={isVisible}
				containerStyle={{
					backgroundColor: 'rgba(222.5, 222.25, 222, 0.5)',
				}}>
				{list.map((l, i) => (
					<ListItem
						key={i}
						containerStyle={l.containerStyle}
						onPress={l.onPress}>
						<Avatar rounded icon={l.icon} />
						<ListItem.Content>
							<ListItem.Title style={l.titleStyle}>
								{l.title}
							</ListItem.Title>
						</ListItem.Content>
					</ListItem>
				))}
			</BottomSheet>
		</View>
	);
};

export default EditProfile;

const styles = StyleSheet.create({
	mainView: {
		backgroundColor: '#111',
		paddingHorizontal: 10,
		paddingTop: 10,
		height: dimensions.height,
		width: dimensions.width,
	},
	avaterWrapper: {
		width: dimensions.width,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputWrapper: {
		textAlign: 'center',
		paddingBottom: 30,
		flexDirection: 'row',
	},
	saveButtonWrapper: {
		textAlign: 'center',
		flexDirection: 'row',
	},
	buttonstyle: {
		alignItems: 'center',
		borderWidth: 1.5,
		borderColor: 'white',
		borderRadius: 10,
		paddingVertical: 10,
	},
	actionView: {
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10,
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		width: '90%',
		borderRadius: 7,
		marginVertical: 5,
	},
	buttonText: {
		fontSize: 20,
		color: 'white',
	},
	buttonIcon: {
		marginRight: 5,
	},
});
