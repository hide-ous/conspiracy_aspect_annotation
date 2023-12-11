import React, { useState } from 'react';

import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';

import Introduction from '../Onboarding/Introduction/index.jsx';
import Instructions from '../Onboarding/Instructions/index.jsx';
import TestTask from '../Onboarding/TestTask/index.jsx';
import Survey from '../Onboarding/Survey/index.jsx';

export default function OnboardingPage({ initialTaskData, onSubmit }) {
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0);
  const [testTaskHighlights, setTestTaskHiglights] = useState([]);

  const submitOnboardingTask = (survey) => {
    const urlParams = new URLSearchParams(window.location.search);
    const worker_id = urlParams.get('worker_id');
    const assignment_id = urlParams.get('assignment_id');

    const getFilteredHiglights = (aspectTitle) => {
      return testTaskHighlights
        .filter((hl) => hl.aspect.title === aspectTitle)
        .map((hl) => ({
          start: hl.start,
          end: hl.end,
        }));
    };

    onSubmit({
      aspects: {
        Actor: getFilteredHiglights('Actor'),
        Action: getFilteredHiglights('Action'),
        Pattern: getFilteredHiglights('Pattern'),
        Threat: getFilteredHiglights('Threat'),
        Secrecy: getFilteredHiglights('Secrecy'),
      },
      survey: {
        answers: survey,
        worker_id,
        assignment_id,
      },
    });
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
        {currentOnboardingStep === 0 && (
          <Introduction onConsent={() => setCurrentOnboardingStep(1)} />
        )}
        {currentOnboardingStep === 1 && (
          <Instructions onContinue={() => setCurrentOnboardingStep(2)} />
        )}
        {currentOnboardingStep === 2 && (
          <TestTask
            initialTaskData={initialTaskData}
            setTestTaskHiglights={setTestTaskHiglights}
            onContinue={() => setCurrentOnboardingStep(3)}
            userInput={testTaskHighlights}
          />
        )}
        {currentOnboardingStep === 3 && (
          <Survey handleSubmit={submitOnboardingTask} />
        )}
      </Sheet>
    </CssVarsProvider>
  );
}
