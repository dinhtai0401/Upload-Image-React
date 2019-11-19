import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

const endpoint = 'http://localhost:5000/upload/'

class App extends Component {
  constructor() {
    super()
    this.state = {
      selectedFile: null,
      loaded: 0,
      data:[
        {id : 1, img : 'download.png'},
        {id:  2, img : 'index.png'},
        {id:  3, img : 'hi.jpeg'}
      ],
    }
  }



 handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
    })

  }
  handleUpload = () => {
    const data = new FormData()
    data.append('image', this.state.selectedFile, this.state.selectedFile.name)

    axios
      .post(endpoint, data)
      .then(res => {
        console.log(res.statusText)
      })
  }
 handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:4000/users/', {
      image: e.target['image'].files[0].name,
      name : e.target['name'].value,
      ingredients : e.target['ingredients'].value,
      recipe : e.target['recipe'].value,
      date : e.target['date'].value
    })
      console.log(e.target['image'].files[0].name)
  }
  render() {
    const img = this.state.data.map(i => <div key={i.id}><img src={`/files/${i.img}`}/></div>)
    return (
    <div>
    <div>{img}</div>
    <div>
      <form onSubmit={this.handleSubmit} >
      <h1>author</h1>
      <input type="text" name="name" />
      <h1>Ingredients</h1>
      <input type="text" name="ingredients" />
      <h1>recipe</h1>
      <input type="text" name="recipe" />
      <h1>date</h1>
      <input type="date" name="date" />
      <h1>Image</h1>
      <input type="file" name="image" id="" onChange={this.handleselectedFile} />
      <div>
      <button onClick={this.handleUpload}>Submit</button>
      </div>
      </form>

      </div>
      </div>
    )
  }
}

export default App
