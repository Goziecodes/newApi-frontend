import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  Button,
  Modal,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  Spinner,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { useQuery, useQueryClient, useMutation } from "react-query";
import { useLoading, BallTriangle } from "@agney/react-loading";

// components

export default function UsersTable() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [category, setCategory] = useState("All Users");
  const [modalContent, setModalContent] = useState({});
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropDown = () => setDropdownOpen((prevState) => !prevState);

  const toggle = (user) => {
    setModal(!modal);
    setModalContent(user);
  };
  const toggle2 = () => {
    setModal(!modal);
  };

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  const {
    data: users,
    isLoading: isLoadingUsers,
    refetch,
  } = useQuery(["adminGetusers", category], async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_BASEURL}/admin/users/${category}`
      // `http://localhost:2000/admin/users/${category}`
    );
    return data;
  });

  const { containerProps, indicatorEl } = useLoading({
    indicator: <BallTriangle width="50" color="white" />,
    loading: true,
    loaderProps: {
      // Any props here would be spread on to the indicator element.
      // style: {{ margin: '0 auto' }}
      // style: { margin: "3rem auto" },
      style: { margin: "3rem auto" },
    },
  });

  const mutation = useMutation(
    async (userId) => {
      return await axios
        // .put(`http://localhost:2000/admin/users/block/${userId}`)
        .put(`${process.env.NEXT_PUBLIC_SERVER_BASEURL}/admin/users/block/${userId}`)
        .catch((err) => {
          // console.log(err.response, 'cuaght')
          // throw err.response;
          throw new Error(err.response);
        });
    },
    {
      throwOnError: true,
      onSuccess: async (data) => {
        console.log('abeg work ooooo')
        toggle2();
        queryClient.invalidateQueries("adminGetusers");
      },
      onError: async (error, variables, context) => {
        // console.log(`rolling back optimistic update with id ${context.id}`);
        console.log(` ${error} is the error`);
      },
    }
  );

  return (
    <>
      <div className="flex flex-wrap mt-4 justify-center">
        {isLoadingUsers ? (
          <section {...containerProps}>
            {indicatorEl} {/* renders only while loading */}
          </section>
        ) : (
          <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-blueGray-700">
                      Users
                    </h3>
                  </div>

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
                          setCategory(() => "All Users");
                        }}
                      >
                        All Users
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          setCategory(() => "Verify Users");
                        }}
                      >
                        Verify Users
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          setCategory(() => "Blocked Users");
                        }}
                      >
                        Blocked Users
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
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        FullName
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Acc Bal
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user, index) => (
                      <>
                        <tr onClick={() => toggle(user)} key={index}>
                          <th className={` ${!user.allowed && 'text-red-500'} border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left`}>
                            {user.firstName} {user.lastName}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {user.accountBalance}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap ">
                            <div className="flex justify-between">
                              <div className=" flex relative w-full px-4 max-w-full flex-grow flex-1 flex-col text-right">
                                <button
                                 onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  router.push(`/userTransactions/${user?._id}`)}
                                  }
                                  className="px-4 bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase  py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                >
                                  Transactions
                                </button>
                               <div class="flex justify-center">
                               <button
                                 onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  router.push(`/adminCredit/${user?._id}`)}
                                  }
                                  className="px-4 bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase  py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                >
                                  Credit
                                </button>
                               <button
                                 onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  router.push(`/adminDebit/${user?._id}`)}
                                  }
                                  className="px-4 bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase  py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                >
                                  Debit
                                </button>
                               </div>
                                {user.ID && !user.verified ? (
                                  <button
                                  onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  router.push(`/verifyid/${user?._id}`)}
                                  }
                                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                  >
                                    Verify ID
                                  </button>
                                ) : null}
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    ))}
                    <Modal
                          returnFocusAfterClose={true}
                          isOpen={modal}
                          toggle={toggle}
                        >
                          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                          <ModalBody>
                            <Form>
                              <Row>
                                <Col md={6}>
                                  <FormGroup className="mb-2">
                                    <Label for="exampleEmail" className="">
                                      Full name
                                    </Label>
                                    <Input
                                      type="textarea"
                                      id="exampleEmail"
                                      placeholder="with a placeholder"
                                      value={`${modalContent?.firstName} ${modalContent?.lastName}`}
                                      disabled
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup className="mb-2">
                                    <Label for="exampleEmail" className="">
                                      email
                                    </Label>
                                    <Input
                                      type="textarea"
                                      id="exampleEmail"
                                      // contenteditable='true'
                                      placeholder="with a placeholder"
                                      value={modalContent?.email}
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
                                      value={modalContent?.accountNumber}
                                      disabled
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup className="mb-2">
                                    <Label for="exampleEmail" className="">
                                      phone
                                    </Label>
                                    <Input
                                      type="textarea"
                                      id="exampleEmail"
                                      placeholder="with a placeholder"
                                      value={modalContent?.phone}
                                      disabled
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>

                              <Row>
                                <Col md={6}>
                                  <FormGroup className="mb-2">
                                    <Label for="exampleEmail" className="">
                                      accountBalance
                                    </Label>
                                    <Input
                                      type="textarea"
                                      id="exampleEmail"
                                      placeholder="with a placeholder"
                                      value={modalContent?.accountBalance}
                                      disabled
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup className="mb-2">
                                    <Label for="exampleEmail" className="">
                                      verified
                                    </Label>
                                    <Input
                                      type="textarea"
                                      id="exampleEmail"
                                      placeholder="with a placeholder"
                                      value={modalContent?.verified}
                                      disabled
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>

                              <Row>
                                <Col md={6}>
                                  <FormGroup className="mb-2">
                                    <Label for="exampleEmail" className="">
                                      accountType
                                    </Label>
                                    <Input
                                      type="textarea"
                                      id="exampleEmail"
                                      placeholder="with a placeholder"
                                      value={modalContent?.accountType}
                                      disabled
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup className="mb-2">
                                    <Label for="exampleEmail" className="">
                                      currency
                                    </Label>
                                    <Input
                                      type="textarea"
                                      id="exampleEmail"
                                      placeholder="with a placeholder"
                                      value={modalContent?.currency}
                                      disabled
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>

                              <Row>
                                <Col md={6}>
                                  <FormGroup className="mb-2">
                                    <Label for="exampleEmail" className="">
                                      gender
                                    </Label>
                                    <Input
                                      type="textarea"
                                      id="exampleEmail"
                                      placeholder="with a placeholder"
                                      value={modalContent?.gender}
                                      disabled
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup className="mb-2">
                                    <Label for="exampleEmail" className="">
                                      address
                                    </Label>
                                    <Input
                                      type="textarea"
                                      id="exampleEmail"
                                      placeholder="with a placeholder"
                                      value={modalContent?.address}
                                      // value={transaction.owner.username}
                                      disabled
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup className="mb-2">
                                    <Label for="exampleEmail" className="">
                                      dateOfBirth
                                    </Label>
                                    <Input
                                      type="textarea"
                                      id="exampleEmail"
                                      placeholder="with a placeholder"
                                      value={modalContent?.dateOfBirth}
                                      // value={transaction.owner.username}
                                      disabled
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup className="mb-2">
                                    <Label for="exampleEmail" className="">
                                      blocked
                                    </Label>
                                    <Input
                                      type="textarea"
                                      id="exampleEmail"
                                      placeholder="with a placeholder"
                                      value={
                                        modalContent?.allowed
                                          ? "not blocked"
                                          : "blocked"
                                      }
                                      // value={transaction.owner.username}
                                      disabled
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Form>
                            <br />{" "}
                            <div className='text-center'>
                            <Button color={modalContent.allowed ? "danger" : "primary"} onClick={() => mutation.mutate(modalContent._id)}>
                              { mutation.isLoading ? (
                          <Spinner className="" color="white" size="sm" />
                        ) : (
                                modalContent.allowed ? 'block' : 'unblock'
                        )}
                            </Button>{" "}
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
          </>
        )}
      </div>
    </>
  );
}
