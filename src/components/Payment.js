import { getWalletProvider } from "../utils/ethereum-wallet-provider";
import { Contract, ethers } from "ethers";
import * as PayPeer from "../abis/PayPeer.json";
import * as ERC20 from "../abis/PayPeerCoin.json";

import React from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const Payment = () => {

  const handlePayClick = async () => {
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

        console.log(PayPeer.abi)
        const payPeerContract = new Contract(
            "0x4344e8b579Fa41463a1b937dC8c1aF7EB6Ce791c",
            PayPeer.abi,
            signer
        );

        const er20 = new Contract(
            "0xb5172ABAd457B2D68675B4f601b923258f7e5C07",
            ERC20.output.abi,
            signer
        );

        const tx = await payPeerContract.hasRole('0x0000000000000000000000000000000000000000000000000000000000000000', "0xCABB828E80Fad884112E4fBBA7eA3dc86F387839");
        console.log(tx);

        const tx2 = await er20.approve('0x4344e8b579Fa41463a1b937dC8c1aF7EB6Ce791c', 1000000000000000);
        const approvalResult = await tx2.wait();
        console.log(approvalResult)


        const tx3 = await payPeerContract.pay('0xCABB828E80Fad884112E4fBBA7eA3dc86F387839', '0xb5172ABAd457B2D68675B4f601b923258f7e5C07', 1000000000000000) 
        console.log(tx3);
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
        <StyledButton variant="contained" color="primary" onClick={handlePayClick}>
          Pay
        </StyledButton>
      </CardContent>
    </StyledCard>
  );
};

export default Payment;