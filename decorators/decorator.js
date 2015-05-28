var React =require('react/addons');
var extend=require('extend');
var baobab=require('baobab-react/higher-order');
var root=baobab.root;
var branch=baobab.branch;
var dec={};

dec.getBaobabContext = function getBaobabContext(comp){
 return extend({},comp,{contextTypes:{
    tree: PropTypes.baobab,
    cursors: PropTypes.cursors,
    facets: PropTypes.facets
  }});
};

dec.rootInjector=function rootInjector(state){
  return function(comp){
    return root(comp,state);
  };
};

dec.branchInjector=function branchInjector(obj){
  return function(comp){
    return branch(comp,obj);
  };
};

dec.pure=function pure(comp){
  comp.mixins=comp.mixins||[];
  comp.mixins.push(React.pureRenderMixin);
  return comp;  
};

dec.linkedState=function linkedState(comp){
  comp.mixins=comp.mixins||[];
  comp.mixins.push(React.linkedStateMixin);
  return comp;  
};

module.exports=dec;

