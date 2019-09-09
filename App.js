import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import params from './src/params';
import Field from './src/components/Field';

export default class App extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Welcome mines</Text>
				<Text style={styles.welcome}>
					Your board {params.getRowsAmount()} x {params.getColumnsAmount()}
				</Text>
				<Field />
				<Field opened/>
				<Field mined/>
				<Field mined opened exploded/>
				<Field mined opened/>
				<Field opened nearMines={1}/>
				<Field opened nearMines={2}/>
				<Field opened nearMines={4}/>
				<Field opened nearMines={6}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	}
});
