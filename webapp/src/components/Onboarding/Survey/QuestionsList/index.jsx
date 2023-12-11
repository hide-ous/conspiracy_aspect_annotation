import React from 'react';

import Question from './Question/index.jsx';

export default function QuestionsList({ questions, answers, setAnswers }) {
  return (
    <ul
      style={{
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      {questions.map((question) => (
        <li key={question.question}>
          <Question
            question={question}
            answers={answers}
            setAnswers={setAnswers}
          />
        </li>
      ))}
    </ul>
  );
}
