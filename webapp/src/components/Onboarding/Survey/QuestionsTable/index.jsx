import React from 'react';

import Table from '@mui/joy/Table';
import Radio from '@mui/joy/Radio';

export default function QuestionsTable({ questions, answers, setAnswers }) {
  return (
    <Table
      sx={{
        maxWidth: 900,
      }}
    >
      <thead
        style={{
          position: 'sticky',
          zIndex: 1,
          top: '166px',
          backgroundColor: '#f0f4f8',
        }}
      >
        <tr>
          <th
            style={{
              width: 308,
              whiteSpace: 'unset',
            }}
          />
          {questions[0].options.map((option, index) => (
            <th
              style={{
                textAlign: 'center',
                width: index === 0 ? '7vw' : '6vw',
                whiteSpace: 'unset',
              }}
              key={option.value}
            >
              {option.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {questions.map((question, index) => (
          <tr
            key={question.question}
            style={{
              backgroundColor: index % 2 === 0 ? 'transparent' : '#d9dee3',
            }}
          >
            <td style={{ width: 308 }}>{question.question}</td>
            {question.options.map((option, index) => (
              <td
                key={option.value}
                style={{
                  textAlign: 'center',
                  width: index === 0 ? '7vw' : '6vw',
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
