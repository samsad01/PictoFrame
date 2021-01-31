import React from 'react';
import {
	ScrollView,
	StyleSheet,
	StatusBar,
	Dimensions,
	SafeAreaView,
} from 'react-native';
import Card from './Card';

const dimensions = Dimensions.get('window');

const Feed = ({ navigation }) => {
	return (
		<SafeAreaView
			style={{ backgroundColor: '#111', height: dimensions.height }}>
			<StatusBar hidden />
			<ScrollView contentContainerStyle={styles.scrollView}>
				<Card navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Feed;

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: '#111',
		paddingBottom: 20,
	},
});
