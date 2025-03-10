import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import { useMephistoTask, ErrorBoundary } from 'mephisto-task';
import { createTheme, ThemeProvider } from '@mui/material';

import LoadingPage from './components/LoadingPage/index.jsx';
import AnnotationPage from './components/AnnotationPage/index.jsx';
import OnboardingPage from './components/OnboardingPage/index.jsx';

function MainApp() {
  const {
    blockedReason,
    blockedExplanation,
    isPreview,
    isLoading,
    initialTaskData,
    handleSubmit,
    handleFatalError,
    isOnboarding,
  } = useMephistoTask();
  const [redirectUrl, setRedirectUrl] = useState(null); // New state

  useEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl; // Redirects to external site
    }
  }, [redirectUrl]);
  if (blockedReason !== null) {
    return (
      <section className="hero is-medium is-danger">
        <div class="hero-body">
          <h2 className="title is-3">{blockedExplanation}</h2>
        </div>
      </section>
    );
  }
  // if (isPreview) {
  //   return (
  //     <AnnotationPage
  //       taskData={{
  //         texts: JSON.stringify([
  //           {
  //             body: "You better fight your government, and you better fight now. This is a full blown attempt to disarm and control you. They are taking down the internet, now they are taking your way to defend yourself and your families. If you don't fight now your children are as good as dead. Fucking dead. Stand up. We are with you here in the USA.",
  //           },
  //         ]),
  //       }}
  //     />
  //   );
  // }
  if (isLoading || !initialTaskData) {
    return <LoadingPage />;
  }
  if (isOnboarding) {
    return (
      <OnboardingPage
        initialTaskData={initialTaskData}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div>
      <ErrorBoundary handleError={handleFatalError}>
        <AnnotationPage
          taskData={initialTaskData}
          handleSubmit={handleSubmit}
          setRedirectUrl={setRedirectUrl} // Pass the function to AnnotationPage
        />
      </ErrorBoundary>
    </div>
  );
}

const theme = createTheme();

ReactDOM.createRoot(document.querySelector('#app')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MainApp />
    </ThemeProvider>
  </React.StrictMode>
);
