var SubjectArea = React.createClass({

  getInitialState: function(){
    $(document).disableSelection();
    return {
      name: this.props.data.name,
      location: this.props.data.location,
      subjects: this.props.data.subjects
    }
  },

  handleTrigger: function(event){
    var _this = this;
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
    this.setState({
      location: {
        width: this.state.location.left,
        height: event.pageY - this.state.location.top,
        top: this.state.location.top,
        left: this.state.location.left,
      }
    });
  },

  onMouseUpdateBoth: function(event){
    this.setState({
      location: {
        width: event.pageX - this.state.location.left,
        height: event.pageY - this.state.location.top,
        top: this.state.location.top,
        left: this.state.location.left,
      }
    });
  },

  onMouseUpdateRight: function(event){
    console.log(this.state.location.width);
    this.setState({
      location: {
        width: event.pageX - this.state.location.left,
        height: this.state.location.height,
        top: this.state.location.top,
        left: this.state.location.left,
      }
    });
  },

  cursorPosition: function(){
    document.removeEventListener('mousemove', this.onMouseUpdateRight);
    document.removeEventListener('mousemove', this.onMouseUpdateBottom);
    document.removeEventListener('mousemove', this.onMouseUpdateBoth);
    $(document).unbind('mouseup');
  },

  render: function() {
    var someStuff = this.props.data.subjects.map(function(item){
      return (
        <Subject data = {item} />
      );
    });

    var style = {
      width: this.state.location.width,
      height: this.state.location.height,
      marginLeft: this.state.location.left,
      marginTop: this.state.location.top,
    };

    var styleForRightTrigger = {
      height: this.state.location.height,
      position: 'absolute',
      width: '3px',
      right: 0
    };

    var styleForBottomTrigger = {
      width: this.state.location.width,
      position: 'absolute',
      height: '3px',
      bottom: 0
    };

    return (
      <div className = 'subjectArea' style = {style}>
        <div className = 'right' style = {styleForRightTrigger} onMouseDown = {this.handleTrigger}></div>
        <h1 className = 'name'>{this.state.name}</h1>
        {someStuff}
        <div className = 'bottom' style = {styleForBottomTrigger} onMouseDown = {this.handleTrigger}></div>
        <div className = 'both' onMouseDown = {this.handleTrigger}></div>
      </div>
    );
  }
});
