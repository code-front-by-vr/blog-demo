import { expect, test } from '@jest/globals'

function pow(a, b) {
    return a ** b
}

function calcSumArr(arr) {
    for (let item of arr) {
        if (typeof item !== 'number' || isNaN(item)) {
            return null
        }
    }
    let sum = 0
    for (let item of arr) {
        sum += item
    }
    return sum
}

function mappedUsers(users) {
    return users.map((user, index) => `member ${index + 1}: ${user}`)
}

test('test function pow', () => {
    expect(pow(2, 3)).toBe(8)
    expect(pow(3, 3)).toBe(27)
    expect(pow(2, -2)).toBe(0.25)
})

test('test function calcSumArr', () => {
    expect(calcSumArr([2, 5, 1, 3])).toBe(11)
    expect(calcSumArr([2, 5, true, 3])).toBeNull()

})

test('Test function mappedUsers', () => {
    expect(mappedUsers(['Darya', 'Masha', 'Denis', 'Vitaliy', 'Polina', 'Anton'])).toEqual([
        'member 1: Darya',
        'member 2: Masha',
        'member 3: Denis',
        'member 4: Vitaliy',
        'member 5: Polina',
        'member 6: Anton'
    ])
})