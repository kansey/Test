var Global = React.createClass({

  render: function() {
    var _this = this;
    var someStuff = this.props.data.map(function(item,index){
      
      return (
        <SubjectArea key = {index} data = {item}/>
      );
    });

    return (
      <div>
        {someStuff}
      </div>
    );
  }
});
