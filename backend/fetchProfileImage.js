import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const getProfileImage = async (currentUser) => {
  const storage = getStorage();

  if (currentUser !== null) {
    const storageRef = ref(storage, `profileImage/${currentUser.uid}`);

    try {
      const url = await getDownloadURL(storageRef);
      console.log(url);
      return url;
    } catch (error) {
      console.error('Error fetching image URL:', error);
      return null;
    }
  }
  
  return null;
};

export default getProfileImage;
