import { useCallback, useEffect, useRef, useState } from 'react'
import type React from 'react'

import './Modal.css';
import Icon from '../Icon/Icon';

interface Props {
    children: React.ReactNode,
    triggerRef: React.RefObject<HTMLElement | null>
    /** Keep the (closed) dialog in the DOM so its content is present in prerendered HTML. */
    renderClosed?: boolean
}

export default function Modal({ children, triggerRef, renderClosed = false }: Props) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [wasDialogOpen, setWasDialogOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        const openDialog = () => setDialogOpen(true)

        trigger.addEventListener('click', openDialog);

        return () => trigger.removeEventListener('click', openDialog);
    }, [triggerRef]);

    useEffect(() => {
        if (isDialogOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
            // close() restores focus to whatever had it before showModal(). Safari doesn't
            // focus a button on mouse click, so that can be <body>: focus the trigger explicitly.
            if (wasDialogOpen) triggerRef.current?.focus();
        }
    }, [isDialogOpen, wasDialogOpen, triggerRef])

    const closeDialog = () => {
        setWasDialogOpen(true);
        setDialogOpen(false);
    }

    const onDialogClick = useCallback(() => closeDialog(), []);

    const onDialogContentClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation(), []);

    return (
        (isDialogOpen || wasDialogOpen || renderClosed) && <dialog ref={dialogRef} className="modal" onClick={onDialogClick} onClose={closeDialog}>
            <button className="focusable" type="button" onClick={closeDialog} aria-label="Close dialog" tabIndex={0}>
                <Icon name="x" size="lg" />
            </button>
            <div className="modal-content" onClick={onDialogContentClick}>
                {children}
            </div>
        </dialog>
    )
}