import React, { useState, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import image from "./dp_frame.png";

function ImageBlender() {
  const [userImage, setUserImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const fileInputRef = useRef(null);
  const sampleImage = image;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          const size = Math.min(img.width, img.height); // Determine the square size
          canvas.width = size;
          canvas.height = size;
          context.drawImage(
            img,
            (img.width - size) / 2,
            (img.height - size) / 2,
            size,
            size,
            0,
            0,
            size,
            size
          );
          setUserImage(canvas.toDataURL("image/png"));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSquareClick = () => {
    fileInputRef.current.click();
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleDownload = useCallback(() => {
    if (!croppedAreaPixels || !userImage) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const sampleImg = new Image();
    const userImg = new Image();

    sampleImg.src = sampleImage;
    userImg.src = userImage;

    userImg.onload = () => {
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      context.drawImage(
        userImg,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      sampleImg.onload = () => {
        context.drawImage(
          sampleImg,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "cropped-image.png";
        link.click();
      };
    };

    // Ensure the user image is loaded before triggering the download
    if (userImg.complete) {
      userImg.onload();
    }
  }, [croppedAreaPixels, userImage, sampleImage]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        color: "#333"
      }}
    >
      <h2 style={{ marginBottom: "10px", color: "#1a472a", textAlign: "center" }}>Be Part of This Sacred Gathering</h2>
      <p style={{ marginBottom: "20px", color: "#666", fontSize: "1.2rem", textAlign: "center", maxWidth: "600px", lineHeight: "1.6" }}>Create your spiritual profile picture and join thousands of believers in this blessed night of Ramadan. Together, let's spread the message of peace and unity.</p>
      <div
        style={{
          position: "relative",
          width: "300px",
          height: "300px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
          textShadow: "1px 1px 2px black",
          border: "none",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
        }}
        onClick={handleSquareClick}
      >
        {userImage && (
          <Cropper
            image={userImage}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round" // Makes the crop area circular
            showGrid={false} // Hides the grid lines
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: {
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              },
              cropAreaStyle: {
                borderRadius: "50%", // Ensures the crop area is circular
              },
            }}
          />
        )}
        <img
          src={sampleImage}
          alt="Sample"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none", // Ensure the overlay doesn't interfere with interactions
          }}
        />
        {!userImage && <span>Tap to upload</span>}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <button
        onClick={handleDownload}
        style={{
          backgroundColor: "#1a472a",
          border: "none",
          color: "white",
          padding: "15px 32px",
          textAlign: "center",
          textDecoration: "none",
          display: "inline-block",
          fontSize: "16px",
          margin: "20px 2px",
          cursor: "pointer",
          borderRadius: "10px",
          transition: "background-color 0.3s"
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0f2b19")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#1a472a")}
      >
        Download Image
      </button>
    </div>
  );
}

export default ImageBlender;