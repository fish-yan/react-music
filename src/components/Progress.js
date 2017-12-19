import React from 'react'
import '../styles/Progress.css'

class Progress extends React.Component {
  constructor(props) {
    super(props)
    this.changeProgress = this.changeProgress.bind(this)
  }
  changeProgress(e) {
    let progressBar = this.refs.progressBar
    let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth
    this.props.progressChange && this.props.progressChange(progress)
  }

  render() {
    return(
      <div className="progress" ref="progressBar" onClick={this.changeProgress}>
        <div className="progress-bar" style={{width:`${this.props.progress}%`}}>
        </div>
      </div>
    )
  }
}

export default Progress
