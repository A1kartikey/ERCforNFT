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
    const [addresses, setAddresses] = useState([
      {name:'name1', addr: '0xAa656533b9B29f2d2ACb7444c75859355BE514fe'},
      {name:'name2', addr: '0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73'},
      {name:'name3', addr: '0x0cBcD7f3fD403f49b50efaC09d942f701177087D'}
    ]);
    const [allLeadershipFlag, setAllLeadershipFlag] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
      if (blockchain.account !== "" && blockchain.smartContract !== null) {
        dispatch(fetchData(blockchain.account));
      }
    }, [blockchain.smartContract, dispatch]);
   
    const approveNftTokenAll = () => {
      console.log('Approver running ... ')
      Promise.all(addresses.map((item)=>blockchain?.smartContract2?.methods
      .balanceOf(item.addr)
      .call({ from: blockchain.account2}))).then((responses)=>{
        console.log("Resust : ************ : ", responses)
        const temp = [...addresses];
        addresses.forEach((item, index)=>{
            temp[index]["amount"] = responses[index];
        });
        setAddresses(temp.sort((a,b)=>b.amount-a.amount));
        setAllLeadershipFlag(true);
      }).catch(e=>{
        console.log('Aprrover NFT Token : ',e)
      })
    }

    const approveNftTokenOne = () => {
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
        setStatus("successfully approved your coins to marketplace :) !");
      })
      .catch(e=>{
        console.log('Aprrover NFT Token : ',e)
      })
    }

    return (<div className='market-place'>
    <div className='row'>
        <div className='col-md-12 mt-4 text-center text-white'>
            <span className='header'>LEADERSHIP BOARD</span>
        </div>
        <div className='col-md-12 mt-5 d-flex justify-content-center'>
            <div className='custom-card-body biddingPlace-Card'>
                <div className='row'>
                    <div className='col-md-5'>
                        <div style={{widthL:'100%',float:'right'}}>Wallet Address </div>
                    </div>
                    <div className='col-md-7'>
                        <input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}} placeholder='' className='form-control' />
                    </div>
                    <div className='col-md-12 mt-2'>
                        <button className='btn btn-warning' onClick={()=>approveNftTokenOne()} style={{float:'right'}}>Transact</button> <AiTwotoneCopy color={'#fff'} size={20}  style={{float:'right'}}></AiTwotoneCopy> 
                    </div>
                    {receipt && <div title={address} className={styles.text}>Your current wallet balance is : {receipt}</div>}
                </div>
            </div>
        </div>
        <div className='mt-4 mb-4'>
          <div className='col-md-3'>
            <button className='btn btn-warning' onClick={()=>approveNftTokenAll()} style={{float:'right'}}>All Transactions</button>
          </div>
        </div>
        {
          allLeadershipFlag ? (
            <div className='col-md-12 mt-5 d-flex justify-content-center'>
            <div className='custom-card-body biddingPlace-Card'>
            <div className='row mb-3'>
                      <div className='col-md-1'>
                        Ranking
                      </div>
                      <div className='col-md-2'>
                          Name
                      </div>
                      <div className='col-md-7'>
                        Address
                      </div>
                      <div className='col-md-2'>
                        Amount
                      </div>
            </div>
              {
                addresses.map((item, index) =>{
                  return(
                    <div key={index} className='row mb-2'>
                      <div className='col-md-1'>
                        {index + 1}
                      </div>
                      <div className='col-md-2'>
                          {item["name"]}
                      </div>
                      <div className='col-md-7'>
                        {item["addr"]}
                      </div>
                      <div className='col-md-2'>
                        {item["amount"]}
                      </div>
                    </div>
                  )
                })
              }
            </div>
            </div>
          ) : null
        }
    </div>
</div>)
}