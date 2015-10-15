var SubjectArea = React.createClass({

  getInitialState: function(){
    $(document).disableSelection();
    return {
      height: this.props.data.location.height,
      width: this.props.data.location.width,
      left: this.props.data.location.left,
      top: this.props.data.location.top,
      minHeight: 150,
      minWidth: 200,
      subjects: this.props.data.subjects,
      name: this.props.data.name,
      color: this.props.data.color,
      expandClindIs: null
    }
  },

  mixins: [Edit],

  handleChildHide: function(obj){
    this.setState({expandClindIs: obj});
  },

  updateMinSize: function(width, height){
    if (this.state.minWidth < width) this.setState({minWidth: width});
    if (this.state.minWidth < width) this.setState({minHeight: heigh});
  },

  render: function() {
    var _this = this;
    var someStuff = this.props.data.subjects.map(function(item, index){
      return (
        <Subject data = {item}
                 edit = {_this.props.edit}
                 parent = {_this.state}
                 id = {index}
                 hide = {((_this.state.expandClindIs === null) || (index === _this.state.expandClindIs)) ? false : true}
                 hideAnother = {_this.handleChildHide}
                 sendSizeToParent = {_this.updateMinSize}/>
      );
    });

    var style = {
      width: this.state.width,
      height: this.state.height,
      marginLeft: this.state.left,
      marginTop: this.state.top,
      backgroundColor: 'rgba(' + this.state.color + ',' + 0.4 + ')'
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
      <div className = 'subjectArea' style = {style} onMouseDown = {this.props.edit ? this.handlePosition : ''}>
        <div className = 'rightRunner' style = {this.props.edit ? rightRunner : {}} onMouseDown = {this.props.edit ? this.handleWidth : ''}></div>
        <h1>{this.state.name}</h1>
        {someStuff}
        <div className = 'bottomRunner' style = {this.props.edit ? bottomRunner : {}} onMouseDown = {this.props.edit ? this.handleHeight : ''}></div>
        <div className = 'inTheCornerRunner' style = {this.props.edit ? inTheCornerRunner : {}} onMouseDown = {this.props.edit ? this.handleSize : ''}></div>
      </div>
    );
  }
});
