import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import InvoiceItem from "./reusable/InvoiceItem";
import InvoiceModal from "./reusable/InvoiceModal";

const InvoiceForm = () => {
    const [state, setState] = useState({
        isOpen: false,
        currency: "LKR",
        currentDate: "",
        invoiceNumber: 1,
        billTo: "",
        billToAddress: "",
        billToEmail: "",
        billFrom: "WO",
        billFromEmail: "ahamedsiraj770@gmail.com",
        billFromAddress: "Mannar, Sri Lanka",
        notes: "",
        subTotal: "0.00",
        taxRate: 0,
        taxAmount: "0.00",
        discountRate: 0,
        discountAmount: "0.00",
    });
    const [total, setTotal] = useState(0.0);
    const [items, setItems] = useState([
        {
            id: "0",
            name: "",
            description: "",
            price: 1.0,
            quntity: 1, //quantity
        },
    ]);

    // Getting vlaue for state using form
    const onChange = (e) => {
        setState((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };
    // console.log("state:", state);

    //
    const onItemizedItemEdit = (event) => {
        const individulItem = {
            id: event.target.id,
            name: event.target.name,
            value: event.target.value,
        };
        // console.log("Individual Item:", individulItem);

        var newItems = items.map((item) => {
            for (var key in item) {
                if (
                    key === individulItem.name &&
                    item.id === individulItem.id
                ) {
                    item[key] = individulItem.value;
                }
            }
            return item;
        });
        setItems(newItems);
    };

    const handleAddEvent = (e) => {
        console.log("Add Item called");
        var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(
            36
        );
        var item = {
            id: id,
            name: "",
            description: "",
            quantity: 1,
        };
        setItems((items) => [...items, item]);
    };

    const handleRowDel = (item) => {
        console.log("Delete called and ID", item.id);
        if (items.length > 1) {
            setItems((items) => items.filter((i) => i.id !== item.id));
        } else {
            setItems([
                {
                    id: "0",
                    name: "",
                    description: "",
                    price: 1.0,
                    quntity: 1,
                },
            ]);
        }
    };

    const onCurrencyChange = (selectedOption) => {
        setState((state) => ({ ...state, selectedOption }));
    };

    // const formSubmit = (e) => {
    //     e.preventDefault();
    // };

    const handleCalculateTotal = (items) => {
        var subTotal = 0;
        items.map((item) => {
            subTotal += parseFloat(item.price).toFixed(2) * parseInt(item.quantity);
        });

        // subTotal = parseFloat(subTotal).toFixed(2);
        console.log('Sub Total: ', subTotal);

        const discountAmount = parseFloat(
            parseFloat(subTotal) * parseFloat(state.discountRate / 100)
        ).toFixed;
        const taxAmount = parseFloat(
            parseFloat(subTotal) * parseFloat(state.taxRate / 100)
        ).toFixed;

        const total =
            parseFloat(subTotal) +
            parseFloat(taxAmount) -
            parseFloat(discountAmount);

            setTotal(total)

            setState((state) => ({
                ...state,
                subTotal,
                taxAmount,
                discountAmount
            }))
    };

    useEffect(() => {
        handleCalculateTotal(items)
    }, [items, state.taxRate, state.discountRate]);
    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                setState((state) => ({ ...state, isOpen: true }));
            }}
        >
            <Row>
                <Col md={8} lg={9}>
                    <Card className="d-flex  p-4 p-xl-5 my-3 my-xl-4">
                        <div className="d-flex flex-row justify-content-between">
                            <div className="d-flex flex-row mb-3">
                                <div className="mb-2">
                                    <span className="fw-bold">
                                        Current&nbsp;Date:&nbsp;
                                    </span>
                                    <span className="current-date">
                                        {new Date().toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div className="d-flex flex-row mb-3">
                                <span className="fw-bold">
                                    Invoice&nbsp;Number:&nbsp;
                                </span>
                                <div className="current-date">
                                    {state.invoiceNumber}
                                </div>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <Row className="mb-5">
                            <Col>
                                <Form.Label className="fw-bold">
                                    Customer Name:
                                </Form.Label>
                                <Form.Control
                                    placeholder="name"
                                    value={state.billTo}
                                    type="text"
                                    name="billTo"
                                    className="my-2"
                                    onChange={onChange}
                                    autoComplete="name"
                                    // required={true}
                                />
                                <Form.Label className="fw-bold">
                                    Customer Email:
                                </Form.Label>
                                <Form.Control
                                    placeholder="email"
                                    value={state.billToEmail}
                                    type="text"
                                    name="billToEmail"
                                    className="my-2"
                                    onChange={onChange}
                                    autoComplete="email"
                                />
                                <Form.Label className="fw-bold">
                                    Customer Address:
                                </Form.Label>
                                <Form.Control
                                    placeholder="address"
                                    value={state.billToAddress}
                                    type="text"
                                    name="billToAddress"
                                    className="my-2"
                                    onChange={onChange}
                                    autoComplete="address"
                                    // required={true}
                                />
                            </Col>

                            <Col>
                                <Form.Label className="fw-bold">
                                    Bill From:
                                </Form.Label>
                                <Form.Control
                                    className="my-2"
                                    value={state.billFrom}
                                    disabled={true}
                                />
                                <Form.Control
                                    className="my-2"
                                    value={state.billFromEmail}
                                    disabled={true}
                                />
                                <Form.Control
                                    className="my-2"
                                    value={state.billFromAddress}
                                    disabled={true}
                                />
                            </Col>
                        </Row>
                        <InvoiceItem
                            items={items}
                            onItemizedItemEdit={onItemizedItemEdit}
                            onRowAdd={handleAddEvent}
                            onRowDel={handleRowDel}
                            currency={state.currency}
                        />
                        <Row className="mt-4 justify-content-end">
                            <Col lg={6}>
                                <div className="d-flex flex-row align-items-start justify-content-between">
                                    <span className="fw-bold">Subtotal:</span>
                                    <span>
                                        {state.currency} {state.subTotal}
                                    </span>
                                </div>
                                <div className="d-flex flex-row align-items-start justify-content-between">
                                    <span className="fw-bold">Discount:</span>
                                    <span>
                                        {state.discountRate}% {state.currency} 
                                        {state.discountAmount}
                                    </span>
                                </div>
                                <div className="d-flex flex-row align-items-start justify-content-between">
                                    <span className="fw-bold">Discount:</span>
                                    <span>
                                        {state.taxRate}% {state.currency} 
                                        {state.taxAmount}
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col md={4} lg={3}>
                    <div className="sticky-top pt-md-3 pt-xl-4 ">
                        <Button
                            variant="primary"
                            type="submit"
                            className="d-block w-100"
                            onClick={() =>
                                setState((state) => ({
                                    ...state,
                                    isOpen: true,
                                }))
                            }
                        >
                            Review Invoice
                        </Button>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">
                                Currency:
                            </Form.Label>
                            <Form.Select
                                onChange={(e) =>
                                    onCurrencyChange({
                                        currency: e.target.value,
                                    })
                                }
                                className="btn btn-light my-1"
                            >
                                <option value="Rs">INR</option>
                                <option value="$">USD</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label className="fw-bold">
                                Tax Rate:
                            </Form.Label>
                            <InputGroup className="my-1 flex-nowrap">
                                <Form.Control
                                    name="taxRate"
                                    type="number"
                                    value={state.taxRate}
                                    onChange={onChange}
                                    className="bg-white-border"
                                    placeholder="0.00"
                                    min="0.00"
                                    step="0.01"
                                    max="100.00"
                                />
                                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                                    %
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label className="fw-bold">
                                Discount Rate:
                            </Form.Label>
                            <InputGroup className="my-1 flex-nowrap">
                                <Form.Control
                                    name="discountRate"
                                    type="number"
                                    value={state.discountRate}
                                    onChange={onChange}
                                    className="bg-white-border"
                                    placeholder="0.00"
                                    min="0.00"
                                    step="0.01"
                                    max="100.00"
                                />
                                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                                    %
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </div>
                </Col>
            </Row>
            <InvoiceModal
                showModal={state.isOpen}
                closeModal={() =>
                    setState((state) => ({ ...state, isOpen: false }))
                }
                info={state}
                items={items}
                total={total}
            />
        </Form>
    );
};

export default InvoiceForm;
