import { SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';

const config: SocketIoConfig = { 
    url: environment.backendUrl, 
    options: {
        extraHeaders: {
            authorization: localStorage.getItem("TOKEN") || '',
        }
    } 
};
export default config; 