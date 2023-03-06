import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';

class eBayService extends FuseUtils.EventEmitter {
    loginToEbay=()=>{
        return new Promise((resolve, reject) => {
            axios
              .post('http://13.40.78.113/api/eBay/login', {
                data: {
                },
              })
              .then((response) => {
                console.log('responsedata', response);
                // if (response.data.user) {
                //   this.setSession(response.data.access_token);
                //   resolve(response.data.user);
                // } else {
                //   reject(response.data.errors);
                // }
              });
          });
    };
}


const instance = new eBayService();

export default instance;