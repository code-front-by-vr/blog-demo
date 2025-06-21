import React from 'react'
import {Modal} from '../modal/Modal.jsx'
import {hideCoverPreview, clearCoverPreview} from '../../redux/cover-preview-slice'
import {useAppDispatch, useAppSelector} from '../../redux/store'

export function CoverPreviewModal() {
  const {data, isShownModal} = useAppSelector(state => state.coverPreview)
  const dispatch = useAppDispatch()

  function handleClose() {
    dispatch(hideCoverPreview())
    dispatch(clearCoverPreview())
  }

  function renderModal() {
    if (!data) return null

    return <img src={data?.image} alt={data?.title} className="modal-img img-fluid" />
  }

  return (
    <Modal opened={isShownModal} onClose={handleClose}>
      {renderModal()}
    </Modal>
  )
}
