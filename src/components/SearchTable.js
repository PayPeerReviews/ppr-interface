import { getWalletProvider } from "../utils/ethereum-wallet-provider";
import { Contract, ethers } from "ethers";
import * as ReviewPeer from "../abis/ReviewPeer.json";

import React, { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

function SearchTable() {
    // Define state variables for search text and results
    const [searchText, setSearchText] = useState('');
    const [results, setResults] = useState([]);

    // Define function to handle search button click
    const handleSearchClick = async () => {
        try {
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

                console.log(ReviewPeer.output.abi)
                const reviewPeerContract = new Contract(
                    "0x2CAa3896fd54CaF10B0D9623a68F89025DF78a9F",
                    ReviewPeer.output.abi,
                    signer
                );


                const tx2 = await reviewPeerContract.getAllReviews();
                console.log("res");
                console.log(tx2[0][1]._hex);
                console.log(parseInt(tx2[0][1]._hex, 16));



                //const data = ["a", "1", "b", "3"];

                const data = tx2[0];

                // Parse data into array of name/value pairs
                const pairs = [];
                for (let i = 0; i < data.length; i += 2) {
                    //pairs.push([data[i], data[i + 1]]);
                    pairs.push([data[i], parseInt(tx2[i + 1][1]._hex, 16)]);
                }

                console.log(pairs)

                // Update results state with name/value pairs
                setResults(pairs);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const StyledButton = styled(Button)({
        margin: '16px 8px 0 8px',
    });

    const StyledIconButton = styled(IconButton)({
        padding: 0,
        margin: '0 4px',
        color: (props) => props.selected ? '#FDD835' : 'inherit',
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {/* Search field */}
            <TextField
                label="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: '50%', marginBottom: '1rem', marginTop: '2rem' }}
            />

            {/* Search button */}
            <Button variant="contained" onClick={handleSearchClick} style={{ marginBottom: '1rem' }}>
                Search
            </Button>

            {/* Results table */}
            <TableContainer component={Paper} style={{ width: '50%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Company</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>Badge</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((result, index) => (
                            <TableRow key={index}>
                                <TableCell>{result[0]}</TableCell>
                                <TableCell>
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <StyledIconButton
                                            key={value}
                                            selected={value <= result[1]}
                                        >
                                            {value <= result[1] ? <StarIcon /> : <StarBorderIcon />}
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
