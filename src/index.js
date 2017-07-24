import React, {Component } from 'react'
import ReactDOM from 'react-dom'

const Dictionaries = {}

export default class I18N extends Component {
  constructor (props) {
    super(props)
    this.state = {
      __DICS: Dictionaries
    }
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
      let theDict = Dictionaries[this.instanceID]
      let instanceID = this.instanceID
      let langBase = lang.split('-')[0] || ''

      if (!theDict) {
        Dictionaries[instanceID] = {
          lang,
          fallbackLang: props.fallbackLang || langBase,
          baseLang: langBase,
          books: {}
        }
      }
      if (theDict && theDict.lang !== lang) {
        Dictionaries[this.instanceID].lang = lang
        if (Dictionaries[this.instanceID].fallbackLang !== 'none') {
          Dictionaries[this.instanceID].fallbackLang = langBase
        }
        Dictionaries[this.instanceID].baseLang = langBase
      }
      Dictionaries[this.instanceID].books[dictId] = dict
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
      className={this.props.className}
      data-i18nId={this.instanceID}
      key={this.props.lang}>
      {this.props.children}
    </div>
  }
}

export class Label extends Component {
  constructor (props) {
    super(props)
    this.state = {
      __DICS: Dictionaries
    }
    this.setValues = this.setValues.bind(this)
    this.updateValues = this.updateValues.bind(this)
    this.done = this.done.bind(this)
    this._getTerm = this._getTerm.bind(this)
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
            let joints = this._getTerm('joints')
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
  _getTerm (lookingFor) {
    let dicts = Dictionaries[this.state.i18nid]
    let term = null

    term = getTerm(lookingFor, dicts.books, dicts.lang, dicts.fallbackLang, dicts.baseLang)
    return term
  }
  updateValues (props) {
    const lookingFor = props.term

    let term = this._getTerm(lookingFor)
    if (Array.isArray(term)) {
      term = term[props.val === 1 ? 0 : 1]
    }
    if (!term) {
      if (Dictionaries[this.state.i18nid].fallbackLang === 'none') {
        term = ''
      } else {
        term = lookingFor.split(/(?=[A-Z])/)
        term = term[0] + ' ' + term.slice(1).join(' ').toLowerCase();
        console.warn('Missing term in dictionaries: ', lookingFor)
      }
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
      let obj = {
        i18nid: node.dataset.i18nid
      }
      if (Dictionaries[node.dataset.i18nid]) {
        obj.lang = Dictionaries[node.dataset.i18nid].lang
      }
      this.setState(obj, _ => this.updateValues(props))
    } else {
      this.updateValues(props)
    }
  }
  componentDidMount() {
    this.setValues(this.props)
  }
  // shouldComponentUpdate (props, state) {
  //   return true
  // }
  componentWillReceiveProps(newProps) {
    this.setValues(newProps)
  }
  render (props) {
    return <span className={this.props.className} key={this.state.lang}>{this.state.term}</span>
  }
}

// (lookingFor, dicts.books, dicts.lang, dicts.fallbackLang, dicts.baseLang)
export function getTerm (lookingFor, books, lang, fallbackLang, baseLang) {
  let term = null
  for (let dict in books) {
    if (term) { return term }
    const curLangs = books[dict].langs
    term = (curLangs[lang] || {})[lookingFor] ||
      (curLangs[fallbackLang] || {})[lookingFor] ||
      (curLangs[baseLang] || {})[lookingFor] ||
      (curLangs.world || {})[lookingFor]
  }
  return term
}

export { I18N }
