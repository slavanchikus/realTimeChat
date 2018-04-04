import React from 'react';

const rrd = require('react-router-dom');
rrd.HashRouter = ({ children }) => <div>{children}</div>;

module.exports = rrd;
