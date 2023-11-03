import React, { useState } from 'react';

import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';

export default function Controls({
  setHighlights,
  highlights,
  handleSubmit,
  noSkip,
  testTask,
}) {
  const [isConspiracy, setIsConspiracy] = useState(null);
  const [isInvalid, setIsInvalid] = useState(false);

  return (
    <Box
      sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {!testTask && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 3,
          }}
        >
          <FormLabel
            sx={{
              marginBottom: 1,
            }}
          >
            Is this a conspiracy?
          </FormLabel>
          <RadioGroup orientation="horizontal">
            <Radio
              checked={isConspiracy === 'Yes'}
              onChange={() => setIsConspiracy('Yes')}
              name="radio-buttons"
              label="Yes"
              slotProps={{ input: { 'aria-label': 'Yes' } }}
            />
            <Radio
              checked={isConspiracy === 'No'}
              onChange={() => setIsConspiracy('No')}
              name="radio-buttons"
              label="No"
              slotProps={{ input: { 'aria-label': 'No' } }}
            />
            <Radio
              checked={isConspiracy === "Can't tell"}
              onChange={() => setIsConspiracy("Can't tell")}
              name="radio-buttons"
              label="Can't tell"
              slotProps={{ input: { 'aria-label': "Can't tell" } }}
            />
          </RadioGroup>
          {isInvalid && isConspiracy === null && (
            <FormHelperText sx={{ color: 'red', marginTop: 1 }}>
              This field is required
            </FormHelperText>
          )}
        </Box>
      )}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          onClick={() => {
            setHighlights([]);
            setIsConspiracy(null);
            setIsInvalid(false);
          }}
          color="neutral"
          variant="soft"
        >
          Clear
        </Button>
        {!noSkip && (
          <Button
            onClick={() => {
              setHighlights([]);
              setIsConspiracy(null);
              setIsInvalid(false);
              alert('Skipped');
            }}
            color="danger"
          >
            Skip
          </Button>
        )}
        <Button
          onClick={() => {
            if (isConspiracy === null && !testTask) {
              setIsInvalid(true);
              return;
            }

            const result = {
              isConspiracy,
              annotations: highlights.map((highlight) => ({
                startIndex: highlight.start,
                endIndex: highlight.end,
                type: highlight.aspect.title,
              })),
            };

            if (handleSubmit) {
              handleSubmit(result);
            } else {
              alert(JSON.stringify(result, null, 2));
            }

            setHighlights([]);
            setIsConspiracy(null);
            setIsInvalid(false);
          }}
          color="success"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
