import React from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	StatusBar,
	Dimensions,
	SafeAreaView,
} from 'react-native';
import FeIcon from 'react-native-vector-icons/Feather';
import Card from './Card';

const dimensions = Dimensions.get('window');

const Feed = () => {
	return (
		<SafeAreaView>
			<StatusBar hidden />
			<ScrollView
				contentContainerStyle={styles.scrollView}
				stickyHeaderIndices={[0]}>
				<View>
					<View style={styles.headerWrapper}>
						<View>
							<FeIcon name="menu" color="#fff" size={30} />
						</View>
						<View>
							<Text style={styles.headerText}>Picto Frame</Text>
						</View>
						<View>{/* Empty view for styling */}</View>
					</View>
				</View>
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Feed;

const styles = StyleSheet.create({
	headerWrapper: {
		backgroundColor: '#111',
		flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 10,
		justifyContent: 'space-between',
		width: dimensions.width,
	},
	headerText: {
		color: '#fff',
		fontSize: 25,
	},
	scrollView: {
		backgroundColor: '#111',
		paddingBottom: 20,
	},
});
