import { useEffect, useState } from 'react'
import Layout from '../components/common/Layout'
import Container from '../components/common/Container'
import { BsMic } from 'react-icons/bs'
import { Audio } from 'svg-loaders-react'
import { GiSpeaker } from 'react-icons/gi'
import { MdContentCopy } from 'react-icons/md'
import { HiX } from 'react-icons/hi'
import Toast from '../components/common/Toast'

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

    recognition.onnomatch = () => {
      setAlert('Speech not recognized')
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
              {text || (isListening ? 'Listening ...' : 'Tap Button to Start')}
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
            <div className='flex justify-center space-x-6 pt-2 pb-8'>
              <HiX
                className='text-gray-100 text-3xl cursor-pointer hover:scale-95 hover:text-red-400 transition-all duration-300 ease-in'
                onClick={() => {
                  setText('')
                }}
              />
              <GiSpeaker
                className='text-gray-100 text-3xl cursor-pointer hover:text-green-400 hover:scale-95 transition-all duration-300 ease-in'
                onClick={() => {
                  readMessage(text)
                }}
              />
              <MdContentCopy
                className='text-gray-100 text-3xl p-0.5 hover:text-blue-400 cursor-pointer hover:scale-95 transition-all duration-300 ease-in'
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
      {alert && <Toast alert={alert} setAlert={setAlert} duration={3000} />}
    </Layout>
  )
}

export default Home
