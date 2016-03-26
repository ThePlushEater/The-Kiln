import React from 'react';
import styles from './tasks.component.css';

var TasksComponent = React.createClass({
  getInitialState: function() {
    return {items: [], select: 0};
  },
  componentDidMount: function() {

  },
  selectItem(index) {
    this.setState({select: index});
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({items: nextProps.tasks});
  },
  render: function() {
    let self = this;
    let items = this.state.items.map(function(item, i) {
      var progress = {
        width: item.progress + '%'
      };
      if (self.state.select == i) {
        return (
          <div onClick={()=> {self.selectItem(i);self.props.onClick(item);}} key={i} className={styles.selected}>
            <div className={styles.item}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.progress}>
                <div style={progress}>
                  {item.progress + '%'}
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div onClick={()=> {self.selectItem(i);self.props.onClick(item);}} key={i} className={styles.unselected}>
            <div className={styles.item}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.progress}>
                <div style={progress}>
                  {item.progress + '%'}
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
    return (
      <div className={styles.wrapper}>
        <div className={styles.items}>
          <div className={styles.blank}>
          </div>
          {items}
        </div>
      </div>
    );
  }
});


module.exports = TasksComponent;
