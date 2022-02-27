import React, { useEffect, useState } from 'react';
import '../MarketPlace/MarketPlace.css';
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneCopy } from 'react-icons/ai';
import { useHistory } from "react-router";
import styles from './LeaderShipBoard.module.css';
import './LeaderShipBoard.css';
import classNames from 'classnames';
import Button from '../../commons/Button/Button';
import { fetchData } from '../../redux/data/dataActions';


export const LeaderShipBoard =()=>{
    const history = useHistory();
    const blockchain = useSelector((state) => state.blockchain);
    const [loading , setLoading ] = useState(false);
    const [status ,setStatus] = useState("");
    const [address ,setAddress] = useState("");
    const [receipt ,setReceipt] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
      if (blockchain.account !== "" && blockchain.smartContract !== null) {
        dispatch(fetchData(blockchain.account));
      }
    }, [blockchain.smartContract, dispatch]);
   
    const approveNftToken2 = () => {
      console.log('Approver running ... ')
      blockchain?.smartContract2?.methods
      .balanceOf(address)
      .call({ from: blockchain.account2})
      // .once("error",(err) => {
      //   console.log(err) ;
      // })
      .then((receiptNumber)=>{
        console.log("receipt: ",receiptNumber);
        setReceipt(receiptNumber);
        setLoading(false);
        // setMyState({...myState, nftToken:receipt.events.Transfer.returnValues.tokenId})
        // dispatch(setDataTokenToStore(receipt.events.Transfer.returnValues.tokenId))
        setStatus("successfully approved your coins to marketplace :) !");
      })
      .catch(e=>{
        console.log('Aprrover NFT Token : ',e)
      })
    }

    console.log("address : ",address)
    return (<div className='market-place' style={{height:'100vh'}}>
    <div className='row'>
        <div className='col-md-12 mt-4 text-center text-white'>
            <span className='header'>LEADERSHIP BOARD</span>
        </div>
        <div className='col-md-12 mt-5 d-flex justify-content-center'>
            <div className='custom-card-body biddingPlace-Card'>
                <div className='row'>
                    {/* <div className='col-md-12'>
                        Place your Bid
                    </div> */}
                    <div className='col-md-5'>
                        <div style={{widthL:'100%',float:'right'}}>Wallet Address </div>
                    </div>
                    <div className='col-md-7'>
                        <input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}} placeholder='' className='form-control' />
                    </div>
                    <div className='col-md-12 mt-2'>
                        <button className='btn btn-warning' onClick={()=>approveNftToken2()} style={{float:'right'}}>Transact</button> <AiTwotoneCopy color={'#fff'} size={20}  style={{float:'right'}}></AiTwotoneCopy> 
                    </div>
                    {receipt && <div title={address} className={styles.text}>Your current wallet balance is : {receipt}</div>}
                </div>
            </div>
        </div>
    </div>
</div>)
}