import React, {Component} from 'react'
import {render} from 'react-dom'

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

  updateLanguage (event) {
    let el = event.target
    this.setState({
      lang: el.value
    })
  }

  render() {

    return <div>
      <I18N
        use={myDictionary}
        lang={this.state.lang}>
        <div>
          <div>
            <div>
              <Label term='choseLang' /><br />
              <select onChange={this.updateLanguage.bind(this)} defaultValue={this.state.lang}>
                <option value='en-US'>English</option>
                <option value='es'>Spanish</option>
                <option value='pt'>Portuguese</option>
                <option value='ch'>Chinese</option>
              </select>
            </div>
            <Label term='pickFriends' />
            {
              [
                'Felipe',
                'Jaydson',
                'Jonh',
                'Gabe'
              ].map(cur => {
                return <div key={cur}>
                  <input
                    type='checkbox'
                    data-friend={cur}
                    onClick={this.updateFriends.bind(this)}
                    defaultChecked={this.friends.has(cur)} /> {cur}
                </div>
              })
            }
            <Label term='hi' /><br />
            <Label
              term='friends'
              val={this.state.friends.length}
              friends={this.state.friends} />
          </div>
          <div>
            <Label term='formatedData' />
            <Label
              term='birthDate'
              day={'19'}
              month={'07'}
              year={'1985'} />
          </div>
        </div>
      </I18N>
      <I18N
        use={[myEnDict, myEsDict, myDictionary]}
        lang={this.state.lang}
        fallbackLang='none'>
        <Label term='text1' />
      </I18N>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
