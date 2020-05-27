import React, {useState, useEffect, useCallback, useRef} from 'react'
import './App.css'
import produce from 'immer'

const numRows = 25
const numCols = 50

const operations = [
  [0, 1], 
  [0, -1], 
  [1, -1], 
  [-1, 1], 
  [1, 1], 
  [-1, -1], 
  [1, 0], 
  [-1, 0]
]

const presetOne = () => {
  const rows = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
  return rows
}

const generateEmptyGrid = (col, row) => {
  const rows = []
    for(let i=0; i < row; i++){
      rows.push(Array.from(Array(col), () => 0))
    }  
    return rows
}

function App() {
  const [numCol, setCols] = useState(55)
  const [numRow, setRows] = useState(20)
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid(numCol, numRow)
  })
  const [fast, setFast] = useState(false)
  const [med, setMed] = useState(true)
  const [slow, setSlow] = useState(false)
  const [speed, setSpeed] = useState(100)
  const [red, setRed] = useState(true)
  const [black, setBlack] = useState(false)
  const [color, setColor] = useState('black')
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if(red === true){
      setColor('red')
    } else if(black === true) {
      setColor('black')
    }
  }, [red, black])

  useEffect(() => {
    if(fast === true){
      setSpeed(10)
    } else if (med === true){
      setSpeed(100)
    } else if(slow === true) {
      setSpeed(1000)
    }
  }, [fast, med, slow])

  const runningRef = useRef(running)
  runningRef.current = running

  const changeRed = () => {
    setBlack(false)
    setRed(true)
  }
  const changeBlack = () => {
    setRed(false)
    setBlack(true)
  }

  const changeFast = () => {
    setMed(false)
    setSlow(false)
    setFast(true)
  }
  const changeMed = () => {
    setSlow(false)
    setFast(false)
    setMed(true)
  }
  const changeSlow = () => {
    setFast(false)
    setMed(false)
    setSlow(true)
  }
  // console.log(speed)

  const runSimulation = useCallback(() => {
    if (!runningRef.current){
      return
    }
    setGrid(g => {
      return produce(g, gridCopy => {
        for(let i = 0; i < numRow; i++){
          for(let k = 0; k < numCol; k++){
            let neighbors = 0
            operations.forEach(([x, y]) => {
              const newI = i+x
              const newK = k+y
              if(newI >= 0 && newI < numRow && newK >= 0 && newK < numCol){
                neighbors += g[newI][newK]
              }
            })
            if(neighbors < 2 || neighbors > 3){ 
              gridCopy[i][k] = 0
            } else if (g[i][k] === 0 && neighbors === 3){
              gridCopy[i][k] = 1
            }
          }
        }
      })
    })
    
    setTimeout(runSimulation, speed)
  }, [speed, numCol, numRow])

  console.log(grid)

  return (
    <>
      <div className='containerman'>
        <div className='buttons'>
          <button
            className='button'
            onClick={() => {
              setRunning(!running)
              if(!running){
                runningRef.current = true
                runSimulation()
              }
            }}
          >
            {running ? 'stop' : 'start'}
          </button>
          <button 
            className='button'
            onClick={() => {
              if(running){
                setRunning(!running)
              }
              setGrid(generateEmptyGrid(numCol, numRow))
            }}
          >
            clear
          </button>
          <button 
            className='button'
            onClick={() => {
              if(running){
                setRunning(!running)
              }
              const rows = []
              for(let i=0; i < numRow; i++){
                rows.push(Array.from(Array(numCol), () => Math.random() > .75 ? 1 : 0))
              }  
              setGrid(rows)
            }}
          >
            random
          </button>
        </div>
        <div className='header'>
          <h1>Cellular Automata and Conway's "Game of Life"</h1>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${numCol}, 20px)`
            }}
          >
            {grid.map((rows, i) => 
              rows.map((col, k) => (
                <div 
                  className='squares'
                  key={`${i}-${k}`} 
                  onClick={() => {
                    if(running){
                      setRunning(!running)
                    }
                    const newGrid = produce(grid, gridCopy => {
                      gridCopy[i][k] = gridCopy[i][k] ? 0 : 1
                    })
                    setGrid(newGrid)
                  }}
                  style={{
                    backgroundColor: grid[i][k] ? color : undefined
                  }}
                />
              ))
            )}
          </div>
          <button onClick={() => {
            if(!running){
              setRows(numRow+1) 
              const rows = []
              for(let i=0; i < numRow; i++){
                rows.push(Array.from(Array(numCol), () => 0))
              }  
              setGrid(generateEmptyGrid(numCol, numRow))
            }}}
          >
            add row
          </button>
          <button onClick={() => {
            setGrid(presetOne())
            }}
          >
            Preset One
          </button>
        </div>
        <div className='colors'>
          <button className={red ? 'red colorbut': 'colorbut'} onClick={() => changeRed()}/>
          <button className={black ? 'black colorbut' : 'colorbut'} onClick={() => changeBlack()}/>
          <button className={fast ? 'current speed' : 'speed'} onClick={() => changeFast()}>fast</button>
          <button className={med ? 'current speed' : 'speed'} onClick={() => changeMed()}>medium</button>
          <button className={slow ? 'current speed' : 'speed'} onClick={() => changeSlow()}>slow</button>
        </div>
      </div>
    </>
  )
}

export default App
