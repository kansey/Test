var SubjectArea = React.createClass({

  getInitialState: function(){
    $(document).disableSelection();
    return {
      height: this.props.data.location.height,
      width: this.props.data.location.width,
      left: this.props.data.location.left,
      top: this.props.data.location.top,
      subjects: this.props.data.subjects,
      name: this.props.data.name,
      clickX: 0,
      clickY: 0
    }
  },

  handleTrigger: function(event){
    var _this = this;
    event.stopPropagation();
    $(event.target).css('z-index',3);
    switch($(event.target).attr('class')){
      case 'bottom':
        document.addEventListener('mousemove', this.onMouseUpdateBottom);
        break;
      case 'right':
        document.addEventListener('mousemove', this.onMouseUpdateRight);
        break;
      case 'both':
        document.addEventListener('mousemove', this.onMouseUpdateBoth);
        break;
    };
    $(document).on('mouseup', function(){
      _this.cursorPosition();
    });
  },

  onMouseUpdateBottom: function(event){
    this.setState({height: event.pageY - this.state.top});
  },

  onMouseUpdateRight: function(event){
    this.setState({width: event.pageX - this.state.left});
    console.log(this.state.left, this.state.width);
  },

  onMouseUpdateBoth: function(event){
    this.setState({width: event.pageX - this.state.left});
    this.setState({height: event.pageY - this.state.top});
  },

  cursorPosition: function(){
    document.removeEventListener('mousemove', this.onMouseUpdateRight);
    document.removeEventListener('mousemove', this.onMouseUpdateBottom);
    document.removeEventListener('mousemove', this.onMouseUpdateBoth);

    document.removeEventListener('mousemove', this.onMouseUpdateMove);
    $(document).unbind('mouseup');
  },

  handleSize: function(event){
    _this = this;

    this.state.clickX = event.pageX - this.state.left;
    this.state.clickY = event.pageY - this.state.top;

    document.addEventListener('mousemove', this.onMouseUpdateMove);
    $(document).on('mouseup', function(){
      _this.cursorPosition();
    });
  },

  onMouseUpdateMove: function(event){
    this.setState({top: event.pageY - this.state.clickY});
    this.setState({left: event.pageX - this.state.clickX});
  },

  render: function() {
    var someStuff = this.props.data.subjects.map(function(item){
      return (
        <Subject data = {item} />
      );
    });

    var style = {
      width: this.state.width,
      height: this.state.height,
      marginLeft: this.state.left,
      marginTop: this.state.top,
    };

    var styleForRightTrigger = {
      height: this.state.height,
      position: 'absolute',
      width: '3px',
      right: -1
    };

    var styleForBottomTrigger = {
      width: this.state.width,
      position: 'absolute',
      height: '3px',
      bottom: -1
    };

    return (
      <div className = 'subjectArea' style = {style} onMouseDown = {this.handleSize}>
        <div className = 'right' style = {styleForRightTrigger} onMouseDown = {this.handleTrigger}></div>
        <h1>{this.state.name}</h1><span className = 'nameDecor'></span>

        {someStuff}
        <div className = 'bottom' style = {styleForBottomTrigger} onMouseDown = {this.handleTrigger}></div>
        <div className = 'both' onMouseDown = {this.handleTrigger}></div>
      </div>
    );
  }
});
