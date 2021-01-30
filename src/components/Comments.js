import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Dimensions,
	ScrollView,
} from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { formatDistanceToNowStrict } from 'date-fns';

const dimensions = Dimensions.get('window');

const Comments = () => {
	let distance = formatDistanceToNowStrict(new Date(), {
		includeSeconds: true,
	});

	distance = distance.replace(
		/\w+$/,
		(unit) =>
			({
				minute: 'min',
				minutes: 'mins',
				hour: 'hr',
				seconds: 's',
				second: 's',
				years: 'yr',
				year: 'yr',
				days: 'd',
				day: 'd',
			}[unit]),
	);

	return (
		<SafeAreaView style={styles.commentViewWrapper}>
			<ScrollView>
				<ListItem containerStyle={styles.commentView} bottomDivider>
					<Avatar
						rounded
						source={{
							uri:
								'https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
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
								Joe Biden
							</ListItem.Title>
							<Text style={{ color: '#999999' }}>{distance}</Text>
						</View>
						<ListItem.Subtitle
							style={{
								color: '#fff',
								fontWeight: '400',
								marginTop: 5,
							}}>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Dolore iusto harum assumenda, vel perferendis
							quo
						</ListItem.Subtitle>
					</ListItem.Content>
				</ListItem>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Comments;

const styles = StyleSheet.create({
	commentViewWrapper: {
		height: dimensions.height,
		backgroundColor: '#111',
	},
	commentView: {
		backgroundColor: '#111',
	},
	nameView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
});
