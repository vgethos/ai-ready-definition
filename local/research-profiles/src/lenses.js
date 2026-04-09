/**
 * Demographic lenses for filtering research participants.
 * Each lens defines a target segment and a filter function.
 */

/** @type {Record<string, {id: string, name: string, description: string, filter: (p: any) => boolean}>} */
const LENSES = {
  '55-plus': {
    id: '55-plus',
    name: '55+ year olds',
    description: 'Adults aged 55 and older exploring life insurance options',
    filter: (p) => p.age >= 55,
  },
};

/**
 * Returns a lens by id.
 * @param {string} id
 * @returns {object} The lens configuration
 * @throws {Error} If the lens id is not found
 */
function getLens(id) {
  const lens = LENSES[id];
  if (!lens) {
    throw new Error(`Unknown lens: "${id}". Available: ${Object.keys(LENSES).join(', ')}`);
  }
  return lens;
}

/**
 * Applies a lens filter to an array of participants.
 * @param {string} lensId
 * @param {Array<object>} participants
 * @returns {Array<object>} Filtered participants matching the lens criteria
 */
function filterParticipants(lensId, participants) {
  const lens = getLens(lensId);
  return participants.filter(lens.filter);
}

/**
 * Returns a display-friendly list of all available lenses.
 * @returns {Array<{id: string, name: string, description: string}>}
 */
function listLenses() {
  return Object.values(LENSES).map(({ id, name, description }) => ({ id, name, description }));
}

export { LENSES, getLens, filterParticipants, listLenses };
