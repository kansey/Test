var SubjectArea = React.createClass({

  getInitialState: function(){
    $(document).disableSelection();
    return {
      height:   this.props.data.location.height,
      width:    this.props.data.location.width,
      left:     this.props.data.location.left,
      top:      this.props.data.location.top,
      subjects: this.props.data.subjects,
      color:    this.props.data.color,
      name:     this.props.data.name,
      expandChildIs: null,
      minHeight: 150,
      minWidth: 200,
      edit: true
    }
  },

  mixins: [Edit],

  handleSubjectsHide: function(subject){
    this.setState({expandChildIs: subject});
  },

  updateMinSize: function(width, height){
    if (this.state.minWidth < width) this.setState({minWidth: width});
    if (this.state.minHeight < height) this.setState({minHeight: height});
  },

  render: function() {
    var _this = this;
    var someStuff = this.props.data.subjects.map(function(item, index){
      return (
        <Subject hide = {((_this.state.expandChildIs === null) ||
                          (index === _this.state.expandChildIs)) ? false : true}
                 sendSizeToParent = {_this.updateMinSize}
                 hideAnother = {_this.handleSubjectsHide}
                 edit = {_this.props.edit}
                 parent = {_this.state}
                 data = {item}
                 key = {index}
                 id = {index} />
      );
    });

    var style = {
      width:      this.state.width,
      height:     this.state.height,
      marginLeft: this.state.left,
      marginTop:  this.state.top,
      backgroundColor: 'rgba(' + this.state.color + ',' + 0.4 + ')'
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
      rightSliderStyle.visibility = 'hidden';
      bottomSliderStyle.visibility = 'hidden';
      middleSliderStyle.visibility = 'hidden';
    }else{
      rightSliderStyle.visibility = 'visible';
      bottomSliderStyle.visibility = 'visible';
      middleSliderStyle.visibility = 'visible';
    }

    return (
      <div className = 'subjectArea' style = {style} onMouseDown = {this.state.edit ? this.handlePosition : ''}>
        <div className = 'rightSlider' style = {rightSliderStyle} onMouseDown = {this.handleWidth}></div>
        <h1>{this.state.name}</h1>
        {someStuff}
        <div className = 'bottomSlider' style = {bottomSliderStyle} onMouseDown = {this.handleHeight}></div>
        <div className = 'middleSlider' style = {middleSliderStyle} onMouseDown = {this.handleSize}></div>
      </div>
    );
  }
});
