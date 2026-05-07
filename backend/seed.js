const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')
const { randomUUID } = require('crypto')
const { write } = require('./db')

async function seed() {
  const now = () => new Date().toISOString()

  // ── Users ────────────────────────────────────────────────────────────────
  const mainUser = {
    id: randomUUID(), createdAt: now(),
    name: 'Shivansh Soni',
    email: 'shivanshsoni@umass.edu',
    passwordHash: await bcrypt.hash('password123', 10),
    phone: '413-555-0101',
    avatar: '',
    social: { facebook: 'shivansh.soni', instagram: 'shivansh_soni', snapchat: '' },
  }

  const extraUsers = [
    { name: 'Sara Ahmed',  email: 'sara@umass.edu',   social: { facebook: 'sara.ahmed', instagram: 'sara_ahmed', snapchat: 'sara_snap' } },
    { name: 'Ben Kim',     email: 'ben@umass.edu',    social: { facebook: '', instagram: 'benkim_ece', snapchat: 'benkim' } },
    { name: 'Priya Patel', email: 'priya@umass.edu',  social: { facebook: 'priya.patel', instagram: '', snapchat: '' } },
    { name: 'Jordan Lee',  email: 'jordan@umass.edu', social: { facebook: '', instagram: 'jordan.lee', snapchat: 'j_lee' } },
    { name: 'Maya Torres', email: 'maya@umass.edu',   social: { facebook: 'maya.torres', instagram: 'maya_t', snapchat: '' } },
  ].map(u => ({
    id: randomUUID(), createdAt: now(),
    passwordHash: '$2a$10$placeholder',
    phone: '', avatar: '',
    ...u,
  }))

  const allUsers = [mainUser, ...extraUsers]

  // ── Listings ─────────────────────────────────────────────────────────────
  const listings = [
    { title: 'Sunny 2BR near UMass',         address: '123 N Pleasant St, Amherst MA',    price: 950,  beds: 2, baths: 1, sqft: 780,  available: '2026-08-01', amenities: ['WiFi', 'Laundry', 'Parking'],              pets: false, verified: true  },
    { title: 'Studio on Fearing St',          address: '45 Fearing St, Amherst MA',        price: 750,  beds: 1, baths: 1, sqft: 420,  available: '2026-08-15', amenities: ['WiFi', 'Utilities Included'],               pets: false, verified: true  },
    { title: 'Spacious 3BR – walk to bus',    address: '8 Meadow St, Amherst MA',          price: 1100, beds: 3, baths: 2, sqft: 1050, available: '2026-09-01', amenities: ['Parking', 'Laundry', 'Dishwasher'],         pets: true,  verified: false },
    { title: 'Cozy 1BR – utilities incl.',    address: '200 Triangle St, Amherst MA',      price: 875,  beds: 1, baths: 1, sqft: 500,  available: '2026-08-01', amenities: ['WiFi', 'Utilities Included', 'AC'],         pets: false, verified: true  },
    { title: '4BR House – prime location',    address: '14 Sunset Ave, Northampton MA',    price: 1400, beds: 4, baths: 2, sqft: 1600, available: '2026-08-01', amenities: ['Parking', 'Backyard', 'Laundry'],           pets: true,  verified: true  },
    { title: 'Modern 2BR – newly renovated',  address: '77 Orchard St, Amherst MA',        price: 1050, beds: 2, baths: 1, sqft: 850,  available: '2026-09-01', amenities: ['WiFi', 'AC', 'Dishwasher'],                 pets: false, verified: false },
    { title: 'Budget Studio – near PVTA',     address: '300 East Pleasant St, Amherst MA', price: 650,  beds: 1, baths: 1, sqft: 380,  available: '2026-08-15', amenities: ['WiFi', 'Utilities Included'],               pets: false, verified: true  },
    { title: '2BR with private parking',      address: '56 Shays St, Amherst MA',          price: 980,  beds: 2, baths: 1, sqft: 720,  available: '2026-08-01', amenities: ['Parking', 'Laundry', 'WiFi'],               pets: false, verified: true  },
    { title: '3BR Victorian near downtown',   address: '19 Lessey St, Amherst MA',         price: 1250, beds: 3, baths: 2, sqft: 1100, available: '2026-09-01', amenities: ['Parking', 'Laundry', 'Backyard', 'WiFi'],   pets: true,  verified: false },
  ].map((l, i) => ({
    id: randomUUID(), createdAt: now(),
    ownerId: allUsers[i % allUsers.length].id,
    description: `Great place for UMass students. ${l.amenities.join(', ')} included.`,
    photos: [],
    contact: { name: allUsers[i % allUsers.length].name, email: allUsers[i % allUsers.length].email, phone: '413-555-0100' },
    ...l,
  }))

  // ── Roommate Profiles ─────────────────────────────────────────────────────
  const roommateProfiles = [
    { sleep: 'night_owl',  cleanliness: 4, noise: 2, smoking: false, pets: false, guests: 'rarely',       study: 'home',    hobbies: ['gaming', 'music'],        bio: 'CS senior, looking for a quiet place to grind.',        budget: '$700–$900',  moveIn: '2026-08-01' },
    { sleep: 'early_bird', cleanliness: 5, noise: 1, smoking: false, pets: true,  guests: 'occasionally', study: 'library', hobbies: ['hiking', 'cooking'],       bio: 'ECE student, early riser, love the outdoors.',          budget: '$800–$1000', moveIn: '2026-08-15' },
    { sleep: 'flexible',   cleanliness: 3, noise: 3, smoking: false, pets: false, guests: 'often',        study: 'cafe',    hobbies: ['art', 'yoga', 'cooking'],  bio: 'Fine Arts junior, social but respect boundaries.',      budget: '$650–$850',  moveIn: '2026-09-01' },
    { sleep: 'night_owl',  cleanliness: 3, noise: 4, smoking: false, pets: false, guests: 'occasionally', study: 'home',    hobbies: ['music', 'gaming', 'art'],  bio: 'Music major, I play guitar (with headphones at night).', budget: '$750–$950',  moveIn: '2026-08-01' },
    { sleep: 'early_bird', cleanliness: 4, noise: 2, smoking: false, pets: true,  guests: 'rarely',       study: 'library', hobbies: ['hiking', 'reading'],       bio: 'Biology grad student, very clean, love quiet evenings.', budget: '$800–$1100', moveIn: '2026-08-01' },
    { sleep: 'flexible',   cleanliness: 2, noise: 4, smoking: false, pets: false, guests: 'often',        study: 'cafe',    hobbies: ['cooking', 'yoga', 'gaming'],bio: 'Comm major, laid-back, often has friends over.',        budget: '$600–$800',  moveIn: '2026-09-01' },
  ].map((data, i) => ({
    id: randomUUID(), createdAt: now(),
    userId: allUsers[i].id,
    ...data,
  }))

  write({
    users: allUsers,
    listings,
    roommateProfiles,
    savedListings: [],
    savedRoommates: [],
    reports: [],
  })

  console.log(`Seeded: ${allUsers.length} users, ${listings.length} listings, ${roommateProfiles.length} roommate profiles`)
  console.log(`Demo login: shivanshsoni@umass.edu / password123`)
}

seed().catch(console.error)
