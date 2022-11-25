import React, { useEffect, useState } from 'react'
import { database } from "./firebaseconfig"
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import "./dashboard.css"
import Logout from './logout'
import Login from './login'

const Dashboard = () => {
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [userData, setUserData] = useState(null)

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const collectionRef = collection(database, 'userPosts')

    function handleSubmit(e) {
        e.preventDefault()
        if (isLoggedIn) {
            addDoc(collectionRef, {
                title: title,
                body: body
            })
                .then(() => {
                    setBody("")
                    setTitle("")
                    alert("Data Added")
                })
                .catch((err) => {
                    alert("Error", err.message)
                })
        }
        else {
            alert("Need to be Logged In to create posts")
        }
    }
    function updateData(id) {
        if (isLoggedIn) {
            let myStr = prompt("Enter Title and Body as Title : Body")
            if (myStr) {
                myStr = myStr.split(':')
                if (myStr.length === 2) {
                    const newObj = {
                        title: myStr[0],
                        body: myStr[1]
                    }
                    const docToUpdate = doc(database, 'userPosts', id)
                    updateDoc(docToUpdate, newObj)
                        .then(() => {
                            alert("Post Updated")
                        })
                        .catch((err) => {
                            alert(err.message)
                        })
                }
                else {
                    alert("Wrong Format ! Please Try again.")
                }

            }
            else {
                alert("No Changes have been made")
            }
        }
        else {
            alert("Need to be Logged In to edit posts")
        }
    }


    function deleteData(id) {
        if (isLoggedIn) {
            const docToUpdate = doc(database, 'userPosts', id)
            deleteDoc(docToUpdate)
                .then(() => {
                    alert("Post Deleted")
                })
                .catch((err) => {
                    console.log(err.message)
                })
        }
        else {
            alert("Need to be Logged In to delete posts")
        }
    }

    useEffect(() => {
        async function getData() {
            try {
                const userPosts = collection(database, 'userPosts');
                let myData = await getDocs(userPosts);
                let respData = myData.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                })
                setUserData(respData)

            }
            catch (err) {
                console.log(err)
            }
        }
        getData()
    })
    let id = 1;

    return (
        <div className='outerDiv'>
            <div className='navBar'>
                <h1>Happy Posts</h1>
                <h4><button>{(isLoggedIn) ? <Logout setisLoggedIn={setisLoggedIn} /> : <Login setisLoggedIn={setisLoggedIn} />}</button></h4>
            </div>
            <div className='userPosts'>
                {(userData && userData.length !== 0) ?
                    <table className='postsTable'>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Title</th>
                                <th>Body</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {userData && userData.map((item) => {
                                return <tr key={item.id}>
                                    <td>{id++}.</td>
                                    <td>{item.title}</td>
                                    <td>{item.body}</td>
                                    <td><button title='Edit Item' onClick={() => updateData(item.id)}>✏️</button></td>
                                    <td><button title='Delete Item' onClick={() => deleteData(item.id)}>🗑</button></td>
                                </tr>
                            })}
                        </tbody>
                    </table> : <h1 className='noData'>No Data to Display</h1>}

            </div>
            <div className='formDiv'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <h1>Add Posts</h1>
                        <input name='title' value={title} onChange={(e) => setTitle(e.target.value)} type={'text'} required placeholder='Enter Title' />
                        <input name='body' value={body} onChange={(e) => setBody(e.target.value)} type={'text'} required placeholder='Enter Body' /> <br /></div>
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Dashboard




