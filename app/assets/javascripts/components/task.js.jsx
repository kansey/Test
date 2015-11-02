var Task = React.createClass({

  getInitialState: function(){
    return {
      id: this.props.data.id,
      done: this.props.data.state.value,
      description: this.props.data.state.description,
      link: this.props.data.state.link,
      title: this.props.data.state.title
    }
  },

  getDone: function(){
    this.setState({done: !this.state.done});
    this.sendToServer();
  },

  sendToServer: function(){
    $.ajax({
      url: '/organizer/task',
      dataType: 'JSON',
      type: 'POST',
      data: this.state
    });
  },

  render: function() {

    var style = {
      opacity: 0.4
    }

    return (
      <div className = 'task' style = {this.state.done ? style : null} onClick = {this.getDone}>
        <input type = "checkbox" style = {{float: 'left'}} checked = {this.state.done} />
        <div className = 'title'>{this.state.title}</div>
      </div>
    );
  }
});
