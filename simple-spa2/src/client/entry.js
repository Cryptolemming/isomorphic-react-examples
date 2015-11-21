import React from 'react';
import RenderDOM from 'react-dom';
import Router from 'react-router';
import routes from '../shared/routes';

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
	React.RenderDOM(<Handler />, document.getElementById('app'));
});