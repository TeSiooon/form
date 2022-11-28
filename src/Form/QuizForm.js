import { useReducer } from "react";
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
        questions: [...state.questions, { ...action.payload }],
      };
    case QUIZ_ACTION.setQuestionTitle: {
      const newState = { ...state };
      newState.questions[action.payload.questionIndex].title =
        action.payload.title;
      console.log(newState);
      return newState;
    }
    default:
      return state;
  }
}

function QuizForm() {
  const [quizState, setQuizState] = useReducer(reducer, initialState);
  console.log(quizState);
  const submit = (e) => {
    e.preventDefault();
  };

  //Dodanie pytania
  const addQuestion = () => {
    setQuizState({
      type: QUIZ_ACTION.addQuestion,
      payload: {
        title: "",
        answers: [],
      },
    });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <QuizTitle updateQuizState={setQuizState} />
        {quizState.questions.map((question, index) => (
          <QuizQuestion
            question={quizState}
            key={uuid()}
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
