import React, { Component } from 'react';

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import axios from 'axios'


import logo from './logo.svg';
import "react-big-calendar/lib/css/react-big-calendar.css";
import './App.css';
import events from './event'

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

class App extends Component {



    constructor(props) {
        super(props)
        this.state = {
            cal_events: [
                //State is updated via componentDidMount
            ],
        }

    }

    convertDate = (date) => {
        return moment.utc(date).toDate()
    }

    componentDidMount() {


        axios.get('https://api.servicetitan.com/v1/jobs?serviceTitanApiKey=5bc9b910-1cb6-4e9e-a1ad-77d17b287ee5&Status=Scheduled&StartsAfter=07/19/2021')
            .then(response => {

                const appointments = response.data.data
                .reduce((prev, { }, index) => {
                  const {start, end, type} = response.data.data[index];
                  prev.push({ 
                    id: index,
                    title: type.name,
                    allDay: true,
                    start: this.convertDate(start), 
                    end: this.convertDate(end)
                  })
                  return prev
                }, [])

                this.setState({
                    cal_events:appointments
                })

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {

        const { cal_events } = this.state

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">React Calendar</h1>
                </header>
                <div style={{ height: 700 }}>
                    <Calendar
                        localizer={localizer}
                        events={cal_events}
                        step={30}
                        defaultView='week'
                        views={['month','week','day']}
                        defaultDate={new Date()}
                    />
                </div>
            </div>
        );
    }
}

export default App;