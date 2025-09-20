import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import type { ReactNode } from 'react';

interface IProps {
    title?: string;
    children: ReactNode;
    isOpen: boolean;
    close: () => void
}
const Model = ({ title, isOpen, children, close }: IProps) => {
    return (
        <>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <DialogBackdrop className="fixed inset-0 backdrop-blur-xs" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel transition
                            className="w-full max-w-md rounded-xl bg-slate-50 p-6 backdrop-blur-2xl 
                            duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
                            <DialogTitle as="h3" className="mb-3 font-bold text-lg">{title}</DialogTitle>
                            {children}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
export default Model;