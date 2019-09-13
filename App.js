import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import params from './src/params';
import MineField from './src/components/MineField'
import {createMinedBoard} from './src/rules'

export default class App extends Component {

	constructor(props){
		super(props)
		this.state = this.createState()
	}

	minesAmount = () =>{
		const rows = params.getRowsAmount()
		const columns = params.getColumnsAmount()
		return Math.ceil(rows*columns*params.difficultyLevel)
	}

	createState = () =>{
		const rows = params.getRowsAmount()
		const columns = params.getColumnsAmount()

		return{
			board:createMinedBoard(rows,columns,this.minesAmount())
		}
	}



	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Welcome mines</Text>
				<Text style={styles.welcome}>
					Your board {params.getRowsAmount()} x {params.getColumnsAmount()}
				</Text>
				<View styles={styles.board}>
					<MineField board={this.state.board}/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	board:{
		alignItems:'center', 
		backgroundColor:'#AAA'
	}
});
