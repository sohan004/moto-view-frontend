import { BACKEND_URL } from "../App"

const getMediaFile = (mediaName) => {
    const path = BACKEND_URL + "/media?name=" + mediaName;
    return path
}

export default getMediaFile;