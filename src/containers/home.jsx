import React from 'react';
import logo from 'img/logo.png';
import { Tabs } from 'antd';
import '../style/home.less';

const TabPane = Tabs.TabPane;

import NewMeeting from './new-meeting';
import MyMeeting from './my-meeting';
const Home = () => (
  <div>
    <header className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
    </header>
    <div className="app-main card-container">
      <Tabs type="card">
        <TabPane className="pane" tab="New Meeting" key="1"><NewMeeting /></TabPane>
        <TabPane className="pane" tab="My Meeting" key="2"><MyMeeting /></TabPane>
      </Tabs>
    </div>
    <div className="app-footer">版权@2017</div>
  </div>
)

export default Home;
