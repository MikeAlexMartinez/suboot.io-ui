var React = require('react');
var Enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

global.Enzyme = Enzyme;
global.React = React;