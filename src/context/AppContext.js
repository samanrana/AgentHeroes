import React, {useState, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
  const [baseUrl, setBaseUrl] = useState('https://www.heroesksa.com');
  // const [baseUrl, setBaseUrl] = useState('http://127.0.0.1:8000');

  //Customer Context
  const [userid, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [phone, setPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const storeUserId = (userid) => {
    setUserId(userid);
  };
  const storeToken = (token) => {
    setToken(token);
  };
  const storePhone = (phone) => {
    setPhone(phone);
  };
  const storeUserEmail = (email) => {
    setUserEmail(email);
  };

  // shop context

  const [shopid, setShopId] = useState('');
  const [shopToken, setShopToken] = useState('');
  const [shopEmail, setShopEmail] = useState('');
  const [shopAvatar, setShopAvatar ] = useState('');
  const [shopTypeId, setShopTypeId ] = useState('');
  const [shopcr, setShopCr] = useState('');
  const [shopName, setShopName ] = useState('')
 const storeShopId = (shop_id) =>{
   setShopId(shop_id);
 };

 const storeShopToken = (shop_token) => {
   setShopToken(shop_token);
 };
 const storeShopEmail = (shop_email) => {
   setShopEmail(shop_email);
 };

 const storeShopAvatar = (avatar) => {
   setShopAvatar(avatar);
 };

 const storeShopShopTypeId =(shop_type_id) => {
   setShopTypeId(shop_type_id);
 };

 const storeShopCr = (store_cr) => {
   setShopCr(store_cr);
 };

 const storeShopName = (store_name) => {
   setShopName(store_name);
 };

  //Driver Context
const [driverToken, setDriverToken] = useState('')
const [driverName, setDriverName ] = useState('');
const [driverId, setDriverId ] = useState('');
const [driverEmail, setDriverEmail ] = useState('');
const [driverPhone, setDriverPhone ] = useState('');
const [driverImage, setDriverImage ] = useState('');
const [driverLicense, setDriverLicense ] = useState('');
const [driverIdCard, setDriverIdCard ] = useState('');
const [driverNumberPlate, setDriverNumberPlate ] = useState('');
const [driverShopTypeId, setDriverShopTypeId] = useState('')

const storeDriverToken = (driver_token) => {
  setDriverToken(driver_token);
};
  
const storeDriverName = (driver_name) => {
  setDriverName(driver_name);
};

const storeDriverId = (driver_id) => {
  setDriverId(driver_id);
};

const storeDriverEmail = (driver_email) => {
  setDriverEmail(driver_email);
};

const storeDriverPhone = (driver_phone) => {
  setDriverPhone(driver_phone);
};

const storeDriverImage = (driver_image) => {
  setDriverImage(driver_image);
};

const storeDriverLicense = (driver_license) => {
  setDriverLicense(driver_license);
};

const storeDriverIdCard = (driver_id_card) => {
  setDriverIdCard(driver_id_card);
};

const storeDriverNumberPlate = (number_plate) => {
  setDriverNumberPlate(number_plate);
};

const storeDriverShopTypeId = (driver_shop_type_id) => {
  setDriverShopTypeId(driver_shop_type_id)
};
 
  return (
    <AppContext.Provider
      value={{
        baseUrl,
        userid,
        token,
        phone,
        userEmail,
        storeUserId,
        storeToken,
        storePhone,
        storeUserEmail,
        // SHop Properties
        shopid,
        shopToken,
        shopEmail,
        shopAvatar,
        shopTypeId,
        shopcr,
        shopName,
        storeShopId,
        storeShopToken,
        storeShopEmail,
        storeShopAvatar,
        storeShopShopTypeId,
        storeShopCr,
        storeShopName,

        // driver properties
        driverToken,
        driverName,
        driverId,
        driverEmail,
        driverPhone,
        driverImage,
        driverLicense,
        driverIdCard,
        driverShopTypeId,
        driverNumberPlate,
        storeDriverToken,
        storeDriverName,
        storeDriverId,
        storeDriverShopTypeId,
        storeDriverEmail,
        storeDriverPhone,
        storeDriverImage,
        storeDriverLicense,
        storeDriverIdCard,
        storeDriverNumberPlate        
      }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
