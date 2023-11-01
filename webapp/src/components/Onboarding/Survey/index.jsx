import React, { useState } from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

import Question from './Question/index.jsx';

const likertScale = [
  {
    value: 1,
    label: 'Strongly disagree',
  },
  {
    value: 2,
    label: 'Disagree',
  },
  {
    value: 3,
    label: 'Neutral',
  },
  {
    value: 4,
    label: 'Agree',
  },
  {
    value: 5,
    label: 'Strongly agree',
  },
];

const questions = [
  {
    question:
      '“Much of our lives are being controlled by plots hatched in secret places”',
    options: likertScale,
  },
  {
    question:
      '“Big events like wars, the current recession, and the outcomes of elections are controlled by small groups of people who are working in secret against the rest of us”',
    options: likertScale,
  },
  {
    question:
      '“Certain significant events have been the result of the activity of a small group who secretly manipulate world events”',
    options: likertScale,
  },
  {
    question:
      '“New and advanced technology which would harm current industry is being suppressed”',
    options: likertScale,
  },
  {
    question:
      '“Groups of scientists manipulate, fabricate, or suppress evidence in order to deceive the public”',
    options: likertScale,
  },
  {
    question:
      '“A lot of important information is deliberately concealed from the public out of self-interest”',
    options: likertScale,
  },
  {
    question:
      '“I think that the official version of the events given by authorities very often hides the truth”',
    options: likertScale,
  },
  {
    question: '“Established conducts should not be questioned”',
    options: likertScale,
  },
  {
    question:
      '“People should leave important decisions to those in charge/the leaders.”',
    options: likertScale,
  },
  {
    question:
      '“Troublemakers should clearly feel the effect of the fact that they are unwanted in society.”',
    options: likertScale,
  },
  {
    question:
      'Imagine you notice that a person you don’t know is looking at you. You suddenly find yourself feeling unsettled. I am most likely to think:',
    options: [
      {
        value:
          'Feeling this unsettled means this person intends to do me harm ',
        label:
          'Feeling this unsettled means this person intends to do me harm ',
      },
      {
        value:
          'I wonder why I feel this unsettled, could this mean this person is thinking bad things about me',
        label:
          'I wonder why I feel this unsettled, could this mean this person is thinking bad things about me',
      },
      {
        value:
          'Being looked at can make people feel unsettled, I don’t worry about it',
        label:
          'Being looked at can make people feel unsettled, I don’t worry about it',
      },
    ],
  },
  {
    question:
      'Imagine you are at home; everything is quiet when you hear a sudden fast banging on the walls. I am most likely to think:',
    options: [
      {
        value: 'The neighbors are doing this deliberately to upset me',
        label: 'The neighbors are doing this deliberately to upset me',
      },
      {
        value: 'The neighbors could be doing some kind of home improvements',
        label: 'The neighbors could be doing some kind of home improvements',
      },
      {
        value: 'The neighbors might be trying to tell me something',
        label: 'The neighbors might be trying to tell me something',
      },
    ],
  },
  {
    question:
      'Imagine you are listening to the radio and suddenly there is crackling interference. I am most likely to think:',
    options: [
      {
        value:
          'Someone has deliberately tampered with my radio so that it is no longer tuned properly',
        label:
          'Someone has deliberately tampered with my radio so that it is no longer tuned properly',
      },
      {
        value: 'I wonder if someone has been fiddling with my radio',
        label: 'I wonder if someone has been fiddling with my radio',
      },
      {
        value: 'There is some sort of interference on the radio waves',
        label: 'There is some sort of interference on the radio waves',
      },
    ],
  },
  {
    question:
      'Imagine that one evening you are sitting at home alone when a door suddenly slams by itself in another room. I am most likely to think:',
    options: [
      {
        value: 'Someone or something must have got into the house',
        label: 'Someone or something must have got into the house',
      },
      {
        value: 'I wonder if somebody or something’s there',
        label: 'I wonder if somebody or something’s there',
      },
      {
        value: 'It’s probably a draught',
        label: 'It’s probably a draught',
      },
    ],
  },
];

export default function Survey({ handleSubmit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(
    questions.map((question) => ({
      question: question.question,
      answer: '',
    }))
  );

  const answerQuestion = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      question: questions[currentQuestionIndex].question,
      answer,
    };

    setAnswers(newAnswers);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '600px',
      }}
    >
      <Typography level="h2" marginBottom={2}>
        Survey
      </Typography>
      <Typography marginBottom={2}>
        {currentQuestionIndex < 10
          ? 'Answer to which degree you agree with the following statement:'
          : 'Select the answer that best reflects your perception:'}
      </Typography>
      <Box marginBottom={2}>
        <Question
          question={questions[currentQuestionIndex]}
          answerQuestion={answerQuestion}
          value={answers[currentQuestionIndex]?.answer}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          disabled={!answers[currentQuestionIndex].answer}
          onClick={() => {
            if (currentQuestionIndex === questions.length - 1) {
              console.log(answers);
              handleSubmit();
            } else {
              setCurrentQuestionIndex((prevState) => prevState + 1);
            }
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
