import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments.js'
import { Leaders } from './leaders'
import { Promotions } from './promotions'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './form.js';


export const configureStore = () => {
	const store = createStore (
		combineReducers({
			dishes: Dishes,
			comments: Comments,
			leaders: Leaders,
			promotions: Promotions,
			...createForms({ 
				feedback: InitialFeedback
			})
		}) ,
		applyMiddleware(thunk, logger)
	);
	
	return store;
}