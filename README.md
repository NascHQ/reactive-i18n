# reactive-i18n

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Reactive-i18n allows you to, reactivelly, deal with _Internacionalization_ in your pages and apps.  

With it, you create multiple dictionaries and use them in your components in a very, very ease, intuitive, readable and mantainable way. It even works with plurals, variables, lists and fallbacks.

## Installing it

```
npm install reactive-i18n
```

## Importing it

First, you import both `I18N` and `Label` 

```js
import I18N, { Label } from '../../src'
// OR
import { I18N, Label } from '../../src'
```

Then, you may import your dictionaries (to be descibre in chapter [#dictionaries](Dictionaries)):

```js
import myDictionary from './my-dictionary.js'
```

You may use as many as you want.

### Scope

You may specify a given scope for making use of a dictionary or language, like so:

```js
    [...]
    render() {
    return <I18N
      use={myDictionary}
      lang={this.state.lang}>
      // your content goes here
    </I18N>
    [...]
```

> If you have more dictionaries to be used in the same scope, simply pass an _Array_ in the `use` property.

### Terms

Inside any scope, you may use the `Label`.

```js
    [...]
    render() {
    return <I18N
      use={myDictionary}
      lang={this.state.lang}>
      <div>
        [...]
        <Label term='UserNameAndSurname' />
        [...]
      </div>
    </I18N>
    [...]
```

It will look for the term `UserNameAndSurname` in all the dictionaries in the current scope, that bes match with the _lang_ in the current scope.

> Interestingly enough, a warning will be shown when a term is not found. But also, the term will be treated before being shown on the screen. The example above would become `User name and surname`...not translated, but better for users in case you forgot to translate any term in your dictionaries.

## Dictionaries

Dictionaries are just an object.  
They have an `id`, a `langs` object and may have a `version`.

```js
const dictionary = {
    id: 'myDictIdentifier',
    version: '1',
    langs: {
        // ...
    }
}
export default dictionary
```

### Dictionary's langs

This is an object containing all the languages you will support, and each language, all the terms, like this:

```js
const dictionary = {
    id: 'myDictIdentifier',
    version: '1',
    langs: {
        en: {
            UserNameAndSurname: 'Full name'
        },
        es: {
            UserNameAndSurname: 'Nombre completo'
        }
    }
}
export default dictionary
```

And that is it. This is the **basic** usage.

### Plural and singular

If you want to use different strings for plural or string, first, you need to say the number. You do that using the `val` property:

```js
    <Label
        term='friends'
        val={this.state.groceries.length} />
```

And, in the dictionary, you simple use an array with 2 strings, instead of one:

```js
    // ...
    langs: {
        en: {
            friends: [
                'Friend',
                'Friends'
            ]
        },
        es: {
            friends: [
                'Amigo',
                'Amigos'
            ]
        }
    }
    // ...
```

### Variables

You can send some variables, and use them as in template strings, with the `${varName}` syntax.  
Send variables like this:

```js
    <Label
        term='hi'
        person={'Felipe'} />
```

In dictionary, you can now access `person`:

```js
    // ...
    langs: {
        en: {
            hi: 'Hi ${person}'
        },
        es: {
            hi: 'Hola ${person}'
        }
    }
    // ...
```

### Lists

You can send lists, as well.  

```js
    <Label
        term='friends'
        friends={['Felipe', 'Jaydson', 'Gabe']} />
```

In dictionary:

```js
    // ...
    langs: {
        en: {
            friends: 'Hi ${friends}'
        },
        es: {
            friends: 'Hola ${friends}'
        }
    }
    // ...
```

By default, all the items in the list will be glued by `, `.  
BUT...you can change that by specifying the `joints` in your dictionary:

```js
    // ...
    langs: {
        en: {
            joints: [', ', ' and ', ' or '],
            friends: 'Hi ${friends}'
        },
        es: {
            joints: [', ', ' y ', ' o '],
            friends: 'Hola ${friends}'
        }
    }
    // ...
```

Now, the output in english would be `Hi Felipe, Jaydson and Gabe`, and the output in spanish would be `Hola Felipe, Jaydson y Gabe`.  

Change the `jointType` to get the `or`.

```js
    <Label
        term='friends'
        jointType='or'
        friends={['Felipe', 'Jaydson', 'Gabe']} />
```

The `jointType` may be `or`, `and` (default) or `none` (will use only `,`)

You may even combine plural with your variables:

```js
    <Label
        term='friends'
        val={this.state.friends.length}
        friends={this.state.friends} />
```

And, in dictionary:

```js
    // ...
    langs: {
        en: {
            joints: [', ', ' and ', ' or '],
            friends: [
                'Hello my only friend, ${friends}',
                'Hello all my ${val} friends ${friends}'
            ]
        },
        es: {
            joints: [', ', ' y ', ' o '],
            friends: [
                'Hola mi único amigo, ${friends}',
                'Hola mis ${val} amigos ${friends}'
            ]
        }
    }
    // ...
```

### Global / World

You may define some global terms...something that all (or most) of languages share in common.

For exampe:

```js
    <Label
        term='dateFormat'
        day={19}
        month={'07'}
        year={1985} />
```

```js
    // ...
    langs: {
        world: {
            dateFormat: '${day}/${month}/${year}'
        },
        'en-US': {
            dateFormat: '${month}/${day}/${year}'
        }
    }
    // ...
```





[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
