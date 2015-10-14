var Global = React.createClass({

  getInitialState: function(){
    return {edit: false};
  },

  editToggle: function(){
    this.setState({edit: !this.state.edit});
  },

  render: function() {
    var _this = this;
    var someStuff = this.props.data.map(function(item){
      return (
        <SubjectArea data = {item} edit = {_this.state.edit}/>
      );
    });

    return (
      <div>
        <button onClick = {this.editToggle}>edit</button>
        {someStuff}
      </div>
    );
  }
});
