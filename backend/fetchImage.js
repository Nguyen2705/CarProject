import {getStorage, ref, getDownloadURL} from "firebase/storage";

const storage = getStorage();
/* Current state: this function can get the URL of a file in Firebase Storage
using the file's name.
    Next step: use this function to display the user's profile image in the ProfileScreen
(the file will be stored in the user's profile json?)
*/
const getImageURL =(imageName) => {
    const storageRef = ref(storage, 'images/' + imageName);
    return getDownloadURL(storageRef);
}

export default getImageURL;
