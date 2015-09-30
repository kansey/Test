var Global = React.createClass({
/*
  getInitialState: function(){
    return {subjectAreas: [], sub: this.props.data};
  },

  handleSettings: function() {

    _this = this;

    $('.subjectArea').draggable({
      create: function(event,ui) {
        _this.getSubjectAreaObjects(event);
      },
      drag:  function(event,ui){},
      stop: function(event,ui){
        _this.getSubjectAreaObjects(event);
      },
    }).css('position','absolute');

    $('.subject').draggable({
      start: function(event,ui){},
      drag:  function(event,ui){
        _this.getLocation(event);
      },
      stop:  function(event,ui){
        $('.subjectArea').css('box-shadow','none');
      }
    }).css('position','absolute');

    $('.subjectArea').resizable({
      create: function(event,ui) {
        _this.getSubjectAreaObjects(event);
      },
      stop: function(event,ui){
        _this.getSubjectAreaObjects(event);
      },
    });

    $('.subject').resizable();
  },

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
        <button onClick = {this.handleTest}>edit</button>
      </div>
    );
  }
});
