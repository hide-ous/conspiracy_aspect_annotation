import React, { useEffect, useState, useRef } from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

import Word from './Word/index.jsx';

const getTextLines = () => {
  const spans = document.querySelectorAll('span.word');

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
}) {
  const [splittedText, setSplittedText] = useState([]);
  const [lines, setLines] = useState([]);

  const textRef = useRef();

  useEffect(() => {
    const splitted = text.split(' ');
    setSplittedText(splitted);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const lns = getTextLines();
      setLines(lns);
    }, 200);
  }, [text, highlights, setLines]);

  const createHighlight = () => {
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
      const [endIndex, isEndSpace] = getIndex(range, true);

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

  return (
    <Box
      sx={{
        height: '55vh',
        maxHeight: 500,
        padding: 3,
        paddingTop: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <Typography level="body-lg" onMouseUp={createHighlight} ref={textRef}>
        {splittedText.map((word, index) => (
          <Word
            lines={lines}
            setHighlights={setHighlights}
            word={word}
            key={index}
            index={index}
            highlights={highlights}
            currentHighlightId={currentHighlightId}
            setCurrentHighlightId={setCurrentHighlightId}
          />
        ))}
      </Typography>
    </Box>
  );
}
