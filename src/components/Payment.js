import { getWalletProvider } from "../utils/ethereum-wallet-provider";
import { Contract, ethers } from "ethers";
import * as PayPeer from "../abis/PayPeer.json";
import * as ERC20 from "../abis/PayPeerCoin.json";

import React from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const Payment = () => {

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

    const StyledButton = styled(Button)({
        margin: '16px auto 0',
        display: 'block',
        borderRadius: '8px',
        padding: '12px 32px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        backgroundColor: '#007bff',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#0069d9',
        },
    });

    const StyledLine = styled('hr')({
        width: '100%',
        height: '1px',
        border: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        margin: '16px 0',
    });

    return (
        <StyledCard>
            <CardContent>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Your Bill Description
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 2 }}>
                    <span style={{ fontWeight: 'bold' }}>Restaurant:</span> Chez Nous
                </Typography>
                <StyledLine />
                <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                    <span style={{ fontWeight: 'bold' }}>Main Course:</span>
                    <br />
                    <span style={{ paddingLeft: '16px' }}>2x Boeuf Bourguignon</span>
                    <span style={{ float: 'right' }}>$54.00</span>
                </Typography>
                <StyledLine />
                <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                    <span style={{ fontWeight: 'bold' }}>Dessert:</span>
                    <br />
                    <span style={{ paddingLeft: '16px' }}>2x Crème Brûlée</span>
                    <span style={{ float: 'right' }}>$16.00</span>
                </Typography>
                <StyledLine />
                <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                    <span style={{ fontWeight: 'bold' }}>Drinks:</span>
                    <br />
                    <span style={{ paddingLeft: '16px' }}>1x Bottle of Red Wine</span>
                    <span style={{ float: 'right' }}>$50.00</span>
                </Typography>
                <StyledLine />
                <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                    <span style={{ fontWeight: 'bold' }}>Tax:</span> $13.60
                </Typography>
                <StyledLine />
                <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                    <span style={{ fontWeight: 'bold' }}>Total:</span> $133.60
                </Typography>
            </CardContent>
        </StyledCard>


    );
};

export default Payment;


