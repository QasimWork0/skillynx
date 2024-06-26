import { config } from "../config";


export const GET = async (endpoint: string) => {
    const data = await fetch(config.API_URL + endpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    return data.json();
}

export const POST = async (endpoint: string, body: any = {}) => {
    const data = await fetch(config.API_URL + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
    })
    return data.json();
}

export const POSTFile = async (endpoint: string, body: any = {}) => {
    const data = await fetch(config.API_URL + endpoint, {
        method: 'POST',
        // headers: { 'Content-Type': 'multipart/form-data' },
        body: body
    })
    return data.json();
}

export const PUT = () => { return; }
export const DELETE = () => { return; }