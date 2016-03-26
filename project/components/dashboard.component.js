import React from 'react';
import $ from 'jquery';
import styles from './dashboard.component.css';
import TaskComponent from './task.component.js';
import TasksComponent from './tasks.component.js';


var DashboardComponent = React.createClass({
  getInitialState: function() {
    return {tasks: [], task: null, features: []};
  },
  fetchTasksAll: function() {
    $.ajax({
      url: "/tasks",
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(data);
        this.setState({tasks: data.tasks, task: data.tasks[0]});
        /*
        data.map(function(task, i) {
          console.log(task);
        });
        */
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("/tasks", status, err.toString());
      }.bind(this)
    });
  },
  fetchFeaturesAll: function() {
    $.ajax({
      url: "/features",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({features: data.features});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("/features", status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.fetchTasksAll();
    this.fetchFeaturesAll();
  },
  selectTask(task) {
    let self = this;
    if (task) {
      console.log(task.uri);
      $.ajax({
        url: "/tasks/" + task.id,
        dataType: 'json',
        cache: false,
        success: function(data) {
          self.setState({task: data.task});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error("/tasks", status, err.toString());
        }.bind(this)
      });
    }
  },
  render: function() {
    let self = this;
    return (
      <div className={styles.wrapper}>
        <TaskComponent task={self.state.task} features={self.state.features} />
        <TasksComponent tasks={self.state.tasks} onClick={self.selectTask} />
      </div>
    );
  }
});


module.exports = DashboardComponent;
