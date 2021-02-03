import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Dimensions,
	ScrollView,
	StatusBar,
	TouchableOpacity,
	Keyboard,
} from 'react-native';
import { Input } from 'react-native-elements';
import AntIcon from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import CommentBar from './CommentBar';

const dimensions = Dimensions.get('window');

const Comments = ({ route }) => {
	const { post, user } = route.params;
	const postsCollection = firestore().collection('Posts');

	const [currentComment, setCurrentComment] = useState('');
	const [allComments, setAllComments] = useState([]);

	const usersCollection = firestore().collection('Users');

	useEffect(() => {
		postsCollection.doc(post.id).onSnapshot(getPosts, onError);
	}, []);

	const onError = (error) => {
		console.error(error);
	};

	const getPosts = async (response) => {
		setAllComments(response.data().comments);
	};

	const handleComment = () => {
		const currentTime = new Date();
		postsCollection
			.doc(post.id)
			.update({
				comments: firestore.FieldValue.arrayUnion({
					commentTime: `${currentTime}`,
					data: currentComment,
					userID: user.id,
				}),
			})
			.then(() => {
				console.log('User updated!');
			});
		setCurrentComment('');
	};

	return (
		<SafeAreaView style={styles.commentViewWrapper}>
			<StatusBar hidden />
			<ScrollView>
				{allComments.map((ele, indx) => (
					<CommentBar key={indx} comment={ele} />
				))}
			</ScrollView>

			<View style={styles.postCommentView}>
				<View style={styles.inputView}>
					<Input
						placeholder="Add a comment"
						inputStyle={{ color: '#fff' }}
						value={currentComment}
						onChangeText={(value) => setCurrentComment(value)}
					/>
				</View>
				<TouchableOpacity
					onPress={() => {
						Keyboard.dismiss();
						handleComment();
					}}>
					<AntIcon name="rightcircleo" size={30} color="#CCCCCC" />
					<Text style={{ color: '#CCCCCC' }}>Post</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Comments;

const styles = StyleSheet.create({
	commentViewWrapper: {
		height: '100%',
		backgroundColor: '#111',
	},
	postCommentView: {
		flexDirection: 'row',
		paddingVertical: 2,
		width: dimensions.width,
		alignItems: 'center',
		paddingHorizontal: 5,
	},
	inputView: {
		width: '90%',
	},
});
