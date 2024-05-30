'use client'
import AuthContext from '@/providers/AuthContext'
import { Experience } from '@/types/app.types'
import { Button, DatePicker, Input, Progress, Switch } from '@nextui-org/react'
import { Formik, FormikHelpers } from 'formik'
import { useContext } from 'react'
import { parseDate, getLocalTimeZone } from '@internationalized/date'

export default function ExperienceForm({
  onRemoveExperience,
}: {
  onRemoveExperience: () => void
}) {
  const { setSignupData, signupData } = useContext(AuthContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    })
  }

  // let formatter = useDateFormatter({ dateStyle: 'full' })
  // const startDateFormatted =   formatter.format(value.toDate(getLocalTimeZone())) : "--"}
  return (
    <Formik
      initialValues={{
        role: '',
        startDate: new Date(),
        endDate: new Date(),
        current: false,
        projectName: '',
      }}
      onSubmit={(
        values: Experience,
        { setSubmitting }: FormikHelpers<Experience>
      ) => {
        setSignupData({
          ...signupData,
          experiences: [...(signupData?.experiences || []), values],
        })
        setSubmitting(false)
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2))
        //   setSubmitting(false)
        // }, 500)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form className='grid gap-y-4 w-full' onSubmit={handleSubmit}>
          <Input
            key='Project name'
            variant='bordered'
            name='projectName'
            value={values.projectName}
            onChange={handleChange}
            placeholder='xyz'
            className='text-[#D9D9D9] border-[#AFE5FF]'
            size='lg'
            labelPlacement='outside'
            label='Project name'
          />
          <Input
            key='Role'
            variant='bordered'
            value={values.role}
            onChange={handleChange}
            name='role'
            placeholder='magician'
            className='text-[#D9D9D9] border-[#AFE5FF]'
            size='lg'
            labelPlacement='outside'
            label='Role'
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
              }}
              // value={values.startDate}
              // onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='w-full flex flex-row justify-between gap-x-4 content-center'>
            <div className='w-full flex flex-row justify-between items-center mt-6'>
              <div className='text-base text-left'>Save</div>
              <Button
                className='text-center text-base'
                variant='solid'
                color='success'
                size='md'
                type='submit'
                // onClick={onAddExperience}
              >
                +
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  )
}
