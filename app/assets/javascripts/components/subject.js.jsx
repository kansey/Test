var Subject = React.createClass({

  mixins: [Edit],

  getInitialState: function(){
    return {
      height: this.props.data.state.height,
      width:  this.props.data.state.width,
      left:   this.props.data.state.left,
      top:    this.props.data.state.top,
      color:  this.props.parent.color,
      name:   this.props.data.state.name,
      watch:  this.props.data.state.watch,
      id:     this.props.data.id,
      tasks:  this.props.data.tasks,
      benchmark: '',
      resizable: false,
      relocatable: false,
      minHeight: 80,
      minWidth: 195,
      spread: false,
      watching: false,
      haveBeenWatching: this.props.data.state.haveBeenWatching
    }
  },

  sendToServer: function(){
    $.ajax({
      url: '/organizer/subject',
      dataType: 'JSON',
      type: 'POST',
      data: this.prepData()
    });
  },

  delete: function(){
    $.ajax({
      url: '/organizer/subject',
      type: 'DELETE',
      data: {id: this.state.id},
      success: function() {
        this.props.delete(this.state.id);
      }.bind(this)
    });
    this.turn();
  },

  callNew: function(){
    var title = prompt("title", 'title');
    if (title.length === 0 || title === null) return;
    $.ajax({
      url: '/organizer/task/new',
      dataType: 'JSON',
      type: 'POST',
      data: {title: title, id: this.state.id},
      success: function(data) {
        this.setState({tasks: this.state.tasks.concat([data])});
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
        name: this.state.name,
        watch: this.state.watch,
        haveBeenWatching: this.state.haveBeenWatching
      }
    }
  },

  editToggle: function(){
    this.setState({relocatable: !this.state.relocatable, resizable: !this.state.resizable});
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
      spread: true,
      resizable: false,
      relocatable: false
    });
    this.props.hideAnother(this.state.id);
  },

  rename: function(){
    var name = prompt("to change name", this.state.name);
    if (name.length === 0 || name === null) return;
    this.setState({name: name});
    this.sendToServer();
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
      _this.setState({watch: h+'h : '+m+'m : '+s+'s'});
    },500);
  },

  stopWatching: function(){
    this.setState({haveBeenWatching: this.haveBeenWatching});
    this.setState({watching: false});
    clearInterval(this.timeOut);
    this.sendToServer();
  },

  render: function() {

    if (this.props.hide) return(<div />);

    var someStuff = this.state.tasks.map(function(item, index){
      return (
        <Task key = {index} data = {item} />
      );
    });

    var style = {
      width:      this.state.width,
      height:     this.state.height,
      marginLeft: this.state.left,
      marginTop:  this.state.top
    };

    var tasksBoxStyle = {
      width: 'auto',
      position: 'static',
      marginBottom: 5
    }

    var expandStyle = {
      width: '20px',
      height: '20px',
      float: 'right',
      backgroundImage: 'url("../assets/expand.png")',
      backgroundSize: '15px 15px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      borderRadius: '3px'
    }

    if (this.state.spread) {
      tasksBoxStyle.height = this.state.height - 75;
      tasksBoxStyle.borderTop = '1px solid black';
      tasksBoxStyle.borderBottom = '1px solid black';
      tasksBoxStyle.overflow = 'hidden';
      tasksBoxStyle.overflowY = 'auto';
      expandStyle.backgroundImage = 'url("../assets/expandoff.png")'
    };

    var titleStyle = {
      backgroundColor: 'rgb(' + this.state.color + ')'
    };

    var watchStyle = {
      //fontSize: this.state.width/7 + this.state.height/8 + 'px'
    }

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
      //display
      rightSliderStyle.visibility = 'hidden';
      bottomSliderStyle.visibility = 'hidden';
      middleSliderStyle.visibility = 'hidden';
    }else{
      rightSliderStyle.visibility = 'visible';
      bottomSliderStyle.visibility = 'visible';
      middleSliderStyle.visibility = 'visible';
    }

    var edit = <div className = 'edit' onClick = {this.editToggle}></div>
    var addTask = <div className = 'addTask' onClick = {this.callNew}></div>

    return (
      <div className = 'subject' style = {style} onMouseDown = {this.state.relocatable ? this.handlePosition : ''}>
        <div className = 'rightSlider' style = {rightSliderStyle} onMouseDown = {this.handleWidth}></div>
        <h3 style = {titleStyle} onDoubleClick = {this.rename}>
          <div className = 'titleDecor' style = {titleStyle}></div>
          {this.state.name}
        </h3>
        <div className = 'delete' onClick = {this.delete}></div>
        <div className = 'expand' style = {expandStyle} onClick = {(this.state.spread) ? this.turn : this.expand}></div>
        {(!this.state.spread) ? {edit} : null}
        {(this.state.spread) ? {addTask} : null}
        <div className = 'start' onClick = {this.state.watching ? this.stopWatching : this.watching}></div>
        <div className = 'watch'>
          {this.state.watch}
        </div>
        <div className = 'tasksBox' style = {tasksBoxStyle}>
          {this.state.spread ? someStuff : null}
        </div>
        <div className = 'infoLine'>tasks: {this.state.tasks.length}</div>
        <div className = 'bottomSlider' style = {bottomSliderStyle} onMouseDown = {this.handleHeight}></div>
        <div className = 'middleSlider' style = {middleSliderStyle} onMouseDown = {this.handleSize}></div>
      </div>
    );
  }
});
