import React, {useState, useEffect, useContext} from "react"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [birthday, setBirthday] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event => {
            try {
                const data = await request('api/contacts/generate', 'POST', {name: fullName, phone, birthday}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.contacts._id}`)
            } catch (e) {
                console.log(e.message)
            }
    }
    return (
        <div className='row'>
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        placeholder="Введіть Ім'я"
                        id="name"
                        type="text"
                        name='name'
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                    />
                    <label htmlFor="name">Ім'я</label>
                </div>
                <div className="input-field">
                    <input
                        placeholder="Введіть телефон"
                        id="phone"
                        type="text"
                        name='phone'
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    <label htmlFor="phone">Телефон</label>
                </div>
                <div className="input-field">
                    <input
                        placeholder="Введіть дату народження"
                        id="birthday"
                        type="date"
                        name='birthday'
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)}
                    />
                    <label htmlFor="birthday">Дата народження</label>
                </div>
                <div className="input-field">
                    <input
                        type="button"
                        onClick={pressHandler}
                        value='Зберегти контакт'
                    />
                </div>

            </div>
        </div>
    )
}