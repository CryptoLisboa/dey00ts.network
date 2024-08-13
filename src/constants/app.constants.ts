// define the type for a skill
export type Skill = {
  name: string
  color: string
  id: number
}

// define the constant array of skills
export const SKILLS: Skill[] = [
  { name: 'Alpha Caller', color: '#BD8BFF', id: 1 },
  { name: 'Collab Manager', color: '#06F0FF', id: 2 },
  { name: 'Community Builder', color: '#FF6B6B', id: 3 },
  { name: 'Sol Dev', color: '#FFC9DF', id: 4 },
  { name: 'Content Creator', color: '#1BCEA3', id: 5 },
  { name: 'EVM Dev', color: '#FFFF75', id: 6 },
  { name: 'Full Stack', color: '#FFA500', id: 7 },
  { name: 'Space Host', color: '#3792FF', id: 8 },
  { name: 'Video Editing', color: '#6a4c93', id: 9 },
  { name: 'Graphic Design', color: '#ffca3a', id: 10 },
  { name: 'Artist', color: '#8ac926', id: 11 },
  { name: 'UX/UI Designer', color: '#f4a261', id: 12 },
  { name: 'Writer', color: '#800020', id: 13 },
]

// define a type for the skill names
export type SkillNames = (typeof SKILLS)[number]['name']
export type SkillIds = (typeof SKILLS)[number]['id']

export type Gender = {
  name: string
  id: number
}

export const GENDERS: Gender[] = [
  { name: 'Male', id: 1 },
  { name: 'Female', id: 2 },
  { name: 'Other', id: 3 },
  { name: 'Prefer not to say', id: 4 },
]

export type GenderNames = (typeof GENDERS)[number]['name']

export const SEARCH_PAGE_SIZE = 12
