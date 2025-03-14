import React, { useState, useEffect, useRef } from 'react';

import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';

import Annotation from '../Annotation/index.jsx';
import Controls from '../Annotation/Controls/index.jsx';

import { aspects } from '../../constants/main';
import './styles.css';

export default function AnnotationPage({ taskData, handleSubmit,setRedirectUrl  }) {
  const [currentAspect, setCurrentAspect] = useState(aspects[0]);
  const [highlights, setHighlights] = useState([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [showDebriefing, setShowDebriefing] = useState(false); // New state

  const containerRef = useRef();
  let texts;
  try {
    texts = JSON.parse(taskData?.texts);
  } catch (error) {
    // console.log('error', error);
  }

  if (!texts) {
    return null;
  }

  useEffect(() => {
    containerRef.current.focus();
  }, []);

  // Reset aspect when changing text
  useEffect(() => {
    setCurrentAspect(aspects[0]);
  }, [currentTextIndex]);

  const switchAspectByKey = (key) => {
    const aspect = aspects.find((aspect) => aspect.numButton === +key);
    if (aspect) {
      setCurrentAspect(aspect);
    }
  };

    const saveResultsAndSwitchToNextText = (result) => {
        console.log({ results });

        // Get URL parameters
        const urlParams = Object.fromEntries(new URLSearchParams(window.location.search));

        if (currentTextIndex < texts.length - 1) {
            setResults((prevResults) => [
                ...prevResults,
                { text: texts[currentTextIndex].body, result },
            ]);
            setCurrentTextIndex(currentTextIndex + 1);
        } else {
            // Show debriefing before submitting
            setResults((prevResults) => [
                ...prevResults,
                { text: texts[currentTextIndex].body, result },
            ]);

            const finalResults = { results, params: urlParams };

            console.log("handling submit", finalResults);

            // Send data to JSON server using .then() instead of async/await
            fetch("http://mephisto-elb-816505541.eu-central-1.elb.amazonaws.com:8008/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalResults),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("JSON Server Response:", data);
                })
                .catch((error) => {
                    console.log("not SUBMITTED");
                    console.error("Submission failed:", error);
                })
                .finally(() => {
                    handleSubmit(finalResults); // Ensure submission completes
                    console.log("SUBMITTED");
                    const completionCode = "COMPLETED_67cbbf1ea4b9029e3c86bb4d";
                    setRedirectUrl(
                        "https://app.prolific.com/submissions/complete?cc=" + completionCode
                    );
                });

            setShowDebriefing(true);
        }
    };


    function getProlificStudyId() {
    let urlParams = new URLSearchParams(window.location.search);
    const STUDY_URL_STUDY_ID_PARAM = 'study_id';
    return urlParams.get(STUDY_URL_STUDY_ID_PARAM);
  }

  // const handleFinalSubmit = () => {
  //   handleSubmit({ results });
  //   var completionCode = 'COMPLETED_' + getProlificStudyId();
  //   window.location.href='https://app.prolific.com/submissions/complete?cc=' + completionCode;
  //
  // };
  const handleFinalSubmit = () => {
    // console.log('handling submit');
    // console.log({results});
    try {
      // handleSubmit({ results }); // Ensure submission completes
      // console.log('SUBMITTED');
      const completionCode = 'COMPLETED_67cbbf1ea4b9029e3c86bb4d';

      // const completionCode = 'COMPLETED_' + getProlificStudyId();
      setRedirectUrl('https://app.prolific.com/submissions/complete?cc=' + completionCode); // Change this URL
      // window.location.href = 'https://app.prolific.com/submissions/complete?cc=' + completionCode;
      } catch (error) {
        console.error('Submission failed:', error);
      }
  };

  if (showDebriefing) {
    return (
        <CssVarsProvider>
          <Sheet
              className="DebriefingPage"
              variant="soft"
              sx={{
                height: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '5vh',
              }}
          >
            <h1>Debriefing</h1>
            <p style={{textAlign: 'center'}}>
              Please click the button to submit your work for review and complete your assignment. It may take a few seconds before your results are properly saved.
            </p>
            <p style={{textAlign: 'center'}}> The texts you annotated were obtained from social media and may include false information and conspiracy theories. The authors of this task do not endorse them.</p>
              <p style={{textAlign: 'center'}}> You may take this task multiple times. The next time you take this task, you will not need to fill in the onboarding survey.</p>
              <p style={{textAlign: 'center'}}> Thank you for your work!</p>
            <button
                onClick={handleFinalSubmit}
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
            >
              Submit Results
            </button>
          </Sheet>
        </CssVarsProvider>
    );
  }

  return (
      <CssVarsProvider>
        <Sheet
            ref={containerRef}
            className="AnnotationPage"
            onKeyDown={(event) => {
              switchAspectByKey(event.key);
            }}
            tabIndex={0}
            variant="soft"
            sx={{
              height: '100%',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: '5vh',
              paddingBottom: '5vh',
            }}
        >
          <Annotation
              currentAspect={currentAspect}
              setCurrentAspect={setCurrentAspect}
              text={texts?.[currentTextIndex]?.body}
              highlights={highlights}
              setHighlights={setHighlights}
              currentTextIndex={currentTextIndex}
              textCount={texts.length}
          />
          <Controls
              setHighlights={setHighlights}
              highlights={highlights}
              handleSubmit={saveResultsAndSwitchToNextText}
              text={texts?.[currentTextIndex]?.body}
          />
        </Sheet>
      </CssVarsProvider>
  );
}
