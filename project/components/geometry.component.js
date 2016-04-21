import React from 'react';
import $ from 'jquery';

import styles from './geometry.component.css';

var GeometryComponent = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {

  },

  render: function() {
    let self = this;
    var time = new Date().getTime();
    return (
      <div className={styles.wrapper}>
        <div className={styles.geolist}>
          <div className={styles.generic1}>
          </div>
          <div className={styles.generic2}>
          </div>
          <div className={styles.generic3}>
          </div>
        </div>
        <div className={styles.button}>
          <div>
            enter the kiln
          </div>
        </div>
      </div>
    );
  }
});


module.exports = GeometryComponent;
