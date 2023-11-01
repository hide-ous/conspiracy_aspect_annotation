import React from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

export default function Question({ question, answerQuestion, value }) {
  return (
    <Box
      marginBottom={4}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography level="h6" marginBottom={2} fontWeight="bold">
        {question.question}
      </Typography>
      <RadioGroup name="radio-buttons-group">
        {question.options.map((option) => (
          <Radio
            key={option.label}
            checked={value === option.value}
            onChange={() => answerQuestion(option.value)}
            name="radio-buttons"
            label={option.label}
            slotProps={{ input: { 'aria-label': option.label } }}
          />
        ))}
      </RadioGroup>
    </Box>
  );
}
