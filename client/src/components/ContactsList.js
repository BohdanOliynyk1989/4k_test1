import React, {useState} from "react"
import {Link} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import {SearchPanel} from "./SearchPanel";

export const ContactsList = ({contacts, dell}) => {

    const [value, setValue] = useState('')

    const columns =  [
        {
            name: '№',
            selector: 'number',
            sortable: true,
            grow: 0,
        },
        {
            name: 'Імя',
            selector: 'name',
            sortable: true,
            grow: 1,
        },
        {
            name: 'Дата народження',
            selector: 'birth',
            sortable: true,
            grow: 1,
        },
        {
            name: 'Номер телефону',
            selector: 'ph',
            sortable: true,
            grow: 1,
        },
        {
            name: 'Деталі',
            selector: 'details',
            grow: 0,
        },
        {
            name: 'Редагувати',
            selector: 'edit',
            grow: 0,
        },
        {
            name: 'Видалити',
            selector: 'dell',
            grow: 0,
        },
    ]

    const data = contacts.map((contact, index) => (
        {
            number: index + 1,
            name: contact.name,
            birth: new Date(contact.birthday).toLocaleDateString(),
            ph: contact.phone,
            details: <Link to={`/detail/${contact._id}`}> Відкрити </Link>,
            edit: <Link to={`/edit/${contact._id}`}> Edit </Link>,
            dell:  <span onClick={() => dell(contact._id)} style={{color: 'red', cursor: 'pointer'}}> Dell </span>
        }
    ))

    const valueChangeHandler = val => {
        setValue(val)
    }

    let result
    const getFilteredData = () => {

        if (!value) {
            return data
        }
        result = data.filter(item => {
            return (
                item["name"].toLowerCase().includes(value.toLowerCase()) ||
                item["ph"].toLowerCase().includes(value.toLowerCase()) ||
                item["birth"].toLowerCase().includes(value.toLowerCase())
            );
        });
        if(!result.length){
            result = data
        }
        return result
    }

    getFilteredData()

    if (!contacts.length) {
        return <p className='center'>Контактів поки немає</p>
    }

    return (
        <div style={{marginTop: '12px'}}>

            <DataTable
                title="Список контактів"
                columns={columns}
                data={result ? result : data}
                subHeader = {true}
                subHeaderComponent = <SearchPanel change={valueChangeHandler} />
            />
        </div>
    )
}

