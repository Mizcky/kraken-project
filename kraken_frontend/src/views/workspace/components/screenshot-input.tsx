import React, { ChangeEvent, DragEvent, forwardRef } from "react";
import Popup from "reactjs-popup";
import "../../../styling/screenshot-input.css";
import CloseIcon from "../../../svg/close";

export type ScreenshotInputProps = {
    screenshotDataURL: string | undefined;
    setScreenshotDataURL: React.Dispatch<React.SetStateAction<string | undefined>>;
    setScreenshot: React.Dispatch<React.SetStateAction<File | undefined>>;
} & React.HTMLProps<HTMLDivElement>;

export const ScreenshotInput = forwardRef<HTMLDivElement, ScreenshotInputProps>(
    ({ screenshotDataURL, setScreenshotDataURL, setScreenshot, ...props }, ref) => {
        const [drag, setDrag] = React.useState<boolean>(false);
        const [popup, setPopup] = React.useState<boolean>(false);

        const inputRef = React.useRef<HTMLInputElement>(null);

        const updateImage = () => {
            const fileUploadInput = inputRef.current;

            if (!fileUploadInput) {
                return; //File input element not found
            }

            // @ts-ignore
            const image = fileUploadInput.files[0];

            if (!image) {
                return; //No file selected
            }

            if (!image.type.includes("image")) {
                return; //file is no image, only .png, .jpg, .jpeg
            }

            //TODO maybe check file size
            /**
             *  if (image.size > 10_000_000) {
             *     return; //('Maximum upload size is 10MB!')
             *   }
             * */

            const fileReader = new FileReader();
            fileReader.readAsDataURL(image);

            fileReader.onload = (e) => {
                const result = e.target?.result as string;
                if (result) {
                    setScreenshotDataURL(result);
                    setScreenshot(image);
                }
            };
            setDrag(false);
        };
        const dropHandler = (e: DragEvent<HTMLInputElement>) => {
            console.log(e);
            e.preventDefault();
            if (inputRef.current) {
                inputRef.current.files = e.dataTransfer.files;
                // updateImage();
            }
        };

        const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
            updateImage();
        };

        return (
            <div {...props} className={`screenshot-input ${props.className}`} ref={ref}>
                {screenshotDataURL ? (
                    <button
                        title={"Remove screenshot"}
                        className="remove"
                        onClick={() => {
                            setScreenshotDataURL(undefined);
                            if (inputRef.current) {
                                // clear file
                                inputRef.current.value = null as any;
                            }
                        }}
                    >
                        <CloseIcon />
                    </button>
                ) : undefined}
                <div
                    onDrop={dropHandler}
                    onDragOver={(e) => {
                        if (!drag) {
                            setDrag(true);
                        }
                        e.preventDefault();
                    }}
                    onDragEnter={(e) => {
                        e.preventDefault();
                    }}
                    onDragLeave={() => setDrag(false)}
                >
                    <input ref={inputRef} type="file" onChange={imageHandler} accept={"image/*"} />
                    {screenshotDataURL ? (
                        <>
                            <div
                                onClick={() => {
                                    setPopup(true);
                                }}
                            >
                                <img src={screenshotDataURL} />
                            </div>
                        </>
                    ) : (
                        <>
                            {drag ? (
                                <span>Drop image here</span>
                            ) : (
                                <span>Drag your image here or click in this area</span>
                            )}
                        </>
                    )}
                </div>
                <Popup className="screenshot-popup" nested modal open={popup} onClose={() => setPopup(false)}>
                    <div className="screenshot-input-popup" onClick={() => setPopup(false)}>
                        <img src={screenshotDataURL} />
                    </div>
                </Popup>
            </div>
        );
    },
);
