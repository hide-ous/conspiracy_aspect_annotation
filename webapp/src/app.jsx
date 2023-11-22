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
    return (
      <AnnotationPage
        taskData={{
          body: "The earliest legend that connects the Tower with a raven is the euhemerised Welsh tale of the war against the Irish leader Matholwch who had mistreated the princess Branwen. Branwen's brother Brân the Blessed (King of the Britons) ordered his followers to cut off his head and bury it beneath The White Hill (upon which the Tower now stands) facing out towards France as a talisman to protect Britain from foreign invasion. Brân is the modern Welsh word for raven and the magical and protective qualities of ravens are attested throughout Celtic mythology. The knowledge that Brân's head was buried beneath the White Hill would have served as protective reassurance in the Celtic tradition, just as modern ideas about the presence of ravens does. As such, it is likely to have its origins in British folklore.",
        }}
      />
    );
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
        <AnnotationPage
          taskData={initialTaskData}
          handleSubmit={handleSubmit}
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
