const _ = require('lodash');
const obj = {};
// _.isEmpty(obj)
console.log("Check isEmpty : ",_.isEmpty(obj));

// _.get(obj,"path")
const obj2 = {};
console.log("get id: ",_.get(obj2,"content.attributes.id"));

// _.set(obj,"path","value")
_.set(obj2, "content.attributes.id", "3");