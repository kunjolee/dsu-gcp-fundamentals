export const createSlug = (str) => str.split(' ').join('-').toLowerCase();

export const capitalizeLetter = ( str = '' ) => str.slice( 0, 1 ).toUpperCase() + str.slice(1)