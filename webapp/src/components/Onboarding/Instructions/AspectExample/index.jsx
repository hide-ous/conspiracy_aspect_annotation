import React, { useState, useEffect, useRef } from 'react';

import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Annotation from '../../../Annotation/index.jsx';

import renderList from '../../../../helpers/renderList.js';
import { exampleAspects } from '../../../../constants/main.js';
import './styles.css';

let timer;

export default function AspectExample({ aspect = 'Actor' }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isControlQuestionsExpanded, setIsControlQuestionsExpanded] =
    useState(false);
  const [containerHeight, setContainerHeight] = useState(0);

  const containerRef = useRef();
  const accordionRef = useRef();

  useEffect(() => {
    if (isExpanded) {
      setContainerHeight(containerRef.current.clientHeight);
    } else {
      setContainerHeight(0);
      setIsControlQuestionsExpanded(false);
    }
  }, [isExpanded]);

  useEffect(() => {
    if (isControlQuestionsExpanded && isExpanded) {
      setContainerHeight('100%');
    }

    if (isExpanded) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setContainerHeight(containerRef.current.clientHeight);
      }, 201);
    }
  }, [isControlQuestionsExpanded, isExpanded]);

  return (
    <Box
      sx={{
        marginBottom: 2,
      }}
    >
      <Typography
        className="aspect-example-title"
        level="h5"
        mb={2}
        color="primary"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
        onClick={() => setIsExpanded((prevState) => !prevState)}
      >
        Details and example{' '}
        <KeyboardArrowDownIcon
          sx={{
            transform: isExpanded ? 'rotate(180deg)' : '',
            transition: 'transform 0.3s ease',
          }}
        />
      </Typography>
      <Box
        sx={{
          height: containerHeight,
          overflow: 'hidden',
          transition: `height ${
            exampleAspects[aspect].collapseAnimationDuration || 300
          }ms ease-in-out`,
        }}
      >
        <Box ref={containerRef}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 4,
            }}
          >
            <Annotation
              textContainerClass={aspect}
              readonly
              highlights={exampleAspects[aspect]?.highlights || []}
              text={exampleAspects[aspect]?.text || '123'}
            />
          </Box>
            <Typography mb={2}>{exampleAspects[aspect]?.description}</Typography>
          <Typography level="h5">More details:</Typography>
          {exampleAspects[aspect]?.detailsList &&
            renderList(exampleAspects[aspect]?.detailsList)}
          <AccordionGroup>
            <Accordion
              expanded={isControlQuestionsExpanded}
              onChange={() =>
                setIsControlQuestionsExpanded((prevState) => !prevState)
              }
            >
              <AccordionSummary color="primary">
                To make it easy to identify the aspect, you can ask yourself the
                questions in this list
              </AccordionSummary>
              <AccordionDetails ref={accordionRef}>
                {renderList(exampleAspects[aspect]?.controlQuestionsList)}
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        </Box>
      </Box>
    </Box>
  );
}
