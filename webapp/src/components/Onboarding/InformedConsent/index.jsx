import React from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Button from '@mui/joy/Button';

const consentItems = [
  'I confirm that I have read and understood the Information presented to me about this study. I have had an opportunity to consider the information and what will be expected of me.',
  'I understand that I will be able to withdraw my data within 48 hours of participation.',
  'I understand what my data will be used for as previously explained to me.',
  'I understand that my data gathered in this study will be stored anonymously and securely. And that, it will not be possible to identify me in any publications.',
  'I understand that my participation is voluntary and that I am free to withdraw at any time without giving a reason.',
  'I understand that my personally identifying data will not be made available to any commercial organizations and can only be accessed by the researchers undertaking this study.',
  'I understand that I will be compensated for the time I take to participate in this study even if I choose to withdraw, but that I will not benefit financially from this study or from its possible outcomes in the future.',
  'I agree that my anonymized research data may be used by others for future research, but that no one will be able to identify me if this data is shared.',
  'I am aware of who I should contact if I wish to lodge a complaint.',
  'I voluntarily agree to take part in this study',
];

export default function InformedConsent({ onConsent }) {
  return (
    <Box
      sx={{
        maxWidth: '1024px',
      }}
    >
      <Typography level="h1" marginBottom={3}>
        Informed consent
      </Typography>
      <Typography level="title-md">
        I confirm that I understand that by clicking on “I consent”, I agree to
        each statement below. I understand that by not giving consent for any of
        the statements below I am ineligible for the study.
      </Typography>
      <List
        marker="disc"
        sx={{
          marginBottom: 4,
        }}
      >
        {consentItems.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </List>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button onClick={onConsent}>I consent</Button>
      </Box>
    </Box>
  );
}
