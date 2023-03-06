
import './Storeboard.css';
import SelectChannel from './Modal/SelectChannel';
import SelectRegion from './Modal/SelectRegion';

// import React, {useState} from "react";

import { submitLogin } from 'app/auth/store/loginSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import eBayService from 'app/services/eBayService';


function Storeboard() {

  const [regionShow, setRegionShow] = useState(false);
  const [channelShow, setChannelShow] = useState(false);
  const [region, setRegion] = useState("");
  const dispatch = useDispatch();

  const eBaylogin =
  () =>
  async (dispatch) => {
    return eBayService
      .loginToEbay()
      .then((data) => {
        // dispatch(setUserData({...user,role:['admin']}));

        // return dispatch(loginSuccess());
        console.log('result', data);
      })
      .catch((errors) => {
        console.log('errors', errors);
        // return dispatch(loginError(errors));
      });
  };

  function onSubmit() {
    dispatch(eBaylogin());
  }

  return (    
        <div>
          <div className="storeboard-title">
            <h4>Stores</h4>
          </div>
          
          <div className = "storeboard-container">
            <div onClick={(e) => {setChannelShow(true); }} className = "storeboard-item">
              <i className="fa fa-plus"/>
              &nbsp;&nbsp;&nbsp; Add Store
            </div>
          </div>
          <SelectChannel onClose = {(e) => {setChannelShow(false);}} selectRegion={(e) => {setChannelShow(false);setRegionShow(true);}} show={channelShow}/>
          <SelectRegion onClose = {(e) => {setRegionShow(false);}} regionSelect={(regions) =>{setRegion(regions);onSubmit();}} selectedCountry = {region} show={regionShow}/>
        </div>
  );
}

export default Storeboard;
