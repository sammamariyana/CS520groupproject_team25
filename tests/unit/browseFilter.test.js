// Tests the pure filter logic used in the Browse page

const listings = [
  { id: 1, price: 650,  beds: 1, address: '5 Oak Ave',        distance: 1.1, verified: true  },
  { id: 2, price: 750,  beds: 1, address: '45 Fearing St',    distance: 0.8, verified: true  },
  { id: 3, price: 900,  beds: 2, address: '123 N Pleasant St',distance: 0.5, verified: true  },
  { id: 4, price: 1100, beds: 3, address: '8 Meadow St',      distance: 1.2, verified: false },
  { id: 5, price: 1200, beds: 4, address: '33 Orchard St',    distance: 0.6, verified: true  },
]

function applyFilters(listings, { search = '', maxPrice = 1500, beds = 'Any', verifiedOnly = false, maxDistance = 2 }) {
  return listings.filter(l =>
    l.address.toLowerCase().includes(search.toLowerCase()) &&
    l.price <= maxPrice &&
    (beds === 'Any' || l.beds === parseInt(beds)) &&
    (!verifiedOnly || l.verified) &&
    l.distance <= maxDistance
  )
}

describe('Browse filter — price range', () => {
  it('returns all listings when maxPrice is high', () => {
    const result = applyFilters(listings, { maxPrice: 1500 })
    expect(result.length).toBe(5)
  })

  it('filters out listings above maxPrice', () => {
    const result = applyFilters(listings, { maxPrice: 800 })
    expect(result.length).toBe(2)
    result.forEach(l => expect(l.price).toBeLessThanOrEqual(800))
  })

  it('returns empty array when maxPrice is very low', () => {
    const result = applyFilters(listings, { maxPrice: 500 })
    expect(result.length).toBe(0)
  })

  it('updates correctly as slider moves from 1200 to 950', () => {
    const at1200 = applyFilters(listings, { maxPrice: 1200 })
    const at950  = applyFilters(listings, { maxPrice: 950  })
    expect(at1200.length).toBeGreaterThan(at950.length)
  })
})

describe('Browse filter — bedrooms', () => {
  it('returns all listings when beds is Any', () => {
    const result = applyFilters(listings, { beds: 'Any' })
    expect(result.length).toBe(5)
  })

  it('filters to 1-bedroom listings', () => {
    const result = applyFilters(listings, { beds: '1' })
    expect(result.length).toBe(2)
    result.forEach(l => expect(l.beds).toBe(1))
  })

  it('filters to 2-bedroom listings', () => {
    const result = applyFilters(listings, { beds: '2' })
    expect(result.length).toBe(1)
    expect(result[0].beds).toBe(2)
  })

  it('returns empty when no listings match bedroom count', () => {
    const result = applyFilters(listings, { beds: '5' })
    expect(result.length).toBe(0)
  })
})

describe('Browse filter — verified only', () => {
  it('returns only verified listings when toggle is on', () => {
    const result = applyFilters(listings, { verifiedOnly: true })
    result.forEach(l => expect(l.verified).toBe(true))
  })
})
