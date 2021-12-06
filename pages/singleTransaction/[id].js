import React from "react";
import { useRouter } from "next/router";

import Quicklinks from "components/Cards/Quicklinks.jsx";
import UserHeaderStats from "components/Headers/UserHeaderStats.js";

// layout for page

import GeneralLayout from "../../layouts/GeneralLayout";
import UserTransactionsTable from "components/Cards/UserTransactionsTable";
import axios from "axios";
import {
  Jumbotron,
  Button,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useQuery } from "react-query";
import { useLoading, BallTriangle } from "@agney/react-loading";

export default function SingleTransaction() {
  const router = useRouter();
  const { id } = router.query;

  const { data: transaction, isLoading } = useQuery("transaction", async () => {
    const { data } = await axios.get(
      // `http://localhost:2000/admin/transaction/${id}`
      `${process.env.NEXT_PUBLIC_SERVER_BASEURL}/admin/transaction/${id}`
    );
    return data;
  });

  console.log(transaction?.owner?.username);

  const { containerProps, indicatorEl } = useLoading({
    indicator: <BallTriangle width="50" color="white" />,
    loading: true,
    loaderProps: {
      // Any props here would be spread on to the indicator element.
      // style: {{ margin: '0 auto' }}
      style: { margin: "3rem auto" },
    },
  });

  return (
    <>
      {isLoading ? (
        <section {...containerProps}>{indicatorEl}</section>
      ) : (
        <>
          <div className="bg-white mt-20 pt-8 pb-6 px-4 h-auto w-90 mx-auto rounded-lg ">
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup className="mb-2">
                    <Label for="exampleEmail" className="">
                      recipient_bank
                    </Label>
                    <Input
                      type="text"
                      id="exampleEmail"
                      placeholder="with a placeholder"
                      value={transaction.recipient_bank}
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
                      type="text"
                      id="exampleEmail"
                      placeholder="with a placeholder"
                      value={transaction.bank_address}
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
                      type="text"
                      id="exampleEmail"
                      placeholder="with a placeholder"
                      value={transaction.account_number}
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
                      type="text"
                      id="exampleEmail"
                      placeholder="with a placeholder"
                      value={transaction.recipient_name}
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
                      type="text"
                      id="exampleEmail"
                      placeholder="with a placeholder"
                      value={transaction.transaction_amount}
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
                      type="text"
                      id="exampleEmail"
                      placeholder="with a placeholder"
                      value={transaction.details}
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
                      type="text"
                      id="exampleEmail"
                      placeholder="with a placeholder"
                      value={transaction.routing}
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
                      type="text"
                      id="exampleEmail"
                      placeholder="with a placeholder"
                      value={transaction.swift}
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
                      type="text"
                      id="exampleEmail"
                      placeholder="with a placeholder"
                      value={transaction.transaction_type}
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
                      type="text"
                      id="exampleEmail"
                      placeholder="with a placeholder"
                      value={transaction?.owner?.username}
                      // value={transaction.owner.username}
                      disabled
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>

            <div className="d-flex justify-evenly">
              {" "}
              <p className="lead">
                <Button color="primary">Verify Transaction</Button>
              </p>
              <p className="lead">
                <Button color="danger">Reject Transaction</Button>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

SingleTransaction.layout = GeneralLayout;
