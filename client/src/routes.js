import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import {ContactsPage} from "./pages/ContactsPage"
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";
import {EditPage} from "./pages/EditPage";


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/contacts' exact>
                    <ContactsPage />
                </Route>
                <Route path='/create' exact>
                    <CreatePage />
                </Route>
                <Route path='/detail/:id'>
                    <DetailPage />
                </Route>
                <Route path='/edit/:id'>
                    <EditPage />
                </Route>
                <Redirect to='/contacts' />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/'>
                <AuthPage />
            </Route>
            <Redirect to='/' />

        </Switch>
    )
}