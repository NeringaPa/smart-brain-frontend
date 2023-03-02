import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
class Signin extends Component {

  constructor(props){
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) =>{
    this.setState({signInEmail:event.target.value});
  }

  onPasswordChange = (event) =>{
    this.setState({signInPassword:event.target.value});
  }

  onSubmitSignIn = (event) => {
    console.log(event);
    event.preventDefault();
    const { signInEmail, signInPassword } = this.state;
      fetch('http://localhost:3000/signin', {
        method:'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          email: signInEmail,
          password: signInPassword
        })
    })
        .then(response => response.json())
        .then(user =>{
          if (user.token){
            localStorage.setItem('token', user.token);
            this.props.loadUser(user);
            console.log('data fetch completed');
            localStorage.setItem('user',JSON.stringify(jwtDecode(user.token)));
            this.props.onRouteChange('home');
          }
        })
  }

 
render(){
  return (
    <article className="center mw5 br3 pa2 pa4-ns mv6 shadow-5 ba b--black-10">
      <main className="pa4 black-80">
        <form className="measure" onSubmit={this.onSubmitSignIn}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={this.onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={this.onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input              
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p onClick={()=>this.onRouteChange('register')} className="f6 link dim black db pointer">
              Register
            </p>
          </div>
        </form>
      </main>
    </article>
  );
}
};

export default Signin;