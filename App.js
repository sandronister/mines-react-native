import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import params from './src/params';
import MineField from './src/components/MineField'
import Header from './src/components/Header'
import LevelSelection from './src/components/LevelSelection'

import {
	createMinedBoard, 
	cloneBoard, 
	openField, 
	hadExplosion, 
	wonGames, 
	showMines, 
	invertFlag, 
	flagsUsed
} from './src/rules'

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
			board:createMinedBoard(rows,columns,this.minesAmount()), 
			won:false, 
			lost:false,
			showLevelSelection:false
		}
	}

	openField = (row,column)=>{
		const board = cloneBoard(this.state.board)
		openField(row,column,board)
		const won = wonGames(board)
		const lost = hadExplosion(board)

		if(lost){
			showMines(board)
			Alert.alert('Perdeu','You lose')
		}

		if(won){
			Alert('Parabéns','You Win')
		}

		this.setState({board,lost,won})

	}

	onSelectField = (row,column)=>{
		const board = cloneBoard(this.state.board)
		invertFlag(board,row,column)
		const won = wonGames(board)

		if(won){
			Alert.alert('Parabéns você venceu')
		}

		this.setState({board,won})

	}

	onLevelSelected = level =>{
		params.difficultyLevel = level
		this.setState(this.createState())
	}



	render() {
		return (
			<View style={styles.container}>
				<LevelSelection isVisible={this.state.showLevelSelection}
					onLevelSelected={this.onLevelSelected}
					onCancel={()=>this.setState({showLevelSelection:false})}/>

				<Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
				 onNewGame={()=>this.setState(this.createState())}
				 onFlagPress={()=>this.setState({showLevelSelection:true})}
				 />
				<View styles={styles.board}>
					<MineField board={this.state.board} OnOpenField={this.openField}
					 onSelectField={this.onSelectField}/>
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
