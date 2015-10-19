var SubjectArea = React.createClass({

  getInitialState: function(){
    $(document).disableSelection();
    return {
      height:   this.props.data.height,
      width:    this.props.data.width,
      left:     this.props.data.left,
      top:      this.props.data.top,
      subjects: this.props.data.subjects,
      color:    this.props.data.color,
      name:     this.props.data.name,
      id:       this.props.data.id,
      expandChildIs: null,
      relocatable: true,
      resizable: true,
      minHeight: 500,//this.props.data.minHeight,
      minWidth: 300//this.props.data.minWidth
    }
  },

  mixins: [Edit],

  handleSubjectsHide: function(subject){
    (subject === null) ? this.setState({resizable: true}) : this.setState({resizable: false})
    this.setState({expandChildIs: subject});
  },

  updateMinSize: function(width, height){
    if (this.state.minWidth < width) this.setState({minWidth: width});
    if (this.state.minHeight < height) this.setState({minHeight: height});
  },

  addTask: function(){
    var subjects = this.state.subjects.concat([{
      width:  200,
      left:   0,
      top:    0,
      height: 80,
      id: 0,
      name:   '#noname#',
      tasks:  [],
      watch: '0:0:0:0',
      haveBeenWatching: 0
    }]);
    this.setState({subjects: subjects});
  },

  sendToServer: function(){
    console.log('call');
    $.ajax({
      url: 'https://guarded-ridge-7427.herokuapp.com/organizer/subject_area',
      dataType: 'json',
      type: 'POST',
      data: this.state
    });
  },

  render: function() {
    var _this = this;
    var someStuff = this.state.subjects.map(function(item, index){
      return (
        <Subject hide = {((_this.state.expandChildIs === null) ||
                          (index === _this.state.expandChildIs)) ? false : true}
                 sendSizeToParent = {_this.updateMinSize}
                 hideAnother = {_this.handleSubjectsHide}
                 resizable = {_this.props.resizable}
                 relocatable = {_this.props.edit}
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

    if (!this.state.resizable){
      rightSliderStyle.visibility = 'hidden';
      bottomSliderStyle.visibility = 'hidden';
      middleSliderStyle.visibility = 'hidden';
    }else{
      rightSliderStyle.visibility = 'visible';
      bottomSliderStyle.visibility = 'visible';
      middleSliderStyle.visibility = 'visible';
    }

    return (
      <div className = 'subjectArea' style = {style} onMouseDown = {this.state.relocatable ? this.handlePosition : ''}>
        <div className = 'rightSlider' style = {rightSliderStyle} onMouseDown = {this.handleWidth}></div>
        <h1>{this.state.name}</h1>
        {someStuff}
        <button onClick = {this.addTask} style = {{bottom: 0, position: 'absolute'}}>add</button>
        <div className = 'bottomSlider' style = {bottomSliderStyle} onMouseDown = {this.handleHeight}></div>
        <div className = 'middleSlider' style = {middleSliderStyle} onMouseDown = {this.handleSize}></div>
      </div>
    );
  }
});
