import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { getSkillButtonStyles } from '@/utils/button'
import { ROUTING } from '@/constants/routing.contants'

interface SkillButtonProps {
  id: number
  name: string
  withDot?: boolean
}

const SkillButton: React.FC<SkillButtonProps> = ({
  id,
  name,
  withDot = true,
}) => {
  return (
    <Button
      key={id}
      className='bg-transparent border-1 rounded border-full-stack text-sm font-offbit font-bold py-2 px-4'
      style={getSkillButtonStyles(name)}
      as={Link}
      href={`${ROUTING.APP}&skills=${id}`}
      size='sm'
    >
      {withDot && <span className='text-white'>•</span>}
      {name}
    </Button>
  )
}

export default SkillButton
