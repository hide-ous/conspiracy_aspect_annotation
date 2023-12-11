import React from 'react';

import Table from '@mui/joy/Table';
import Radio from '@mui/joy/Radio';

export default function QuestionsTable({ questions, answers, setAnswers }) {
  return (
    <Table>
      <thead
        style={{
          position: 'sticky',
          zIndex: 1,
          top: '166px',
          backgroundColor: '#f0f4f8',
        }}
      >
        <tr>
          <th />
          {questions[0].options.map((option) => (
            <th
              style={{
                textAlign: 'center',
              }}
              key={option.value}
            >
              {option.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {questions.map((question) => (
          <tr key={question.question}>
            <td>{question.question}</td>
            {question.options.map((option) => (
              <td
                key={option.value}
                style={{
                  textAlign: 'center',
                }}
              >
                <Radio
                  key={option.label}
                  checked={
                    answers.find(
                      (answer) => answer.question === question.question
                    )?.answer === option.value
                  }
                  onChange={() =>
                    setAnswers((prevAnswers) => {
                      return prevAnswers.map((answer) => {
                        if (answer.question === question.question) {
                          return {
                            question: question.question,
                            answer: option.value,
                          };
                        }

                        return answer;
                      });
                    })
                  }
                  name={question}
                  slotProps={{ input: { 'aria-label': option.label } }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
