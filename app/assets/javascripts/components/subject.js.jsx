var Subject = React.createClass({

  getInitialState: function(){
    return this.state = this.props.data;
  },

  render: function() {
    var style = {
      width: this.state.location.width,
      height: this.state.location.height,
      marginLeft: this.state.location.left,
      marginTop: this.state.location.top,
    };

    return (
      <div className = 'subject' style = {style}>
        <h3 className = 'name'>{this.state.name}</h3>
      </div>
    );
  }
});
