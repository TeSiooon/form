import { useEffect, useReducer } from "react";
import QuestionAnswer from "./QuestionAnswer";
import QuizQuestion from "./QuizQuestion";
import QuizTitle from "./QuizTitle";
import { v4 as uuid } from "uuid";

export const QUIZ_ACTION = {
  setName: "SET_NAME",
  setDescription: "SET_DESCRIPTION",
  setCategoryId: "SET_CATEGORY_ID",
  addQuestion: "ADD_QUESTION",
  setQuestionTitle: "SET_QUESTION_TITLE",
  setState: "SET_STATE",
  addAnswer: "ADD_ANSWER",
  removeAnswer: "REMOVE_ANSWER",
};

const initialState = {
  name: "",
  description: "",
  categoryId: null,
  questions: [],
};

function reducer(state, action) {
  switch (action.type) {
    case QUIZ_ACTION.setName:
      return { ...state, name: action.payload };
    case QUIZ_ACTION.setDescription:
      return { ...state, description: action.payload };
    case QUIZ_ACTION.setCategoryId:
      return { ...state, categoryId: action.payload };
    case QUIZ_ACTION.addQuestion:
      return {
        ...state,
        questions: [...state.questions, action.payload],
      };
    case QUIZ_ACTION.setQuestionTitle: {
      const newState = { ...state };
      newState.questions[action.payload.questionIndex].title =
        action.payload.title;
      return newState;
    }
    case QUIZ_ACTION.addAnswer: {
      const newState = { ...state };
      newState.questions[action.payload.questionIndex].answers.push(
        action.payload.answer
      );
      // console.log("asdsdaasdasd");
      // console.log(state);
      // console.log(newState);
      return newState;
    }
    case QUIZ_ACTION.removeAnswer: {
      const newState = { ...state };
      newState.questions[action.payload.questionIndex].answers.splice(
        action.payload.answer.answerIndex,
        1
      );
      console.log(newState.questions[action.payload.questionIndex].answers);
      return newState;
    }
    case QUIZ_ACTION.setState:
      return action.payload;
    default:
      return state;
  }
}

function QuizForm() {
  const loadedState = JSON.parse(localStorage.getItem("quizState"));

  const [quizState, setQuizState] = useReducer(
    reducer,
    loadedState ? loadedState : initialState
  );

  // useEffect(() => {
  //   const loadedState = JSON.parse(localStorage.getItem("quizState"));
  //   console.log(loadedState);
  //   if (loadedState) {
  //     setQuizState({
  //       type: QUIZ_ACTION.setState,
  //       payload: loadedState,
  //     });
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("quizState", JSON.stringify(quizState));
  }, [quizState]);

  const submit = (e) => {
    e.preventDefault();
  };
  //Dodanie pytania
  const addQuestion = () => {
    setQuizState({
      type: QUIZ_ACTION.addQuestion,
      payload: {
        id: uuid(),
        title: "",
        answers: [],
      },
    });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <QuizTitle updateQuizState={setQuizState} state={quizState} />
        {quizState.questions.map((question, index) => (
          <QuizQuestion
            question={question}
            key={question.id}
            questionIndex={index}
            updateQuizState={setQuizState}
          />
        ))}
        {/* Guzik od nowych pytan */}
      </form>
      <button onClick={addQuestion}>Dodaj kolejne pytanie</button>
    </div>
  );
}

export default QuizForm;
