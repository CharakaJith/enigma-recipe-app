import React from 'react';
import chroma from 'chroma-js';
import { Button, styled } from '@mui/material';
import { styleProps } from '../../data/styleProps';

const { fonts, colors } = styleProps;

const ProceedButton = styled(Button)({
  fontFamily: fonts.primary,
  fontSize: 16,
  fontWeight: 500,
  width: '50%',
  height: 50,
  padding: '10px 20px',
  backgroundColor: colors.btnPrimary,
  borderRadius: 5,
  color: '#fff',
  marginTop: 10,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: chroma(colors.btnPrimary).darken(0.7).hex(),
  },
  ':disabled': {
    opacity: 0.3,
    color: '#fff',
  },
});

const ShortPrimaryBtn = ({ text, onClick, disabled }) => {
  return (
    <ProceedButton disabled={disabled} onClick={onClick}>
      {text}
    </ProceedButton>
  );
};

export default ShortPrimaryBtn;
