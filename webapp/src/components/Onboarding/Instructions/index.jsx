import React from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Button from '@mui/joy/Button';

import AspectExample from './AspectExample/index.jsx';

import renderList from '../../../helpers/renderList.js';
import { aspectDescriptions } from '../../../constants/main.js';

const generalGuidelines = [
  'Suspend your judgment on what is false or undesirable when annotating. Conspiracy theories can seem far fetched or be outright false. Also, they often appeal to specific people, values, and ideologies. Take a detached outlook and judge each aspect only based on the following features.',
  <span>
    You will be asked to select the text parts corresponding to each one of five
    features of conspiracy theories: <strong>Actor</strong>,{' '}
    <strong>Action</strong>, <strong>Threat</strong>, <strong>Pattern</strong>,
    and <strong>Secrecy</strong>.
  </span>,
  'Based on the selected features you will be asked to indicate whether the whole comment classifies as a conspiracy comment overall with either: yes or no',
];

const linking = [
  'Select as little text as necessary to convey the feature',
  [
    'You may rely on common knowledge when determining whether text refers to a feature, e.g., black helicopter (as a symbol of military takeover), black trucks (as a symbol of child abduction), however:',
    'You should not follow links to access the content or annotate them: rely on the text only',
    <span>
      Whenever features are <strong>ambiguous</strong>, annotate if you think
      most people would interpret the feature the same way; leave them out when
      they are missing from the text
    </span>,
  ],
  [
    'Each feature may be present or not',
    <span>
      Whenever the feature is present but <strong>implicit</strong>, mark the
      text passage that approximates the feature the most (e.g. “they”), but
      when they are passively implied without a representative word, do not
      annotate the feature. A feature should always be identifiable with (a)
      concrete word(s) in the text.
    </span>,
    <span>
      Whenever the feature spans text that is <strong>not contiguous</strong>,
      do not mark text as a feature if no words can be linked to it
    </span>,
    <span>
      Whenever a feature is a reference to <strong>previous utterances</strong>{' '}
      in the conversation, do not mark it as a feature
    </span>,
    <span>
      Whenever there are <strong>multiple text</strong> passages representing
      one single feature (e.g.: “Clinton, Spacey and Blair and Mandelson - all
      friends with Epstein” indicating the actor feature), identify and mark all
      relevant text passages that are representative of the same feature
    </span>,
    <span>
      Whenever the same text passage indicates{' '}
      <strong>multiple different features</strong> (e.g.: “You know how children
      get kidnapped.” kidnapped symbolising threat and action features), use the
      same text parts to mark different feature', 'Whenever there are multiple
      theories present in a comment, identify all features as you would for a
      single theory
    </span>,
  ],
  <span>
    Whenever there are <strong>fictitious</strong>, abstract, inanimate text
    parts, annotate like other features
  </span>,
];

const sideNotes = [
  'Ask yourself first if the text is describing each aspect, before looking for the specific words to highlight. For example, for threat, ask yourself: is the text discussing negative consequences of some action? If so, what are the words used to convey them?',
  'We welcome your feedback to the annotation interface and questions. If you have some suggestions, e.g., for a modification in the interface or a new question/feature, please let us know in the comments section.',
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
        More specifically, the task is to annotate which text part corresponds
        to the five features indicating conspiracy theories. Within the text,
        these features may be missing altogether, partly fulfilled, or can be
        all satisfied. The five features that are to be annotated are: Actor,
        Action, Threat, Pattern, and Secrecy.
      </Typography>
      <Typography level="h3" marginBottom={2}>
        General guidelines
      </Typography>
      <List marker="disc" sx={{ marginBottom: 2 }}>
        {generalGuidelines.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </List>
      <Typography level="h3" marginBottom={2}>
        Selecting and linking text parts and features
      </Typography>
      {renderList(linking)}
      <Typography level="h3" marginBottom={2}>
        Side notes
      </Typography>
      {renderList(sideNotes)}
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
