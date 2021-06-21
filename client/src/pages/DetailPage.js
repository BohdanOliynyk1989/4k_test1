import React, {useCallback, useContext, useEffect, useState} from "react"
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {ContactCard} from "../components/ContactCard";

export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [contact, setContact] = useState(null)
    const contactId = useParams().id

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

    if (loading) {
        return <Loader />
    }
    return (
        <>
            { !loading && contact && <ContactCard contact = {contact} />}
        </>
    )
}