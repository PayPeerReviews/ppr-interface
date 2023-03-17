import {Web3Connection, Model} from '@taikai/dappkit';


import * as ReviewPeer from "../abis/ReviewPeer.json";

import React, { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

function SearchTable2() {
    // Define state variables for search text and results
    const [searchText, setSearchText] = useState('');
    const [results, setResults] = useState([]);


    // Define function to handle search button click
    const handleSearchClick = async () => {
        try {
            // Fetch data from SM
            const web3Connection = new Web3Connection({ web3Host: "https://goerli.infura.io/v3/d418881770d44945b1ca5702d098fdde" });
    

            await web3Connection.start();
            await web3Connection.connect(); // if a privateKey was provided, can be ignored
            console.log("User address", await web3Connection.getAddress());

            
            const searchReview = new Model(web3Connection, ReviewPeer.abi, "0x2CAa3896fd54CaF10B0D9623a68F89025DF78a9F");
            searchReview.start()
            console.log(searchReview)
            console.log(searchReview)
            //return;
            const receipt = await searchReview.callTx("getAllReviews");
            //const tx2 = await searchReview.getAllReviews();
                console.log("res", receipt);
/*
            const stakingContrat = new StakingContract(web3Connection, '0x2CAa3896fd54CaF10B0D9623a68F89025DF78a9F');
            await stakingContrat.start();

            await web3Connection.connect();

            console.log(await stakingContrat.availableTokens());
  */
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

export default SearchTable2;
