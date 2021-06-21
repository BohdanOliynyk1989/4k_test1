import React from "react"

export const ContactCard = ({ contact }) => {
    return (
        <>
            <h2>Контакт</h2>

            <p>Імя: {contact.name}</p>
            <p>Дата народження: {new Date(contact.birthday).toLocaleDateString()}</p>
            <p>Номер телефону: {contact.phone}</p>
            <p>Дата створення: <strong>{new Date(contact.date).toLocaleDateString()}</strong></p>

          </>
    )
}