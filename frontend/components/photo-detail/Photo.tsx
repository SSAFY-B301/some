import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface Props {
  imgSrc: string;
  clickImg(): void;
  showConcentrationMode: boolean;
  isZoom: boolean;
  ratio: number;
  // onTouchEnd(e: React.TouchEvent): void;
  // onTouchStart(e: React.TouchEvent): void;
}

const Photo = ({
  imgSrc,
  clickImg,
  showConcentrationMode,
  isZoom,
  ratio,
}: // onTouchEnd,
// onTouchStart,
Props): JSX.Element => {
  return (
    <div
      className={
        showConcentrationMode
          ? "absolute w-screen h-screen z-30 flex justify-center items-center bg-black"
          : "absolute w-screen h-screen z-10 flex justify-center items-center"
      }
      onClick={clickImg}
      // onTouchStart={onTouchStart}
      // onTouchEnd={onTouchEnd}
    >
      <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
        <TransformWrapper
          initialScale={1}
          minScale={1}
          maxScale={5}
          disablePadding={true}
          centerZoomedOut={true}
          centerOnInit={true}
          // panning={isZoom ? { disabled: false } : { disabled: true }}
          doubleClick={isZoom ? { mode: "zoomOut" } : { mode: "zoomIn" }}
        >
          <TransformComponent>
            <div className="w-screen h-screen flex justify-center items-center bg-contain">
              <div>
                <img src={`${imgSrc}`} />
              </div>
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
};

export default Photo;
