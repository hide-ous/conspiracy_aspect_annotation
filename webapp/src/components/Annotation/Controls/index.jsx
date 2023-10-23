import React, { useState } from 'react';

import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';

export default function Controls({ setHighlights, highlights }) {
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
            checked={isConspiracy === true}
            onChange={() => setIsConspiracy(true)}
            name="radio-buttons"
            label="Yes"
            slotProps={{ input: { 'aria-label': 'Yes' } }}
          />
          <Radio
            checked={isConspiracy === false}
            onChange={() => setIsConspiracy(false)}
            name="radio-buttons"
            label="No"
            slotProps={{ input: { 'aria-label': 'No' } }}
          />
        </RadioGroup>
        {isInvalid && isConspiracy === null && (
          <FormHelperText sx={{ color: 'red', marginTop: 1 }}>
            This field is required
          </FormHelperText>
        )}
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          onClick={() => {
            setHighlights([]);
            setIsConspiracy(null);
          }}
          color="neutral"
          variant="soft"
        >
          Clear
        </Button>
        <Button
          onClick={() => {
            if (isConspiracy === null) {
              setIsInvalid(true);
              return;
            }

            alert(
              JSON.stringify(
                {
                  isConspiracy,
                  annotations: highlights.map((highlight) => ({
                    startIndex: highlight.start,
                    endIndex: highlight.end,
                    type: highlight.aspect.title,
                  })),
                },
                null,
                2
              )
            );
            setHighlights([]);
            setIsConspiracy(null);
          }}
          color="success"
        >
          Submit
        </Button>
        <Button
          onClick={() => {
            setHighlights([]);
            setIsConspiracy(null);
            alert('Skipped');
          }}
          color="danger"
        >
          Skip
        </Button>
      </Box>
    </Box>
  );
}
