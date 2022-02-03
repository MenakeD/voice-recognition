import { useEffect } from 'react'

const Toast = ({ alert, setAlert, duration }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setAlert('')
    }, duration)
    return () => {
      clearInterval(interval)
    }
  }, [duration, setAlert])

  return (
    <div className='w-full flex justify-center'>
      <div className='bg-gray-100   fixed bottom-0 px-4 rounded py-2 mb-12'>
        <p>{alert}</p>
      </div>
    </div>
  )
}

export default Toast
