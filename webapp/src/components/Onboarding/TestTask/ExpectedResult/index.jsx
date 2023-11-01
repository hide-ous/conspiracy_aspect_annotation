import React from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

import Annotation from '../../../Annotation/index.jsx';

export default function ExpectedResult({
  highlights,
  text,
  switchToNextTask,
  height,
}) {
  return (
    <Box>
      <Typography level="h2" marginBottom={2}>
        Expected result
      </Typography>
      <Box marginBottom={3}>
        <Annotation
          textContainerClass="expected-result"
          readonly
          highlights={highlights}
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
