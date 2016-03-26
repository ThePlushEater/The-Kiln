import React from 'react';
import ReactDOM from 'react-dom';
import styles from './app.component.css';
import DashboardComponent from './dashboard.component.js';

let AppComponent = React.createClass({
  render: function() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>Masonry Texture Generator</div>
        <DashboardComponent />
        <div className={styles.copyright}>© 2016 Dr. Gentry Corporation</div>
      </div>
    );
  }
});

ReactDOM.render((
  <AppComponent />
), document.querySelector('#ic-app'));
