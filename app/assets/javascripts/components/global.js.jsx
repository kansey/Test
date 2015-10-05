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
/*
  getSubjectAreaObjects: function(obj) {
    var _this = this;

    if (_this.state.subjectAreas.length === 0){
      _this.state.subjectAreas.push(obj);
    }else{
      for(var i = 0; i < _this.state.subjectAreas.length; i++){
        if (_this.state.subjectAreas[i].target.dataset.reactid === obj.target.dataset.reactid){
          _this.setState(_this.state.subjectAreas[i] = obj);
          return;
        }
      }
      _this.state.subjectAreas.push(obj);
    }
  },

  getLocation: function(obj){
    var _this = this;

    if ((obj.target.offsetTop + obj.target.parentElement.offsetTop + obj.target.offsetHeight < obj.target.parentElement.offsetTop) ||
        (obj.target.offsetLeft + obj.target.parentElement.offsetLeft + obj.target.offsetWidth < obj.target.parentElement.offsetLeft) ||
        (obj.target.offsetLeft + obj.target.parentElement.offsetLeft > obj.target.parentElement.offsetLeft + obj.target.parentElement.offsetWidth) ||
        (obj.target.offsetTop + obj.target.parentElement.offsetTop > obj.target.parentElement.offsetTop + obj.target.parentElement.offsetHeight)){
      $(obj.target.parentElement).css('box-shadow','none');
    }else{
      $(obj.target.parentElement).css('box-shadow','0px 3px 49px 5px rgba(255,255,255,1)');
    }
  },
*/

  handleTest: function(){

  },

  render: function() {
    var someStuff = this.props.data.map(function(item){
      console.log(item);
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
