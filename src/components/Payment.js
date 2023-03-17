import { getWalletProvider } from "../utils/ethereum-wallet-provider";
import { Contract, ethers } from "ethers";
import * as PayPeer from "../abis/PayPeer.json";
import * as ERC20 from "../abis/PayPeerCoin.json";

import React from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const Payment = () => {

    const StyledCard = styled(Card)({
        maxWidth: 300,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
    });

    const StyledButton = styled(Button)({
        margin: '16px auto 0',
        display: 'block',
    });

    return (
        <StyledCard>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Your Bill Description
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 2 }}>
                    Restaurant xpto
                </Typography>
                <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                    Item 1: 10.00 PPC
                    <br />
                    Item 2: 5.00 PPC
                    <br />
                    Tax: 1.50 PPC
                    <br />
                    Total: 16.50 PPC
                </Typography>
            </CardContent>
        </StyledCard>
    );
};

export default Payment;