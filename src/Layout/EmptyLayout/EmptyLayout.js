import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export const EmptyLayout = ({ children }) => {
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
      fontFamily: '"Nunito Sans",sans-serif', background: "#fff"
    }}>
      {children}
    </div>
  )
}