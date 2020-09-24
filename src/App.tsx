import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions } from "./API";
import { QuestionState, Difficulty } from "./API";
import { GlobalStyle, Wrapper } from "./App.styles";
interface Props {}
const TOTAL_QUES = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnsewer: string;
};
const App: React.FC<Props> = () => {
  // todo states

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setgameOver] = useState(true);

  //todo functions
  const startTrivia = async () => {
    setLoading(true);
    setgameOver(false);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUES, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // ** user answers
      const answer = e.currentTarget.value;
      // ** check answer against correct value
      const correct = questions[number].correct_answer === answer;
      // addscore ifcorrect answer
      if (correct) setScore((prev) => prev + 1);
      // ** save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnsewer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };
  const nextQuestion = () => {
    // ** go to next question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUES) {
      setgameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper className="App">
        <h1>React Quiz</h1>
        {/*  conditional rendering in react */}
        {gameOver || userAnswers.length === TOTAL_QUES ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameOver ? <p className="score">Score: {score} </p> : null}
        {loading && <p className="score"> Loading Questions</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNum={number + 1}
            totalQues={TOTAL_QUES}
            Question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          ></QuestionCard>
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUES - 1 ? (
          <button onClick={nextQuestion} className="next">
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
