var SubjectArea = React.createClass({

  mixins: [Edit],

  getInitialState: function(){
    return {
      height:   this.props.data.state.height,
      width:    this.props.data.state.width,
      left:     this.props.data.state.left,
      top:      this.props.data.state.top,
      subjects: this.props.data.subjects,
      color:    this.props.data.state.color,
      name:     this.props.data.state.name,
      id:       this.props.data.id,
      expandChildIs: null,
      relocatable:   true,
      resizable:     true,
      minHeight:     this.props.data.state.minHeight,
      minWidth:      this.props.data.state.minWidth
    }
  },

  handleSubjectsHide: function(subject){
    (subject === null) ? this.setState({resizable: true}) : this.setState({resizable: false})
    this.setState({expandChildIs: subject});
  },

  updateMinSize: function(width, height){
    //if (this.state.minWidth < width) this.setState({minWidth: width});
    //if (this.state.minHeight < height) this.setState({minHeight: height});
  },

  addSubject: function(){
    event.stopPropagation();
    this.callNew();
  },

  sendToServer: function(){
    $.ajax({
      url: 'https://guarded-ridge-7427.herokuapp.com/organizer/subject_area',
      dataType: 'JSON',
      type: 'POST',
      data: this.prepData()
    });
  },

  rename: function(){
    var name = prompt("to change name", this.state.name);
    if (name.length === 0 || name === null) return;
    this.setState({name: name});
    this.sendToServer();
  },

  callNew: function(){
    var name = prompt("name", '#noname#');
    if (name.length === 0 || name === null) name = '#noname#';
    $.ajax({
      url: 'https://guarded-ridge-7427.herokuapp.com/organizer/subject/new',
      dataType: 'JSON',
      type: 'POST',
      data: {name: name, id: this.state.id},
      success: function(data) {
        this.setState({subjects: this.state.subjects.concat([data])});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  prepData: function(){
    return {
      id: this.state.id,
      state: {
        height: this.state.height,
        width: this.state.width,
        left: this.state.left,
        top: this.state.top,
        color: this.state.color,
        name: this.state.name,
        minHeight: this.state.minHeight,
        minWidth: this.state.minWidth
      }
    }
  },

  deleteChild: function(childId){
    this.setState({
      subjects: this.state.subjects.filter(function(value){
        return value.id !== childId
      })
    })
  },

  delete: function(){
    $.ajax({
      url: 'https://guarded-ridge-7427.herokuapp.com/organizer/subject_area',
      type: 'DELETE',
      data: {id: this.state.id},
      success: function(data) {
        this.props.delete(this.state.id);
      }.bind(this)
    });
  },

  render: function() {
    var _this = this;
    var someStuff = this.state.subjects.map(function(item, index){
      return (
        <Subject hide = {((_this.state.expandChildIs === null) ||
                          (item.id === _this.state.expandChildIs)) ? false : true}
                 sendSizeToParent = {_this.updateMinSize}
                 hideAnother = {_this.handleSubjectsHide}
                 resizable = {_this.props.resizable}
                 relocatable = {_this.props.edit}
                 parent = {_this.state}
                 delete = {_this.deleteChild}
                 data = {item}
                 key = {item.id} />
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
        <h1 onDoubleClick = {this.rename} >{this.state.name}</h1>
        {someStuff}
        <div className = 'delete' onClick = {this.delete}></div>
        <div className = 'addSubject' onClick = {this.addSubject}></div>
        <div className = 'bottomSlider' style = {bottomSliderStyle} onMouseDown = {this.handleHeight}></div>
        <div className = 'middleSlider' style = {middleSliderStyle} onMouseDown = {this.handleSize}></div>
      </div>
    );
  }
});
