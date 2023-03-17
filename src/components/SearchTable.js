import { getWalletProvider } from "../utils/ethereum-wallet-provider";
import { Contract, ethers } from "ethers";
import * as ReviewPeer from "../abis/ReviewPeer.json";

import React, { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';
import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";
import { exit } from "process";

function SearchTable() {
    // Define state variables for search text and results
    const [searchText, setSearchText] = useState('');
    const [results, setResults] = useState([]);

    // Define function to handle search button click
    const handleSearchClick = async (event) => {
        try {
            console.log("event", event)
            // Fetch data from SM
            let provider, library, accounts, network, address;

            provider = await getWalletProvider().connect();
            library = new ethers.providers.Web3Provider(provider);
            accounts = await library.listAccounts();
            network = await library.getNetwork();

            if (accounts) {
                address = accounts[0];
                const signer = await library.getSigner(address)
                console.log(signer)

                // call smart contract 

                console.log(ReviewPeer.abi)
                const reviewPeerContract = new Contract(
                    "0xA78695C0D7Fc03fb996e2339928e3e5Ef4bC568A",
                    ReviewPeer.abi,
                    signer
                );


                const tx2 = await reviewPeerContract.getAllReviews();
                console.log("res", tx2);
                const data = tx2;


                // Parse data into array of name/value pairs
                const pairs = [];
                for (let i = 0; i < data.length; i += 2) {
                    if (searchText == data[i].addr || !searchText) {
                        pairs.push([data[i].addr, parseInt(data[i].starts._hex, 16)]);
                    }
                    //TODO: only for test propose 
                    if (searchText == "Chez Nous") {
                        pairs.push([data[i].addr, parseInt(data[i].starts._hex, 16)]);
                        break;
                    }
                }

                console.log("pairs", pairs)

                // Update results state with name/value pairs
                setResults(pairs);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const StyledIconButton = styled(IconButton)({
        padding: 0,
        margin: '0 4px',
        color: (props) => props.selected ? '#FDD835' : 'inherit',
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto', maxWidth: '600px' }}>
            {/* Search field */}
            <TextField
                label="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: '100%', marginBottom: '1rem', marginTop: '2rem' }}
            />

            {/* Search button */}
            <Button variant="contained" onClick={handleSearchClick} style={{ marginBottom: '1rem', width: '100%' }}>
                Search
            </Button>

            {/* Results table */}
            <TableContainer component={Paper} style={{ width: '100%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ minWidth: '120px' }}>Company</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>Badge</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((result, index) => (
                            <TableRow key={index}>
                                <TableCell style={{ minWidth: '120px', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{result[0]}</TableCell>
                                <TableCell>
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <StyledIconButton
                                            key={value}
                                            selected={value <= result[1]}
                                        >
                                            {value <= result[1] ? <StarIcon sx={{ color: yellow[500] }} /> : <StarBorderIcon />}
                                        </StyledIconButton>
                                    ))}
                                </TableCell>
                                <TableCell>{result[1]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default SearchTable;
