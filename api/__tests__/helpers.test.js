const Helpers = require ('../utils/helpers')

describe('helpers test',() => {
    test('check if function generates something', () => {
        expect(Helpers.generateUUID()).not.toBeUndefined();
    })
    test('check if generated is UUID', () => {
        expect(Helpers.generateUUID()).toMatch(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/);
    })
})

describe('limit tests',() => {
    test('requires one argument', () => {
        expect(Helpers.limitToten()).toBeUndefined();
    })
    test('if only accepts arrays', () => {
        expect(Helpers.limitToten('string voorbeeld')).toBeUndefined();
        expect(Helpers.limitToten([])).not.toBeUndefined();
    })
    test('if only return 10 items', () => {
        expect(Helpers.limitToten([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).length).toBe(10);
    })
})

describe('lengthCheck test', () => {
    test('de titel moet een string zijn', () => {
        expect(Helpers.checkTitleLength()).toBeFalsy();
        expect(Helpers.checkTitleLength(101)).toBeFalsy();
        expect(Helpers.checkTitleLength([])).toBeFalsy(); 
        expect(Helpers.checkTitleLength(null)).toBeFalsy();
        expect(Helpers.checkTitleLength(-56)).toBeFalsy();
    })
    test('checken dat de titel maximum 100 karakters heeft', () => {
        expect(Helpers.checkTitleLength("Hello world").length).toBeLessThanOrEqual(100);
        expect(Helpers.checkTitleLength("Dit is een te lange string die dus niet goedgekeurd zou moeten worden omdat het meer dan 100 karakters telt en daardoor kan het dus niet geaccepteerd worden in dit project")).toBeFalsy();
    })
})    


describe('opdracht delete checken',() => {
    test('check if function generates something', () => {
        expect(Helpers.generateUUID()).not.toBeUndefined();
    })
    test('check if de delete request alleen een UUID bevat', () => {
        expect(Helpers.generateUUID()).toMatch(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/);
    })
})