import { getWalletProvider } from "../utils/ethereum-wallet-provider";
import { Contract, ethers } from "ethers";
import * as ReviewPeer from "../abis/ReviewPeer.json";

import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Card, CardContent, Typography, TextField, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const AverageReview = ( props ) => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    console.log("avg", props.averageRating)


    const StyledCard = styled(Card)({
        maxWidth: 300,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        textAlign: 'center',
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
                    -- Bage here --
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 2 }}>
                    Restaurant xpto
                </Typography>
                <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                    The average rating of this restaurant is:
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <StyledIconButton
                            key={value}
                            selected={value <= props.averageRating}
                        >
                            {value <= props.averageRating ? <StarIcon /> : <StarBorderIcon />}
                        </StyledIconButton>
                    ))}
                </div>
            </CardContent>
        </StyledCard>
    );
};

export default AverageReview;