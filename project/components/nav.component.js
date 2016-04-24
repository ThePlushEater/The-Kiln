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
        <div className={styles.title} onClick={()=> {self.props.onClick();}}>
          <div className={styles.titleText}>
            MASONRY
          </div>
          <div>
          </div>
          <div className={styles.titleLocation}>
            the kiln
          </div>
        </div>


        <div className={styles.navLink}>
          the kiln
        </div>
        <div className={styles.navLink}>
          how it works
        </div>
        <div className={styles.navLink}>
          contact us
        </div>
      </div>
    );
  }
});


module.exports = NavComponent;
