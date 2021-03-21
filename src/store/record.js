import firebase from 'firebase/app'

export default {
    actions: {
        async createRecord({dispatch, commit}, record) {
            try {
                const uid = await dispatch('getUid')
                return await firebase.database().ref(`/users/${uid}/records`).push(record)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        // eslint-disable-next-line no-unused-vars
        async fetchRecords({dispatch, commit}) {
            const uid = await dispatch('getUid')
            const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}

            /*  const cats=[]
              Object.keys(categories).forEach(key=>{
                  cats.push({
                      title:categories[key].title,
                      limit:categories[key].limit,
                      id:key
                  })
              })
              return cats*/
            return Object.keys(records).map(key => ({...records[key], id: key}))
        },
        // eslint-disable-next-line no-unused-vars
        async fetchRecordById({dispatch, commit}, id) {
            const uid = await dispatch('getUid')
            const records = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {}

            /*  const cats=[]
              Object.keys(categories).forEach(key=>{
                  cats.push({
                      title:categories[key].title,
                      limit:categories[key].limit,
                      id:key
                  })
              })
              return cats*/
            return {...records, id: id}
        }
    }
}
