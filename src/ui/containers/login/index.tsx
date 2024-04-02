import React from 'react'
import { POST } from 'api/index';
import { LoginPropType } from 'entities/interfaces'

const WithLoginData = (LoginPage: React.FC<LoginPropType>) => function WithProps() {

    const loginUser = async (email:string, password:string) => {
        const body = new URLSearchParams();
        body.append('email', email);
        body.append('password', password);

        const response = await POST('getUserInfo', body);
        return {
            status: response.status,
            content: response.content,
            message: response.error||'',
        }
    }


    return (
        <LoginPage loginUser={loginUser}  />
    )
}

export default WithLoginData