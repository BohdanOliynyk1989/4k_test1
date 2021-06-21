import React, {useState, useContext, useCallback, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";

export const EditPage = () => {
    const history = useHistory()
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [contact, setContact] = useState(null)
    const contactId = useParams().id
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [birthday, setBirthday] = useState('')

    const getContact = useCallback( async () => {
        try {
            const fetched = await request(`/api/contacts/${contactId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setContact(fetched)
        } catch (e) {}
    }, [token, contactId, request])

    useEffect(() => {
        getContact()
    }, [getContact])

    const pressHandler = async event => {
        try {
            await request(`/api/contacts/${contactId}`, 'PUT', {
                name: fullName? fullName : contact.name,
                phone : phone? phone : contact.phone,
                birthday: birthday? birthday : contact.birthday},
                {
                Authorization: `Bearer ${token}`
            })
            history.push(`/contacts`)
        } catch (e) {
            console.log(e.message)
        }
    }

    if (loading) {
        return <Loader />
    }
    return (
        <>
            { !loading && contact &&
            <div className='row'>
                <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                    <div className="input-field">
                        <input
                            placeholder="Введіть Ім'я"
                            id="name"
                            type="text"
                            name='name'
                            value={fullName ? fullName : contact.name}
                            onChange={e => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="Введіть телефон"
                            id="phone"
                            type="text"
                            name='phone'
                            value={phone ? phone : contact.phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="Введіть дату народження"
                            id="birthday"
                            type="date"
                            name='birthday'
                            value={birthday ? birthday : contact.birthday}
                            onChange={e => setBirthday(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="button"
                            onClick={pressHandler}
                            value='Зберегти зміни'
                        />
                    </div>

                </div>
            </div>
            }
        </>
    )
}