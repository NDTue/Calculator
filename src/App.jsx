import { useState } from 'react'
import './App.css'
import ButtonGrid from './components/ButtonGrid'
import Display from './components/Display'
import {evaluate} from 'mathjs'

function App() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([]) // lưu history
  const [showHistory, setShowHistory] = useState(false)

  // Hàm toggle history 
  const toggleHistory = () => {
    setShowHistory(prev => !prev)
  }

  // Ẩn History khi click ra ngoài
  const handleClickOutside = () => {
    if(showHistory) setShowHistory(false)
  }
  
  // Hàm tính toán
  const calculateResult = () => {
    try {
      // Tính toán biểu thức
      const result = evaluate(input)  // evaluate import từ mathjs
      setInput(String(result)) // ép kiểu về String vì slice() là hàm của string và cập nhật kết quả

      setHistory(prev => [  // Ghi vào lịch sử phép tính
        ...prev,
        `${input} = ${result}`
      ])
    } catch {
      setInput('Error')
    }
  }

  // Hàm xử lý bấm nút từ ButtonGrid 
  const handleButtonClick = (value) => {
    // if(value.key === 'Backspace')
    //   setInput(prev => prev.slice(0, -1)) // xóa ptu cuối 
    if(value === 'AC')
      setInput('')
    else if(value === '=')
      calculateResult()
    else
      setInput(prev => prev + value)
  }

  // Hàm xử lý bấm nút từ bàn phím
  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
      calculateResult()
    }
    else if(e.key === 'Backspace'){
      e.preventDefault()  // ngăn xóa mặc định - nếu ko có dòng nãy sẽ xóa 2 ký tự 1 lúc
      setInput(prev => prev.slice(0, -1)) // xóa ptu cuối 
    }
    else if(e.key === 'Delete'){
      e.preventDefault()
      setInput(prev => prev.slice(1))
    }
    // nếu e.key KHÔNG phải là 0-9 hoặc + - * / . thì chặn lại.
    else if (/[^0-9+\-*/.]/.test(e.key))  // test(e.key) - true/false: Kiểm tra ký tự vừa nhấn (e.key) thuộc tập hợp trên.
      e.preventDefault() // Nếu không phải số hoặc toán tử → ngăn nhập
    
  }

  // Hàm xóa lịch sử
  const clearHistory = () => setHistory([]) // xóa = set thành mảng rỗng 


  return (
    <div onClick={handleClickOutside}>
      
      <Display value={input} 
        onChange={setInput} // onChange = setInput để nhập từ bàn phím
        onKeyDown={handleKeyDown} 
        history={history}
        onClearHistory={clearHistory}
        showHistory={showHistory} 
        toggleHistory={toggleHistory}
      />
      <ButtonGrid onButtonClick={handleButtonClick}/>
    </div>
  )
}

export default App
