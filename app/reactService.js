import React  from 'react/addons'

import fs     from 'fs'
import Router from 'react-router'
import baobab from 'baobab'
import {Root} from 'baobab-react/wrappers'
import extend from 'extend'

var tmpl   = fs.readFileSync('./app/html/index.html',{encoding:'utf8'});
var Routes = require('./routes');


fs.watch('./app/html/index.html',()=>{
  fs.readFile('./app/html/index.html',{encoding:'utf8'},(e,str)=>{
    tmpl=str;
  });
});


export default (app)=>{


  return 
}

