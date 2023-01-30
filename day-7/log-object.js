const { inspect } = require('util');

const obj = {
    '/': {
        'a': {
            'type': 'dir',
            'name': 'a',
            'size': 0,
            'parent': '/',
            'children': []
        },
        'd': {
            'type': 'dir',
            'name': 'a',
            'size': 0,
            'parent': '/',
            'children': []
        }
    }
}


const output = inspect(obj, {
    depth: null,
    colorize: true,
    // sorted: true
})

console.log(output);