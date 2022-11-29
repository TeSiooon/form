import { useRef } from "react";
import { QUIZ_ACTION } from "./QuizForm";

function QuizTitle({ updateQuizState, state }) {
  const inputTitle = useRef(null);
  const inputDescription = useRef(null);

  return (
    <div>
      <input
        ref={inputTitle}
        onChange={() =>
          updateQuizState({
            type: QUIZ_ACTION.setName,
            payload: inputTitle.current.value,
          })
        }
        name="title"
        placeholder="Wpisz tytul quizu"
        value={state.name}
      />
      <input
        ref={inputDescription}
        onChange={() =>
          updateQuizState({
            type: QUIZ_ACTION.setDescription,
            payload: inputDescription.current.value,
          })
        }
        name="description"
        placeholder="Podaj opis quizu"
        value={state.description}
      />
    </div>
  );
}

export default QuizTitle;
