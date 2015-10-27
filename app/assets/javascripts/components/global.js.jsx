var Global = React.createClass({

  getInitialState: function(){
    return {
      subjectAreas: this.props.data
    }
  },

  addSubjectArea: function(){
    event.stopPropagation();
    this.callNew();
  },

  callNew: function(){
    $.ajax({
      url: 'http://localhost:8080/organizer/subject_area/new',
      dataType: 'JSON',
      type: 'POST',
      data: {name: '#noname#'},
      success: function(data){
        this.setState({subjectAreas: this.state.subjectAreas.concat([data])});
      }.bind(this)
    });
  },

  deleteChild: function(childId){
    this.setState({
      subjectAreas: this.state.subjectAreas.filter(function(value){
        return value.id !== childId
      })
    })
  },

  render: function() {
    var _this = this;
    var someStuff = this.state.subjectAreas.map(function(item,index){
      return (
        <SubjectArea delete = {_this.deleteChild}
                     key = {item.id}
                     data = {item}/>
      );
    });

    return (
      <div>
        <div className = 'addArea' onClick = {this.addSubjectArea}></div>
        <div style = {{float: 'left', marginLeft: 25, borderBottom: '2px solid black'}}
          onClick = {this.addSubjectArea}>add subject area</div>
        {someStuff}
      </div>
    );
  }
});
