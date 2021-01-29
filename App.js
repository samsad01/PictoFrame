import React from 'react';
import AppStack from './src/routes/AppStack';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
	return (
		<NavigationContainer>
			<AppStack />
		</NavigationContainer>
	);
};

export default App;
