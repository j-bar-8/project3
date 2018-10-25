import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Moment from "react-moment";
import moment from "moment";

class Books extends Component {
  state = {
    books: [],
    title: "",
    price: "",
    quantity: "",
    total: 0.00,
    location: "",
    date: ""
  };

  componentDidMount() {
    this.loadBooks();
    }
  
  getDate() {
    let date = { currentTime: new Date().toLocaleString() };
    this.setState({
      date: date
    });
  }
  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", price: "", quantity: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.price) {
      API.saveBook({
        title: this.state.title,
        price: this.state.price,
        quantity: this.state.quantity,
        total: this.state.total,
        location: this.state.location
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('img/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("download.pdf");
      });
  }
  
  
  render() {
  const dateToFormat = moment();
  return (
      <Container fluid>
        <Row>
          <Col size="md-4">
            <Jumbotron>
              <h1>Add To Inventory</h1>
              <Moment>{dateToFormat}</Moment>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Item (required)"
              />
               <Input
                value={this.state.quantity}
                onChange={this.handleInputChange}
                name="quantity"
                placeholder="Quantity"
              />
              <Input
                value={this.state.price}
                onChange={this.handleInputChange}
                name="price"
                placeholder="Price (required)"
              />
              <FormBtn
                disabled={!(this.state.price && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Add
              </FormBtn>
            </form>
          </Col>
          <Col size="md-8 sm-12">
            <Jumbotron>
              <h1>Current Inventory</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} Quantity: {book.quantity} Price: {book.price} Total: {book.quantity * book.price}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              <button onClick={this.printDocument}>Print</button>
              </List>
              
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
