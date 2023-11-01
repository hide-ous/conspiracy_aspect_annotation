import React from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

export default function Introduction({ onContinue }) {
  return (
    <Box
      sx={{
        maxWidth: '1024px',
      }}
    >
      <Typography level="h1" marginBottom={3}>
        Introduction
      </Typography>
      <Typography marginBottom={2}>
        Welcome, this study is about identifying conspiracy theories in forum
        posts. Specifically, the goal is to identify indicative features of
        conspiracies on the Reddit forum. Your main task will be to locate and
        annotate five text features for each post. You will be asked to annotate
        XXX texts, which will take around XXX minutes. In addition, you will be
        surveyed on your own beliefs and perceptions about secret plans, control
        of information, and threatening events.
      </Typography>
      <Typography marginBottom={4}>
        All information you provide will be stored anonymously and you can
        withdraw at any time from the study without giving a reason.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={onContinue}>Continue</Button>
      </Box>
    </Box>
  );
}
