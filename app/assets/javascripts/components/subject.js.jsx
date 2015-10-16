var Subject = React.createClass({

  mixins: [Edit],

  getInitialState: function(){
    $(document).disableSelection();
    return {
      width:  this.props.data.location.width,
      left:   this.props.data.location.left,
      top:    this.props.data.location.top,
      height: this.props.data.location.height,
      color:  this.props.parent.color,
      name:   this.props.data.name,
      benchmark: '',
      minHeight: 80,
      minWidth: 195,
      spread: false,
      watch: '0:0:0:0',
      watching: false,
      haveBeenWatching: 0
    }
  },

  editToggle: function(){
    this.setState({edit: !this.state.edit});
  },

  expand: function(){
    this.locationBackUp = {};
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

  watching: function(){
    var benchmark = new Date();
    var _this = this;
    this.setState({watching: true});
    this.timeOut = setInterval(function(){
      date = new Date();
      dt = date - benchmark + _this.state.haveBeenWatching;
      s = Math.floor(dt / 1000);
      m = Math.floor(s / 60);
      h = Math.floor(m / 60);
      d = Math.floor(h / 24);
      h = h - d * 24;
      m = m - h * 60;
      s = s - m * 60;
      _this.haveBeenWatching = dt;
      _this.setState({watch: d+':'+h+':'+m+':'+s});
    },500);
  },

  stopWatching: function(){
    this.setState({haveBeenWatching: this.haveBeenWatching});
    this.setState({watching: false});
    clearInterval(this.timeOut);
  },

  render: function() {

    if (this.props.hide) return(<div />);

    var someStuff = this.props.data.tasks.map(function(item, index){
      return (
        <Task key = {index} title = {item.title} />
      );
    });

    var style = {
      width:      this.state.width,
      height:     this.state.height,
      marginLeft: this.state.left,
      marginTop:  this.state.top
    };

    var titleStyle = {
      backgroundColor: 'rgb(' + this.state.color + ')'
    };

    var rightSliderStyle = {
      height: this.state.height,
      width: 3,
      right: -1,
      visibility: 'visible'
    };

    var bottomSliderStyle = {
      width: this.state.width,
      height: 3,
      bottom: -1,
      visibility: 'visible'
    };

    var middleSliderStyle = {
      visibility: 'visible'
    };

    if (!this.state.edit){
      //display
      rightSliderStyle.visibility = 'hidden';
      bottomSliderStyle.visibility = 'hidden';
      middleSliderStyle.visibility = 'hidden';
    }else{
      rightSliderStyle.visibility = 'visible';
      bottomSliderStyle.visibility = 'visible';
      middleSliderStyle.visibility = 'visible';
    }

    return (
      <div className = 'subject' style = {style} onMouseDown = {this.state.edit ? this.handlePosition : ''}>
        <div className = 'rightSlider' style = {rightSliderStyle} onMouseDown = {this.handleWidth}></div>
        <h3 style = {titleStyle}>{this.state.name}</h3>
        <div className = 'expand'  onClick = {(this.state.spread) ? this.turn : this.expand}></div>
        <div className = 'edit'  onClick = {(!this.state.spread) ? this.editToggle : null}></div>
        <div className = 'start' onClick = {this.state.watching ? this.stopWatching : this.watching}></div>
        <div className = 'watch'>{this.state.watch}</div>
        {this.state.spread ? someStuff : null}
        <div className = 'bottomSlider' style = {bottomSliderStyle} onMouseDown = {this.handleHeight}></div>
        <div className = 'middleSlider' style = {middleSliderStyle} onMouseDown = {this.handleSize}></div>
      </div>
    );
  }
});
