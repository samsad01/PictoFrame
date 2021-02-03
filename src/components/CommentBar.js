import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { formatDistanceToNowStrict } from 'date-fns';
import firestore from '@react-native-firebase/firestore';

const CommentBar = ({ comment }) => {
	const usersCollection = firestore().collection('Users');

	const [userDetails, setUserDetails] = useState({
		name: '',
		dp:
			'https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
	});

	const [distance, setDistance] = useState('0');
	useEffect(() => {
		let dist = formatDistanceToNowStrict(new Date(comment.commentTime), {
			includeSeconds: true,
		});
		dist = dist.replace(
			/\w+$/,
			(unit) =>
				({
					minute: 'min',
					minutes: 'mins',
					hour: 'hr',
					hours: 'hr',
					seconds: 's',
					second: 's',
					years: 'yr',
					year: 'yr',
					days: 'd',
					day: 'd',
					months: 'm',
					month: 'm',
				}[unit]),
		);

		setDistance(dist);

		usersCollection
			.doc(comment.userID)
			.get()
			.then((data) => {
				setUserDetails(data.data());
			});
	}, []);

	return (
		<ListItem containerStyle={styles.commentView} bottomDivider>
			<Avatar
				rounded
				source={{
					uri: userDetails.dp,
				}}
				resizeMode={'stretch'}
			/>
			<ListItem.Content>
				<View style={styles.nameView}>
					<ListItem.Title
						style={{
							color: '#fff',
							fontSize: 20,
							letterSpacing: 0.5,
						}}>
						{userDetails.name}
					</ListItem.Title>
					<Text style={{ color: '#999999' }}>{distance}</Text>
				</View>
				<ListItem.Subtitle
					style={{
						color: '#fff',
						fontWeight: '400',
						marginTop: 5,
					}}>
					{comment.data}
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

export default CommentBar;

const styles = StyleSheet.create({
	commentView: {
		backgroundColor: '#111',
	},
	nameView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
});
