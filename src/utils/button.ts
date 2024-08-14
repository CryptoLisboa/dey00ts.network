export const getSkillButtonStyles = (skillName: string) => {
  const formattedSkillName = skillName.toLowerCase().replace(/ /g, '-')
  return {
    color: `white`,
    borderColor: `var(--color-${formattedSkillName})`,
    // textColor: 'white',
    backgroundColor: `var(--color-${formattedSkillName})`,
  }
}
