var Edit = {

  click: {x: 0, y: 0},

  handlePosition: function(event){
    event.stopPropagation();
    this.click.x = event.pageX - this.state.left;
    this.click.y = event.pageY - this.state.top;
    document.addEventListener('mousemove', this.relocatePosition, false);
    this.bindCancelListeners();
  },

  handleHeight: function(event){
    event.stopPropagation();
    document.addEventListener('mousemove', this.changeHeight, false);
    this.bindCancelListeners();
  },

  handleWidth: function(event){
    event.stopPropagation();
    document.addEventListener('mousemove', this.changeWidth, false);
    this.bindCancelListeners();
  },

  handleSize: function(event){
    event.stopPropagation();
    document.addEventListener('mousemove', this.changeSize, false);
    this.bindCancelListeners();
  },

  relocatePosition: function(event){
    this.setState({top:  event.pageY - this.click.y});
    this.setState({left: event.pageX - this.click.x});
  },

  changeWidth: function(event){
    if (this.props.parent){
      this.setState({width: event.pageX - this.state.left - this.props.parent.left});
    }else{
      this.setState({width: event.pageX - this.state.left});
    }
  },

  changeHeight: function(event){
    if (this.props.parent){
      this.setState({height: event.pageY - this.state.top - this.props.parent.top});
    }else{
      this.setState({height: event.pageY - this.state.top});
    }
  },

  changeSize: function(event){
    if (this.props.parent){
      this.setState({width: event.pageX - this.state.left - this.props.parent.left});
      this.setState({height: event.pageY - this.state.top - this.props.parent.top});
    }else{
      this.setState({height: event.pageY - this.state.top});
      this.setState({width: event.pageX - this.state.left});
    }
  },

  bindCancelListeners: function(){
    _this = this;
    $(document).on('mouseup', function(){
      document.removeEventListener('mousemove', _this.relocatePosition, false);
      document.removeEventListener('mousemove', _this.changeHeight, false);
      document.removeEventListener('mousemove', _this.changeWidth, false);
      document.removeEventListener('mousemove', _this.changeSize, false);
    });
  }
}
