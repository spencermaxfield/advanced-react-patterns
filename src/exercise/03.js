// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext();

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return <ToggleContext.Provider value={{on, toggle}} children={children}/>;
}

function useToggle() {
  const context = React.useContext(ToggleContext);

  if (context === undefined) {
    throw new Error(`useToggle must be used within a ToggleContext.Provider`)
  }
  return context
}

function ToggleOn({children}) {
  const context = useToggle();
  return context.on ? children : null
}

function ToggleOff({children}) {
  const context = useToggle();
  return context.on ? null : children
}

function ToggleButton(props) {
  const context = useToggle();
  return <Switch on={context.on} onClick={context.toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
