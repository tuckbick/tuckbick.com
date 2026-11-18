import { useRef, useState, useEffect } from "react";

import Modal from "../Modal/Modal";

import './Gallery.css';

interface Props {
    images: string[]
}

export default function Gallery({ images }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
            } else if (e.key === 'ArrowRight') {
                setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [images.length]);

    return (
        <div className="gallery">
            {images.map((imgSrc, idx) => (
                <GalleryItem
                    key={idx}
                    thumbnailSrc={imgSrc}
                    currentSrc={images[currentIndex]}
                    onSelect={() => setCurrentIndex(idx)}
                />
            ))}
        </div>
    )
}

interface GalleryItemProps {
    thumbnailSrc: string
    currentSrc: string
    onSelect: () => void
}

function GalleryItem({ thumbnailSrc, currentSrc, onSelect }: GalleryItemProps) {
    const thumbnailRef = useRef<HTMLImageElement>(null);

    return (
        <>
            <img
                className="gallery-thumbnail focusable"
                ref={thumbnailRef}
                src={`/${thumbnailSrc}`}
                tabIndex={0}
                onClick={onSelect}
            />
            <Modal triggerRef={thumbnailRef}>
                <img src={`/${currentSrc}`} />
            </Modal>
        </>
    )
}