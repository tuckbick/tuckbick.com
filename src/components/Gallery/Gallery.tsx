import { useRef, useState, useEffect } from "react";

import Modal from "../Modal/Modal";
import { imageSources, MODAL_IMAGE_SIZES, prefetchModalImage } from "./imageSources";

import './Gallery.css';

export interface GalleryImage {
    src: string
    alt: string
    width: number
    height: number
}

interface Props {
    images: GalleryImage[]
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
            {images.map((image, idx) => (
                <GalleryItem
                    key={idx}
                    thumbnail={image}
                    current={images[currentIndex]}
                    onSelect={() => setCurrentIndex(idx)}
                />
            ))}
        </div>
    )
}

interface GalleryItemProps {
    thumbnail: GalleryImage
    current: GalleryImage
    onSelect: () => void
}

function GalleryItem({ thumbnail, current, onSelect }: GalleryItemProps) {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const { thumb } = imageSources(thumbnail.src);
    const prefetch = () => prefetchModalImage(thumbnail.src);

    return (
        <>
            <button
                type="button"
                className="gallery-thumbnail focusable"
                ref={triggerRef}
                aria-haspopup="dialog"
                onClick={onSelect}
                onPointerEnter={prefetch}
                onFocus={prefetch}
                onTouchStart={prefetch}
            >
                <picture>
                    <source type="image/webp" srcSet={thumb.webp} />
                    <img
                        src={thumb.jpg}
                        alt={thumbnail.alt}
                        width={thumbnail.width}
                        height={thumbnail.height}
                        loading="lazy"
                        decoding="async"
                    />
                </picture>
            </button>
            <Modal triggerRef={triggerRef}>
                {/* key: remount on arrow-key navigation so the fade-in restarts */}
                <GalleryModalImage key={current.src} image={current} />
            </Modal>
        </>
    )
}

/** Full-size image with the (already cached) thumbnail as a placeholder until it loads. */
function GalleryModalImage({ image }: { image: GalleryImage }) {
    const [loaded, setLoaded] = useState(false);
    const sources = imageSources(image.src);

    return (
        <div
            className={`gallery-modal-image${loaded ? ' is-loaded' : ''}`}
            style={{ backgroundImage: `image-set(url(${sources.thumb.webp}) type("image/webp"), url(${sources.thumb.jpg}) type("image/jpeg"))` }}
        >
            <picture>
                <source type="image/webp" srcSet={sources.webpSrcSet} sizes={MODAL_IMAGE_SIZES} />
                <img
                    src={sources.jpg}
                    srcSet={sources.jpgSrcSet}
                    sizes={MODAL_IMAGE_SIZES}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    onLoad={() => setLoaded(true)}
                    onError={() => setLoaded(true)}
                />
            </picture>
        </div>
    )
}
