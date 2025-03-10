import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'

// Remove if using CSS modules and directly add styles here or use external stylesheet
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  item: {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px',
    height: '300px',
    borderRadius: '16px',
    boxShadow: '0px 5px 20px rgba(0,0,0,0.1)',
    willChange: 'transform',
    cursor: 'grab',
  },
  av: {
    width: '100px',
    height: '100px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    justifySelf: 'center',
  },
  fg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    color: '#fff',
  },
}

const left = {
  bg: `linear-gradient(120deg, #f093fb 0%, #f5576c 100%)`,
  justifySelf: 'end',
}
const right = {
  bg: `linear-gradient(120deg, #96fbc4 0%, #f9f586 100%)`,
  justifySelf: 'start',
}

const Slider = ({ children }) => {
  const [{ x, bg, scale, justifySelf }, api] = useSpring(() => ({
    x: 0,
    scale: 1,
    ...left,
  }))
  const bind = useDrag(({ active, movement: [x] }) =>
    api.start({
      x: active ? x : 0,
      scale: active ? 1.1 : 1,
      ...(x < 0 ? left : right),
      immediate: (name) => active && name === 'x',
    })
  )

  const avSize = x.to({
    map: Math.abs,
    range: [50, 300],
    output: [0.5, 1],
    extrapolate: 'clamp',
  })

  return (
    <animated.div {...bind()} style={{ ...styles.item, background: bg }}>
      <animated.div style={{ ...styles.av, scale: avSize, justifySelf }} />
      <animated.div style={{ ...styles.fg, x, scale }}>
        {children}
      </animated.div>
    </animated.div>
  )
}

export default function App() {
  return (
    <div style={styles.container}>
      <Slider>Slide.</Slider>
    </div>
  )
}
