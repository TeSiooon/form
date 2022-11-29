import { useState } from "react";
import { QUIZ_ACTION } from "./QuizForm";
import styles from "./QuizForm.module.css";
import { v4 as uuid } from "uuid";

function QuestionAnswer({ updateQuizState, answerIndex, questionIndex }) {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };

  const removeAnswer = () => {
    updateQuizState({
      type: QUIZ_ACTION.removeAnswer,
      payload: {
        questionIndex: questionIndex,
        answer: {
          answerIndex: answerIndex,
        },
      },
    });
  };
  // console.log(checked);
  return (
    <div className={styles.answers}>
      <div>
        <input name="title" placeholder="Podaj odpowiedz"></input>
        <input
          type="checkbox"
          value={checked}
          onClick={handleChange}
          name="isCorrect"
        ></input>
      </div>
      <button onClick={removeAnswer}>Usun to pytanie</button>
    </div>
  );
}

export default QuestionAnswer;
