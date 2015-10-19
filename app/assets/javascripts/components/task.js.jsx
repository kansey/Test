var Task = React.createClass({

  getInitialState: function(){
    return {
      done: false
    }
  },

  getDone: function(){
    this.setState({done: !this.state.done});
  },

  render: function() {

    var style = {
      opacity: 0.4
    }

    return (
      <div className = 'task' style = {this.state.done ? style : null} onClick = {this.getDone}>
        <input type = "checkbox" style = {{float: 'left'}} checked = {this.state.done} />
        <div className = 'title'>{this.props.title}</div>
      </div>
    );
  }
});
