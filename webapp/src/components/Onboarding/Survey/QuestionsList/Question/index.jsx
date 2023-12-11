import React from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

export default function Question({
  question,
  answerQuestion,
  value,
  answers,
  setAnswers,
}) {
  return (
    <Box marginBottom={8}>
      <Typography level="h6" marginBottom={2} fontWeight="bold">
        {question.question}
      </Typography>
      <RadioGroup
        name="radio-buttons-group"
        sx={{
          pl: 4,
        }}
      >
        {question.options.map((option) => (
          <Radio
            key={option.label}
            checked={
              answers.find((answer) => answer.question === question.question)
                ?.answer === option.value
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
            name="radio-buttons"
            label={option.label}
            slotProps={{ input: { 'aria-label': option.label } }}
          />
        ))}
      </RadioGroup>
    </Box>
  );
}
