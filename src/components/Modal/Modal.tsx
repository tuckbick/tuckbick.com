import { useCallback, useEffect, useRef, useState } from 'react'
import type React from 'react'

import './Modal.css';
import Icon from '../Icon/Icon';

interface Props {
    children: React.ReactNode,
    triggerRef: React.RefObject<HTMLButtonElement | null>
}

export default function Modal({ children, triggerRef }: Props) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        const openDialog = () => setDialogOpen(true)

        trigger.addEventListener('click', openDialog);

        return () => trigger.removeEventListener('click', openDialog);
    }, []);

    useEffect(() => {
        if (isDialogOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isDialogOpen])

    const closeDialog = () => setDialogOpen(false);

    const onDialogKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeDialog();
        }
    }, []);

    const onDialogClick = useCallback(() => closeDialog(), []);

    const onDialogContentClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation(), []);


    return (
        isDialogOpen && <dialog ref={dialogRef} className="modal" aria-modal="true" role="dialog" onClick={onDialogClick} onKeyDown={onDialogKeyDown}>
            <button className="focusable" type="button" onClick={closeDialog} aria-label="Close dialog" tabIndex={0}>
                <Icon name="x" size="lg" />
            </button>
            <div className="modal-content" onClick={onDialogContentClick}>
                {children}
            </div>
        </dialog>
    )
}