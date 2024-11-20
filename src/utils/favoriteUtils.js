const favorites = new Map()
const FAVORITE = {

    addToFavorite({item}) {
        const key = item._id
        if(!favorites.has(key)){
            favorites.set(key, item)
        }
    },

    removeFromFavorites({item}){
        const key = item._id
        favorites.delete(key)
    },

    exportToFlatListData(){
        return Array.from(favorites.values())
    },

}


export default FAVORITE