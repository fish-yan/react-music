import React from 'react'
import '../../styles/MusicItem.css'

export default class MusicItem extends React.Component {
  constructor(props) {
    super(props)
    // this.selectMusic = this.selectMusic.bind(this)
  }

  selectMusic(musicItem) {
    this.props.selectMusic(musicItem)
  }

  render() {
    let musicItem = this.props.musicItem
    return(
      <div>
        <li key={musicItem.id} className={`li_item ${this.props.focus ? 'focus' : ''}`} onClick={this.selectMusic.bind(this,musicItem)}>
          <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
        </li>
      </div>
    )
  }
}
