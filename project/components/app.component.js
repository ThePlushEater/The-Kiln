import React from 'react';
import ReactDOM from 'react-dom';
import styles from './app.component.css';
import DashboardComponent from './dashboard.component.js';
import GeometryComponent from './geometry.component.js';
import NavComponent from './nav.component.js';
import KilnComponent from './kiln.component.js';

let AppComponent = React.createClass({
  getInitialState: function() {
    return {page: 0};
  },

  componentDidMount: function() {

  },

  routeToKiln() {
    this.setState({page: 1});
  },

  render: function() {
    let self = this;
    if (this.state.page == 0) {
      return (
        <div className={styles.wrapper}>
          <NavComponent />
          <GeometryComponent onClick={self.routeToKiln} />
          <div className={styles.copyright}>© 2016 Dr. Gentry Corporation</div>
        </div>
      );
    } else if (this.state.page == 1) {
      return (
        <div className={styles.wrapper}>
          <NavComponent />
          <KilnComponent />
          <div className={styles.copyright}>© 2016 Dr. Gentry Corporation</div>
        </div>
      );
    }
  }
});

ReactDOM.render((
  <AppComponent />
), document.querySelector('#ic-app'));
