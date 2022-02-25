import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export const EmptyLayout = ({ children }) => {
  const history = useHistory();
  // const location = useLocation();
  // const pathName = location.pathname;
  // const history = useHistory();
  // const { profileDetails } = useSelector(store => store.user);
  // useEffect(() => {
  //   if (pathName === '/login' &&
  //     window.localStorage.getItem('auth_token') !== null
  //     && profileDetails.firstName) {
  //     history.push('/');
  //   }
  // }, [profileDetails, history, pathName]);

  return (
    <div style={{
      height: '100vh', width: '100vw', color: '#3e5569',
      fontFamily: '"Nunito Sans",sans-serif', background: "#fff",
      display:'flex'
    }}>
      <div style={{width:'210px', height:'100%',background:'#606061', position:'fixed'}}>
        <div className='row m-0'>
            <div className='col-md-12 text-white pt-3 pb-3 text-center' style={{borderBottom:'2px solid #2C2C2D',fontWeight:'bold'}}>
              <div>My Wallet</div>
            </div>
            <div 
            onClick={()=>history.push('/')}
            className='col-md-12  mt-4 text-white pt-2 pb-2 text-center menu-hove' style={{borderBottom:'1px solid #2C2C2D',fontSize:'.8rem',cursor:'pointer',borderBottom:'1px solid #2C2C2D'}}>
              <div>Home</div>
            </div>
            <div 
            onClick={()=>history.push('/nft-market-place')}
            className='col-md-12  mt-4 text-white pt-2 pb-2 text-center menu-hove' style={{borderBottom:'1px solid #2C2C2D',fontSize:'.8rem',cursor:'pointer',borderBottom:'1px solid #2C2C2D'}}>
              <div>Market Place</div>
            </div>
            <div 
            onClick={()=>history.push('/nft-bidding-place')}
            className='col-md-12  mt-4 text-white pt-2 pb-2 text-center menu-hove' style={{borderBottom:'1px solid #2C2C2D',fontSize:'.8rem',cursor:'pointer',borderBottom:'1px solid #2C2C2D'}}>
              <div>Bidding Place</div>
            </div>
        </div>
      </div>
      <div style={{width:'calc( 100% - 210px)', height:'100%', overflowY:'scroll',marginLeft:'210px'}}>
          {children}
      </div>
    </div>
  )
}