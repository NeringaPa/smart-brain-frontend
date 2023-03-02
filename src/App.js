import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const initialState = {
  input:'',
  imageUrl: '',
  route: 'signin',
  isSignedIn: false,
  box: {},
  user:{
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  calculateBoxLocation = (data) => {
    const clarifaiBox = data.outputs[0];//data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiBox.left_col * width,
      topRow: clarifaiBox.top_row * height,
      rightCol: width - (clarifaiBox.righ_col * width),
      bottomRow: height - (clarifaiBox.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    this.setState({box:box});
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route:route});
  }

  onButtonSumbit = () => {
    console.log('click');
    const { input, user } = this.state;
    this.setState({imageUrl:input});
    fetch('http://localhost:3000/imageurl', {
      method:'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        input: input
      })
    })
    .then(response => response.json()) 
    .catch(err => console.log(err))
      .then(response => {
        if(response){
          fetch('http://localhost:3000/image', {
            method:'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              id: user.id
            })
          })        
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(user, { entries: count }))
        })
        .catch(err => console.log(err))
      }
        this.displayFaceBox(this.calculateBoxLocation(response))
      })
      .catch(err => console.log(err));
  }

render(){
  const { isSignedIn, route, box, imageUrl} = this.state;
  return(
    <div className="App">
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {route === 'home'
      ? <div>
          <Logo onRouteChange={this.onRouteChange}/>
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSumbit={this.onButtonSumbit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>
      : (
          route === 'signin' || route === 'signout'
          ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        )
      }

    </div>
  )
}
}

export default App;
