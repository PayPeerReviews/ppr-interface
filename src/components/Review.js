import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';

const Review = ({ setRating, rating }) => {
  const navigate = useNavigate();

  const handleRatingClick = (newRating) => {
    setRating(newRating);
    console.log(newRating)
  };

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
          Review
        </Typography>
        <Typography color="textSecondary" sx={{ mb: 2 }}>
          <span style={{ fontWeight: 'bold' }}>Restaurant:</span> Chez Nous
        </Typography>
        <Typography variant="h7" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          <span>Please rate your experience</span>
        </Typography>
        <StyledLine />
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <StyledIconButton
              key={value}
              onClick={() => handleRatingClick(value)}
              selected={value <= rating}
            >
              {value <= rating ? <StarIcon sx={{ color: yellow[500] }} /> : <StarBorderIcon />}
            </StyledIconButton>
          ))}
        </div>
      </CardContent>
    </StyledCard>
  );
};

export default Review;
