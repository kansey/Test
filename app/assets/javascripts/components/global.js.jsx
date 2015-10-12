var Global = React.createClass({

  getInitialState: function(){
    return {data: this.props.data};
  },

  changer: function(name, fromTo){
    _this = this;
    for(var i = 0; i < this.state.data[fromTo.from].subjects.length; i++){
      if (_this.state.data[fromTo.from].subjects[i] === name){
        _this.state.data[fromTo.to].subjects.push(_this.state.data[fromTo.from].subjects[i]);
        _this.state.data[fromTo.from].subjects.splice(i,1);
      }
    }
  },

  render: function() {
    var someStuff = this.props.data.map(function(item){
      return (
        <SubjectArea data = {item} />
      );
    });

    return (
      <div>
        {someStuff}
      </div>
    );
  }
});
