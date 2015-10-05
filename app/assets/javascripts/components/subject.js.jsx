var Subject = React.createClass({

  getInitialState: function(){
    $(document).disableSelection();
    return {
      height: this.props.data.location.height,
      width: this.props.data.location.width,
      left: this.props.data.location.left,
      top: this.props.data.location.top,
      name: this.props.data.name,
      clickX: 0,
      clickY: 0
    }
  },

  render: function() {
    var style = {
      width: this.state.width,
      height: this.state.height,
      marginLeft: this.state.left,
      marginTop: this.state.top
    };

    return (
      <div className = 'subject' style = {style} onMouseDown = {this.handleSize}>

        <h3 className = 'name'>{this.state.name}</h3>
      </div>
    );
  }
});
