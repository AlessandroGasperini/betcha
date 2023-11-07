import { useEffect, useState } from "react";
import styles from "./CreateProdilePic.module.css"

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

function CreateProfilePic(props) {
    const [imageFiles, setImageFiles] = useState([]);
    const [image, setImages] = useState();

    const changeHandler = (e) => {
        const { files } = e.target;
        const validImageFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.match(imageTypeRegex)) {
                validImageFiles.push(file);
            }
        }
        if (validImageFiles.length) {
            setImageFiles(validImageFiles);
            return;
        }
        alert("Selected images are not of valid type!");
    };

    useEffect(() => {
        const image = [], fileReaders = [];
        let isCancel = false;
        if (imageFiles.length) {
            imageFiles.forEach((file) => {
                const fileReader = new FileReader();
                fileReaders.push(fileReader);
                fileReader.onload = (e) => {
                    const { result } = e.target;
                    if (result) {
                        image.push(result)
                    }
                    if (image.length === imageFiles.length && !isCancel) {
                        setImages(image);
                        props.setProfilePic(image[0])
                    }
                }
                fileReader.readAsDataURL(file);
            })
        };
        return () => {
            isCancel = true;
            fileReaders.forEach(fileReader => {
                if (fileReader.readyState === 1) {
                    fileReader.abort()
                }
            })
        }
    }, [imageFiles]);

    return (
        <div>
            {!image && <form>
                <label htmlFor="file">Upload images</label>
                <input
                    type="file"
                    id="file"
                    onChange={changeHandler}
                    accept="image/png, image/jpg, image/jpeg"
                />
            </form>}
            {
                image ?
                    <div>
                        {
                            <img className={styles.profilePic} src={image} alt="" />
                        }
                    </div> : null
            }

            {image && <button onClick={() => setImages("")}>byt bild</button>}
        </div>
    );
}

export default CreateProfilePic;