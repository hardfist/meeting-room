import React, { Component } from 'react'
import Button from 'components/button';
import fetch from 'lib/fetch';

import '../style/my-meeting.less';

class MyMeeting extends Component {
    state = {
        data: [],
        type: 0
    }
    componentDidMount() {
        this.search(1);
    }
    search(type) {
        fetch.get('/api/meeting/getList', {
            type,
            token: '40a56c3e9cc9465f60c810f2d26d38c'
        }).then(r => {
            this.setState({
                data: r.data.list,
                type
            });
        });
    }
    render () {
        const { data, type } = this.state;
        return (
            <div className="my-meeting">
                <div className="my-top">
                    <Button
                        type={type== 1 ? "primary": ""}
                        onClick={() => { this.search(1); }}
                    >
                        Not Start
                    </Button>
                    <Button
                        type={type== 4 ? "primary": ""}
                        onClick={() => { this.search(4); }}
                    >
                        The End
                    </Button>
                </div>
                <div className="my-table">
                    <table>
                        <thead>
                            <tr>
                                <th>{__('subject')}</th>
                                <th>{__('meetingRoom')}</th>
                                <th>{__('startTime')}</th>
                                <th>{__('endTime')}</th>
                                <th>{__('createTime')}</th>
                                <th>{__('operation')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(item => {
                                    return (
                                        <tr>
                                            <td>{item.subject}</td>
                                            <td>{item.roomNames}</td>
                                            <td>{item.startTime}</td>
                                            <td>{item.endTime}</td>
                                            <td>{item.createTime}</td>
                                            <td></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default MyMeeting