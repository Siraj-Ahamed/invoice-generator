import React from 'react'
import { Modal } from 'react-bootstrap'

export default function InvoiceModal(props) {
  return (
   <Modal 
    show={props.showModal}
    onHide={props.closeModal}
    size='lg'
    centered
   >
    <div id="invoicecapture">
        <div className="d-flex flex row justify-content-between align-items-start bg-light w-100 p-4">
            <div className="w-100">
                <h4 className='fw-bold my-2'>
                    {props.info.billFrom}
                </h4>
                <h6 className='fw-bold text-secondary mb-1'>Invoice#: {props.info.invoiceNumber}</h6>
            </div>
            <div className="text-end ms-4">
                <h6 className='fw-bold mt-1 mb-2'>Amount&nbsp;Due:</h6>
                <h5 className="fw-bold text-secondary">{props.currency} {props.total}</h5>
            </div>
        </div>
    </div>
   </Modal>
  )
}
