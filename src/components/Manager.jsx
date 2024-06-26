import React from "react";
import { useRef, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        //   let passwordArray;
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text)=>{
        toast(' Copy to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
            });       
            navigator.clipboard.writeText(text)

    }

    const showPassword = () => {
        passwordRef.current.type = 'text'
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/hide.png")) {
            ref.current.src = "icons/view.png"
            passwordRef.current.type = 'password'

        }
        else {
            ref.current.src = "icons/hide.png"
            passwordRef.current.type = 'text'

        }

    }

    const savePassword = () => {
        if (form.site.length!==0 && form.username.length!==0 && form.password.length!==0) {
            
            setPasswordArray([...passwordArray, {...form,  id: uuidv4()}])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id: uuidv4()}]))
            console.log(...passwordArray, form)
            setform({ site: "", username: "", password: "" })
            toast('Password saved', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
            });  
        } else {
            toast('error: Password not saved!')
        }
    }

    const deletePassword = (id) => {
        console.log("Deleting passwords with id", id)
        let c = confirm("Do you realy want to delete this password?")
        if(c){
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(items=>items.id!==id)))
            // console.log(...passwordArray, form)
        }
    }
    const editPassword = (id) => {
        console.log("Editing passwords with id", id)
        setform(passwordArray.filter(i=>i.id===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        // console.log(...passwordArray, form)
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }

    return (
        <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition= "Bounce"
            />
            {/* Same as */}
        <ToastContainer />
            <div
                className="absolute inset-0 -z-10 h-full w-full
                    bg-green-50 bg-[linear-gradient(to_right,#8080800a_10px,
                    transparent_1px),linear-gradient(to_bottom,
                    #8080800a_10px,transparent_1px)] bg-[size:14px_24px]"
            >
                <div
                    className="absolute left-0 right-0 top-0 -z-10 
                    m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 
                    opacity-20 blur-[100px]"
                ></div> </div>

            <div className="md:p-0 md:mycontainer min-h-[88.6vh]">
                <h1 className="text-4xl text font-bold text-center">
                    <span className="text-green-500">&lt;</span>
                    <span>Pass</span>
                    <span className="text-green-500">Op/&gt;</span>
                </h1>

                <p className="text-green-900 text-center text-lg leading-10">
                    Your own password manager
                </p>

                <div className="text-black flex flex-col p-4 gap-5 items-center">
                    <input
                        value={form.site} onChange={handleChange} placeholder="Enter website URL" className="rounded-full text-black border border-green-500 w-full p-4 py-1" type="text" name="site" id="" />
                    <div className="flex w-full justify-between gap-5">
                        <input
                            value={form.Username} onChange={handleChange} placeholder="Enter Username" className="rounded-full text-black border border-green-500 w-full p-4 py-1" type="text" name="username" id="" />

                        <div className="relative">
                            <input
                                ref={passwordRef} value={form.password} onChange={handleChange} placeholder="Enter Password" className="rounded-full text-black border border-green-500 w-full p-4 py-1" type="password" name="password" id="" />
                            <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showPassword}>
                                <img ref={ref} className="p-1" width={26} src="icons/view.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className="bg-green-500 hover:bg-green-600 flex justify-center w-fit rounded-full items-center px-8 py-2 border border-green-900">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"
                        ></lord-icon>
                        Save 
                    </button>
                </div>
                <div className="passwords">
                    <h2 className="py-4 font-bold text-2xl">Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 &&

                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Passwords</th>
                                    <th className="py-2">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className=" py-2 border border-white text-center">
                                        <div className="flex justify-center items-center">
                                        <a href={item.site} target="_blank">{item.site}</a>
                                            <div className="size-7 cursor-pointer" onClick={()=>{copyText(item.site)}}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                            </div>
                                        </td>
                                        <td className=" py-2 border border-white text-center">
                                        <div className="flex justify-center items-center">
                                        <span>{item.username}</span>
                                            <div className="size-7 cursor-pointer" onClick={()=>{copyText(item.username)}}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                            </div>
                                        </td>
                                        <td className=" py-2 border border-white text-center">
                                        <div className="flex justify-center items-center">
                                        <span>{item.password}</span>
                                            <div className="size-7 cursor-pointer" onClick={()=>{copyText(item.password)}}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                            </div>
                                        </td>
                                        <td className=" py-2 border border-white text-center">
                                        <span className="cursor-pointer mx-1" onClick={()=>{editPassword(item.id)}}><lord-icon
                                            src="https://cdn.lordicon.com/gwlusjdu.json"
                                            trigger="hover"
                                            style={{ "width": "25px", "height": "25px" }}>
                                        </lord-icon></span>
                                        <span className="cursor-pointer mx-1" onClick={()=>{deletePassword(item.id)}}><lord-icon
                                            src="https://cdn.lordicon.com/skkahier.json"
                                            trigger="hover"
                                            style={{ "width": "25px", "height": "25px" }}>
                                        </lord-icon></span>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    );
};

export default Manager;
