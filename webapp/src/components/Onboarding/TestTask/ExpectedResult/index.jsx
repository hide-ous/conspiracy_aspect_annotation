import React from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

import Annotation from '../../../Annotation/index.jsx';

const shadeColors = {
  primary: '#002f78',
  success: '#285100',
  neutral: '#35383b',
  danger: '#6d0000',
  warning: '#632800',
};

export default function ExpectedResult({
  highlights,
  text,
  switchToNextTask,
  height,
  userInput,
}) {
  const formattedAndFilteredUserInput = userInput
    .filter((hl) => hl.aspect.title === highlights[0].aspect.title)
    .map((hl) => ({
      ...hl,
      readonly: true,
      aspect: {
        ...hl.aspect,
        title: 'Your answer',
        color: shadeColors[hl.aspect.color],
      },
    }));

  const readOnlyHighlights = highlights.map((hl) => ({
    ...hl,
    readonly: true,
  }));

  return (
    <Box>
      <Typography level="h2" marginBottom={2}>
        Expected result
      </Typography>
      <Box marginBottom={3}>
        <Annotation
          textContainerClass="expected-result"
          readonly
          highlights={[...readOnlyHighlights, ...formattedAndFilteredUserInput]}
          text={text}
          height={height}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button onClick={switchToNextTask}>Continue</Button>
      </Box>
    </Box>
  );
}
