import React, { useState, useRef, useCallback } from "react";
import styles from "./AvatarEditorModal.module.css";
// import { AiOutlineRotateLeft, AiOutlineRotateRight } from "react-icons/ai";
import { uploadImage } from "../../api/cloudynary";
//=====================================
import Cropper from "react-easy-crop";
// import ImgDialog from "./ImgDialog";
// import getCroppedImg from "./cropImage";
import { getOrientation } from "get-orientation/browser";
import { getCroppedImg, getRotatedImage } from "./canvasUtils";

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};

export default function AvatarEditorModal({ setUploadLoading, setInputValue }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  console.log({ 크롭: crop, 줌: zoom, 로테이션: rotation });

  const [imageSrc, setImageSrc] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);
  //==========================================================================================
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      try {
        // apply rotation if needed
        const orientation = await getOrientation(file);
        const rotation = ORIENTATION_TO_ANGLE[orientation];
        if (rotation) {
          imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
        }
      } catch (e) {
        console.warn("failed to detect the orientation");
      }

      setImageSrc(imageDataUrl);
    }
  };

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  //==========================================================================================
  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.inner}>
          <p className={styles.title}>사이즈 조절</p>
          <p className={styles.helpText}>
            사진을 드래그하여 위치 조절이 가능합니다.
          </p>
          {/* ================================================================================================== */}
          <div className={styles.cropperContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={4 / 4}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
            />
          </div>
          {/* ================================================================================================== */}
          {/* 커스텀 input file 태그 ============================== */}
          <div className={styles.filebox}>
            <label htmlFor='file'>
              {/* 파일 선택 버튼 역할 */}
              <span>파일 선택</span>
            </label>
            <input // 실제로 업로드를 해주는 input 택그
              type='file'
              id='file'
              onChange={onFileChange}
              name='profileImage'
            />
            {/* 모달 컨포넌트는 하단에 있음 */}
          </div>
          {/* test ============================== */}
          <div className={styles.controler}>
            <p>확대/축소</p>
            <input
              name='zoom'
              type='range'
              // onChange={rotateScale}
              min='1'
              max='3'
              step='0.1'
              defaultValue='0'
              value={zoom}
              aria-labelledby='Zoom'
              onChange={(e) => setZoom(e.target.value)}
            />
            <p>회전</p>
            <input
              name='rotation'
              type='range'
              // onChange={rotateScale}
              min='0'
              max='360'
              step='1'
              defaultValue='0'
              value={rotation}
              aria-labelledby='Rotation'
              onChange={(e) => setRotation(e.target.value)}
            />
          </div>
          <div className={styles.btnList}>
            <button
              className={styles.btn} /*  onClick={() => onClose(false)} */
            >
              저장
            </button>
            <button
              className={styles.btn} /*  onClick={() => onClose(false)} */
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
