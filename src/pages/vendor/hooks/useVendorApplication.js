import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { vendorApplicationSchema } from '../../auth/validation/registerschema'
import axiosInstance from '../../../api/instance'

export const STEPS = ['Personal', 'Business', 'Store', 'Location', 'Review']

const STEP_FIELDS = [
  ['fullName'],
  ['businessName', 'businessType', 'businessEmail'],
  ['storeName', 'productCategory', 'expectedMonthlyRevenue'],
  ['country', 'state', 'address'],
  ['agreeToTerms', 'agreeToVendorPolicy'],
]

export function useVendorApplication() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(vendorApplicationSchema),
    defaultValues: {
      fullName: '',
      businessName: '',
      businessType: '',
      businessEmail: '',
      storeName: '',
      productCategory: '',
      expectedMonthlyRevenue: '',
      country: '',
      state: '',
      address: '',
      agreeToTerms: false,
      agreeToVendorPolicy: false,
    },
  })

  const nextStep = async () => {
    const valid = await trigger(STEP_FIELDS[step])
    if (valid) setStep((s) => s + 1)
  }

  const prevStep = () => setStep((s) => s - 1)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await axiosInstance.post('/vendor/apply', data)
      console.log(res.data);
      
      alert('vendor application successful')
    } catch (error) {
      alert(error.response?.data?.message || 'Submission failed. Please try again.')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const watchAll = watch()

  const reviewRows = [
    { label: 'Full Name',                value: watchAll.fullName },
    { label: 'Business Name',            value: watchAll.businessName },
    { label: 'Business Type',            value: watchAll.businessType?.replace(/_/g, ' ') },
    { label: 'Business Email',           value: watchAll.businessEmail },
    { label: 'Store Name',               value: watchAll.storeName },
    { label: 'Product Category',         value: watchAll.productCategory?.replace(/_/g, ' ') },
    { label: 'Expected Monthly Revenue', value: watchAll.expectedMonthlyRevenue?.replace(/_/g, ' ') },
    { label: 'Country',                  value: watchAll.country },
    { label: 'State / Province',         value: watchAll.state },
    { label: 'Address',                  value: watchAll.address },
  ]

  return {
    // form
    register,
    handleSubmit,
    errors,
    onSubmit,
    // steps
    step,
    nextStep,
    prevStep,
    isFirstStep: step === 0,
    isLastStep: step === STEPS.length - 1,
    // state
    loading,
    reviewRows,
  }
}