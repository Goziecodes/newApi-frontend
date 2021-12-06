import React from "react";
import { useState } from "react";
import {
  ButtonDropdown,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Modal,
  Spinner,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { useRouter } from "next/router";


// components

export default function UserTransactionsTable({transactions = []}) {
  // const queryClient = useQueryClient();
  const [category, setCategory] = useState("pending");
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropDown = () => setDropdownOpen((prevState) => !prevState);

  const toggle = (transaction) => {
    setModal(!modal);
    setModalContent(transaction);
    // setModalContent(modal ? transaction : {});
  };
  const toggle2 = () => {
    setModal(!modal);
  };

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };

  const toggleAll = () => {
    // setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  const router = useRouter();

  console.log(transactions,'l');
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full lg:w-9/12 mx-auto mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-sm text-blueGray-700">
                  Recent Transactions
                </h3>
              </div>
              

   
            </div>
          </div>
          <div className="block w-full   h-350-px overflow-x-auto overflow-y-auto">
            {/* Projects table */}
            <Table className="items-center w-full bg-transparent border-collapse">
              <thead className="thead-light">
                <tr>
                  <th className="px-6 w-5 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Acc Name / Bank
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Amount
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Designation
                  </th>
              
                </tr>
              </thead>
              <tbody>
                {/* {transactions.filter(transaction => transaction.verified).map(transaction => ( */}
                {transactions?.filter(transaction => transaction.verified).map((transaction, index) => (
                  <React.Fragment key={index}>
                    <tr onClick={() => toggle(transaction)}>
                      <th className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {transaction.recipient_name} <br />
                        {transaction.recipient_bank}
                      </th>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {transaction.transaction_amount}
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i
                          className={`fas ${
                            transaction.transaction_type === "debit"
                              ? "fa-arrow-up text-red-500"
                              : "fa-arrow-down text-emerald-500"
                          } mr-4`}
                        >
                          {" "}
                        </i>
                        {transaction.transaction_type}
                      </td>
                    
                    </tr>
                  </React.Fragment>
                ))}
                <Modal
                  returnFocusAfterClose={true}
                  isOpen={modal}
                  toggle={toggle}
                >
                  <ModalHeader toggle={toggle}>Transactions</ModalHeader>
                  <ModalBody>
                    <Form>
                      <Row>
                        <Col md={6}>
                          <FormGroup className="mb-2">
                            <Label for="exampleEmail" className="">
                              recipient_bank
                            </Label>
                            <Input
                              type="textarea"
                              id="exampleEmail"
                              placeholder="with a placeholder"
                              value={modalContent?.recipient_bank}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup className="mb-2">
                            <Label for="exampleEmail" className="">
                              bank_address
                            </Label>
                            <Input
                              type="textarea"
                              id="exampleEmail"
                              placeholder="with a placeholder"
                              value={modalContent?.bank_address}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <FormGroup className="mb-2">
                            <Label for="exampleEmail" className="">
                              account_number
                            </Label>
                            <Input
                              type="textarea"
                              id="exampleEmail"
                              placeholder="with a placeholder"
                              value={modalContent?.account_number}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup className="mb-2">
                            <Label for="exampleEmail" className="">
                              recipient_name
                            </Label>
                            <Input
                              type="textarea"
                              id="exampleEmail"
                              placeholder="with a placeholder"
                              value={modalContent?.recipient_name}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <FormGroup className="mb-2">
                            <Label for="exampleEmail" className="">
                              transaction_amount
                            </Label>
                            <Input
                              type="textarea"
                              id="exampleEmail"
                              placeholder="with a placeholder"
                              value={modalContent?.transaction_amount}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup className="mb-2">
                            <Label for="exampleEmail" className="">
                              details
                            </Label>
                            <Input
                              type="textarea"
                              id="exampleEmail"
                              placeholder="with a placeholder"
                              value={modalContent?.details}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <FormGroup className="mb-2">
                            <Label for="exampleEmail" className="">
                              routing
                            </Label>
                            <Input
                              type="textarea"
                              id="exampleEmail"
                              placeholder="with a placeholder"
                              value={modalContent?.routing}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup className="mb-2">
                            <Label for="exampleEmail" className="">
                              swift
                            </Label>
                            <Input
                              type="textarea"
                              id="exampleEmail"
                              placeholder="with a placeholder"
                              value={modalContent?.swift}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <FormGroup className="mb-2">
                            <Label for="exampleEmail" className="">
                              transaction_type
                            </Label>
                            <Input
                              type="textarea"
                              id="exampleEmail"
                              placeholder="with a placeholder"
                              value={modalContent?.transaction_type}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup className="mb-2">
                            <Label for="exampleEmail" className="">
                              transaction owner
                            </Label>
                            <Input
                              type="textarea"
                              id="exampleEmail"
                              placeholder="with a placeholder"
                              value={modalContent?.owner?.username}
                              // value={transaction.owner.username}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                    <br />
                  
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </tbody>
            </Table>
          </div>
        </div>
    </>
  );
}
