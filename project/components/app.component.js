import React from 'react';
import ReactDOM from 'react-dom';
import styles from './app.component.css';
import DashboardComponent from './dashboard.component.js';
import GeometryComponent from './geometry.component.js';
import NavComponent from './nav.component.js';

let AppComponent = React.createClass({
  getInitialState: function() {
    return {page: 0};
  },

  componentDidMount: function() {

  },

  render: function() {
    if (this.state.page == 0) {
      return (
        <div className={styles.wrapper}>
          <NavComponent />
          <GeometryComponent />
          <div className={styles.copyright}>© 2016 Dr. Gentry Corporation</div>
        </div>
      );
    } else if (this.state.page == 1) {
      return (
        <div className={styles.wrapper}>
          <NavComponent />
          <GeometryComponent />
          <div className={styles.copyright}>© 2016 Dr. Gentry Corporation</div>
        </div>
      );
    }
  }
});

ReactDOM.render((
  <AppComponent />
), document.querySelector('#ic-app'));
