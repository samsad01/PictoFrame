import React, { useEffect, useState } from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	StatusBar,
	Dimensions,
	SafeAreaView,
} from 'react-native';
import { Text } from 'react-native-elements';
import Card from './Card';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dimensions = Dimensions.get('window');

const Feed = ({ navigation }) => {
	/*extra added*/
	useEffect(() => {
		getUserID();
		postsCollection.onSnapshot(getPosts, onError);
	}, []);

	const [currentUserID, setCurrentUserID] = useState('');

	const [posts, setPosts] = useState([]);

	const postsCollection = firestore().collection('Posts');

	const getUserID = async () => {
		try {
			const user = await AsyncStorage.getItem('userID');
			setCurrentUserID(user);
		} catch (e) {
			// saving error
			console.error(e);
		}
	};

	const onError = (error) => {
		console.error(error);
	};

	const getPosts = async (response) => {
		let allPosts = [];
		response.forEach((post) => {
			allPosts.push({ id: post.id, ...post.data() });
		});
		setPosts(allPosts);
	};

	return (
		<SafeAreaView style={{ backgroundColor: '#111', height: '100%' }}>
			<StatusBar hidden />
			{posts.length === 0 ? (
				<View style={styles.emptyView}>
					<Text style={{ color: '#fff' }} h3>
						There are no post.
					</Text>
					<Text style={{ color: '#fff' }} h3>
						Post an Image now!!!.
					</Text>
				</View>
			) : (
				<ScrollView contentContainerStyle={styles.scrollView}>
					{posts.map((post) => (
						<Card
							key={post.id}
							navigation={navigation}
							post={post}
							currentUserID={currentUserID}
						/>
					))}
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

export default Feed;

const styles = StyleSheet.create({
	emptyView: {
		height: dimensions.height,
		width: dimensions.width,
		justifyContent: 'center',
		alignItems: 'center',
	},
	scrollView: {
		backgroundColor: '#111',
		paddingBottom: 20,
	},
});
