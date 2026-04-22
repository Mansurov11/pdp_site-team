import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Students = () => {
  const token = localStorage.getItem("token")
  const [transactions, setTransactions] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(true)

  async function getId(){
    try{
      const res = await axios.get("https://pdp-system-backend-1.onrender.com/api/v1/auth/me",{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      getTransactions(res.data.data._id)
    }catch(err){
      console.log(err)
    }
  }

  async function getTransactions(id){
    try{
      setLoading(true)
      const res = await axios.get(`https://pdp-system-backend-1.onrender.com/api/v1/transactions/teacher/${id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data.data.data)
      setTransactions(res.data.data.data)
    }
    catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getId()
  },[])

  return (loading? <h3 className="text-blue-900 opacity-[0.5] text-center pt-15 font-bold">Yuklanmoqda...</h3> : <main className='site__main'>
    <section className="history">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tarixm</h1>
        <p className="text-gray-400 text-sm mt-1 font-medium">O'qituvchi tarixi</p>
      </div>
      <div className="bg-white p-12.5 rounded-3xl shadow-sm mb-7.5">
        <h2 className="font-bold text-2xl w-full">Salom {transactions[0]?.teacherId?.fullName} ustoz</h2>
        <p className="font-light text-l pt-1.25 w-full">Bular sizning o'quvchilarga qo'ygan tarixingiz</p>
      </div>
      <ul className="flex flex-col items-start content-center gap-3.75">
        {
          transactions.map((transaction,index) => <li key={index} className="flex flex-1 items-center content-between gap-105 w-full bg-white pt-6.25 pb-6.25 pl-12.5 pr-2.5 rounded-2xl">
           <div className="w-75 flex flex-1 items-center content-start gap-2.5 ">
            <h3 className="teacher_name">{transaction.teacherId.fullName}</h3>
            <button className="teacher_btn" onClick={() => {
              setOpenModal(true)
              setReason(transaction.ruleId.title)
            }}>aniqlash</button>
           </div>
           <div className="w-75 flex flex-1 items-center content-end gap-2.5">
            <h4 className="student_name">{transaction.studentId.fullName}</h4>
            <span className={transaction.pointChange < 0? "w-25 h-8.75 border-red-500 text-red-500 rounded-2xl flex items-center content-center": "w-25 h-8.75 border-green-500 text-green-500 rounded-2xl flex items-center content-center"}>{transaction.pointChange}</span>
           </div>
          </li>)
        }
      </ul>
      {openModal && <Modal reason={reason} setOpenModal={setOpenModal}/>}
    </section>
  </main>)
}
function Modal({reason, setOpenModal}){
  return(<div className='absolute top-75 left-162.5 w-87.5 bg-white p-12.5 shadow-2xs rounded-2xl'>
    <button className="reason_btn" onClick={() => {
      setOpenModal(false)
    }}>&times;</button>
    <p className='reason_text'>{reason}</p>
  </div>)
}

export default Students;