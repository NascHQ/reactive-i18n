
const dictionary = {
    id: 'demo-dict',
    version: '1',
    langs: {
        pt: {
            choseLang: 'Escolha o idioma',
            hi: 'Olá ',
            joints: [', ', ' e ', ' ou '],
            friends: [
                'meu amigo ${friends}',
                'meus ${val} amigos ${friends}'
            ]
        },
        en: {
            choseLang: 'Choose the language',
            hi: 'Hello ',
            joints: [', ', ' and ', ' or '],
            friends: [
                'my friend ${friends}',
                'my ${val} friends ${friends}'
            ]
        },
        es: {
            choseLang: 'Elija el idioma',
            hi: 'Hola ',
            joints: [', ', ' y ', ' o '],
            friends: [
                'mi amigo ${friends}',
                'mis ${val} amigos ${friends}'
            ]
        },
        'es-AR': {
            hi: 'Hola ',
            joints: [', ', ' y ', ' o ']
        },
        'ch': {
            choseLang: '选择种语言',
            hi: '你好，',
            friends: [
                '朋友 ${friends}',
                '我的${val}个朋友 ${friends}'
            ]
        }
    }
}

export default dictionary
