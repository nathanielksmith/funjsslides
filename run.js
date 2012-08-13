#!/usr/bin/node

var _ = require('underscore');

var id = function(x) { return x }
var plus = function(x,y) { return x+y }
var minus = function(x,y) { return x-y }
var div = function(x,y) { return x / y }
var mult = function(x,y) { return x * y }
var show = function() { console.log.apply(this, arguments) }
var map = function(a, f) { return _.map(a, f) }
var foldl = function(a, f, c) { return _.foldl(a, f, c) }
var foldr = function(a, f, c) { return _.foldr(a, f, c) }

Function.prototype.$ = function() {
    return this.apply(null, arguments)
}

Function.prototype.c = function(g) {
    var f = this
    return function() {
        return f(g.apply(this, arguments)) 
    }
}

Function.prototype.p = function() {
    var args = _.toArray(arguments)
    var f = this
    return function() {
        var inner_args = _.toArray(arguments)
        inner_args.unshift(args[0])
        return f.apply(this, inner_args)
    }
}

Function.prototype.f = function() {
    var f = this
    return function() {
        var args = _.toArray(arguments).reverse()
        return f.apply(this, args)
    }
}

process.stdin.resume();
process.stdin.setEncoding('utf8')

process.stdin.on('data', function(chunk) {
    process.stdout.write(chunk+"\n");
    process.stdout.write('/*\n\n');
    eval(chunk);
    //process.stdout.write('\n\n*/');
})

process.on('exit', function() {
    process.stdout.write('\n\n*/');
})
