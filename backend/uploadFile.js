import {getStorage, ref, uploadBytes} from "firebase/storage";

const storage = getStorage();

// Current state: function can upload a file to Firebase Storage

/* Next step: add file to the user profile, so it can be displayed in the ProfileScreen
when that user is logged in*/

const uploadFile = (imageName, imageFile) => {
    
    const storageRef = ref(storage, 'images/' + imageName);

    return uploadBytes(storageRef, imageFile);
    
}

export default uploadFile;