var remind = angular.module('str',[]);
remind.controller('mainCtrl',['$scope',function($scope){
  if(localStorage.todos){
    $scope.list = angular.fromJson(localStorage.todos)
  }else{
    $scope.list=[];
  }
  $scope.currentlist=[],
  colors =['bgs1','bgs2','bgs3','bgs4','bgs5','bgs6','bgs7'];
  $scope.colors=colors,
  $scope.saveDate = function(){
    localStorage.todos=angular.toJson($scope.list)
  },
  $scope.addlist = function(){
    var len = $scope.list.length;
    var id =(len===0)?1001:(Math.max.apply(null,$scope.list.map(function(v,i){
      return v.id;
    }))+1) ;
    list={
      id:id,
      name:'新列表'+(len+1),
      color:colors[len%7],
      shixiang:[
        {id:10001,name:'买车',theme:false},
        {id:10002,name:'买房',theme:false},
        {id:10003,name:'买飞机',theme:true},
        {id:10004,name:'买船',theme:true}
      ]
    }
    $scope.currentlist=list;
    $scope.list.push(list);
    $scope.saveDate();
  },
  $scope.change=function(index){
      $scope.currentlist=$scope.list[index];
      $scope.finish=$scope.currentlist.shixiang.filter(function(v,i){
        return v.theme===true;
      });
      $scope.finished = $scope.finish.length;
      $scope.nofinished = $scope.currentlist.shixiang.length-$scope.finish.length;

  },
  $scope.changes=function(index){
    $scope.list=$scope.list.filter(function(v,i){
      return v.id !== index
    })
    $scope.currentlist=$scope.list[0],
    $scope.saveDate();
  },
  $scope.changed=function(v){
    $scope.currentlist.color=v;
  },
  $scope.addthing=function(){
    var lens = $scope.currentlist.shixiang.length;
    var id = (lens===0)?10001:(Math.max.apply(null,$scope.currentlist.shixiang.map(function(v,i){
      return v.id;
    }))+1),
    thing = {
      name:"",
      id:id,
      theme:false
    }
    $scope.currentlist.shixiang.push(thing);
    $scope.saveDate();
  },
  $scope.delete=function(){
    $scope.currentlist.shixiang = $scope.currentlist.shixiang.filter(function(v,i){
      return v.theme===false;
    });
    $scope.finished = 0,
    console.log($scope.currentlist.shixiang.length)
    $scope.saveDate();
  }
}])
