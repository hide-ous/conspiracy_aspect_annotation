import React, { useState, useEffect } from 'react';

import HighlightStart from './HighlightStart/index.jsx';
import Highlight from './Highlight/index.jsx';

import './styles.css';

/* const arrayRange = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (_, index) => start + index * step
  );
 */
/* const isIntersecting = (a, b) => {
  const isIntersecting = arrayRange(a.start, a.end, 1).find((el) => {
    return el >= b.start && el <= b.end;
  });

  return isIntersecting !== undefined;
}; */

const colors = {
  primary: '#0b6bcb',
  neutral: '#636b74',
  danger: '#a51818',
  success: '#1f7a1f',
  warning: '#9a5b13',
};

const getIndexesOfHighlightOnTheCurrentLine = (
  currentLine,
  currentHighlight
) => {
  return currentLine.filter((el) => {
    return el >= currentHighlight.start && el <= currentHighlight.end;
  });
};

function placeHighlightsUnderTheLine(
  lineLength,
  tuples,
  startingIndex,
  highlightIds,
  currentHighlightId
) {
  const grid = Array(tuples.length)
    .fill(null)
    .map(() => Array.from({ length: lineLength }, () => null));

  let i = 0;
  let j = 0;

  const idsWithCount = {};

  for (const tuple of tuples) {
    for (const line of grid) {
      if (tuple.every((val) => line[val - startingIndex] === null)) {
        for (const val of tuple) {
          line[val - startingIndex] = val;
        }
        idsWithCount[highlightIds[i]] = j;
        j = 0;
        break;
      }

      j++;
    }
    i++;
  }

  return idsWithCount[currentHighlightId];
}

const getHighlightVerticalPosition = (
  wordIndex,
  lines,
  currentHiglightIndex,
  highlights
) => {
  const currentLine = lines.find((line) => {
    return line.find((el) => el.includes(wordIndex));
  });

  if (!currentLine) {
    return 0;
  }

  let count = 0;
  const currentHighlight = highlights[currentHiglightIndex];

  const highlightsOnTheSameLine = highlights.filter((hlght) => {
    const isOnTheSameLine = currentLine.find((el) => {
      return el >= hlght.start && el <= hlght.end;
    });

    return isOnTheSameLine !== undefined;
  });

  const highlightIds = [];

  const highlightsIndexes = highlightsOnTheSameLine.map((highlight) => {
    highlightIds.push(highlight.id);
    return getIndexesOfHighlightOnTheCurrentLine(currentLine, highlight);
  });

  count = placeHighlightsUnderTheLine(
    currentLine.length,
    highlightsIndexes,
    currentLine[0],
    highlightIds,
    currentHighlight.id
  );

  if (highlightsOnTheSameLine.length === 0) {
    return 0;
  }

  return count;
};

export default function Word({
  word,
  index,
  highlights,
  setHighlights,
  lines,
  currentHighlightId,
  setCurrentHighlightId,
  createHighlight,
}) {
  const [highlightCount, setHighlightCount] = useState(0);
  const [isInsideCurrentHighlight, setIsInsideCurrentHighlight] =
    useState(false);

  useEffect(() => {
    if (!currentHighlightId) {
      setIsInsideCurrentHighlight(false);

      return;
    }

    const currentHighlight = highlights.find((highlight) => {
      return (
        index >= highlight.start &&
        index <= highlight.end &&
        highlight.id === currentHighlightId
      );
    });

    if (!currentHighlight) {
      setIsInsideCurrentHighlight(false);
    } else {
      setIsInsideCurrentHighlight(true);
    }
  }, [highlights, currentHighlightId]);

  // Set span height based on the number of highlights
  useEffect(() => {
    const currentLine = lines.find((line) => {
      return line.find((el) => el.includes(index));
    });

    if (!currentLine) {
      return;
    }

    let count = 0;

    currentLine.forEach((wordIndex) => {
      const currentCount = highlights.reduce((acc, highlight) => {
        if (wordIndex >= highlight.start && wordIndex <= highlight.end) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);

      if (currentCount > count) {
        count = currentCount;
      }
    });

    setHighlightCount(count);
  }, [highlights, index, lines]);

  const isHighlighted = highlights.find((highlight) => {
    return index >= highlight.start && index <= highlight.end;
  });

  const spanStyle = {
    position: 'relative',
    display: 'inline-block',
    textShadow: isHighlighted ? '0px 0px 0.5px black' : '',
    height: highlightCount > 0 ? `${2 + highlightCount * 1.4}rem` : '',
  };

  const deleteHighlight = (id) => {
    setHighlights((prevHighlights) => {
      return prevHighlights.filter((highlight) => highlight.id !== id);
    });
  };

  const reversedHighlights = [...highlights];

  return (
    <>
      <span
        data-index={index}
        style={spanStyle}
        className={`word ${isInsideCurrentHighlight ? 'highlighted' : ''}`}
        onMouseUp={() => {
          createHighlight(index);
        }}
      >
        {word}
        {reversedHighlights.map((highlight, i) => {
          if (index === highlight.start) {
            const prevHighlightCount = getHighlightVerticalPosition(
              index,
              lines,
              i,
              reversedHighlights
            );

            return (
              <HighlightStart
                prevHighlightCount={prevHighlightCount}
                key={highlight.id}
                id={highlight.id}
                currentAspect={highlight.aspect}
                onDelete={() => deleteHighlight(highlight.id)}
                setCurrentHighlightId={setCurrentHighlightId}
                colors={colors}
              />
            );
          } else {
            return null;
          }
        })}
        {reversedHighlights.map((highlight, i) => {
          if (index >= highlight.start && index <= highlight.end) {
            const prevHighlightCount = getHighlightVerticalPosition(
              index,
              lines,
              i,
              reversedHighlights
            );

            return (
              <Highlight
                prevHighlightCount={prevHighlightCount}
                key={highlight.id}
                id={highlight.id}
                color={highlight.aspect.color}
                start={index === highlight.start}
                colors={colors}
              />
            );
          } else {
            return null;
          }
        })}
      </span>
      <span
        className={`word ${isInsideCurrentHighlight ? 'highlighted' : ''}`}
        data-index={index}
        style={{
          ...spanStyle,
          width: 5,
        }}
      >
        &nbsp;
        {reversedHighlights.map((highlight, i) => {
          if (index >= highlight.start && index <= highlight.end) {
            const prevHighlightCount = getHighlightVerticalPosition(
              index,
              lines,
              i,
              reversedHighlights
            );

            return (
              <Highlight
                prevHighlightCount={prevHighlightCount}
                key={highlight.id}
                id={highlight.id}
                color={highlight.aspect.color}
                start={index === highlight.start}
                colors={colors}
              />
            );
          } else {
            return null;
          }
        })}
      </span>
    </>
  );
}
