import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Card, CardContent, Typography, TextField, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';

const AverageReview = (props) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  console.log("avg", props.averageRating)

  const StyledCard = styled(Card)({
    maxWidth: 350,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
    '@media (max-width: 350px)': {
      maxWidth: '100%',
    },
  });

  const StyledLine = styled('hr')({
    width: '100%',
    height: '1px',
    border: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    margin: '16px 0',
  });

  const StyledIconButton = styled(IconButton)({
    padding: 0,
    margin: '0 4px',
    color: (props) => props.selected ? '#FDD835' : 'inherit',
  });

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Rating
        </Typography>
        <Typography color="textSecondary" sx={{ mb: 2 }}>
          <span style={{ fontWeight: 'bold' }}>Restaurant:</span> Chez Nous
        </Typography>
        <Typography variant="body2" component="p" sx={{ mb: 2 }}>
          The average rating of this restaurant is:
        </Typography>
        <StyledLine />
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <StyledIconButton
              key={value}
              selected={value <= props.averageRating}
            >
              {value <= props.averageRating ? <StarIcon sx={{ color: yellow[500] }} /> : <StarBorderIcon />}
            </StyledIconButton>
          ))}
        </div>
      </CardContent>
    </StyledCard>
  );
};

export default AverageReview;
