import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getToDos, postToDos, putToDos, removeTask } from '../../actions'
import './style.css'
import edit from '../../assets/edit.png'
import trash from '../../assets/trash.png'

const Home = ({ isLogged, getToDos, allResponse, putToDos, removeTask, postToDos }) => {
    const [page, setPage] = useState({ init: 0, offset: 10 })
    const [filterResponse, setFilterResponse] = useState([])
    const [data, setData] = useState({ id: '', completed: '', title: '' })
    const [postData, setPostData] = useState({ id: '', completed: false, title: '' })
    const [editing, setEditing] = useState(null)
    useEffect(() => {
        setFilterResponse(allResponse.slice(page.init, page.offset))
    }, [allResponse, page])
    useEffect(() => {
        getToDos()
    }, [])
    const handleChange = (e) => {
        setPostData({ ...postData, id: allResponse.length, [e.target.name]: e.target.value })
    }
    const handleCheckbox = (e) => {
        setPostData({ ...postData, id: allResponse.length, completed: e.target.checked })
    }

    if (!isLogged) return <Redirect to='/login' />
    return (<div className='homeContainer'>
        <div className='formTask' >
            <input name='title' onChange={handleChange} value={postData.title} className='card' placeholder='Task name'></input>
            <input name='completed' onChange={handleCheckbox} type='checkbox'></input>
            <div className='add' onClick={() => { postToDos(postData); setPostData({ ...postData, title: '' }) }} >+</div>
        </div>
        {/// aca podria haber un páginado
        }
        {filterResponse.map((e) => {
            /// por una cuestion de buenas practicas de React esto deberia ser un componente
            return <div className={'card' + (e.completed ? " taskC" : " taskF")} key={e.id}>{e.id !== editing ?
                <> {e.title}
                    <img onClick={() => { setEditing(e.id); setData({ ...data, id: e.id, completed: e.completed }) }} className='ico' src={edit}></img> </> : <><input className='card' type='text' placeholder={e.title} onChange={
                        (e) => { setData({ ...data, title: e.target.value }) }
                    }></input>
                    <input type='checkbox' defaultChecked={e.completed} onClick={() => {
                        setData({ ...data, completed: !e.completed })
                    }}></input>
                    <div>
                        <label className='markedBox checkT' onClick={() => {
                            putToDos(data)
                            setEditing(null)
                            setData({ id: '', completed: '', title: '' })
                        }}>✔</label><label onClick={() => {
                            setEditing(null)
                        }} className='markedBox checkF'>✘</label></div>
                    <img onClick={() => { removeTask(e.id) }} className='ico' src={trash}></img>
                </>
            }</div>
        })}
    </div>
    )

}
const mapStateToProps = state => {
    return {
        isLogged: state.isLogged,
        allResponse: state.allResponse
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getToDos: () => {
            dispatch(getToDos())
        },
        putToDos: (data) => {
            dispatch(putToDos(data))
        },
        removeTask: (id) => {
            dispatch(removeTask(id))
        },
        postToDos: (data) => {
            dispatch(postToDos(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
