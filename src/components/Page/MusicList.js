import React from 'react';
import MusicItem from './MusicItem'

export default class MusicList extends React.Component {

  // constructor(props) {
  //   super(props)
  //   this.selectMusic = this.selectMusic.bind(this)
  // }

  // selectMusic(musicItem) {
  //   this.props.selectMusic(musicItem)
  // }

  render() {
    let list = this.props.musicList.map((item) => {
      return (
        <MusicItem key={item.id} musicItem={item} focus={this.props.currentMusic === item} selectMusic={this.props.selectMusic}/>
      )
    })
    return(
      <ul>
        {list}
      </ul>
    )
  }
}

