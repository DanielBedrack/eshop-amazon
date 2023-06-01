
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useEffect, useState } from 'react';
import { getFilterUrl } from '../../Utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { search } = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    const filterURI = getFilterUrl(search, { query: query });
    navigate(filterURI);
  };

  useEffect(() => {
    //getFilterUrl(search);
    if (!query) {
      return;
    }
    const filterURI = getFilterUrl(search, { query: query });
    navigate(filterURI);
  }, [query, navigate, search]);

  return (
    <Form onSubmit={(e) => submitHandler(e)} className="d-flex me-auto w-100 search-box">
      <InputGroup>
        <FormControl
          aria-describedby="button-search"
          placeholder="Search for products"
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
        ></FormControl>
        <Button variant="outline-primary" type="submit" id="button-search">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
};
export default SearchBox;
