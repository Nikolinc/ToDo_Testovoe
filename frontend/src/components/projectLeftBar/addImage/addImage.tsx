import { useEffect, useRef, useState } from "react";
import { uploadFile } from "store/project/saga";
import { IProject } from "types/project";

function AddImage(props: { project: IProject }) {

  const [image, setImage] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.src = `http://localhost:7700/${props.project.image}`
    }
  }, [props.project.image])


  const setImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      var formData = new FormData();
      formData.append("id", props.project._id);
      formData.append("params", "image");
      formData.append("file", e.target.files[0]);
      uploadFile(formData).then((value: IProject) => (value.image));
    }
    setImage(false);
  };

  return <label>
    {image ? (
      <div className="imageError flex-center">
        {props.project.title.replace(/\s/g, "").toUpperCase()[0]}
      </div>
    ) : (
      <img
        ref={imgRef}
        alt="image_profile"
        onError={() => setImage(true)
        }
      />
    )}
    <input
      type="file"
      hidden
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImg(e)}
    />
  </label>
}

export default AddImage 