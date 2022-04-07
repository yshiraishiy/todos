import {useState} from 'react';
import React from 'react';
import InputForm from './InputForm';
import EditForm from './EditForm';

const App = () => {
  const[todos, setTodos] = useState (
    [
      {
        title: 'test',
        status: '未着手'
      },
      {
        title: 'test2',
        status: '着手'
      },
      {
        title: 'test3',
        status: '完了'
      },
    ]
  )
  
  return (
    <>
      <InputForm />
      <ul>
        <li>
          <span>タイトル</span>
          <button>編集</button>
          <button>削除</button>
        </li>
      </ul>
    </>
    
  )
}

export default App;