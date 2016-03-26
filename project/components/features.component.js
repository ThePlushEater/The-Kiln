import React from 'react';
import styles from './features.component.css';

var FeaturesComponent = React.createClass({
  getInitialState: function() {
    return {features: [], task: null};
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({features: nextProps.features, task: nextProps.task});
  },
  render: function() {
    let self = this;
    let items = self.state.features.map(function(item, i) {
      if (self.state.task.features.indexOf(item.id) > -1) {
        return (
          <div onClick={()=> {self.props.onClick(item);}} key={i} className={styles.selected}>
            <img className={styles.thumbnail} />
            <div className={styles.name}>{item.name}</div>
            <div className={styles.description}>{item.description}</div>
          </div>
        );
      } else {
        return (
          <div onClick={()=> {self.props.onClick(item);}} key={i} className={styles.unselected}>
            <img className={styles.thumbnail} />
            <div className={styles.name}>{item.name}</div>
            <div className={styles.description}>{item.description}</div>
          </div>
        );
      }
    });
    return (
      <div className={styles.wrapper}>
        {items}
      </div>
    );
  }
});


module.exports = FeaturesComponent;
