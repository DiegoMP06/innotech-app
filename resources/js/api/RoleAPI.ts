import axios from "axios";
import { isAxiosError } from "node_modules/axios/index.cjs";
import { toast } from "react-toastify";

export default {
    async getRoles() {
        try {
            const response = await axios.get('/api/roles')
            console.log(response)
            return response
        } catch (error) {
            if(isAxiosError(error)) {
                console.log(error)
            }
            toast.error('Ocurrió un error al obtener los roles')
        }
    }
}