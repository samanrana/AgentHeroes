import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {DefaultTheme, Provider as PaperProvider,configureFonts} from 'react-native-paper';
import Home from './src/screens/Home';
import {AppProvider} from './src/context/AppContext';
import DriverRegistration from './src/screens/driver/DriverRegistration';
import DriverLogin from './src/screens/driver/DriverLogin';
import ShopsLogin from './src/screens/shops/ShopsLogin';
import ShopsRegistration from './src/screens/shops/ShopsRegistration';
import AllJobs from './src/screens/driver/AllJobs'
import ShopDashboard from './src/screens/shops/ShopDashboard';
// import AddEmployee from './src/screens/shops/AddEmployee';
// import ViewEmployee from './src/screens/shops/ViewEmployee';
import Earnings from './src/screens/driver/Earnings';
import MyJobs from './src/screens/driver/myjobs/MyJobs';
import DriverProfile from './src/screens/driver/DriverProfile';
import ChatScreen from './src/screens/driver/myjobs/ChatScreen';
import ViewJob from './src/screens/driver/myjobs/ViewJob';
import ImageZoom from './src/components/ImageZoomer/ImageZoom';
import ShopProfile from './src/screens/shops/ShopProfile';
import NumberOfOrders from './src/screens/driver/NumberOfOrders';
import ViewPreviousOrder from './src/screens/driver/ViewPreviousOrder';
import NumberOfJobs from './src/screens/driver/NumberOfJobs';
import CompletedJobs from './src/screens/driver/myjobs/CompletedJobs';

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    DriverRegistration: DriverRegistration,
    DriverLogin: DriverLogin,
    AllJobs: AllJobs,
    ShopsLogin: ShopsLogin,
    ShopsRegistration: ShopsRegistration,
    ShopsDashboard: ShopDashboard,
    // AddEmployee: AddEmployee,
    // ViewEmployee: ViewEmployee,
    Earning: Earnings,
    MyJobs: MyJobs,
    ShopProfile: ShopProfile,
    DriverProfile: DriverProfile,
    ChatScreen: ChatScreen,
    ViewJob: ViewJob,
    ImageZoom : ImageZoom,
    NumberOfOrders:NumberOfOrders,
    ViewPreviousOrder:ViewPreviousOrder,
    NumberOfJobs: NumberOfJobs,
    CompletedJobs: CompletedJobs
  },
  {
    initialRouteName: 'DriverLogin',
    headerMode: false,
  },
);
const AppContainer = createAppContainer(AppNavigator);
const App = () => {
  const fontConfig = {
    default: {
      regular: {
        fontFamily: 'Quicksand',
      },
      
    },
  };
  
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      
      primary: '#D6D4AF',
      accent: '#D6D4AF',
      green : '#00BE65',
      background: '#344C4C',
      surface: '#FFFFFFFF',
      white: '#FFFFFFFF',
      golden: '#FFBB00',
      coralRed: '#FF4343',
      text: '#FFFFFF',
      cards: '#253938',
    },
    fonts: configureFonts(fontConfig),

  };
  return (
    <AppProvider>
      <PaperProvider theme={theme}>
        <AppContainer />
      </PaperProvider>
    </AppProvider>
  );
};
export default App;
