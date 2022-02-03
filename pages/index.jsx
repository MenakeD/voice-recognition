import { useEffect, useState } from 'react'
import Layout from '../components/common/Layout'
import Container from '../components/common/Container'
import { BsMic } from 'react-icons/bs'
import { Audio } from 'svg-loaders-react'
import { GiSpeaker } from 'react-icons/gi'
import { MdContentCopy } from 'react-icons/md'
import { HiX } from 'react-icons/hi'

let SpeechRecognition, recognition

const Home = () => {
  const [text, setText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [confidence, setConfidence] = useState(0)
  const [alert, setAlert] = useState('')

  useEffect(() => {
    SpeechRecognition =
      window.speechRecognition || window.webkitSpeechRecognition
    recognition = new SpeechRecognition()
  }, [])

  const handleListen = () => {
    recognition.start()

    recognition.onstart = () => {
      console.log('Voice recognition activated')
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      console.log(event)
      const current = event.resultIndex
      const transcript = event.results[current][0].transcript
      const confidence = event.results[current][0].confidence
      setText(transcript)
      setConfidence(Math.round(confidence * 100))
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }
  }

  const readMessage = (message) => {
    const speech = new SpeechSynthesisUtterance()
    speech.text = message
    speech.volume = 1
    speech.rate = 1
    speech.pitch = 1

    window.speechSynthesis.speak(speech)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setAlert('Copied to Clipboard')
    })
  }

  return (
    <Layout>
      <Container>
        <div className='h-screen flex flex-col justify-center items-center '>
          <div className='pt-16 pb-10'>
            <h3 className='text-gray-100 text-3xl text-center'>
              {text ||
                (isListening ? 'Recording Audio ...' : 'Tap Button to Start')}
            </h3>
            {text && (
              <p className='text-gray-200 text-sm pt-5 text-center'>
                Confidence:{' '}
                <span className='text-fuchsia-500 font-medium'>
                  {confidence}%
                </span>
              </p>
            )}
          </div>
          {text && (
            <div className='flex justify-center space-x-4 pb-8'>
              <HiX
                className='text-gray-100 text-2xl cursor-pointer'
                onClick={() => {
                  setText('')
                }}
              />
              <GiSpeaker
                className='text-gray-100 text-2xl cursor-pointer'
                onClick={() => {
                  readMessage(text)
                }}
              />
              <MdContentCopy
                className='text-gray-100 text-2xl p-0.5 cursor-pointer'
                onClick={copyToClipboard}
              />
            </div>
          )}

          <button
            type='button'
            onClick={() => {
              if (!isListening) {
                setText('')
                handleListen()
              } else {
                recognition.abort()
              }
            }}
            className='bg-fuchsia-600 opacity-80 hover:opacity-90 border-2 border-fuchsia-600 p-6 rounded-full transition-all duration-300 ease-in'
          >
            {!isListening ? (
              <BsMic className='text-gray-100 text-4xl' />
            ) : (
              <Audio className='fill-gray-100 h-9 w-9 ' />
            )}
          </button>
        </div>
      </Container>
      {alert && (
        <div className='w-full flex justify-center'>
          <div className='bg-gray-100  fixed bottom-0 px-4 rounded py-2 mb-12'>
            <p>{alert}</p>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Home
