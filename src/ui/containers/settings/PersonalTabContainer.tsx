import { POST, POSTFile } from 'api/index';
import { PersonalTabPropType, UserInterface } from 'entities/interfaces'
import useAlert from 'hooks/AlertHook';
import React, { useEffect, useState } from 'react'

const WithPersonalTabData = (PersonalTab: React.FC<PersonalTabPropType>) => function WithProps() {
    const { setAlert } = useAlert()
    const token = window.localStorage.getItem("currentUserToken")
    const [userData, setUserData] = useState<UserInterface>({
        firstName: '',
        lastName: '',
        email: '',
        image: '',
    });

    useEffect(() => {
        getUserData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUserData = async () => {
        const body = new URLSearchParams();
        if (token)
            body.append('userToken', token);
        const response = await POST('getUserPersonalData', body);

        const result: UserInterface = response.content;
        setUserData(result)
    }

    const updateUserData = async (userData: UserInterface) => {
        const body = new URLSearchParams();
        if (token)
            body.append('userToken', token);
        body.append('firstName', userData.firstName);
        body.append('lastName', userData.lastName);
        body.append('email', userData.email);
        body.append('image', userData.image);
        const response = await POST('setUserPersonalData', body);
        if (response.status === 200){
            setAlert({ color: 'success', message: 'Personal data updated!' })
            getUserData()
        }
        else
            setAlert({ color: 'error', message: response.error })

        return response
    }

    const uploadImage = async (image: File) => {
        const body = new FormData();
        if (token)
            body.append('userToken', token);
        body.append('image', image);
        const response = await POSTFile('uploadImage', body);

        if (response.status !== 200)
            setAlert({ color: 'error', message: response.error })

        return response
    }

    return (
        <PersonalTab userData={userData} updateUserData={updateUserData} uploadImage={uploadImage} />
    )
}

export default WithPersonalTabData