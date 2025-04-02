"use client";
import { useRef, useState } from "react";

export default function UploadImage({
  image,
  setImage,
  indexTab,
  setIndexTab,
}) {
  const checkImageRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  function handleNext(e) {
    e.preventDefault();
    if (image == null) {
      checkImageRef.current.setCustomValidity("Image is required");
      checkImageRef.current.reportValidity();
    } else {
      setIndexTab(indexTab + 1);
    }
  }

  return (
    <>
      <fieldset>
        <h3>Verify Your Identity</h3>
        <h6>Please upload any of these documents to verify your Identity.</h6>
        <div className="input-group">
          <div className="custom-file d-flex justify-content-center">
            <div>
              <input
                className=""
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e)}
                ref={checkImageRef}
              />
            </div>
          </div>
        </div>
        <ul className="file_added">
          {preview && <img src={preview} alt="Preview" width={200} />}
        </ul>
      </fieldset>
      <button
        type="button"
        className="action-button previous_button"
        onClick={() => setIndexTab(indexTab - 1)}
      >
        Back
      </button>
      <button
        type="button"
        className="next action-button"
        onClick={(e) => handleNext(e)}
      >
        Next
      </button>
    </>
  );
}
