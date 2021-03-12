import React from 'react';
import Home from './HomeComponent.js';
import Menu from './MenuComponent.js';
import Contact from './ContactComponent'
import Header from './HeaderComponent';
import RenderDish from './Dishdetails.js';
import Footer from './FooterComponent';
import About from './AboutusComponent.js'; /// About imported here
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators'
import { actions } from "react-redux-form";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotion: state.promotions,
    leader: state.leaders
    
  }
}

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => 
    dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
    fetchDishes: () => { dispatch(fetchDishes())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => { dispatch(fetchComments()) },
    fetchPromos: () => { dispatch(fetchPromos()) },
    fetchLeaders: () => { dispatch(fetchLeaders())}
});
  
class Main extends React.Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  
  render() {
    const HomePage = () => {
      console.log(this.props.leader);
      return (
          <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion = {this.props.promotion.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotion.isLoading}
          promosErrMess={this.props.promotion.errMess}
          leader = {this.props.leader.leaders.filter((leader) => leader.featured)[0]}
          leaderLoading = {this.props.leader.isLoading}
          leaderErrMess
           = { this.props.leader.errMess } /> 
        )
    }
          console.log(this.props.dishes.dishes);
    const DishwithId = ({match}) => {
      return (
          <RenderDish dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}    
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
              />
        );
    }
      return (
        <div>
          <Header />
            <TransitionGroup>
              <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                <Switch location={this.props.location}>
                  <Route path='/DineNWine' component={HomePage} />
                  <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes.dishes} />} />
                  <Route path="/menu/:dishId" component={DishwithId} />
                  <Route exact path="/about" component={() => <About leaders={this.props.leader.leaders} />} />
                  <Route exact path="/contact" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback} />} />
                  <Redirect to="/DineNWine" />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          <Footer />
        </div>
      );
    }
  }


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
