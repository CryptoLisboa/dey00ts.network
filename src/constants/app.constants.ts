// define the type for a skill
export type Skill = {
  name: string
  color: string
}

// define the constant array of skills
export const SKILLS: Skill[] = [
  { name: 'Alpha Caller', color: '#BD8BFF' },
  { name: 'Collab Manager', color: '#06F0FF' },
  { name: 'Community Builder', color: '#FF6B6B' },
  { name: 'Sol Dev', color: '#FFC9DF' },
  { name: 'Content Creator', color: '#1BCEA3' },
  { name: 'EVM Dev', color: '#FFFF75' },
  { name: 'Full Stack', color: '#FFA500' },
  { name: 'Space Host', color: '#3792FF' },
]

// define a type for the skill names
export type SkillNames = (typeof SKILLS)[number]['name']
