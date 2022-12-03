import { AxiosError, AxiosResponseHeaders } from "axios";
import { useState } from "react";

export type useApiReturnType = {
    data:any,
    error: string,
    loading: boolean,
    request: Function,
    requestPromise: Function
}
const useAPI = (apiFunc: any):useApiReturnType => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const request = async (...args:any[]) => {
        setLoading(true);
        try {
            const result = await apiFunc(...args);
            setData(result.data);
        } catch (err:any) {
            setError(err.message || "Unexpected Error!");
        } finally {
            setLoading(false);
        }
    };

    const requestPromise = async (...args:any[]) => {
        return new Promise((resolve, reject) => {            
            try {
                console.log(args);
                apiFunc(...args)
                .then((result:AxiosResponseHeaders) => {
                    resolve(result.data);
                })
                .catch((error:AxiosError) => {    
                    console.log(error.response);                
                    console.log(error.message);                
                    reject(error)
                });                
            } catch (err:any) {
                reject(err.message || "Unexpected Error!")
            }
        })
    };    

    return {
        data,
        error,
        loading,
        request,
        requestPromise
    };
};

export default useAPI;