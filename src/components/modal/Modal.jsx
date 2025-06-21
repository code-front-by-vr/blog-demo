import {useEffect, useState, useRef} from 'react'
import {Modal as BootstrapModal} from 'bootstrap'

export function Modal(props) {
  const [modalInstance, setModalInstance] = useState(null)
  const modalRef = useRef(null)

  useEffect(() => {
    if (!modalInstance) return

    if (props.opened) {
      modalInstance.show()
    } else {
      modalInstance.hide()
    }
  }, [props.opened, modalInstance])

  useEffect(() => {
    if (modalRef.current) {
      const modal = BootstrapModal.getOrCreateInstance(modalRef.current)
      setModalInstance(modal)
    }
  }, [modalRef])

  useEffect(() => {
    const modalElement = modalRef.current
    if (!modalElement) return

    const handleHidden = () => props.onClose?.()

    modalElement.addEventListener('hidden.bs.modal', handleHidden)

    return () => {
      modalElement.removeEventListener('hidden.bs.modal', handleHidden)
    }
  }, [props.onClose])

  return (
    <>
      <div className="modal" tabIndex="-1" ref={modalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{props.title}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">{props.children}</div>
          </div>
        </div>
      </div>
    </>
  )
}
