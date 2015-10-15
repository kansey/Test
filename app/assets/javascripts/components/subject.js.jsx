var Subject = React.createClass({

  mixins: [Edit],
  locationBackUp: {width: 0, height: 0, left: 0, top: 0},

  getInitialState: function(){
    $(document).disableSelection();
    return {
      height: this.props.data.location.height,
      width: this.props.data.location.width,
      left: this.props.data.location.left,
      top: this.props.data.location.top,
      minHeight: 80,
      minWidth: 195,
      name: this.props.data.name,
      spread: false,
      color: this.props.parent.color
    }
  },

  expand: function(){
    this.locationBackUp.width = this.state.width;
    this.locationBackUp.height = this.state.height;
    this.locationBackUp.left = this.state.left;
    this.locationBackUp.top = this.state.top;
    this.setState({
      width: this.props.parent.width,
      height: this.props.parent.height,
      top: 0,
      left: 0,
      spread: true
    });
    this.props.hideAnother(this.props.id);
  },

  turn: function(){
    this.setState({
      width: this.locationBackUp.width,
      height: this.locationBackUp.height,
      top: this.locationBackUp.top,
      left: this.locationBackUp.left,
      spread: false
    });
    this.props.hideAnother(null);
  },

  render: function() {

    if (this.props.hide) return(<div></div>);

    var style = {
      width: this.state.width,
      height: this.state.height,
      marginLeft: this.state.left,
      marginTop: this.state.top
    };

    var title = {
      backgroundColor: 'rgb(' + this.state.color + ')'
    };

    var rightRunner = {
      height: this.state.height,
      cursor: 'ew-resize',
      position: 'absolute',
      width: 3,
      right: -1
    };

    var bottomRunner = {
      width: this.state.width,
      cursor: 'ns-resize',
      position: 'absolute',
      height: 3,
      bottom: -1
    };

    var inTheCornerRunner = {
      cursor: 'nwse-resize',
      position: 'absolute',
      bottom: 0,
      right: 0
    };


    return (
      <div className = 'subject' style = {style} onMouseDown = {this.props.edit ? this.handlePosition : ''}>
        <div className = 'rightRunner' style = {this.props.edit ? rightRunner : {}} onMouseDown = {this.props.edit ? this.handleWidth : ''}></div>
        <h3 style = {title} className = 'name'>{this.state.name}</h3>
        <div className = 'expand'  onClick = {(this.state.spread) ? this.turn : this.expand}></div>
        <div className = 'bottomRunner' style = {this.props.edit ? bottomRunner : {}} onMouseDown = {this.props.edit ? this.handleHeight : ''}></div>
        <div className = 'inTheCornerRunner' style = {this.props.edit ? inTheCornerRunner : {}} onMouseDown = {this.props.edit ? this.handleSize : ''}></div>
    </div>
    );
  }
});
