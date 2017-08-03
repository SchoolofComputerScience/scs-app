import apollo from '../api'
import gql from 'graphql-tag'

export default {
  find(scid) {
    return new Promise((resolve, reject) => {
      apollo.query({
        query: gql`
          {
            members(scid:"${scid}") {
              scid
            }
          }
        `
      }).then((res,err) => {
        if (res) {
          resolve(res.data);
        } else {
          reject(":err :find scid graphql failed")
        }
      }).catch((err) =>{
        console.error(err.locations)
        console.error(`GraphQL Error: ${err.message}`)
      });
    });
  }
}