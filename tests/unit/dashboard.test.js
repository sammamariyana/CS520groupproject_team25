// Tests the pure state logic used in the Dashboard page

const initialListings = [
  { id: 1, price: '$900/mo',  address: '123 N Pleasant St', beds: 2, notes: 'Great location!' },
  { id: 2, price: '$750/mo',  address: '45 Fearing St',     beds: 1, notes: '' },
  { id: 3, price: '$1100/mo', address: '8 Meadow St',       beds: 3, notes: 'Check with roommates' },
]

const initialRoommates = [
  { id: 1, name: 'Sara A.', major: 'Computer Science', notes: '' },
  { id: 2, name: 'Maya R.', major: 'Biology',          notes: 'Great fit!' },
]

function removeListing(listings, id) {
  return listings.filter(l => l.id !== id)
}

function removeRoommate(roommates, id) {
  return roommates.filter(r => r.id !== id)
}

function updateNote(items, id, note) {
  return items.map(item => item.id === id ? { ...item, notes: note } : item)
}

describe('Dashboard — remove saved listing', () => {
  it('removes the correct listing by id', () => {
    const result = removeListing(initialListings, 2)
    expect(result.length).toBe(2)
    expect(result.find(l => l.id === 2)).toBeUndefined()
  })

  it('does not remove other listings', () => {
    const result = removeListing(initialListings, 2)
    expect(result.find(l => l.id === 1)).toBeDefined()
    expect(result.find(l => l.id === 3)).toBeDefined()
  })

  it('returns empty array when last listing is removed', () => {
    let list = [...initialListings]
    list = removeListing(list, 1)
    list = removeListing(list, 2)
    list = removeListing(list, 3)
    expect(list.length).toBe(0)
  })
})

describe('Dashboard — remove saved roommate', () => {
  it('removes the correct roommate by id', () => {
    const result = removeRoommate(initialRoommates, 1)
    expect(result.length).toBe(1)
    expect(result.find(r => r.id === 1)).toBeUndefined()
    expect(result.find(r => r.id === 2)).toBeDefined()
  })
})

describe('Dashboard — update note on saved listing', () => {
  it('updates the note for the correct listing', () => {
    const result = updateNote(initialListings, 2, 'Updated note')
    expect(result.find(l => l.id === 2).notes).toBe('Updated note')
  })

  it('does not modify other listings', () => {
    const result = updateNote(initialListings, 2, 'New note')
    expect(result.find(l => l.id === 1).notes).toBe('Great location!')
    expect(result.find(l => l.id === 3).notes).toBe('Check with roommates')
  })

  it('can clear a note by setting it to empty string', () => {
    const result = updateNote(initialListings, 1, '')
    expect(result.find(l => l.id === 1).notes).toBe('')
  })
})
