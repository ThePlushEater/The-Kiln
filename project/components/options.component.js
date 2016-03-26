import React from 'react';
import $ from 'jquery';
import styles from './options.component.css';

var OptionsComponent = React.createClass({
  getInitialState: function() {
    return {options: []};
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({options: nextProps.options});
  },
  onChange: function(option, event) {
    option.value = event.target.value;
    this.setState({options: this.state.options});
    $.ajax({
      url: option.uri,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(option),
      dataType: "json",
      success: function(data) {

      }.bind(this),
      error: function(xhr, status, err) {
        console.error("/tasks", status, err.toString());
      }.bind(this)
    });

  },
  render: function() {
    let self = this;
    let items;
    if (self.state.options != undefined && self.state.options.length > 0) {
      items = self.state.options.map(function(item, i) {
        switch(item.type) {
          case 'number':
            return (
              <div key={i} className={styles.item}>
                <div className={styles.description}>{item.description}</div>
                <div className={styles.group}>
                  <label>{item.name}</label>
                  <input type="text" key={item.id} placeholder="Hue value of HSV channel" value={item.value} onChange={(event)=> {self.onChange(item, event)}} />
                  <label>{"(" + item.min + " ~ " + item.max + ")"}</label>
                </div>
              </div>
            );
            break;
          case 'boolean':
            return (
              <div key={i} className={styles.item}>
                <div className={styles.description}>{item.description}</div>
                <div className={styles.group}>
                  <label>{item.name}</label>
                  <input type="checkbox" name={item.id} />
                </div>
              </div>
            );
            break;
        }
      });
      return (
        <div className={styles.wrapper}>
          {items}
        </div>
      );
    } else {
      return (
        <div className={styles.wrapper}>
          <div>No options are available.</div>
        </div>
      );
    }
  }
});

module.exports = OptionsComponent;
