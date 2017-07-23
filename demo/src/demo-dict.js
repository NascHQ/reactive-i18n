
const dictionary = {
    id: 'demo-dict',
    version: '1',
    langs: {
        world: {
            birthDate: '${day}/${month}/${year}'
        },
        pt: {
            choseLang: 'Escolha o idioma',
            pickFriends: 'Selecione alguns amigos',
            hi: 'Olá ',
            joints: [', ', ' e ', ' ou '],
            friends: [
                'meu amigo ${friends}',
                'meus ${val} amigos ${friends}'
            ],
            formatedData: 'Data formatada: '
        },
        en: {
            choseLang: 'Choose the language',
            pickFriends: 'Choose some friends',
            hi: 'Hello ',
            joints: [', ', ' and ', ' or '],
            friends: [
                'my friend ${friends}',
                'my ${val} friends ${friends}'
            ],
            formatedData: 'Formated date: '
        },
        'en-US': {
            birthDate: '${month}/${day}/${year}'
        },
        es: {
            choseLang: 'Elija el idioma',
            pickFriends: 'Elija unos amigos',
            hi: 'Hola ',
            joints: [', ', ' y ', ' o '],
            friends: [
                'mi amigo ${friends}',
                'mis ${val} amigos ${friends}'
            ],
            formatedData: 'Fecha formateada: '
        },
        'es-AR': {
            hi: 'Hola ',
            joints: [', ', ' y ', ' o ']
        },
        'ch': {
            choseLang: '选择种语言',
            pickFriends: '选一个朋友',
            hi: '你好，',
            joints: [', ', ' 和 ', ' 要么 '],
            friends: [
                '朋友 ${friends}',
                '我的${val}个朋友 ${friends}'
            ],
            formatedData: '日期掩码: '
        }
    }
}

export default dictionary
