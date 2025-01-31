import React, { useState, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import image from "./frame.png";

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
        height: "100vh",
        backgroundColor: "#f0f8ff", // Light blue background
        color: "#333", // Dark text color
      }}
    >
      <h1 style={{ marginBottom: "10px", color: "#2c3e50" }}>Join our campaign</h1>
      <h3 style={{ marginBottom: "20px", color: "#34495e" }}>Blend your image with ours</h3> 

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
          border: "1px solid #2980b9", // Removed border
          // borderRadius: "15px", // Rounded corners
          overflow: "hidden", // Ensures the image doesn't overflow
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
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
          backgroundColor: "#3498db", // Blue background
          border: "none", // Remove border
          color: "white", // White text
          padding: "15px 32px", // Padding
          textAlign: "center", // Centered text
          textDecoration: "none", // Remove underline
          display: "inline-block", // Inline-block display
          fontSize: "16px", // Font size
          margin: "20px 2px", // Margin
          cursor: "pointer", // Pointer cursor on hover
          borderRadius: "12px", // Rounded corners
          transition: "background-color 0.3s", // Smooth transition
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#2980b9")} // Darker blue on hover
        onMouseOut={(e) => (e.target.style.backgroundColor = "#3498db")} // Original color on mouse out
      >
        Download Image
      </button>
    </div>
  );
}

export default ImageBlender;