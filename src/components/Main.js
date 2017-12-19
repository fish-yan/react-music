require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Header from './Header'
import Player from './Page/Player'
import MusicList from './Page/MusicList'
import {MUSIC_LIST} from './musiclist'

export default class AppComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      musiclist: MUSIC_LIST,
      currentMusic:MUSIC_LIST[0],
    }
    this.playMusic = this.playMusic.bind(this)
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
  }

  componentDidMount() {
    $('#player').jPlayer({
      supplied:'mp3',
      wmode:'window'
    })
    this.playMusic(this.state.currentMusic)
  }

  playMusic(item) {
    document.title = `${item.title}-${item.artist}`
    $('#player').jPlayer('setMedia', {
      mp3:item.file,
    }).jPlayer('play')
    this.setState({
      currentMusic: item
    })
  }

  prev() {
    let index = this.state.musiclist.indexOf(this.state.currentMusic)
    let length = this.state.musiclist.length
    var newIndex = null
    if (index == 0) {
      newIndex = length - 1
    } else {
      newIndex = index - 1
    }
    let newItem = this.state.musiclist[newIndex]
    this.playMusic(newItem)
  }

  next() {
    let index = this.state.musiclist.indexOf(this.state.currentMusic)
    let length = this.state.musiclist.length
    var newIndex = null
    if (index == length - 1) {
      newIndex = 0
    } else {
      newIndex = index + 1
    }
    let newItem = this.state.musiclist[newIndex]
    this.playMusic(newItem)
  }

  render() {
    const Home = () => (
      <div className="index">
      <Player currentMusic={this.state.currentMusic} prev={this.prev} next={this.next}/>
    </div>
    );

    const List = () => (
      <div>
        <MusicList musicList={this.state.musiclist} currentMusic={this.state.currentMusic} selectMusic={this.playMusic}/>
      </div>

    );

    return (
      // <App />
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Home}/>
          <Route path="/list" component={List}/>
        </div>
      </Router>
    )
  }

}

AppComponent.defaultProps = {
};

