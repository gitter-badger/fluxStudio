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

dec.branch=function branchInjector(obj){
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

dec.commitAfter=function commitAfter(action){
  var that=this;
  return function(state){
    setTimeout(state.commit.bind(state));
    return action.apply(that,arguments);
  };
};

dec.cursors=function cursors(obj){
  return dec.branch({cursors:obj});
};

dec.facets=function facets(obj){
  return dec.facets({facets:obj});
};

dec.app=dec.cursors({app:['app']});

dec.action=dec.cursors({action:['app','action']});

module.exports=dec;

