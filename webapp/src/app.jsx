import React from 'react';
import ReactDOM from 'react-dom/client';

import { useMephistoTask, ErrorBoundary } from 'mephisto-task';
import { createTheme, ThemeProvider } from '@mui/material';

import { LoadingScreen } from './components/core_components.jsx';
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

  if (blockedReason !== null) {
    return (
      <section className="hero is-medium is-danger">
        <div class="hero-body">
          <h2 className="title is-3">{blockedExplanation}</h2>
        </div>
      </section>
    );
  }
  if (isPreview) {
    return <AnnotationPage />;
  }
  if (isLoading || !initialTaskData) {
    return <LoadingScreen />;
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
        {/* <BaseFrontend
          taskData={initialTaskData}
          onSubmit={handleSubmit}
          isOnboarding={isOnboarding}
          onError={handleFatalError}
        /> */}
        <AnnotationPage />
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
