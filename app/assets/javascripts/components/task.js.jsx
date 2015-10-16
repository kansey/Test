var Task = React.createClass({

  render: function() {
    return (
      <div className = 'task'>
        <div className = 'title'>{this.props.title}</div>
      </div>
    );
  }
});
