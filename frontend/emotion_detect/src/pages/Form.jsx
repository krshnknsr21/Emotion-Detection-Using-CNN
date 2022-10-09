import React, { useState } from "react";
import "./styles.css";

const Form = () => {
  const [textInput, setTextInput] = useState();
  const [mood, setMood] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch("/getmood?input=" + textInput)
      .then((res) => res.json())
      .then((data) => {
        setMood(data.mood);
        console.log(data);
      });
  };

  return (
    <div className="outside">
      <form onSubmit={handleSubmit}>
        <textarea
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Enter your current mood in 10-20 words "
          type="textarea"
          name="Mood"
          rows={3}
          cols={4}
          //   required
        />
        <h2 className="moodOutput">{mood}</h2>
        <button variant="primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
