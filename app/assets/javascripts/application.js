// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var tetrisWave = (function() {
  var board = [];
  var row = [];
  var prvFocus;
  var score;

  function cleanAllData($obj){
    board = [];
    $obj.empty();
    row = [];
    prvFocus = undefined;
    score = 0;
  }

  function getNewBoard(size,$obj){
    score = 0;
    modelNewBoard(size);
    draw(board);
  }

  function modelNewBoard(size){
    var check;
    var total;

    for(var i = 0; i < size[0]; i++){
      board.push([]);
      for(var j = 0; j < size[1]; j++){
        board[i][j] = new Object();
        board[i][j].countSame = 1;
        board[i][j].setSame = [];
        board[i][j].position = [i,j];

        check = false;
        while(check === false){
          check = true;
          board[i][j].value = Math.floor(Math.random() * 4);
          total = 0;

          if (board[i+1]) {totalCell(board[i+1][j])}
          if (board[i-1]) {totalCell(board[i-1][j])}
          if (board[i][j+1]) {totalCell(board[i][j+1])}
          if (board[i][j-1]) {totalCell(board[i][j-1])}

          if (total + board[i][j].countSame > 3){check = false};

          if (board[i+1]) {multiplicityDepend(i+1,j)}
          if (board[i][j-1]) {multiplicityDepend(i,j-1)}
          if (board[i][j+1]) {multiplicityDepend(i,j+1)}
          if (board[i-1]) {multiplicityDepend(i-1,j)}

          for(var a = 0; a < board[i][j].setSame.length; a++){
            board[board[i][j].setSame[a][0]][board[i][j].setSame[a][1]].setSame.push([i,j]);
            board[board[i][j].setSame[a][0]][board[i][j].setSame[a][1]].countSame = board[i][j].setSame.length + 1;
          }
          board[i][j].countSame = board[i][j].setSame.length + 1;

          function totalCell(cell){
            if (cell.value === board[i][j].value){
              total += cell.countSame;
            }
          }

          function multiplicityDepend(_i, _j){
            if (board[_i][_j].value===board[i][j].value && check === true){
              board[i][j].setSame = board[i][j].setSame.concat(board[_i][_j].setSame);
              board[i][j].setSame.push([_i,_j]);
            }
          }
        }
      }
    }
  }

  function nextTurn(focus){
    if (prvFocus != undefined){
      var id1,id2,tmp,a,b;
      id1 = prvFocus.attr('id').split('_');
      id2 = focus.attr('id').split('_');

      id1[0] = parseInt(id1[0]);
      id1[1] = parseInt(id1[1]);
      id2[0] = parseInt(id2[0]);
      id2[1] = parseInt(id2[1]);
      if (id1[0] === id2[0] + 1 ||
          id1[0] === id2[0] - 1 ||
          id1[1] === id2[1] + 1 ||
          id1[1] === id2[1] - 1) {
        tmp = board[id1[0]][id1[1]].value;
        board[id1[0]][id1[1]].value = board[id2[0]][id2[1]].value;
        board[id2[0]][id2[1]].value = tmp;

        a = swapWawe(id1);
        b = swapWawe(id2);

        if (!(a || b)){
          tmp = board[id1[0]][id1[1]].value;
          board[id1[0]][id1[1]].value = board[id2[0]][id2[1]].value;
          board[id2[0]][id2[1]].value = tmp;
        }

      }
      $('.board').empty();
      draw(board);
      prvFocus = undefined;
    }else{
      prvFocus = focus;
    }
  }

  function swapWawe(cellFocus){
    row = [];
    findSame(cellFocus);
    if (row.length > 3){
      for(var i = 0; i < row.length; i++){
        board[row[i].position[0]][row[i].position[1]].value = undefined;
      }
      goDownCells();
      return true;
    }
    return false;
  }

  function findSame(cellFocus, backTrack) {
    row.push(board[cellFocus[0]][cellFocus[1]]);

    if (board[cellFocus[0]+1] && row.indexOf(board[cellFocus[0]+1][cellFocus[1]]) === -1) {compare(board[cellFocus[0]+1][cellFocus[1]])};
    if (board[cellFocus[0]][cellFocus[1]-1] && row.indexOf(board[cellFocus[0]][cellFocus[1]-1]) === -1) {compare(board[cellFocus[0]][cellFocus[1]-1])};
    if (board[cellFocus[0]][cellFocus[1]+1] && row.indexOf(board[cellFocus[0]][cellFocus[1]+1]) === -1) {compare(board[cellFocus[0]][cellFocus[1]+1])};
    if (board[cellFocus[0]-1] && row.indexOf(board[cellFocus[0]-1][cellFocus[1]]) === -1) {compare(board[cellFocus[0]-1][cellFocus[1]])};

    function compare(compareCell){
      if (compareCell.value === board[cellFocus[0]][cellFocus[1]].value &&
          compareCell != backTrack){
        findSame(compareCell.position, board[cellFocus[0]][cellFocus[1]]);
      }
    }
  }

  function draw(cells){
    var $cell;
    var arr;
    for(var i = 0; i < cells.length; i++){
      arr = [];
      for(var j = 0; j < cells[0].length; j++){
        $cell = $("<div></div>");
        $cell.addClass("cell");
        $cell.attr('id', cells[i][j].position[0]+'_'+cells[i][j].position[1]);
        $cell.css("background-color", color(cells[i][j].value));
        $('.board').append($cell);
        arr.push(cells[i][j].value);
      }
    }
    $('.score').text(score);
  }

  function color(number){
    switch(number){
      case 0:
        return "yellow";
        break;
      case 1:
        return "blue";
        break;
      case 2:
        return "green";
        break;
      case 3:
        return "red";
        break;
    }
  }

  function goDownCells(){
    var emptyCells = sortrow();
    var cangedCells = [];

    for(var i = 0; i < emptyCells.length; i++){
      score++;
      while (board[emptyCells[i].position[0]][emptyCells[i].position[1]].value === undefined){
        for(var j = emptyCells[i].position[0] + 1; j--;){
          if (board[j-1]) {
            board[j][emptyCells[i].position[1]].value = board[j-1][emptyCells[i].position[1]].value;
            cangedCells.push(board[j][emptyCells[i].position[1]].position);
          }
        }
        board[0][emptyCells[i].position[1]].value = Math.floor(Math.random() * 4);
        cangedCells.push(board[0][emptyCells[i].position[1]].position);
      }
    }
    for(var i = 0; i < cangedCells.length; i++){
      swapWawe(cangedCells[i]);
    }
  }

  function sortrow(){
    var tmp;
    for(var i = 0; i < row.length; i++){
      for(var j = 0; j < row.length-1; j++){
        if (row[j].position[0] > row[j+1].position[0]){
          tmp = row[j+1];
          row[j+1] = row[j];
          row[j] = tmp;
        }
      }
    }
    return row;
  }

  return {
    start: function(size,obj) {
      cleanAllData(obj);
      getNewBoard(size);
    },
    turn: function(_this) {
      nextTurn(_this);
    }
  }
}());

$(function(){
    $("button").on("click", function(){
      tetrisWave.start([10,5],$(".board"));
    });
});

$(function(){
    $('.board').on("click", function(e){
      if ($(e.target).is('.cell')) {
        tetrisWave.turn($(e.target));
        $(e.target).addClass('focus');
      }else{
        return false;
      }
    });
});
