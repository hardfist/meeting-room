import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import '../style/meeting-nav.less';
import { toggleTimezone, changeProp, recurrence } from '../redux/home-redux';

import Select from 'components/select';
import Recurrence from './recurrence';
const Option = Select.Option;

class Nav extends Component {
    state = {
        current: 'appointment',
        showRecurrence: false,
        showTimezone: false,
        important: 1,
        _priviate: false
    }
    handleChange(val) {
        const { onChange } = this.props;
        this.setState({
            current: val,
            showRecurrence: false
        });
        onChange(val);
    }
    openRecurrence() {
       this.setState({
           showRecurrence: true
       });
    }
    handleImportant = (type) => {
        if(type == this.state.important) {
            this.setState({
                important: 1
            });
        } else {
            this.setState({
                important: type
            });
        }
        localStorage.setItem('__meeting_important', type);
    }
    handlePrivate = () => {
        this.setState({
            _private: !this.state._private
        });
        localStorage.setItem('__meeting_private', !this.state._private);
    }
    render () {
        const { current, showRecurrence, _private, important } = this.state;
        const { isRecurrence } = this.props.data;
        return (
            <div className="nav-container">
                <div className="nav-zone">
                    <div className="zone-horizonal">
                        <div className={classNames(['nav-item appointment', { active: current === 'appointment'}])} onClick={() => { this.handleChange('appointment'); }}><div className="appointment-icon"/>Appointment</div>
                        <div className={classNames(['nav-item schedule', { active: current === 'schedule'}])} onClick={() => { this.handleChange('schedule'); }}><div className="schedule-icon"></div>Scheduling Assistant</div>
                    </div>
                    <div className="option-title">Show</div>
                </div>
                <div className="nav-zone nav-zone2">
                    <div className="zone-horizonal">
                        <div className="zone-vertical">
                            <div className="nav-item1">
                                <span className="title showas">Show As:</span>
                                <Select defaultValue="2" style={{ width: 120 }} onChange={(val)=> {
                                    localStorage.setItem('__meeting_showas', val);
                                }}>
                                    {/* Free = 0,
                                    Tentative = 1,
                                    Busy = 2,
                                    OOF = 3,
                                    WorkingElsewhere = 4,
                                    NoData = 5, */}
                                    <Option key="3" value="1" className="status interim" title="Tentative">Tentative</Option>
                                    <Option key="1" value="2" className="status busy" title="Busy">Busy</Option>
                                    <Option key="2"  value="3" className="status out" title="Out of Office">Out of Office</Option>
                                    <Option key="5" value="4" className="status occupy" title="Working Elsewhere">Working Elsewhere</Option>
                                    <Option key="4" value="5" className="status unkown" title="No Information">No Information</Option>
                                </Select>
                            </div>
                            <div className="nav-item1">
                                <span className="title reminder">Reminder:</span>
                                <Select defaultValue="15" style={{ width: 120 }} onChange={(val)=> {
                                    localStorage.setItem('__meeting_reminder', val);
                                }}>
                                    <Option key={1} value="15" >15 minutes</Option>
                                    <Option key={2} value="30">30 minutes</Option>
                                    <Option key={3} value="45">45 minutes</Option>
                                    <Option key={4} value="60">1 hour</Option>
                                </Select>
                            </div>
                        </div>
                        <Recurrence
                            visible={showRecurrence}
                            onClose={() => this.setState({ showRecurrence: false})}
                            data={this.props.data}
                            changeProp={this.props.actions.changeProp}
                        />
                        <div className={`nav-item recurrence ${isRecurrence ? 'active' : ''}`} onClick={() => { this.openRecurrence(); }}><div className="recurrence-icon" />Recurrence</div>
                        <div className="nav-item time-zone" onClick={() => {
                            this.props.actions.toggleTimezone(!this.state.showTimezone);
                            this.setState({
                                showTimezone: !this.state.showTimezone
                            });
                        }}><div className="time-zone-icon"/>TimeZones</div>
                    </div>
                    <div className="option-title">Options</div>
                </div>
                <div className="nav-zone1">
                    <div className="zone-vertical">
                        <div className={classNames(["nav-item2 private", { "active": _private}])} onClick={this.handlePrivate}>Private</div>
                        <div className={classNames(["nav-item2 high", { "active": important == '2' }])} onClick={this.handleImportant.bind(this, 2)}>High Important</div>
                        <div className={classNames(["nav-item2 low", { "active": important == '0' }])} onClick={this.handleImportant.bind(this, 0)}>Low Important</div>
                    </div>
                    <div className="option-title">Tag</div>
                </div>
            </div>
        )
    }
}

Nav.defaultProps = {
    onChange: () => {}
};

const mapStateToProps = (state) => ({
    data: state.appointmentReducer
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
        toggleTimezone,
        changeProp,
        recurrence
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
