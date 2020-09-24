import React from "react";
import { AnswerObject } from "../App";
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";
interface Props {
  Question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNum: number;
  totalQues: number;
}

const QuestionCard: React.FC<Props> = ({
  Question,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQues,
}) => {
  return (
    <Wrapper>
      <p className="number">
        Question: {questionNum} / {totalQues}
      </p>
      {
        <div>
          <p dangerouslySetInnerHTML={{ __html: Question }}></p>
          <div>
            {answers.map((el, index) => (
              <ButtonWrapper
                key={index}
                correct={userAnswer?.correctAnsewer === el}
                userClicked={userAnswer?.answer === el}
              >
                <button
                  disabled={userAnswer ? true : false}
                  value={el}
                  onClick={callback}
                >
                  <span dangerouslySetInnerHTML={{ __html: el }}></span>
                </button>
              </ButtonWrapper>
            ))}
          </div>
        </div>
      }
    </Wrapper>
  );
};

export default QuestionCard;
