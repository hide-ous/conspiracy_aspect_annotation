/*
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';

import { useMephistoTask, ErrorBoundary } from 'mephisto-task';
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material';

import {
  BaseFrontend,
  OnboardingComponent,
  LoadingScreen,
} from './components/core_components.jsx';
import AnnotationPage from './components/AnnotationPage/index.jsx';

/* ================= Application Components ================= */

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
          <h2 className="title is-3">{blockedExplanation}</h2>{' '}
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
    return <OnboardingComponent onSubmit={handleSubmit} />;
  }

  return (
    <div>
      <ErrorBoundary handleError={handleFatalError}>
        <BaseFrontend
          taskData={initialTaskData}
          onSubmit={handleSubmit}
          isOnboarding={isOnboarding}
          onError={handleFatalError}
        />
      </ErrorBoundary>
    </div>
  );
}

// ReactDOM.render(<MainApp />, document.getElementById('app'));

const theme = createTheme();

ReactDOM.createRoot(document.querySelector('#app')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MainApp />
    </ThemeProvider>
  </React.StrictMode>
);
