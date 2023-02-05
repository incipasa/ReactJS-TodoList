import './App.css';
import {useState} from 'react';

function App() {

  const list = [
      {
        id:1,
        name: "Do the dishes"
      },
      {
        id:2,
        name: "Take out the trash"
      },
      {
  ]

  const [lists, setList] = useState(list)
  const [updateState, setUpdateState] = useState(-1)

  return(
    <div className='App'>
      <AddList setList = {setList}/>
      <form onSubmit={handleSubmit}>
      <table>
        {
          lists.map((current) =>(
            updateState === current.id ? <EditList current={current} lists={lists} setList={setList}/>:
            <tr>
              <td>{current.name}</td>
              <td>
                <button className='edit' onClick={()=>handleEdit(current.id)}>Edit</button>
                <button className='delete' type='button' onClick={()=>handleDelete(current.id)}>Delete</button>
              </td>
            </tr>
          ))
        }
      </table>
      </form>
    </div>
  )

  function handleEdit(id) {
    setUpdateState(id)
  }
  function handleDelete(id) {
    const newlist = lists.filter((li) => li.id != id)
    setList(newlist)
  }
  function handleSubmit(event) {
    event.preventDefault()
    const name  = event.target.elements.name.value
    const newlist = lists.map((li) =>(
      li.id === updateState ? {...li, name:name} : li
    ))

    setList(newlist)
    setUpdateState(-1)
  }
}

function EditList({current, lists, setList}) {
  function handInput(event) {
    const name = event.target.name;
    const value = name.value;
    const newlist = lists.map((li) =>(
      li.id === current.id ? {...li, name:value} : li
    ))

    setList(newlist)
  }
  return (
    <tr>
      <td><input type="text" onChange={handInput} name="name" value={current.name}/> </td>
      <td><button className='update'>Update</button>
</td>
    </tr>
  )
}

function AddList({setList}) {
  //const nameRef = useRef();
  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const newlist = {
      id:3,
      name,
    }
    setList((prevList) => {
      return prevList.concat(newlist)
    })
    //nameRef.current.value=""
  }
  return(
    <><><h1> My to-dos</h1> <form className='addForm' onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Create a new to-do" /*ref={nameRef}*/></input>
      <button type="submit">Add</button>
    </form></><br></br></>

  )
}
export default App;
