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
      url: 'https://guarded-ridge-7427.herokuapp.com/organizer/subject_area/new',
      dataType: 'JSON',
      type: 'POST',
      data: {name: '#noname#'},
      success: function(data){
        console.log(data);
        console.log(this.state.subjectAreas);
        this.setState({subjectAreas: this.state.subjectAreas.concat([data])});
      }.bind(this)
    });
  },

  render: function() {
    var _this = this;
    var someStuff = this.state.subjectAreas.map(function(item,index){
      return (
        <SubjectArea key = {index} data = {item}/>
      );
    });

    return (
      <div>
        <div className = 'addArea' onClick = {this.addSubjectArea}></div>
        {someStuff}
      </div>
    );
  }
});
