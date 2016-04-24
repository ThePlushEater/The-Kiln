import React from 'react';
import $ from 'jquery';

import styles from './geometry.component.css';

var GeometryComponent = React.createClass({
  getInitialState: function() {
    return {selected: 0};
  },

  componentDidMount: function() {

  },

  onSelect(id: number) {
    this.setState({selected: id});
  },

  render: function() {
    let self = this;
    var time = new Date().getTime();
    if (self.state.selected == 1) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.geolist}>
            <div className={styles.generic1_selected} onClick={()=> {self.onSelect(1);}}>
            </div>
            <div className={styles.generic2} onClick={()=> {self.onSelect(2);}}>
            </div>
            <div className={styles.generic3} onClick={()=> {self.onSelect(3);}}>
            </div>
          </div>
          <div className={styles.button}>
            <div onClick={()=> {self.props.onClick(self.state.selected);}}>
              enter the kiln
            </div>
          </div>
        </div>
      );
    } else if (self.state.selected == 2) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.geolist}>
            <div className={styles.generic1} onClick={()=> {self.onSelect(1);}}>
            </div>
            <div className={styles.generic2_selected} onClick={()=> {self.onSelect(2);}}>
            </div>
            <div className={styles.generic3} onClick={()=> {self.onSelect(3);}}>
            </div>
          </div>
          <div className={styles.button}>
            <div onClick={()=> {self.props.onClick(self.state.selected);}}>
              enter the kiln
            </div>
          </div>
        </div>
      );
    } else if (self.state.selected == 3) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.geolist}>
            <div className={styles.generic1} onClick={()=> {self.onSelect(1);}}>
            </div>
            <div className={styles.generic2} onClick={()=> {self.onSelect(2);}}>
            </div>
            <div className={styles.generic3_selected} onClick={()=> {self.onSelect(3);}}>
            </div>
          </div>
          <div className={styles.button}>
            <div onClick={()=> {self.props.onClick(self.state.selected);}}>
              enter the kiln
            </div>
          </div>
        </div>
      );
    } else if (self.state.selected == 0) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.geolist}>
            <div className={styles.generic1} onClick={()=> {self.onSelect(1);}}>
            </div>
            <div className={styles.generic2} onClick={()=> {self.onSelect(2);}}>
            </div>
            <div className={styles.generic3} onClick={()=> {self.onSelect(3);}}>
            </div>
          </div>
          <div className={styles.button}>
            <div onClick={()=> {self.props.onClick(self.state.selected);}}>
              enter the kiln
            </div>
          </div>
        </div>
      );
    }
  }
});


module.exports = GeometryComponent;
