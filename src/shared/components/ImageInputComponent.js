import {useEffect, useState} from "react";
import {Cancel, Close, Image} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import AlertComponent from "./AlertComponent";

export default function ImageInputComponent({image, setImage, height = '200px', setError = undefined}){
    const [imageBase64, setImageBase64] = useState(undefined);
    const [imageError, setImageError] = useState({ isError : false, text : ""});
    useEffect(() => {
        if(image){
            base64(image);
            setImageError({ isError: false, text : ''});
        } else {
            setImageBase64(undefined);
        }
    }, [image]);

    useEffect(() => {
        console.log(imageBase64);
    }, [imageBase64]);

    const handleImageChange = e => {
        if(!['image/jpg','image/jpeg','image/png'].includes(e.target.files[0].type)){
            setImageError({ isError: true, text : "The file must be JPG, JPEG or PNG"});
            return;
        }
        setImage(e.target.files[0]);
    }

    const base64 = imageFile => {
        let reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
            setImageBase64(reader.result);
        }
    }
    return (
        <div style={{ display: "flex",
            position : "relative",
            width: '100%',
            height,
            backgroundColor : 'lightgray',
            borderRadius: '1%',
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        }}>
            {image && <div
                style={{ position: "absolute", top: -10, right: -15, zIndex: 20, backgroundColor : 'white',boxShadow: '1px 1px 1em'}}
                onClick={() => {
                    setImage(undefined);
                }}
            ><Cancel fontSize="large"/></div>}
            {!image && <div style={{ flex: "0 1 1px"}}><Image fontSize="large" /></div>}
            {imageBase64 && <img style={{ width: '100%', height: '100%'}} src={imageBase64} alt="base64 img"/>}
            <div hidden={image && true}>
                <Button
                    variant="contained"
                    className="primaryBackgroundColor"
                    component="label"

                >Upload Image {!image && <input  type="file" name="img" hidden onChange={handleImageChange} />}
                </Button>
            </div>
            {imageError.isError && <div style={{ marginTop: '1em'}}><AlertComponent variant="error" message={imageError.text} /></div>}
        </div>
    )
}