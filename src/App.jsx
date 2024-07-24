import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [numbers, setNumbers] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState('')

  //ref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbers) str += "0123456789"
    if(charAllowed) str += "!@#$%^&.*()_+"

    for(let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  } , [length, numbers, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(passwordRef.current.value)
  }
  , [passwordRef])

  useEffect(() => {
    passwordGenerator()
  }, [passwordGenerator, length, numbers, charAllowed])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-400 bg-gray-800'> Password Generator
      <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
        <input 
        type="text"
        value={Password}
        className='w-full px-4 py-2 text-gray-700 bg-gray-200'
        placeholder= "Password"
        readOnly 
        ref={passwordRef}
        />
        <button 
        onClick={copyPasswordToClipboard}
        className = "outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" >Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input 
          type="range"
          min={8}
          max={26}
          value={length}
          className='cursor-pointer'
          onChange={ (e) => {setLength(e.target.value)}}
          />
          <label>Numbers : {length}</label>
        </div>
        <div className='flex text-sm gap-x-2'>
          <input type="checkbox"
          defaultChecked = {numbers}
          id="numberInput"
          onChange={() => {
          setNumbers((prev) => !prev);
          }}
          />
          <label>Numbers</label>
        </div>
        <div className='flex text-sm gap-x-2'>
          <input type="checkbox"
          defaultChecked = {charAllowed}
          id="charInput"
          onChange={() => {
          setCharAllowed((prev) => !prev);
          }}
          />
          <label>Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
