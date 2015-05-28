var React =require('react/addons');
var extend=require('extend');
var baobab=require('baobab-react/higher-order');
var root=baobab.root;
var branch=baobab.branch;
var dec={};

dec.getContext = function(context){
  var obj={};

  if(context.constructor.name == 'Array'){
    context.forEach(function(key){
      obj[key] = React.PropTypes.any; 
    }); 
  }else{
    obj=context;
  }

  return function(comp){
    return (class ComposedClass {
      static contextTypes = extend(obj,comp.contextTypes) 
      render(){
        return React.createElement(comp,extend({},this.props,this.context));
      }
    });
  };
};



dec.contextInjector = function injectContext(context){
  let obj={};
  for(let k in context) obj[k] = React.PropTypes.any
  return function(comp){
    return (class ComposedClass extends comp { 
      static childContextTypes = extend(obj,comp.childContextTypes) 
      getChildContext(){
        return extend( ((super.getChildContext&&super.getChildContext())||{}) , context);
      }
    });
  };
};

dec.mixins = function mixins(mix){
  return function(comp){
    return (class ComposedClass extends comp { 
      constructor(props,context){
        super(props,context);

        mix.forEach((m)=>{
          for(let k in m){
            this[k]=m[k];
          }
        });
      }
    });
  };
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


dec.pure=dec.mixins([React.addons.PureRenderMixin]);
dec.linkedState=dec.mixins([React.addons.PureRenderMixin]);

dec.commitAfter=function commitAfter(action){
  let that=this;
  return function(state){
    let res = action.apply(that,arguments);
    state.commit();
    return res;
  };
};

dec.cursors=function cursors(obj){
  return dec.branch({cursors:obj});
};

dec.facets=function facets(obj){
  return dec.facets({facets:obj});
};

dec.app=dec.getContext(['app']);

module.exports=dec;

