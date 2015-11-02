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
      trigger: "0.15430382",
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

  tracker: function(){
    date = new Date();
    dt = date - this.benchmark + this.state.haveBeenWatching;
    s = Math.floor(dt / 1000);
    m = Math.floor(s / 60);
    h = Math.floor(m / 60);
    //d = Math.floor(h / 24);
    //h = h - d * 24;
    m = m - h * 60;
    s = s - m * 60;
    this.haveBeenWatching = dt;
    if (h < 10) {hTitle = '0' + h + ' : '} else {hTitle = h + ' :'}
    if (m < 10) {mTitle = '0' + m + 'm : '} else {mTitle = m + 'm :'};
    if (s < 10) {sTitle = '0' + s + 's'} else {sTitle = s + 's'};
    this.setState({watch: hTitle + mTitle + sTitle});
  },

  watching: function(event){
    this.benchmark = new Date();
    this.setState({watching: true, trigger: '70.0'});
    this.timeOut = setInterval(this.tracker,1000);
  },

  stopWatching: function(){

    this.state.haveBeenWatching = this.haveBeenWatching;
    this.setState({watching: false, trigger: '0.10'});
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

    var triggerStyle = {fillOpacity:1,stroke:'#000000',strokeWidth:0.88474831,strokeMiterlimit:4,
                 strokeDasharray:'none',strokeOpacity:1}

    if (!this.state.watching) {triggerStyle.fill = '#d5d4d3'} else {triggerStyle.fill = 'rgb(' + this.state.color + ')'}

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
      tasksBoxStyle.height = this.state.height - 90;
      tasksBoxStyle.marginTop = 35;
      tasksBoxStyle.backgroundColor = '#ffffff';
      tasksBoxStyle.borderTop = '1px solid black';
      tasksBoxStyle.borderBottom = '1px solid black';
      tasksBoxStyle.overflow = 'hidden';
      tasksBoxStyle.overflowY = 'auto';
      expandStyle.backgroundImage = 'url("../assets/expandoff.png")'
    };

    var titleStyle = {
      backgroundColor: 'rgb(' + this.state.color + ')'
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
        <div className = 'start'>

          <svg onClick = {this.state.watching ? this.stopWatching : this.watching}
            width="70" height="25" viewBox="0 0 122 52">
            <g transform="translate(0,-1000.3622)">
            <rect style={triggerStyle}
                 width="119.81525"
                 height="49.81525"
                 x="0.092374153"
                 y="1002.4546"
                 ry="24.907625"/>
              <rect
                 style={{opacity:1,fill:'#ffffff',fillOpacity:1,stroke:'#000000',strokeWidth:0.80860764,strokeLinecap:'round',
                         strokeLinejoin:'round',strokeMiterlimit:4,strokeDasharray:'none',strokeOpacity:1}}
                 width="49.691391"
                 height="49.691391"
                 x={this.state.trigger}
                 y="1002.5165"
                 ry="24.845695"/>
            </g>
          </svg>

        </div>
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
