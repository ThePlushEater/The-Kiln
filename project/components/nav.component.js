import React from 'react';
import $ from 'jquery';

import styles from './nav.component.css';

var NavComponent = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {

  },

  render: function() {
    let self = this;
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <div>
            MASONRY
          </div>
          <div>
          </div>
          <div>
            the kiln
          </div>
        </div>


        <div className={styles.item}>
          the kiln
        </div>
        <div className={styles.item}>
          how it works
        </div>
        <div className={styles.item}>
          contact us
        </div>
      </div>
    );
  }
});


module.exports = NavComponent;
