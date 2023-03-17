import { getWalletProvider } from "../utils/ethereum-wallet-provider";
import { Contract, ethers } from "ethers";
import * as ReviewPeer from "../abis/ReviewPeer.json";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const Review = () => {
  const [rating, setRating] = React.useState(0);
  const navigate = useNavigate();

  const handleRatingClick = (newRating) => {
    setRating(newRating);
    console.log(newRating)
  };

  const handleSubmit = async () => {
    let provider, library, accounts, network, address;
    try {
        provider = await getWalletProvider().connect();
        library = new ethers.providers.Web3Provider(provider);
        accounts = await library.listAccounts();
        network = await library.getNetwork();
    } catch (error) {
        console.error(error)
        return;
    }
    if (accounts) {
        address = accounts[0];
        const signer = await library.getSigner(address)
        console.log(signer)

        // call smart contract 

        console.log(ReviewPeer.output.abi)
        const reviewPeerContract = new Contract(
            "0x2CAa3896fd54CaF10B0D9623a68F89025DF78a9F",
            ReviewPeer.output.abi,
            signer
        );

        //const tx = await reviewPeerContract.sendReview(rating);
        //console.log(tx);

        const tx2 = await reviewPeerContract.averageScore();
        console.log(parseInt(tx2, 16));

        navigate(`/average_review?averageScore=${parseInt(tx2, 16)}`);
    }
  };

  const StyledCard = styled(Card)({
    maxWidth: 400,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px',
    textAlign: 'center',
  });

  const StyledTextField = styled(TextField)({
    margin: '16px 0',
    width: '100%',
  });

  const StyledButton = styled(Button)({
    margin: '16px 8px 0 8px',
  });

  const StyledIconButton = styled(IconButton)({
    padding: 0,
    margin: '0 4px',
    color: (props) => props.selected ? '#FDD835' : 'inherit',
  });

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="h2">
          Review
        </Typography>
        <Typography color="textSecondary" sx={{ mb: 2 }}>
          Restaurant xpto
        </Typography>
        <Typography variant="body2" component="p" sx={{ mb: 2 }}>
          Please rate your experience:
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <StyledIconButton
              key={value}
              onClick={() => handleRatingClick(value)}
              selected={value <= rating}
            >
              {value <= rating ? <StarIcon /> : <StarBorderIcon />}
            </StyledIconButton>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <StyledButton variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </StyledButton>
        </div>
      </CardContent>
    </StyledCard>
  );
};

export default Review;