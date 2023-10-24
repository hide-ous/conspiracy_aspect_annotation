import React from 'react';

import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import ModalDialog from '@mui/joy/ModalDialog';

export default function HelpModal({ isOpen, setIsOpen }) {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <ModalDialog
        variant="outlined"
        size="lg"
        sx={{
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          Short annotation instructions
        </Typography>
        <Typography id="modal-desc" mb={1}>
          The goal of this study is to identify indicative features of
          conspiracies on the Reddit forum. Your main task will be to locate and
          annotate five text features for each post.
        </Typography>
        <Typography mb={1}>
          During this task, you will be presented with a text passage. Carefully
          read the text and consider whether you think it contains any of the
          features below for a conspiracy theory. You will then be asked to
          annotate the following conspiratorial features: <b>Actor</b>,{' '}
          <b>Action</b>, <b>Threat</b>, <b>Pattern</b>, and <b>Secrecy</b> by
          marking them in the text.
        </Typography>
        <Typography>
          In some cases, the features may or may not be present, overlap, and
          can be explicit or implicit. When features are stated implicitly mark
          the text passage that approximates the feature the most (e.g. “they”),
          but when they are passively implied without a representative word, do
          not annotate the feature. A feature should always be identifiable with
          (a) concrete word(s) in the text. When faced with multiple conspiracy
          theories identify all features as you would for a single theory.
        </Typography>
      </ModalDialog>
    </Modal>
  );
}
