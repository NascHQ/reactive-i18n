# Reactive I18N

Reactive-i18n allows you to, reactivelly, deal with _Internacionalization_ in your pages and apps.  

With it, you create multiple dictionaries and use them in your components in a very, very ease, intuitive, readable and mantainable way. It even works with plurals, variables, lists and fallbacks.

See it working in [this live demo](https://naschq.github.io/reactive-i18n/demo/dist/). And see its source [here](https://github.com/NascHQ/reactive-i18n/tree/master/demo/src)

## Installing it

```
npm install reactive-i18n
```

## Importing it

First, you import both `I18N` and `Label` 

```js
import I18N, { Label } from 'reactive-i18n'
// OR
import { I18N, Label } from 'reactive-i18n'
```

Then, you may import your dictionaries (to be descibre in chapter [Dictionaries](#dictionaries)):

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
    }
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
    }
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

### Different files for each language

Once the _scope_ accepts multiple dictionaries, you can simply add different dictionaries there, each one, containing a single language.

```js
    [...]
    render() {
        return <I18N
        use={[myEnDict, myEsDict, myPtDict]}
        lang={this.state.lang}>
            // your content goes here
        </I18N>
    }
    [...]
```

### Fallback language

By default, it will follow this pattern.  
If you specify the lang `pt-BR`, it will look for the terms there.  
If the term is not found, then looks for it in any dictionary in `pt`.  
If not found yet, looks for it in `world`.  

But you may specify the `fallbackLang` for the scope, changing the behavior of the second step.

```js
    [...]
    render() {
        return <I18N
        use={[myEnDict, myEsDict, myPtDict]}
        lang='pt-BR'
        fallbackLang='en'>
            // ...
        </I18N>
    }
    [...]
```

The `fallbackLang` property also accepts `none`. In this case, if the term is not found in any dictionary, **no worning** will be triggered and will not show anything on the screen for that term.

## Technical table

#### Component

In your react components:  
(* means mandatory)

| Element       | Prop           | Val             |
| ------------- |----------------|-----------------|
| <I18N>        | use*           | Object or array |
| <I18N>        | className      | A className, so you can customize it |
| <I18N>        | lang*          | String, the language itself, like `en` or `en-US` |
| <I18N>        | fallbackLang   | String, the language to be used as fallback, like `en` or `en-US`  If `none`, the string will be ommited in case it was not found in any dictionary |
| <Label>       | className      | A className, so you can customize it |
| <Label>       | term*          | The term to be found in dictionaries |
| <Label>       | val            | Used to decide if it is plural or singular |
| <Label>       | jointType      | Used to know how to join lists with their last item.  May be 'and', 'or' or 'none (default is 'and') |
| <Label>       | anyOtherProp   | Any other property will be passed to be used as variables |

#### Dictionary

In your dictionaries:  
(* means mandatory)

| Element       | Prop           | Val                      |
| ------------- |----------------|--------------------------|
| DictionaryObj | id*            | An id for the dictionary |
| DictionaryObj | version        | A version for the dictionary |
| DictionaryObj | langs          | The languages object containing the languages and their terms |
| 
| langs         | world          | A fallback for terms not found specialized in other languages. May be used for shared terms |
| langs         | langId         | Any language id, like `en` or `en-US`.  Its value must be an _Object_ |
| langObject    | joints          | An array with three items: `the coma`, `the and` and `the or` representations for lists|
| langObject    | terms          | May be a _String_ for that term in the given language, or an Array with two items, the first for the singular value, the second for the plural representation of the value |
