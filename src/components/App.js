import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import Profile from './github/Profile';
import Search from './github/Search';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'microsoft',
      userData: [],
      userRepos: [],
      perPage: 10
    }
  }

  // Get User data
  getUserData(){
    $.ajax({
      url: 'https://api.github.com/users/' + this.state.username,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ userData: data })
      }.bind(this),
      error: function (xhr, status, err) {
        this.setState({username: null })
      }.bind(this)
    });
  }

  // Get User repos
  getUserRepos(){
    $.ajax({
      url: 'https://api.github.com/users/' + this.state.username + '/repos?per_page=' + this.state.perPage + '&sort=created',
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ userRepos: data })
      }.bind(this),
      error: function (xhr, status, err) {
        this.setState({username: null})
      }.bind(this)
    });
  }

  componentDidMount(){
    this.getUserData();
    this.getUserRepos();
  }

  handleFormSubmit(username){
    this.setState({ username: username }, function () {
      this.getUserData();
    this.getUserRepos();
    });
  }

  render() {
    return (
      <div>
        <Search onFormSubmit={this.handleFormSubmit.bind(this)} />
        <br />
        <Profile {...this.state} />
      </div>
    );
  }
}

App.propTypes = {
  clientId: React.PropTypes.string,
  clientSecret: React.PropTypes.string
}

App.defaultProps = {
  clientId: '',
  clientSecret: ''
}

export default App;
