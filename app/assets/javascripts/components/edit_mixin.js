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
    this.relocatePositionY(event);
    this.relocatePositionX(event);
  },

  relocatePositionY: function(event){
    if (this.props.parent){
      if (event.pageY - this.click.y < 0)
         return this.setState({top: 0});
      if ((event.pageY - this.click.y + this.state.height) > this.props.parent.height)
         return this.setState({top: this.props.parent.height - this.state.height});
    }
    return this.setState({top:  event.pageY - this.click.y});
  },

  relocatePositionX: function(event){
    if (this.props.parent){
      if (event.pageX - this.click.x < 0)
         return this.setState({left: 0});
      if ((event.pageX - this.click.x + this.state.width) > this.props.parent.width)
         return this.setState({left: this.props.parent.width - this.state.width});
    }
    return this.setState({left: event.pageX - this.click.x});
  },

  changeWidth: function(event){
    if (this.props.parent)
    return this.setState({width: event.pageX - this.state.left - this.props.parent.left});
    return this.setState({width: event.pageX - this.state.left});
  },

  changeHeight: function(event){
    if (this.props.parent)
    return this.setState({height: event.pageY - this.state.top - this.props.parent.top});
    return this.setState({height: event.pageY - this.state.top});
  },

  changeSize: function(event){
    this.changeWidth(event);
    this.changeHeight(event);
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
