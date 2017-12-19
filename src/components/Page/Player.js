import React from 'react'
import {Link} from 'react-router-dom';
import Progress from '../Progress'
import '../../styles/player.css'

let duration = null
class Palyer extends React.Component {
  constructor(props) {
    super(props)
    this.progressChangeHandle = this.progressChangeHandle.bind(this)
    this.setVolume = this.setVolume.bind(this)
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
    this.play = this.play.bind(this)
    this.formate = this.formate.bind(this)
    this.state = {
      progress:0,
      volume:0,
      isPlay:true,
      leftTime:0,
    }
  }

  formate(time) {
    time = Math.floor(time)
    let min = Math.floor(time / 60)
    let sec = Math.floor(time % 60)
    sec = sec < 10 ? `0${sec}` : sec
    return `${min}:${sec}`
  }

  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration
      this.setState({
        progress:e.jPlayer.status.currentPercentAbsolute,
        volume:e.jPlayer.options.volume * 100,
        leftTime:this.formate(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100)),
      })
    })
    $('#player').bind($.jPlayer.event.ended, (e) => {
      this.next()
    })
  }

  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
    $('#player').unbind($.jPlayer.event.ended);
  }

  setVolume(pgs) {
    $('#player').jPlayer('volume', pgs);
  }

  progressChangeHandle(progress) {
    $('#player').jPlayer('play', duration * progress)
  }

  prev() {
    this.props.prev()
  }

  next() {
    this.props.next()
  }

  play() {
    $('#player').jPlayer(this.state.isPlay ? 'pause' : 'play')
    this.setState({
      isPlay: !this.state.isPlay,
    })
  }

  render() {
    let item = this.props.currentMusic
    return (
      <div className='container-player'>
        <h1><Link className='player-caption' to='/list'>我的私人音乐坊 &gt;</Link></h1>
        <div className='container-left'>
          <h2 className='music-title'>{item.title}</h2>
          <h3 className='music-artist'>{item.artist}</h3>
          <div>
            <div className='left-time'>{this.state.leftTime}</div>
            <div className='volume-container'>
              <i className='icon-volume'></i>
              <div className='volume-wrapper'>
                <Progress progress={this.state.volume} progressChange = {this.setVolume} />
              </div>
            </div>
          </div>
          <div style={{height:10}}>
            <Progress progress={this.state.progress} progressChange = {this.progressChangeHandle} />
          </div>
          <div className='mt35'>
            <i className='icon prev' onClick={this.prev}></i>
            <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
            <i className='icon ml20 next' onClick={this.next}></i>
          </div>
        </div>
        <div className='cover'>
          <img src={item.cover} alt='远走高飞'/>
        </div>
      </div>
    );
  }

}

export default Palyer;
