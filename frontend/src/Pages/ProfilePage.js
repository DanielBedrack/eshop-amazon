// import axios from 'axios';
// import { useContext, useEffect, useState } from 'react';
// import { Row, Col, Card, Form,Button } from 'react-bootstrap';

// import { Helmet } from 'react-helmet-async';
// import { Link } from 'react-router-dom';
// import { Store } from '../Context/Store';

// function ProfilePage() {
//   const {
//     state: { userInfo },
//   } = useContext(Store);

//   // const [changePasswordField, setChangePasswordField] = useState(false)

//   // const [currentPassword, setCurrentPassword] = useState('')
//   // const [newPassword, setNewPassword] = useState('')

//   // const [changeNameField, setChangeNameField] = useState(false)
//   // const [newName, setNewName] = useState('')

//   // const [changeEmailField, setChangeEmailField] = useState(false)

//   // const [newEmail, setNewEmail] = useState('')

//   // const changePasswordState = () => {
//   //   if (changePasswordField) {
//   //     setChangePasswordField(false)
//   //   } else {
//   //     setChangePasswordField(true)
//   //   }
//   // }

//   const [newUser, setNewUser] = useState({
//     changePasswordField: false,
//     currentPassword: '',
//     newPassword: '',
//     changeNameField: false,
//     newName: '',
//     changeEmailField: false,
//     newEmail: '',
//   });

//   const handlePasswordChange = ({userNewPassword}) => {
//     setNewUser({
//       ...userInfo,
//       changePasswordField: true,
//       currentPassword: userInfo.newPassword,
//       newPassword: userNewPassword,
//     });
//   };
//   const changeUserName = () => {
//     //TODO UPDATE USER'S PASSWORD

//     const { data } = axios.put('/api/v1/users/update', {});

//     setChangeNameField(false);
//   };
//   const changeUserEmail = () => {
//     //TODO UPDATE USER'S PASSWORD
//     setChangeEmailField(false);
//   };

//   const changeUserPassword = () => {
//     //TODO UPDATE USER'S PASSWORD
//     setChangePasswordField(false);
//   };

//   return (
//     <div>
//       <Helmet>
//         <title>User Profile</title>
//       </Helmet>
//       <h1 className="my-3">User Profile</h1>
//       <Row>
//         <Col md={8}>
//           <Card className="mb-3">
//             <Card.Body>
//               <Card.Title>Profile details</Card.Title>
//               <div>
//                 <strong>Name: </strong>
//                 <Card.Text>{userInfo.name}</Card.Text>
//                 {!newUser.changeNameField ? (
//                   <Link
//                     value={newUser.newName}
//                     onClick={
//                       newUser.changeNameField
//                         ? () => setChangeNameField(false)
//                         : () => setChangeNameField(true)
//                     }
//                   >
//                     Edit
//                   </Link>
//                 ) : (
//                   <Form onSubmit={changeUserName}>
//                     <Form.Group className="mb-3" controlId="fullName">
//                       <Form.Label>New name: </Form.Label>
//                       <Form.Control
//                         value={newUser.newName}
//                         type="text"
//                         onChange={(e) => setNewName(e.target.value)}
//                       />
//                     </Form.Group>

//                     <div className="mb-3">
//                       <Button variant="primary" type="submit">
//                         Update name
//                       </Button>
//                     </div>
//                   </Form>
//                 )}
//               </div>
//               <div>
//                 <hr />
//                 <strong>Email: </strong>
//                 <Card.Text>{userInfo.email}</Card.Text>
//                 {!newUser.changeEmailField ? (
//                   <Link
//                     onClick={
//                       newUser.changeNameField
//                         ? () => setChangeEmailField(false)
//                         : () => setChangeEmailField(true)
//                     }
//                   >
//                     Edit
//                   </Link>
//                 ) : (
//                   <Form onSubmit={changeUserEmail}>
//                     <Form.Group className="mb-3" controlId="fullName">
//                       <Form.Label>New email: </Form.Label>
//                       <Form.Control
//                         value={newUser.newName}
//                         type="email"
//                         onChange={(e) => setNewEmail(e.target.value)}
//                       />
//                     </Form.Group>

//                     <div className="mb-3">
//                       <Button variant="primary" type="submit">
//                         Update email
//                       </Button>
//                     </div>
//                   </Form>
//                 )}
//               </div>
//               <hr />
//               <div>
//                 <strong>Password: </strong>
//                 {!changePasswordField ? (
//                   <Link onClick={changePasswordState}>Edit</Link>
//                 ) : (
//                   <Form onSubmit={changeUserPassword}>
//                     {/* Full name input area */}
//                     <Form.Group className="mb-3" controlId="fullName">
//                       <Form.Label>Current password</Form.Label>
//                       <Form.Control
//                         value={currentPassword}
//                         type="password"
//                         onChange={(e) => setCurrentPassword(e.target.value)}
//                       />
//                     </Form.Group>

//                     {/* Address input area */}
//                     <Form.Group className="mb-3" controlId="address">
//                       <Form.Label>New password</Form.Label>
//                       <Form.Control
//                         value={newPassword}
//                         type="password"
//                         onChange={(e) => setNewPassword(e.target.value)}
//                       />
//                     </Form.Group>

//                     <div className="mb-3">
//                       <Button variant="primary" type="submit">
//                         Update password
//                       </Button>
//                     </div>
//                   </Form>
//                 )}
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}></Col>
//       </Row>
//     </div>
//   );
// }

// export default ProfilePage;
import React, { useState } from 'react';
import axios from 'axios';

const UpdateUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the updated user data
    const updatedUser = {
      name,
      email,
      password,
    };

    try {
      // Send a POST request to the backend to update the user
      const response = await axios.post('/api/users/update', updatedUser);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      {message && <div className="alert">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
