import axios from 'axios';
import React, { memo, useEffect, useState, type FormEvent } from 'react';

interface IStudent {
    id?:string
    name:string;
    image?:string;
    birthdate:string;
    email:string;
    address:string
}

const initialState:IStudent = {
    name:"",
    birthdate:"",
    email:"",
    address:""
}


const API_URL = "https://689c84f058a27b18087e814a.mockapi.io";

const Student = () => {
  const [formData, setFormdata] = useState<IStudent>(initialState)
  const [editingItem, setEditingItem] = useState<any>(null);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState<boolean>(true)

  useEffect(() => {
    axios.get(`${API_URL}/student`).then((res) => setData(res.data))
  }, [reload])


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormdata((prev) => ({...prev, [name]:value}))
  }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if(editingItem){
            axios.put(`${API_URL}/student/${editingItem.id}`, formData).then(() => {
                setEditingItem(null);
                setFormdata(initialState)
                setReload(p => !p)
            })
        }else{
            axios.post(`${API_URL}/student`, formData).then(() => {
                setFormdata(initialState)
                setReload(p => !p)
            })
        }
    }  

    const handleDelete = (id?:string) => {
      axios.delete(`${API_URL}/student/${id}`,).then(() => setReload(p => !p))
    }

    const handleUpdate = (item:IStudent) => {
      setEditingItem(item)
      setFormdata(item)
    }

    
    
    const {name, birthdate, email, address} = formData
    
    return (
    <section className='bg-slate-900'>
      <div className="mb-10 bg-slate-800 p-6 rounded-xl border-b-1 border-white">
        <h2 className="text-xl mb-4 text-white">Create Student</h2>
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
          action=""
        >
          <input
            value={name}
            name='name'
            onChange={handleChange}
            className="border bg-slate-700 border-slate-500 rounded-lg py-2 px-4 text-white"
            type="text"
            placeholder="Full name"
            required
          />
          <input
            value={birthdate}
            name='birthdate'
            onChange={handleChange}
            className="border bg-slate-700 border-slate-500 rounded-lg py-2 px-4 text-white"
            type="date"
            placeholder="birthdate"
            required
          />
          <input
            value={email}
            onChange={handleChange}
            name='email'
            className="border bg-slate-700 border-slate-500 rounded-lg py-2 px-4 text-white"
            type="text"
            placeholder="email"
            required
          />
          <input
            value={address}
            onChange={handleChange}
            name='address'
            className="border bg-slate-700 border-slate-500 rounded-lg py-2 px-4 text-white"
            type="text"
            placeholder="address"
            required
          />
          <button
            type="submit"
            className="border cursor-pointer hover:opacity-60 border-slate-700 rounded-lg py-2 px-4 bg-slate-900 text-white"
          >
            {editingItem ? "Update" : "Submit"}
          </button>
        </form>
      </div>

      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-3">
        {
          data.map((item:IStudent, index) => (
            <div key={index} className="p-4 bg-slate-800 rounded-xl">
              <div className="relative">
                <img
                  className="size-40 object-cover mx-auto rounded-full"
                  src={item.image}
                  alt=""
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="font-bold text-xl text-white">{item.name}</h3>
                <p className="my-2 text-gray-400">{item.birthdate}</p>
                <p className="my-2 text-gray-400">{item.email}</p>
                <p className="my-2 text-gray-400">{item.address}</p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="py-0.5 border rounded-lg text-sm flex-1 text-red-500 border-red-500"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdate(item)}
                    className="py-0.5 border rounded-lg text-sm flex-1 text-green-400 border-green-400"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default memo(Student);