var SubjectArea = React.createClass({

  getInitialState: function(){
    $(document).disableSelection();
    return {
      height: this.props.data.location.height,
      width: this.props.data.location.width,
      left: this.props.data.location.left,
      top: this.props.data.location.top,
      subjects: this.props.data.subjects,
      name: this.props.data.name
    }
  },

  mixins: [Edit],

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
      marginTop: this.state.top
      //overflowY: 'auto',
      //overflowX: 'hidden'
    };

    var rightRunner = {
      height: this.state.height,
      position: 'absolute',
      width: 3,
      right: -1,
      cursor: 'ew-resize'
    };

    var bottomRunner = {
      width: this.state.width,
      position: 'absolute',
      height: 3,
      bottom: -1,
      cursor: 'ns-resize'
    };

    var bothRunners = {
      position: 'absolute',
      height: 5,
      width: 5,
      bottom: 0,
      right: 0,
      cursor: 'nwse-resize'
    };

    return (
      <div className = 'subjectArea' style = {style} onMouseDown = {this.handlePosition}>
        <div className = 'right' style = {rightRunner} onMouseDown = {this.handleWidth}></div>
        <h1>{this.state.name}</h1>
        {someStuff}
        <div className = 'bottom' style = {bottomRunner} onMouseDown = {this.handleHeight}></div>
        <div className = 'both' style = {bothRunners} onMouseDown = {this.handleSize}></div>
      </div>
    );
  }
});
