import { useState } from "react";
import styles from "./QuizForm.module.css";

function QuestionAnswer() {
  const [inputFields, setIntupFields] = useState([
    {
      title: "",
      isCorrect: "",
    },
  ]);

  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  const handleFormChange = (index, e) => {
    let data = [...inputFields];
    data[index][e.target.name] = e.target.value;
    setIntupFields(data);
  };

  const addAnswerField = (e) => {
    e.preventDefault();
    let newAnswer = {
      title: "",
      isCorrect: "",
    };
    setIntupFields([...inputFields, newAnswer]);
  };
  const removeAnswerField = (index, e) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setIntupFields(data);
    // console.log(index + "index usuwanego");
  };

  console.log(inputFields);

  return (
    <div className={styles.answers}>
      {inputFields.map((input, index) => {
        return (
          <div key={index}>
            <input
              name="title"
              placeholder="Wpisz tytul quizu"
              value={input.name}
              onChange={(e) => handleFormChange(index, e)}
            ></input>
            <input
              type="checkbox"
              name="isCorrect"
              onChange={((e) => handleFormChange(index, e), handleChange)}
              value={input.isCorrect}
              //checked={checked}
            ></input>
            <button onClick={() => removeAnswerField(index)}>
              Usun to pytanie
            </button>
          </div>
        );
      })}
      <button onClick={addAnswerField}>Dodaj wiecej odpowiedzi</button>
    </div>
  );
}

export default QuestionAnswer;
