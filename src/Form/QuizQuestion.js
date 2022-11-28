import { useRef, useEffect, useState, useCallback } from "react";
import { QUIZ_ACTION } from "./QuizForm";

function QuizQuestion({ questionIndex, updateQuizState, question }) {
  const [inputValue, setInputValue] = useState("");

  const updateState = useCallback(() => {
    updateQuizState({
      type: QUIZ_ACTION.setQuestionTitle,
      payload: {
        questionIndex: questionIndex,
        title: inputValue,
      },
    });
  }, [inputValue, questionIndex, updateQuizState]);

  useEffect(() => {
    const id = setTimeout(updateState, 300);

    console.log("Useefect");

    return () => {
      console.log("Cleeeeen");
      clearTimeout(id);
    };
  }, [inputValue, updateState]);

  const inputQuestion = useRef(null);

  return (
    <div>
      <input
        ref={inputQuestion}
        onChange={() => setInputValue(inputQuestion.current.value)}
        // onInput={() =>
        //   updateQuizState({
        //     type: QUIZ_ACTION.setQuestionTitle,
        //     payload: {
        //       questionIndex: questionIndex,
        //       title: inputQuestion.current.value,
        //     },
        //   })
        // }
        value={inputValue}
        name="title"
        placeholder="Wpisz pytanie"
      />
    </div>
  );
}

export default QuizQuestion;
