import React, { Fragment, Component } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Search from './components/users/Search';
import Users from './components/users/Users';
import User from './components/users/User';
import About from './components/pages/About';
import axios from 'axios';

let githubClientId;
let githubClientSecret;
if(process.env.NODE_ENV !== 'production'){
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

}
else{
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}
class App extends Component {
  state = {
    users:[],
    user:{},
    repos:[],
    loading: false,
    alert: null,

  }
 

  //Search 
  searchUsers = async text =>{
    this.setState({loading: true});

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
    client_id=${githubClientId}&
    client_secret=${githubClientSecret}`);

    this.setState({users:res.data.items, loading:false});
  }
  
  //Get single user
  getUser = async login =>{
    this.setState({loading: true}); 

    const res = await axios.get(`https://api.github.com/users/${login}?
    client_id=${githubClientId}&
    client_secret=${githubClientSecret}`);

    this.setState({user:res.data, loading:false});
  }

  //Get users 5 last repos
  getUserRepos = async login =>{
    const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&
    client_id=${githubClientId}&
    client_secret=${githubClientSecret}`)
    this.setState({repos:res.data, loading:false});
  }

  //Clear
  clearUsers =()=> this.setState({users:[], loading: false });

  //Alert
  setAlert =(msg, type)=> {
    this.setState({alert: {msg, type} });
    setTimeout(()=> this.setState({alert:null}), 2000);
  };
  
  render() {
    return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
        <Alert alert={this.state.alert}/>
        <Switch>
          <Route exact path='/' render={props=>(
            <Fragment>
              <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={this.state.users.length > 0 ? true : false} setAlert={this.setAlert}/>
              <Users loading={this.state.loading} users={this.state.users}/>
            </Fragment>
          )}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/user/:login' render={props=>(
            <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} user={this.state.user} repos={this.state.repos}loading={this.state.loading} />
          )} />
        </Switch>
        

        </div>
      </div>
      </Router>
    );
    
  }
}

export default App;
