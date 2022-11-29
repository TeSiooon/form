import { useRef } from "react";
import QuestionAnswer from "./QuestionAnswer";
import { QUIZ_ACTION } from "./QuizForm";
import styles from "./QuizForm.module.css";
import { v4 as uuid } from "uuid";

function QuizQuestion({ questionIndex, updateQuizState, question }) {
  const inputQuestion = useRef(null);

  const addAnswer = () => {
    updateQuizState({
      type: QUIZ_ACTION.addAnswer,
      payload: {
        questionIndex: questionIndex,
        answer: {
          id: uuid(),
          title: "",
          isCorrect: false,
        },
      },
    });
  };

  return (
    <div className={styles.question}>
      <input
        ref={inputQuestion}
        onChange={() =>
          updateQuizState({
            type: QUIZ_ACTION.setQuestionTitle,
            payload: {
              questionIndex: questionIndex,
              title: inputQuestion.current.value,
            },
          })
        }
        value={question.title}
        name="title"
        placeholder="Wpisz pytanie"
      />
      {question.answers.map((answer, index) => (
        <QuestionAnswer
          key={answer.id}
          answerIndex={index}
          updateQuizState={updateQuizState}
          questionIndex={questionIndex}
        />
      ))}

      <button onClick={addAnswer}>Dodaj odpowiedz</button>
    </div>
  );
}

export default QuizQuestion;
