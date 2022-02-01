import { useEffect, useState } from 'react'
import Layout from '../components/common/Layout'
import Container from '../components/common/Container'
import { BsMic } from 'react-icons/bs'
import { Audio } from 'svg-loaders-react'
import { GiSpeaker } from 'react-icons/gi'
import { MdContentCopy } from 'react-icons/md'

let SpeechRecognition
let recognition

const Home = () => {
  const [text, setText] = useState('Tap Button to Start')
  const [isListening, setIsListening] = useState(false)

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
      setText('Recording Audio ...')
    }

    recognition.onresult = (event) => {
      console.log(event)
      const current = event.resultIndex
      const transcript = event.results[current][0].transcript
      setText(transcript)
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
    navigator.clipboard.writeText(text)
  }

  return (
    <Layout>
      <Container>
        <div className='h-screen flex flex-col justify-center items-center '>
          <div className='py-16'>
            <h3 className='text-gray-100 text-xl'>{text}</h3>
          </div>
          <div className='flex justify-center space-x-4 pb-4'>
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
          <button
            type='button'
            onClick={handleListen}
            className='bg-fuchsia-600 shadow-sm hover:shadow-md shadow-fuchsia-500/20 p-6 rounded-full'
          >
            {!isListening ? (
              <BsMic className='text-gray-100 text-4xl' />
            ) : (
              <Audio className='fill-gray-100 h-10 w-10 ' />
            )}
          </button>
        </div>
      </Container>
    </Layout>
  )
}

export default Home
