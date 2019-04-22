import React, { Component } from 'react';
import QuestionsList from './questions2.json';
import './App.css';

class App extends Component {
	state = {
		questions: QuestionsList.questions,
		qurent_question: 1,
		answer: 0,
		active: 0,
		correct: 0,
		check: false
	}

	answerClick = (event) => {
		let id = event.target.id;
		this.setState({ answer: Number(id) })
	}

	checkAnswer = () => {
		if(Number(QuestionsList.questions[this.state.qurent_question].correct_answer) === Number(this.state.answer)) {
			this.setState( prevState => ({ correct: ++prevState.correct, check: true }) )
		}else{
			this.setState({ check: true })
		}
	}

	nextQuestion = () => {
		if(this.state.qurent_question === 96) {
			this.setState({ 
				qurent_question: 1,
				check: false,
				answer: 0
			})
		}else{
			this.setState(prevState => ({
				qurent_question: ++prevState.qurent_question,
				check: false,
				answer: 0
			}));
		}
	}

	check = (key) => {
		if(!this.state.check && key+1 === this.state.answer) return "active";
		if(this.state.check && key+1 === Number(QuestionsList.questions[this.state.qurent_question].correct_answer)) return "correct";
		if((this.state.check && key+1 === this.state.answer) && key+1 !== Number(QuestionsList.questions[this.state.qurent_question].correct_answer)) return "wrong";
		return "button";
	}


  	render() {
		  
		const { questions, qurent_question } = this.state;
		  
		return (
			<div className="App">
			<p>Правильных ответов { this.state.correct } из 96</p>
			<p>Билет № {this.state.qurent_question}</p>
				<div className="question">
					<p>{ questions[qurent_question].question }</p>
				</div>
				<div className="answers">
					{
						questions[qurent_question].answers.map((answer,key) => 
							<p className={ this.check(key) }
							key={ key } id={ key+1 } onClick={this.answerClick}>{ answer }</p>
						)
					}
				</div>
				{
					this.state.check ? <button onClick={this.nextQuestion}>NEXT</button> : <button onClick={this.checkAnswer}>Проверить</button>
				}
				
			</div>
		);
  	}
}

export default App;
