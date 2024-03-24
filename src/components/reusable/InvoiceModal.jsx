import React from "react";
import { Row, Col, Modal } from "react-bootstrap";

export default function InvoiceModal(props) {
    return (
        <Modal
            show={props.showModal}
            onHide={props.closeModal}
            size="lg"
            centered
        >
            <div id="invoicecapture " className="p-4">
                <div className="d-flex flex row justify-content-between align-items-start bg-light w-100">
                    <div className="w-100">
                        <h4 className="fw-bold my-2">{props.info.billFrom}</h4>
                        <h6 className="fw-bold text-secondary mb-1">
                            Invoice#: {props.info.invoiceNumber}
                        </h6>
                    </div>
                    <div className="text-end ms-4">
                        <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
                        <h5 className="fw-bold text-secondary">
                            {props.info.currency} {props.total}
                        </h5>
                    </div>
                </div>

                <div className="p-4">
                    <Row className="mb-4">
                        <Col md={4}>
                            <div className="fw-bold">
                                <div>{props.info.billTo || ""}</div>
                                <div>{props.info.billToAddress || ""}</div>
                                <div>{props.info.billToEmail || ""}</div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="fw-bold">
                                <div>{props.info.billFrom || ""}</div>
                                <div>{props.info.billFromAddress || ""}</div>
                                <div>{props.info.billFromEmail || ""}</div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="fw-bold mt-2">
                                <div>Date of Issue:</div>
                                <div>{new Date().toLocaleDateString()}</div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Modal>
    );
}
