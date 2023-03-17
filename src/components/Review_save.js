import { getWalletProvider } from "../utils/ethereum-wallet-provider";
import { Contract, ethers } from "ethers";
import * as PayPeer from "../abis/PayPeer.json";
import * as ERC20 from "../abis/PayPeerCoin.json";

export const Review_save = () => {
    const fazMinhasCenas = async () => {
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
    } 
    return (
      
        <><link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <div className="ui cards">
            <div></div>
            <div className="card">
                <div className="content">
                    <img className="right floated mini ui image" src="../../images/rest_logo.jpeg"></img>

                    <div className="header">
                        Review
                    </div>
                    <div className="meta">
                        Bill for:
                        <p>- menu</p>
                        <p>- drink</p>
                        <p>- cofe</p>
                    </div>
                    <div className="description">
                        Total 10 Eth
                    </div>
                </div>
                <div className="extra content">
                    <div className="ui two buttons">
                        <div className="ui basic green button" onClick={fazMinhasCenas}>Approve</div>
                        <div className="ui basic red button">Decline</div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    );
  };
  
export default Review_save;