import React, { Component } from 'react';

class Search extends Component {
  onSubmit(event){
  	event.preventDefault();
  	let username = this.refs.username.value.trim();
  	if(!username){
  		alert('Enter a valid username');
  		return;
  	}

  	this.refs.username.value = '';
  	this.props.onFormSubmit(username);
  }

  render() {
    return (
    	<div>
    		<form onSubmit={this.onSubmit.bind(this)}>
    			<label>Search Github User</label>
    			<input type="text" ref="username" className="form-control" />
    		</form>
    	</div>
    );
  }
}

export default Search;
