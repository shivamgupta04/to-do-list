import { useState , useEffect} from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(false)

  useEffect(() => {
    // Uncomment the line below to clear localStorage on first load
    // localStorage.clear();
  
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(todostring);
      settodos(todos);
    }
  }, []);
  
  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if(todostring){
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  
    
  }, [])
  

  const saveTools = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const toggleFinished = (e) => {
    setshowfinished(!showfinished)
    
  }
  


  const handleedit = (e, id)=>{
    let t = todos.filter(i=>i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    settodos(newTodos)
    saveTools()

  }
  const handledelete = (e, id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    settodos(newTodos)
    saveTools()
  }
  const handleadd = ()=>{
    settodos([...todos, {id: uuidv4(), todo, isCompleted:false }])
    settodo("")
    saveTools()
  }
  const handlechange = (e)=>{
    settodo(e.target.value)
  }

  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=> item.id === id)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveTools()
  }
  




  return (
    <>
    <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex-col gap-4 ">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          <div className="flex">
            <input onChange={handlechange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
            <button onClick={handleadd} disabled={todo.length<=3} className='bg-violet-800 mx-2 hover:bg-violet-950 disabled:bg-violet-700 p-4 py-2 text-sm font-bold text-white rounded-full '>Save</button>
          </div>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showfinished} /> Show Finished
        <div className="bg-black opacity-15 w-[90%] mx-auto h-[1px] my-2"></div>
        
          <h2 className='text-2xl font-bold'>Your Todos</h2>
          <div className="todos">
            {todos.length===0 && <div className='m-5'>No Todos to display</div> }
            {todos.map(item=>{

            
            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between">
              <div className='flex gap-5' >
                 <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.isCompleted}  id="" />
                 <div className={item.isCompleted?"line-through": ""}>{item.todo}</div>
              </div>
                <div className="buttons flex h-full">
                  <button onClick={(e)=>{handleedit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                  <button onClick={(e)=>{handledelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
                </div>
              

            </div>
            })}
          </div>
        
      </div>
    </>
  )
}

export default App
