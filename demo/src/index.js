import React, {Component} from 'react'
import {render} from 'react-dom'

require('./default.css')

import I18N, { Label } from '../../src'
import myDictionary from './dictionaries/demo-dict.js'
import myEnDict from './dictionaries/en-only-dict.js'
import myEsDict from './dictionaries/es-only-dict.js'

class Demo extends Component {

  constructor (props) {
    super(props)
    this.friends = new Set()
    this.state = {
      friends: [],
      jointType: 1,
      lang: 'en-US'
    }
  }

  updateFriends (event) {
    let friend = event.target.dataset.friend
    if (event.target.checked) {
      this.friends.add(friend)
    } else {
      this.friends.delete(friend)
    }
    this.setState({
      friends: Array.from(this.friends)
    })
  }

  updateLanguage (val) {
    this.setState({
      lang: val
    })
  }

  render() {

    return <div>
      <I18N
        use={myDictionary}
        lang={this.state.lang}>
        <div>
          <div>
            <div className='choseLang-container'>
              <Label term='choseLang' /><br />
              <div className='lang-options'>
                {
                  [
                    ['en-US', 'English'],
                    ['es', 'Español'],
                    ['pt-BR', 'Português'],
                    ['ch', '中文'],
                  ].map(cur => {
                    return <span
                      key={cur[0]}
                      onClick={event => this.updateLanguage(cur[0])}
                      className={'lang-opt ' + (cur[0] === this.state.lang ? 'selected' : '')}>
                      {cur[1]}
                    </span>
                  })
                }
              </div>
            </div>
            <div className='pick-friends-container'>
              <Label term='pickFriends' />
              <br />
              {
                [
                  'Felipe',
                  'Jaydson',
                  'Jonh',
                  'Gabe'
                ].map((cur, i) => {
                  return <span key={cur}>
                    <input
                      type='checkbox'
                      id={cur}
                      data-friend={cur}
                      onClick={this.updateFriends.bind(this)}
                      defaultChecked={this.friends.has(cur)} /> <label htmlFor={cur} className='friend-name'>{cur}</label>
                      { i % 2 !== 0 ? <br /> : ''}
                  </span>
                })
              }
            </div>
            <div className='result'>
              <Label term='hi' /><br />
              <Label
                term='friends'
                val={this.state.friends.length}
                friends={this.state.friends} />
            </div>
          </div>
          <div className='wrapper'>
            <Label term='formatedData' />
            <Label
              term='birthDate'
              day={'19'}
              month={'07'}
              year={'1985'} />
            { /*
            <br />
            <Label term='PersonNameAndSurname' />
            */ }
          </div>
        </div>
      </I18N>
      <div className='wrapper final'>
        <I18N
          use={[myEnDict, myEsDict, myDictionary]}
          lang={this.state.lang}
          fallbackLang='none'>
          <Label term='text1' />
        </I18N>
      </div>

      <footer>
        <a href='https://github.com/NascHQ/reactive-i18n' target='_blank'>Github</a> | 
        <a href='https://www.npmjs.com/package/reactive-i18n' target='_blank'>NPM</a> | 
        <a href='https://twitter.com/felipenmoura' target='_blank'>@felipenmoura</a>
      </footer>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
