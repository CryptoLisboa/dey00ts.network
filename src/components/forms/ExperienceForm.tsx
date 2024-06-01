'use client'
import AuthContext from '@/providers/AuthContext'
import { Experience } from '@/types/app.types'
import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Switch,
} from '@nextui-org/react'
import { Formik, FormikHelpers } from 'formik'
import { useContext } from 'react'
import { parseDate, getLocalTimeZone } from '@internationalized/date'
import { SKILLS } from '@/constants/app.constants'

export default function ExperienceForm({
  onRemoveExperience,
  index,
}: {
  onRemoveExperience: () => void
  index: number
}) {
  const { setSignupData, signupData } = useContext(AuthContext)

  return (
    <Formik
      initialValues={{
        company: '',
        skill: '',
        role: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        current: false,
        index,
      }}
      onSubmit={(
        values: Experience,
        { setSubmitting }: FormikHelpers<Experience>
      ) => {
        if (signupData?.experiences?.some((exp) => exp.index === index)) {
          setSignupData({
            ...signupData,
            experiences: [
              ...(signupData?.experiences || []).filter(
                (exp) => exp.index !== index
              ),
              { ...values, index },
            ],
          })
        } else {
          setSignupData({
            ...signupData,
            experiences: [
              ...(signupData?.experiences || []),
              { ...values, index },
            ],
          })
        }
        setSubmitting(false)
      }}
    >
      {({ values, handleChange, setFieldValue, handleSubmit, submitForm }) => {
        return (
          <form className='grid gap-y-4 w-full' onSubmit={handleSubmit}>
            <Input
              key='Project name'
              variant='bordered'
              name='company'
              value={values.company}
              onChange={(...args) => {
                handleChange(...args)
                submitForm()
              }}
              placeholder='xyz'
              className='text-[#D9D9D9] border-[#AFE5FF]'
              size='lg'
              labelPlacement='outside'
              label='Project name'
            />
            <Select
              key='Skill'
              variant='bordered'
              name='skill'
              value={values.skill}
              onChange={(...args) => {
                handleChange(...args)
                submitForm()
              }}
              placeholder='select a base skill'
              className='text-[#D9D9D9] border-[#AFE5FF]'
              size='lg'
              labelPlacement='outside'
              label='Skill'
            >
              {SKILLS.map(({ name, color, id }) => (
                <SelectItem key={id} style={{ color: color }} value={id}>
                  {name}
                </SelectItem>
              ))}
            </Select>
            <Input
              key='Role'
              variant='bordered'
              value={values.role}
              onChange={(...args) => {
                handleChange(...args)
                submitForm()
              }}
              name='role'
              placeholder='magician'
              className='text-[#D9D9D9] border-[#AFE5FF]'
              size='lg'
              labelPlacement='outside'
              label='Role'
            />
            <Input
              key='Description'
              variant='bordered'
              value={values.description}
              onChange={(...args) => {
                handleChange(...args)
                submitForm()
              }}
              name='description'
              placeholder='mad stuff here'
              className='text-[#D9D9D9] border-[#AFE5FF]'
              size='lg'
              labelPlacement='outside'
              label='Description'
            />
            <div className='grid grid-cols-2 gap-x-6'>
              <DatePicker
                labelPlacement='outside'
                label={'Start'}
                name='startDate'
                value={parseDate(
                  new Date(values.startDate).toLocaleDateString('en-CA')
                )}
                onChange={(value) => {
                  setFieldValue('startDate', value.toDate(getLocalTimeZone()))
                  submitForm()
                }}
                variant='bordered'
                classNames={{
                  label: 'text-left',
                }}
              />
              <DatePicker
                labelPlacement='outside'
                label={'End'}
                name='endDate'
                value={parseDate(
                  new Date(values.endDate).toLocaleDateString('en-CA')
                )}
                onChange={(value) => {
                  setFieldValue('endDate', value.toDate(getLocalTimeZone()))
                  submitForm()
                }}
                variant='bordered'
                classNames={{
                  label: 'text-left',
                }}
                isDisabled={values.current}
              />
            </div>

            <div className='w-full flex flex-row justify-between gap-x-4 content-center'>
              <Button
                className='text-center text-base'
                variant='solid'
                color='danger'
                size='sm'
                onClick={onRemoveExperience}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                  />
                </svg>
              </Button>
              <div className='flex flex-row'>
                <div className='text-base text-left'>Current</div>
                <Switch
                  name='current'
                  aria-label='current work'
                  isSelected={values.current}
                  onChange={(...args) => {
                    handleChange(...args)
                    submitForm()
                  }}
                />
              </div>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}
