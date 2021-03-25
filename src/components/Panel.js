import React, { Component } from "react";

class Panel extends Component {
  state = {  }
  render() {
    const { label, value } = this.props; // the props obj belongs to the instance

    return (
      <section className="dashboard_panel">
        <h1 className="dashboard__panel-header">{label}</h1>
        <p className="dashboard__panel-value">{label}</p>
      </section>
    );
  }
}

export default Panel;