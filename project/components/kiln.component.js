import React from 'react';
import $ from 'jquery';

import styles from './kiln.component.css';

var KilnComponent = React.createClass({
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
        KILN
      </div>
    );
  }
});


module.exports = KilnComponent;
