import React from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Button from '@mui/joy/Button';

import AspectExample from './AspectExample/index.jsx';

import renderList from '../../../helpers/renderList.js';
import { aspectDescriptions } from '../../../constants/main.js';

const howToAnnotate = [
  // [
    'Do:',
    'Select as few words as necessary to report each feature',
    'Mark all passages if a feature occurs multiple times or is split in the text',
    'You may annotate the same text passage as different features ',
  // ],
  // [
  //   'Dont’s',
  //   'Do not mark references to previously marked features; for example, if one specific actor of the conspiracy is mentioned three times, only mark the first occurrence',
  //   'Do not follow links',
  // ],
];

export default function Instructions({ onContinue, modal, hideModal }) {
  return (
    <Box
      sx={{
        maxWidth: '1024px',
      }}
    >
      <Typography level="h2" marginBottom={2}>
        Annotating features of conspiracy theories
      </Typography>
      <Typography marginBottom={2}>
        Your task is to annotate which text parts correspond to one of five
        features indicative of conspiracy theories. The features may be clearly
        stated in the text, only partly present, or fully absent.
      </Typography>
      <Typography marginBottom={2}>
        You will have to annotate the following features: <b>Actor</b>,{' '}
        <b>Action</b>, <b>Effect</b>, <b>Victim</b>, and <b>Evidence</b>.
      </Typography>
      <Typography marginBottom={2}>
        You will also be asked if you think the entire text you read is a
        conspiracy.
      </Typography>
      <Typography level="h3" marginBottom={2}>
        How to annotate:
      </Typography>
      {renderList(howToAnnotate)}
      <Typography level="h3" marginBottom={2}>
        Features of conspiracy theories
      </Typography>
      {aspectDescriptions.map((aspect) => (
        <Box key={aspect.title}>
          <Typography level="h4" marginBottom={2}>
            {aspect.title}
          </Typography>
          <Typography marginBottom={2}>{aspect.description}</Typography>
          <AspectExample aspect={aspect.title} />
        </Box>
      ))}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 4,
        }}
      >
        <Button onClick={modal ? hideModal : onContinue}>
          {modal ? 'Back' : 'Continue'}
        </Button>
      </Box>
    </Box>
  );
}
