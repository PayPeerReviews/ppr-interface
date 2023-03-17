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

import LoadingSpinner from '../components/utils/loading-spinner/loading-spinner';


const { RelayProvider } = require('@opengsn/provider')

const Pay = () => {
    const [rating, setRating] = React.useState(0);
    const [averageRating, setAverageRating] = React.useState(0);
    const [isPending, setIsPending] = useState(false)
    const [readyToReview, setReadyToReview] = useState(false) // TODO: change here after 
    const [readyToPay, setReadyToPay] = useState(true) // TODO: change here after 
    const [showAverage, setShowAverage] = useState(false)

    const navigate = useNavigate();

    const handleReviewSubmitClick = async () => {
        setIsPending(true);

        let provider, library, address, gsnProvider;
        try {
            const paymasterAddress = "0x7e4123407707516bD7a3aFa4E3ebCeacfcbBb107";
            //provider = await getWalletProvider().connect();
            gsnProvider = await RelayProvider.newProvider({
                provider: window.ethereum,
                config: {
                    loggerConfiguration: { logLevel: 'debug' },
                    paymasterAddress
                }
            }).init()

            provider = new ethers.providers.Web3Provider(gsnProvider)
            console.log("provider - ", provider)

            //library = new ethers.providers.Web3Provider(provider);
            //console.log("library", library)

        } catch (error) {
            console.error(error)
            return;
        }


        console.log("signer - ", provider.getSigner());
        // call smart contract 

        console.log(ReviewPeer.abi)
        const reviewPeerContract = new ethers.Contract(
            "0xA78695C0D7Fc03fb996e2339928e3e5Ef4bC568A",
            ReviewPeer.abi,
            provider.getSigner()
        );
        if (!window.ethereum) {
            alert('Aqui que  fode')
        }


        //await window.ethereum.send("eth_requestAccounts")

        const txOptions = { gasPrice: await provider.getGasPrice() }
        const transaction = await reviewPeerContract.sendReview(rating, txOptions)

        console.log("transaction", transaction)
        transaction.wait();

        const tx2 = await reviewPeerContract.averageScore();

        setAverageRating(parseInt(tx2, 16));
        console.log();

        setIsPending(false);
        setReadyToPay(false)
        setReadyToReview(false);
        setShowAverage(true);

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



            //console.log(signer)

            // call smart contract 
            //console.log(PayPeer.abi)
            const payPeerContract = new Contract(
                "0xE694e6AB637b4254c8A7d64A75f608dB82d8a15e",
                PayPeer.abi,
                signer
            );

            const er20 = new Contract(
                "0xb5172ABAd457B2D68675B4f601b923258f7e5C07",
                ERC20.output.abi,
                signer
            );


            const domain = {
                name: "PayPeerCoin", // token name
                version: "1", //  The ‘version byte’ is fixed to 0x01
                chainId: 5, // chainId in which is deployed
                verifyingContract: "0xb5172ABAd457B2D68675B4f601b923258f7e5C07"
            };

            const types = {
                Permit: [
                    { name: "owner", type: "address" },
                    { name: "spender", type: "address" },
                    { name: "value", type: "uint256" },
                    { name: "nonce", type: "uint256" },
                    { name: "deadline", type: "uint256" }
                ]
            };
            console.log(address)
            const nounce = await er20.nonces(address);
            console.log("nonces", nounce);
            const value = {
                owner: address, //owner of the token, the one that will sign the message
                spender: "0xE694e6AB637b4254c8A7d64A75f608dB82d8a15e",  //spender - dApp smart contract
                value: 1000000000000000, //amount to spend 
                nonce: nounce, // need consult the ERC20 to get the next nonce
                deadline: 1710373465 // deadline of the permission
            };

            let signature = await signer._signTypedData(domain, types, value);
            let { v, r, s } = ethers.utils.splitSignature(signature);

            const tx3 = await payPeerContract.payWithPermit('0xCABB828E80Fad884112E4fBBA7eA3dc86F387839', '0xb5172ABAd457B2D68675B4f601b923258f7e5C07', 1000000000000000, 1710373465, v, r, s)
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

    return (
        <div className="pay">
            {isPending && <LoadingSpinner />}
            {!isPending && readyToPay &&
                <div>
                    <Payment />
                    <StyledButton variant="contained" color="primary" onClick={handlePayClick}>
                        Pay
                    </StyledButton>
                </div>}
            {!isPending && readyToReview &&
                <div>
                    <Review rating={rating} setRating={setRating} />
                    <StyledButton variant="contained" color="primary" onClick={handleReviewSubmitClick}>
                        Submit
                    </StyledButton>
                </div>}
            {!isPending && showAverage &&
                <div>
                    <AverageReview averageRating={averageRating} />
                    <StyledButton variant="contained" color="primary" onClick={handleSeeMoreClick}>
                        See more
                    </StyledButton>
                </div>}
        </div>
    );
};

export default Pay;