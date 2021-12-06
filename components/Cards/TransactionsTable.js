import Link from "next/link";
import { Router } from "next/router";
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
import { useQueryClient, useMutation, useQuery } from "react-query";
import axios from "axios";
import { useLoading, BallTriangle } from "@agney/react-loading";

// components

export default function TransactionsTable() {
  const queryClient = useQueryClient();
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

  // const toggleDropDown = (id) =>
  //   setOpen((dropdownOpen) => (dropdownOpen === "" ? id : ""));

  const { data: transactions, isLoading } = useQuery(
    ["adminGetTransactions", category],
    async () => {
      const { data } = await axios.get(
        // `http://localhost:2000/admin/transactions/${category}`
        `${process.env.NEXT_PUBLIC_SERVER_BASEURL}/admin/transactions/${category}`
      );
      return data;
    }
  );

  const mutation = useMutation(
    async (transactionId) => {
      return await axios
        .post(
          // `http://localhost:2000/admin/transactions/verify/${transactionId}`
          `${process.env.NEXT_PUBLIC_SERVER_BASEURL}admin/transactions/verify/${transactionId}`
        )
        .catch((err) => {
          // console.log(err.response, 'cuaght')
          // throw err.response;
          throw new Error(err.response);
        });
    },
    {
      throwOnError: true,
      onSuccess: async (data) => {
        console.log("abeg work ooooo");
        toggle2();
        queryClient.invalidateQueries("transactions");
      },
      onError: async (error, variables, context) => {
        // console.log(`rolling back optimistic update with id ${context.id}`);
        console.log(` ${error} is the error`);
      },
    }
  );

  const reverseMutation = useMutation(
    async (transactionId) => {
      return await axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_BASEURL}/admin/transactions/reverse/${transactionId}`
        )
        .catch((err) => {
          // console.log(err.response, 'cuaght')
          // throw err.response;
          throw new Error(err.response);
        });
    },
    {
      throwOnError: true,
      onSuccess: async (data) => {
        console.log("abeg work ooooo");
        toggle2();
        queryClient.invalidateQueries("adminGetTransactions");
      },
      onError: async (error, variables, context) => {
        // console.log(`rolling back optimistic update with id ${context.id}`);
        console.log(` ${error} is the error`);
      },
    }
  );

  console.log(category);
  const { containerProps, indicatorEl } = useLoading({
    indicator: <BallTriangle width="50" color="white" />,
    loading: true,
    loaderProps: {
      // Any props here would be spread on to the indicator element.
      style: { margin: "0 auto" },
      // style: { margin: "3rem auto" },
    },
  });

  return (
    <>
      {isLoading ? (
        <section {...containerProps}>
          {indicatorEl} {/* renders only while loading */}
        </section>
      ) : (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  Recent Transactions
                </h3>
              </div>
              {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div> */}

              <Dropdown
                group
                isOpen={dropdownOpen}
                size="sm"
                toggle={toggleDropDown}
              >
                <DropdownToggle
                  caret
                  className="bg-indigo-500 relative w-full px-4 max-w-full flex-grow flex-1 text-right"
                >
                  {category}
                </DropdownToggle>
                <DropdownMenu className=" text-white active:bg-indigo-600 text-sm font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                  <DropdownItem
                    onClick={() => {
                      setCategory(() => "all");
                    }}
                  >
                    All Transactions
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => {
                      setCategory(() => "pending");
                    }}
                  >
                    Pending Transactions
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => {
                      setCategory(() => "verified");
                    }}
                  >
                    Verified Transactions
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="block w-full h-350-px overflow-x-auto overflow-y-auto">
            {/* Projects table */}
            <Table className="items-center w-full bg-transparent border-collapse">
              <thead className="thead-light">
                <tr>
                  <th className="px-6 w-5 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Acc Name / Acc NO.
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Amount
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Designation
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {transactions.filter(transaction => transaction.verified).map(transaction => ( */}
                {transactions && transactions.map((transaction, index) => (
                  <React.Fragment key={index}>
                    <tr onClick={() => toggle(transaction)}>
                      <th className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {transaction.recipient_name} <br />
                        {transaction.recipient_bank}
                      </th>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {transaction.total}
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i
                          className={`fas ${
                            transaction.transaction_type === "Debit"
                              ? "fa-arrow-up text-red-500"
                              : "fa-arrow-down text-emerald-500"
                          } mr-4`}
                        >
                          {" "}
                        </i>
                        {transaction.transaction_type}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {/* <ButtonDropdown
                          color="primary"
                          isOpen={dropdownOpen === index}
                          toggle={() => toggleDropDown(index)}
                        >
                          <DropdownToggle caret size="sm">
                            *
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem className="text-center py-0">
                              Verify
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem className="text-center">
                              reject
                            </DropdownItem>
                          </DropdownMenu>
                        </ButtonDropdown> */}
                        <div className=" flex relative w-full px-4 max-w-full flex-grow flex-1 flex-col text-right">
                                <button
                                 onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  router.push(`/editTransaction/${transaction?._id}`)
                                  }
                                  }
                                  className=" bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase  py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                >
                                  Edit Transaction
                                </button>                              
                              </div>
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
                    <div className="d-flex justify-evenly">
                      {modalContent.verified === 0 ? (
                        <Button
                          onClick={() =>
                            reverseMutation.mutate(modalContent._id)
                          }
                          color="danger"
                        >
                          {reverseMutation.isLoading ? (
                            <Spinner className="" color="white" size="sm" />
                          ) : (
                            "Reverse Transaction"
                          )}
                        </Button>
                      ) : (
                        <Button
                          onClick={() => mutation.mutate(modalContent._id)}
                          color="primary"
                        >
                          {mutation.isLoading ? (
                            <Spinner className="" color="white" size="sm" />
                          ) : (
                            "Verify Transaction"
                          )}
                        </Button>
                      )}
                      {/* <Button onClick={() => mutation.mutate(modalContent._id)} color="primary">
                        {mutation.isLoading ? (
                          <Spinner className="" color="white" size="sm" />
                        ) : (
                          "Verify Transaction"
                        )}
                      </Button> */}
                      {/* onClick={toggleAll} */}
                      {/* {
                    modalContent.verified && <p className="lead">
                      <Button onClick={() => reverseMutation.mutate(modalContent._id)} color="danger">
                      {mutation.isLoading ? (
                          <Spinner className="" color="white" size="sm" />
                        ) : (
                          "Reverse Transaction"
                        )}
                        
                      </Button>
                    </p>
                  } */}
                    </div>
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
      )}
    </>
  );
}
