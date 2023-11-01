import React, { useEffect, useState, useRef } from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';

import Word from './Word/index.jsx';

const getTextLines = (textContainerClass) => {
  const spans = document.querySelectorAll(
    textContainerClass ? `.${textContainerClass} span.word` : 'span.word'
  );

  const lines = [];

  let currentOffset = spans[0].offsetTop;
  let line = new Set();

  Array.from(spans).forEach((span, index) => {
    const offsetTop = span.offsetTop;

    if (offsetTop === currentOffset) {
      line.add(span.dataset.index);
    } else {
      lines.push(Array.from(line));
      line = new Set([span.dataset.index]);
      currentOffset = offsetTop;
    }

    if (index === spans.length - 1 && line.size > 0) {
      lines.push(Array.from(line));
    }
  });

  return lines;
};

export default function TextContainer({
  text,
  currentAspect,
  setHighlights,
  highlights,
  currentHighlightId,
  setCurrentHighlightId,
  height,
  readonly,
  textContainerClass,
}) {
  const [splittedText, setSplittedText] = useState([]);
  const [lines, setLines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const textRef = useRef();

  useEffect(() => {
    if (lines.length && isLoading) {
      setIsLoading(false);
    }
  }, [lines, isLoading]);

  useEffect(() => {
    const splitted = text.split(' ');
    setSplittedText(splitted);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const lns = getTextLines(textContainerClass);
      setLines(lns);
    }, 200);
  }, [text, highlights, setLines]);

  const createHighlight = (index) => {
    const getIndex = (range, isEnd) => {
      const element = isEnd
        ? range.endContainer.parentElement
        : range.startContainer.parentElement;

      const isSpace = element.textContent === '\u00a0';

      const correction = isEnd ? 0 : 1;

      const index = isSpace
        ? +element.dataset.index + correction
        : +element.dataset.index;

      return [index, isSpace];
    };

    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      const [startIndex, isStartSpace] = getIndex(range, false);
      let [endIndex, isEndSpace] = getIndex(range, true);

      if (!endIndex) {
        endIndex = index;
      }
      /* const endIndex = index;
      const isEndSpace = false; */

      if (isStartSpace && isEndSpace) {
        return;
      }

      window.getSelection().removeAllRanges();

      const isHighlightAlreadyExists = highlights.some(
        (highlight) =>
          highlight.start === startIndex &&
          highlight.end === endIndex &&
          highlight.aspect.title === currentAspect.title
      );

      if (isHighlightAlreadyExists) {
        return;
      }

      setHighlights((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          start: startIndex,
          end: endIndex,
          aspect: currentAspect,
          createdAt: new Date(),
        },
      ]);
    }
  };

  const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

  return (
    <Box
      sx={{
        position: 'relative',
        height: readonly ? '' : '55vh',
        maxHeight: height ? `${height}px` : '500px',
        minHeight: height ? `${height}px` : '',
        padding: readonly ? 2 : 3,
        paddingTop: readonly ? 2 : 1,
        overflowY: readonly ? 'hidden' : 'auto',
        overflowX: 'hidden',
        backgroundColor: 'white',
      }}
      className={textContainerClass}
    >
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}
      <Typography
        level="body-lg"
        ref={textRef}
        sx={{
          opacity: isLoading ? 0 : 1,
        }}
      >
        {splittedText.map((word, index) => (
          <Word
            readonly={readonly}
            createHighlight={createHighlight}
            lines={lines}
            setHighlights={setHighlights}
            word={word}
            key={index}
            index={index}
            highlights={highlights}
            currentHighlightId={currentHighlightId}
            setCurrentHighlightId={setCurrentHighlightId}
            isFirefox={isFirefox}
          />
        ))}
      </Typography>
    </Box>
  );
}
