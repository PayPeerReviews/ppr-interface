import { getWalletProvider } from "../utils/ethereum-wallet-provider";
import { Contract, ethers } from "ethers";
import Payment from '../components/Payment';
import Review from '../components/Review';
import AverageReview from '../components/AverageReview';

import * as PayPeer from "../abis/PayPeer.json";
import * as ERC20 from "../abis/PayPeerCoin.json";
import * as ReviewPeer from "../abis/ReviewPeer.json";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, state } from "react"
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';


const Pay = () => {
    const [rating, setRating] = React.useState(0);
    const [averageRating, setAverageRating] = React.useState(0);
    const [isPending, setIsPending] = useState(false)
    const [readyToReview, setReadyToReview] = useState(false)
    const [readyToPay, setReadyToPay] = useState(true)
    const [showAverage, setShowAverage] = useState(false)

    const navigate = useNavigate();

    const handleReviewSubmitClick = async () => {
        setIsPending(true);

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

            const tx = await reviewPeerContract.sendReview(rating);
            console.log(tx);
            tx.wait();

            const tx2 = await reviewPeerContract.averageScore();

            setAverageRating(parseInt(tx2, 16));
            console.log();

            setIsPending(false);
            setReadyToPay(false)
            setReadyToReview(false);
            setShowAverage(true);
        }
    };

    const handleSeeMoreClick = async () => {
        navigate(`/search`);
    }

    const handlePayClick = async () => {

        setIsPending(true);

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
            await tx3.wait();
            console.log(tx3);

            setIsPending(false);
            setReadyToPay(false)
            setReadyToReview(true);
            setShowAverage(false);
        }
    };

    const StyledButton = styled(Button)({
        margin: '16px auto 0',
        display: 'block',
    });

    return (
        <div className="pay">
            {isPending && <p className="loading">Loading...</p>}
            {!isPending && readyToPay &&
             <div>
                <Payment />
                <StyledButton variant="contained" color="primary" onClick={handlePayClick}>
                    Pay
                </StyledButton>
            </div> }
             {!isPending && readyToReview &&
            <div>
                <Review rating={rating} setRating={setRating}/>
                <StyledButton variant="contained" color="primary" onClick={handleReviewSubmitClick}>
                    Submit
                </StyledButton>
            </div>}
            {!isPending && showAverage &&
            <div>
                <AverageReview averageRating={averageRating}/>
                <StyledButton variant="contained" color="primary" onClick={handleSeeMoreClick}>
                    See more
                </StyledButton>
            </div>}
        </div>
    );
};

export default Pay;