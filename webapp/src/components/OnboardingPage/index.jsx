import React, { useState, useEffect } from 'react';

import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Introduction from '../Onboarding/Introduction/index.jsx';
import Instructions from '../Onboarding/Instructions/index.jsx';
import TestTask from '../Onboarding/TestTask/index.jsx';
import Survey from '../Onboarding/Survey/index.jsx';

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

export default function OnboardingPage({ initialTaskData, onSubmit }) {
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0);
  const [testTaskHighlights, setTestTaskHiglights] = useState([]);
  const [surveyPage, setSurveyPage] = useState(0);
  const [isTestTaskCompleted, setIsTestTaskCompleted] = useState(false);
  const [answers, setAnswers] = useState(
    questions.map((question) => ({
      question: question.question,
      answer: '',
    }))
  );

  // Scroll to top when page changes
  useEffect(() => {
    console.log(surveyPage, currentOnboardingStep);
    window.scrollTo(0, 0);
  }, [currentOnboardingStep]);

  const submitOnboardingTask = (survey) => {
    const urlParams = new URLSearchParams(window.location.search);
    const worker_id = urlParams.get('worker_id');
    const assignment_id = urlParams.get('assignment_id');
    const prolific_user_id = urlParams.get('participant_id');

    const getFilteredHighlights = (aspectTitle) => {
      return testTaskHighlights
        .filter((hl) => hl.aspect.title === aspectTitle)
        .map((hl) => ({
          start: hl.start,
          end: hl.end,
        }));
    };

    onSubmit({
      aspects: {
        Actor: getFilteredHighlights('Actor'),
        Action: getFilteredHighlights('Action'),
        Pattern: getFilteredHighlights('Pattern'),
        Threat: getFilteredHighlights('Threat'),
        Secrecy: getFilteredHighlights('Secrecy'),
      },
      survey: {
        answers: survey,
        worker_id,
        assignment_id,
        prolific_user_id,
      },
    });
  };

  const goBack = () => {
    if (currentOnboardingStep === 1) {
      setCurrentOnboardingStep(0);
    } else if (currentOnboardingStep === 3) {
      if (surveyPage === 0) {
        setCurrentOnboardingStep(1);
      } else {
        setSurveyPage(surveyPage - 1);
      }
    }
  };

  return (
    <CssVarsProvider>
      <Sheet
        className="AnnotationPage"
        variant="soft"
        sx={{
          height: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: currentOnboardingStep !== 3 ? '5vh' : 0,
          paddingBottom: currentOnboardingStep !== 3 ? '5vh' : 0,
          p: currentOnboardingStep !== 3 ? 6 : 0,
        }}
      >
        {currentOnboardingStep !== 0 && currentOnboardingStep !== 2 && (
          <IconButton
            onClick={goBack}
            sx={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        {currentOnboardingStep === 0 && (
          <Introduction onConsent={() => setCurrentOnboardingStep(1)} />
        )}
        {currentOnboardingStep === 1 && (
          <Instructions
            onContinue={() => {
              console.log(testTaskHighlights);
              if (isTestTaskCompleted) {
                setCurrentOnboardingStep(3);
              } else {
                setCurrentOnboardingStep(2);
              }
            }}
          />
        )}
        {currentOnboardingStep === 2 && (
          <TestTask
            initialTaskData={initialTaskData}
            setTestTaskHiglights={setTestTaskHiglights}
            onContinue={() => setCurrentOnboardingStep(3)}
            userInput={testTaskHighlights}
            setIsTestTaskCompleted={setIsTestTaskCompleted}
          />
        )}
        {currentOnboardingStep === 3 && (
          <Survey
            handleSubmit={submitOnboardingTask}
            page={surveyPage}
            setPage={setSurveyPage}
            answers={answers}
            setAnswers={setAnswers}
            questions={questions}
          />
        )}
      </Sheet>
    </CssVarsProvider>
  );
}
