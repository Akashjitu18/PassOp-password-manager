import React, { useState, useRef, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

  const show = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])


  useEffect(() => {
    let passwords = localStorage.getItem('passwords')
    if (passwords) {
      setpasswordArray(JSON.parse(passwords))
    }
  }, [])


  const showPassword = () => {

    if (show.current.src.includes("icons/eyecross.png")) {
      show.current.src = "icons/eye.png"
      passwordRef.current.type = "password"
    }
    else {
      show.current.src = "icons/eyecross.png"
      passwordRef.current.type = "text"
    }
  }

  const savePassword = () => {

    if (form.site.length === 0 || form.username.length === 0 || form.password.length === 0){
      toast.warn('Invalid Credentials', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
else{
      toast.success('Password saved Succesfully', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
    setform({ site: "", username: "", password: "" })
  }
}

  const deletePassword = (id) => {
    let confirmDel = confirm("Do you really want to Delete ?")
    if (confirmDel) {

      toast.error('Password Deleted', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setpasswordArray(passwordArray.filter(item => item.id !== id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
    }
  }

  const editPassword = (id) => {
    setform(passwordArray.filter(item => item.id === id)[0])
    setpasswordArray(passwordArray.filter(item => item.id !== id))
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })

  }

  const copyText = (text) => {

    toast.info('Copied to Clipboard', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    navigator.clipboard.writeText(text)
  }




  return (
    <>

      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />


      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

      <div className="p-3 md:mycontainer min-h-[calc(100vh-112px)]">

        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-500'> &lt;</span>
          <span>Pass</span>
          <span className='text-green-500'>OP/&gt;</span>
        </h1>
        <p className='text-green-700 text-lg text-center'>Your own Password Manager</p>

        <div className="flex flex-col text-black p-4 gap-8 items-center">
          <input onChange={handleChange} className='rounded-full border border-green-600 w-full p-4 py-1' type="text" value={form.site} placeholder='Enter website URL' name="site" id="site" />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input onChange={handleChange} className='rounded-full border border-green-600 w-full p-4 py-1' type="text" value={form.username} placeholder='Enter Username' name="username" id="username" />
            <div className="relative">
              <input ref={passwordRef} onChange={handleChange} className='rounded-full border border-green-600 w-full p-4 py-1' type="password" value={form.password} placeholder='Enter Password' name="password" id="password" />
              <span onClick={showPassword} className='absolute right-2 top-1  cursor-pointer'><img ref={show} className='p-1' width={28} src="icons\eye.png" alt="eye" /></span>
            </div>
          </div>
          <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-500 rounded-full px-8 py-2 w-fit border border-green-900 font-bold text-lg'>
            <lord-icon

              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Save</button>
        </div>

        <div className="passwords">
          <h2 className='font-bold text-3xl py-4'>Your Passwords</h2>

          {passwordArray.length === 0 && <div>No Saved Passwords</div>}
          {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-8">
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>UserName</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-green-100'>
              {passwordArray.map((item,index) => {
                return <tr key={index}>
                  <td className='text-center py-2 border border-white'>

                    <div className='flex items-center justify-center gap-2'>
                      <a href={item.site} target='_blank'>{item.site}</a>

                      <div className='cursor-pointer' onClick={() => copyText(item.site)}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>

                    </div>

                  </td>

                  <td className='text-center py-2 border border-white'>
                    <div className='flex items-center justify-center gap-2'>
                      <span>{item.username}</span>
                      <div className='cursor-pointer' onClick={() => copyText(item.username)}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>

                  <td className=' text-center  py-2 border border-white'>
                    <div className='flex items-center justify-center gap-2'>
                      <span>{"*".repeat(item.password.length)}</span>
                      <div className='cursor-pointer' onClick={() => copyText(item.password)}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>

                  <td className=' py-2 border border-white text-center'>
                    <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                    </span>
                    <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                    </span>
                  </td>
                </tr>
              })}

            </tbody>
          </table>}
        </div>

      </div>
    </>
  )
}

export default Manager
