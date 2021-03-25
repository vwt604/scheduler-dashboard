import React, { Component } from "react";
import classnames from "classnames";

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
  constructor(props) {
    super(props);
    this.state = {
      loading: false, //hides or displays loading state
      focused: null //initial state 
    }
  }

  render() {
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
