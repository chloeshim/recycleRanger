"use strict";

module.exports = function (namespace) {
  namespace = "[" + namespace + "]";
  const messageFromArgs = (args) => {
    let message = args[0];
    for (let i = 1; i < args.length; i++) {
      message += (" " + args[i]);
    }
    return message;
  };
  return {
    log: function () {
      console.log(namespace, messageFromArgs(arguments));
    }
  }
};

