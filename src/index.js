import React, {Component } from 'react'
import ReactDOM from 'react-dom'

const Dictionaries = {}

export default class I18N extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.instanceID = Math.ceil(Math.random() * 999999) + (new Date).getTime()
    this.setDictionary = this.setDictionary.bind(this)
  }
  getVal (key, values) {
    return key
  }
  setDictionary (props) {
    let dictionaries = props.use
    dictionaries = Array.isArray(dictionaries) ? dictionaries : [dictionaries]
    dictionaries.forEach(dict => {
      if (!dict.id) {
        console.error('Failed using dictionary: ', dict)
        throw new Error('Your dictionary must have an ID')
      }
      const dictId = dict.id + ':' + (dict.version || 1)
      let lang = props.lang || 'en-US'
      if (!Dictionaries[this.instanceID] || Dictionaries[this.instanceID].lang !== lang) {
        Dictionaries[this.instanceID] = {
          lang,
          fallbackLang: props.fallbackLang || 'en', // || navigator.lang,
          baseLang: lang.split('-')[0] || '',
          terms: {}
        }
      }
      Dictionaries[this.instanceID].terms[dictId] = dict
    })
  }
  componentDidMount () {
    this.setDictionary(this.props)
  }
  componentWillReceiveProps(newProps) {
    this.setDictionary(newProps)
  }
  render() {
    return <div
      data-i18nId={this.instanceID}
      key={this.props.lang}>
      {this.props.children}
    </div>
  }
}

export class Label extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.setValues = this.setValues.bind(this)
    this.updateValues = this.updateValues.bind(this)
    this.done = this.done.bind(this)
    this.getTerm = this.getTerm.bind(this)
  }
  done (term) {
    this.setState({
      term
    })
  }
  applyVariables (term, props) {
    let match = term.match(/\$\{[a-zA-Z0-9_]+\}/g)
    if (!match) {
      return term
    }
    match.forEach(found => {
      found = found.slice(2, -1) // removed ${ and }
      let value = props[found] || ''
      if (Array.isArray(value)) {
        if (value.length === 1) {
          value = value[0]
        } else {
          if (value.length === 0) {
            value = ''
          } else {
            let joints = this.getTerm('joints')
            if (joints) {
              value = Array.from(value)
              let last = value.pop()
              value = value.join(joints[0] || ', ')
              value += (
                props.jointType === 'none'
                  ? joints[0]
                  : props.jointType === 'or'
                    ? joints[2]
                    : joints[1]
              ) || ', '
              value += last
            } else {
              value = value.join(', ')
            }
          }
        }
      }
      term = term.replace(new RegExp('\\$\{'+ found + '\}', 'g'), value)
    })
    return term
  }
  getTerm (lookingFor) {
    let dicts = Dictionaries[this.state.i18nid]
    let term = null
    for (let dict in dicts.terms) {
      if (term) { return }
      const curLangs = dicts.terms[dict].langs
      term = (curLangs[dicts.lang] || {})[lookingFor] ||
        (curLangs[dicts.fallbackLang] || {})[lookingFor] ||
        (curLangs[dicts.baseLang] || {})[lookingFor] ||
        (curLangs.world || {})[lookingFor]
    }
    return term
  }
  updateValues (props) {
    const lookingFor = props.term
    let term = this.getTerm(lookingFor)
    if (Array.isArray(term)) {
      term = term[props.val === 1 ? 0 : 1]
    }
    if (!term) {
      term = lookingFor
      console.warn('Missing term in dictionaries: ', lookingFor)
    } else {
      term = this.applyVariables(term, props)
    }
    this.done(term)
  }
  setValues (props) {
    if (!this.state.i18nid) {
      let originalNode = ReactDOM.findDOMNode(this).parentElement
      let node = originalNode
      while (!node.dataset.i18nid) {
        node = node.parentElement
        if (node.tagName === 'BODY' || node.tagName === 'HTML') {
          console.error('Could not find the I18N component as parent of: ', originalNode)
          throw new Error('Could not find the I18N component on the ascending tree!')
        }
      }
      this.setState({
        i18nid: node.dataset.i18nid
      }, _ => this.updateValues(props))
    } else {
      this.updateValues(props)
    }
  }
  componentDidMount() {
    this.setValues(this.props)
  }
  // shouldComponentUpdate (newProps, state) {
  //   debugger
  //   // this.setValues(newProps)
  //   return true
  // }
  componentWillReceiveProps(newProps) {
    this.setValues(newProps)
  }
  render (props) {
    return <span>{this.state.term}</span>
  }
}
