import React from 'react';
import $ from 'jquery';
import styles from './task.component.css';
import FeaturesComponent from './features.component.js';
import OptionsComponent from './options.component.js';

var TaskComponent = React.createClass({
  getInitialState: function() {
    return {task: null, features: [], tasks: []};
  },
  fetchTaskFromUrl: function(uri) {
    let self = this;
    $.ajax({
      url: uri,
      dataType: 'json',
      cache: false,
      success: function(data) {
        self.setState({task: data.task});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("/tasks", status, err.toString());
      }.bind(this)
    });
  },
  fetchOptionsOfSelectedFeatures: function(task) {
    let self = this;
    $.ajax({
      url: "/options",
      dataType: 'json',
      cache: false,
      success: function(data) {
        let options = [];
        task.features.forEach(function(feature, i) {
          for (var i = 0; i < data.options.length; i++) {
            if (data.options[i].fid == feature) {
              options.push(data.options[i]);
            }
          }
        });
        self.setState({options: options});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("/features", status, err.toString());
      }.bind(this)
    });
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({task: nextProps.task, features: nextProps.features});
    this.fetchOptionsOfSelectedFeatures(nextProps.task);
    /*
    if (nextProps.task != null && nextProps.task.length == 1) {
      this.setState({task: nextProps.task});
    }
    */
  },

  selectFeature(feature) {
    let self = this;
    let index = self.state.task.features.indexOf(feature.id);
    if(index > -1) {
      self.state.task.features.splice(index, 1);
    } else {
      self.state.task.features.push(feature.id);
    }
    $.ajax({
      url: self.state.task.uri,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(self.state.task),
      dataType: "json",
      success: function(data) {
        self.fetchOptionsOfSelectedFeatures(data.task);
        self.setState({task: data.task});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("/tasks", status, err.toString());
      }.bind(this)
    });
  },
  changeOption(id, value) {

  },
  onBake: function(task) {
    let self = this;
    $.ajax({
      url: "/task/" + task.id,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(self.state.task),
      dataType: "json",
      success: function(data) {
        self.setState({task: data.task});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("/tasks", status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    let self = this;
    if (this.state.task) {
      var progress = {
        width: this.state.task.progress + '%'
      };
      return (
        <div className={styles.wrapper}>
          <div className={styles.progress}>
            <div style={progress}>
              {this.state.task.progress + '%'}
            </div>
          </div>
          <div className={styles.task_wrapper}>
            <div className={styles.task_name}>{this.state.task.name}</div>
            <div className={styles.actions}>
              <div className={styles.reset}>Reset</div>
              <div className={styles.stop}>Stop</div>
              <div className={styles.bake} onClick={()=> {self.onBake(self.state.task);}}>Bake</div>
            </div>
          </div>
          <div className={styles.wrapper_content}>
            <div className={styles.thumbnail}>
              <div className={styles.thumbnail_title}>Preview</div>
              <img className={styles.thumbnail_image} src={self.state.task.result}/>
            </div>
            <div className={styles.feature}>
              <div className={styles.feature_title}>Choose Features</div>
              <FeaturesComponent task={this.state.task} features={this.state.features} onClick={this.selectFeature}/>
            </div>
            <div className={styles.detail}>
              <div className={styles.detail_title}>Adjust Details</div>
              <OptionsComponent options={this.state.options} onChange={this.changeOption}/>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.wrapper}></div>
      );
    }
  }
});


module.exports = TaskComponent;
