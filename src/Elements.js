
import { nanoid } from "nanoid";
import { decode } from 'html-entities';


const Elements = props => {
	const incorrectAnswersElements = props.incorrectAnswers.map(answer => {
		const incorrectAnswerClassName = `
			${props.selectedAnswer === answer ? "question-btn-selected" : "question-btn"}
		`;

		return <button
			key={nanoid()}
			className={incorrectAnswerClassName}
			onClick={() => props.handleSelectAnswer(props.id, answer)}
		>
			{ decode(answer) }
		</button>
	});

	const correctAnswerClassName = `
		${props.selectedAnswer === props.correctAnswer ? "question-btn-selected" : "question-btn"}
	`;

	const correctAnswerElement =
		<button
			key={nanoid()}
			className={correctAnswerClassName}
			onClick={() => props.handleSelectAnswer(props.id, props.correctAnswer)}
		>
			{ decode(props.correctAnswer) }
		</button>
	
	incorrectAnswersElements.push(correctAnswerElement);

	const sortedAnswerElements = incorrectAnswersElements.sort((a, b) => (
		a.props.children.localeCompare(b.props.children))
	);

	return (
		<article className="questions-container">
			<div>
				<h3 className="questions-title">{ decode(props.questioon) }</h3>
                <div className="questions-div">
				{ sortedAnswerElements }
                </div>
			</div>
		</article>
	);
}

export default Elements;