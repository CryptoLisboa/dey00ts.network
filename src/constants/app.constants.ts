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
]

// define a type for the skill names
export type SkillNames = (typeof SKILLS)[number]['name']
