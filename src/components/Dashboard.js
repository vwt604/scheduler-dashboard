import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";

import Loading from "components/Loading.js";
import Panel from "components/Panel.js";

const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];

class Dashboard extends Component {

  state = {
    loading: false, //hides or displays loading state
    focused: null,
    days: [], 
    appointments: {},
    interviewers: {}
  };

  selectPanel(id) {
    this.setState(previousState => ({
      focused: previousState.focused !== null ? null : id // lets focused to go back to previous state
    }));
  }

  // Adding local storage: When we get the values out of storage, we use the JSON.parse function to convert the string back to JavaScript values
  componentDidMount() {
    const focused = JSON.parse(localStorage.getItem("focused"));

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(([days, appointments, interviewers]) => {
      this.setState({
        loading: false,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      });
    });

    if (focused) {
      this.setState({ focused });
    }
  }

  // Adding local storage: We use the JSON.stringify function to convert our values before writing them to the localStorage
  componentDidUpdate(previousProps, previousState) {
    if (previousState.focused !== this.state.focused) {
      localStorage.setItem("focused", JSON.stringify(this.state.focused));
    }
  }
  


  render() {
    // console.log('Fetched appt data', this.state)
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused //conditional CSS 
    });

    if(this.state.loading) {
      return <Loading />
    }

    const panels = data
      .filter(panel => this.state.focused === null || this.state.focused === panel.id) //handling state: showing selected panel 
      .map(panel => (
        <Panel 
          key={panel.id}
          id={panel.id}
          label={panel.label}
          value={panel.value}
          onSelect={event => this.selectPanel(panel.id)}
        />
      )) 

    return (
      <main className={dashboardClasses}>
        {panels}
      </main>
    );
  };
}

export default Dashboard;
