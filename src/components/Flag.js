import React from 'react';
import { View, StyleSheet } from 'react-native';

export default (props) => {
	return (
		<View style={styles.container}>
			<View style={styles.flagPole} />
			<View style={styles.flag} />
			<View style={styles.base1} />
			<View style={styles.base2} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 2
	},
	flagPole: {
		position: 'absolute',
		height: 14,
		width: 2,
		backgroundColor: '#222',
		marginLeft: 9
	},
	flagPole: {
		position: 'absolute',
		height: 5,
		width: 6
	}
});
