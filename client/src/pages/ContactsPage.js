import React, {useCallback, useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {ContactsList} from "../components/ContactsList";

export const ContactsPage = () => {
    const [contacts, setContacts] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchContacts = useCallback( async () => {
        try {
            const fetched = await request('api/contacts', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setContacts(fetched)
        } catch (e) {}
    }, [token, request])

    const deleteContacts = async (id) => {
        try {
            await request(`api/contacts/${id}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
                .then(
                    window.location.href = '/contacts'
                )

        } catch (e) {}
    }

    useEffect(() => {
        fetchContacts()
    }, [fetchContacts])

    if (loading) {
        return <Loader />
    }
    return (
        <>
            {!loading && <ContactsList contacts = {contacts}  dell = {deleteContacts} />}
        </>
    )
}