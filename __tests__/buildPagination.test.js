import { expect, test } from '@jest/globals'

import { buildSchemePagination } from '../src/utils/buildPagination'

test('Test function buildSchemePagination', () => {
    expect(buildSchemePagination(1, 1)).toBeNull()
    expect(buildSchemePagination(1, 2)).toEqual([1, 2])
    expect(buildSchemePagination(1, 3)).toEqual([1, 2, 3])
    expect(buildSchemePagination(2, 4)).toEqual([1, 2, 3, 4])
    expect(buildSchemePagination(4, 9)).toEqual([1, '...', 3, 4, 5, '...', 9])
    expect(buildSchemePagination(9, 9)).toEqual([1, '...', 8, 9])
})