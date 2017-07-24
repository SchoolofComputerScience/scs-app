import apollo from '../api'
import gql from 'graphql-tag'

export default {
  find(scid) {
    return new Promise((resolve, reject) => {
      apollo.query({
        query: gql`
          {
            findScid(scid:"${scid}") {
              exists
            }
          }
        `
      }).then((res,err) => {
        if (res) {
          resolve(res.data.findScid.exists);
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