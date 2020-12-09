import normalize from '../dist/index.js'

const testGroups = {
    'gmail': {
        'some.thing@gmail.com': 'something@gmail.com',
    },
    'microsoft': {
        'something+else@outlook.com': 'something@outlook.com',
        'something-else@outlook.com': 'something-else@outlook.com',
    },
    'yahoo': {
        'something+else@yahoo.com': 'something+else@yahoo.com',
        'something-else@yahoo.com': 'something@yahoo.com',
    },
    'apple': {
        'something+else@icloud.com': 'something@icloud.com',
    },
    'protonmail': {
        'something+else@protonmail.ch': 'something@protonmail.ch',
    },
    'rackspace': {
        'something+else@emailsrvr.com': 'something@emailsrvr.com',
    },
    'yandex': {
        'something+else@yandex.ru': 'something@yandex.ru',
    },
    'zoho': {
        'something+else@zoho.com': 'something@zoho.com',
    },
    'fastmail': {
        'something+else@fastmail.com': 'something@fastmail.com',
    },
    'other': {
        'something+else@test.com': 'something+else@test.com',
    },
}

// Test all groups
Object.keys(testGroups).forEach(testGroupKey => {
    describe(`Running ${testGroupKey} tests`, () => {

        // Get tests for the group
        const testValues = testGroups[testGroupKey]

        // Run all tests in group
        Object.keys(testValues).forEach(testKey => {
            const testValue = testValues[testKey]
            test(`testing ${testKey} => ${testValue}`, () => {
                expect(normalize(testKey)).toBe(testValue);
            });
        })
    });
})





