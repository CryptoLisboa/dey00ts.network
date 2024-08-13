export const getSkillButtonStyles = (skillName: string) => {
  const formattedSkillName = skillName.toLowerCase().replace(/ /g, '-')
  return {
    color: `var(--color-${formattedSkillName})`,
    borderColor: `var(--color-${formattedSkillName})`,
  }
}
