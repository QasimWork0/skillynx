import { POST } from 'api/index';
import { SecurityTabPropType, ChangePasswordInterface } from 'entities/interfaces'
import useAlert from 'hooks/AlertHook';
import React, { useEffect, useState } from 'react'

const WithSecurityTabData = (SecurityTab: React.FC<SecurityTabPropType>) => function WithProps() {
    const {setAlert} = useAlert()
    const token = window.localStorage.getItem("currentUserToken")
    const [userEmail, setUserEmail] = useState('')

    useEffect(() => {
        getEmail()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getEmail = async () => {
        const body = new URLSearchParams();
        if (token)
            body.append('userToken', token);
        const response = await POST('getUserPersonalData', body);

        const email: string = response.content.email;
        setUserEmail(email)
    }

    const updatePassword = async (data: ChangePasswordInterface) => {
        const body = new URLSearchParams();
        if (token)
            body.append('userToken', token);
        body.append('email', userEmail);
        body.append('oldPassword', data.oldPassword);
        body.append('newPassword', data.newPassword);
        const response = await POST('changePassword', body);

        if (response.status === 200)
            setAlert({color:'success', message:'Password changed!'})
        else
            setAlert({color:'error', message:response.error})

        return response
    }

    const deleteAccount = async () => {
        const body = new URLSearchParams();
        body.append('userToken', token || '');

        const response = await POST('deleteUser', body);
        return response
    }

    return (
        <SecurityTab updatePassword={updatePassword} deleteAccount={deleteAccount}/>
    )
}

export default WithSecurityTabData