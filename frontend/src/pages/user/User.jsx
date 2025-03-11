import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Tab from 'react-bootstrap/Tab'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Tabs from 'react-bootstrap/Tabs'
import { logoutUser } from '../../features/user/userSlice'
import Navbar from '../../components/Navbar.jsx'
import { useNavigate } from 'react-router-dom'
import { getUsersArtworks } from '../../features/artwork/artworkSlice.jsx'
import { useSelector } from 'react-redux'
import PaintingCard from '../../components/PaintingCard'
import Footer from '../../components/Footer.jsx'
import { setArtwork } from '../../features/artwork/artworkSlice.jsx'
import { getUser, updateUser } from '../../features/user/userSlice.jsx'
import DeleteButton from '../../components/DeleteButton'
import FormRow from '../../components/FormRow'

import 'bootstrap/dist/css/bootstrap.min.css'
// import '../../bootstrap-styles/custom-bootstrap.scss' // Nur die benötigten Bootstrap-Styles

function User() {
  const { user, isLoading } = useSelector((store) => store.user)
  const { artwork } = useSelector((store) => store.artwork)
  const [values, setValues] = useState(artwork)
  console.log(user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setValues({ ...values, [name]: value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const { firstname, lastname } = values
    dispatch(
      updateUser({
        firstname,
        lastname,
        email: user.email,
      })
    )
  }

  const [key, setKey] = useState('Activity')

  useEffect(() => {
    if (user) {
      dispatch(getUsersArtworks({}))
      dispatch(getUser({ email: user.email }))
    }
  }, [])

  let { usersArtworks } = useSelector((store) => store.artwork)
  const [favorites, setFavorites] = useState(user?.favorites || [])

  const toggleFavorite = (itemId) => {
    const isFavorite = favorites.includes(itemId)
    const updatedFavorites = isFavorite
      ? favorites.filter((id) => id !== itemId)
      : [...favorites, itemId]

    setFavorites(updatedFavorites)

    console.log('favorites: ', favorites)
    console.log('updatedFavorites: ', updatedFavorites)
    dispatch(
      updateUser({
        ...user,
        favorites: updatedFavorites,
      })
    )
  }

  return (
    <div>
      <Navbar />
      <div className="main-content">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="Activity" title="Activity">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={2}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Tab 3</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={10}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      {' '}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          justifyContent: 'center',
                          gap: '20px',
                          marginTop: '20px',
                        }}
                      >
                        {usersArtworks ? (
                          usersArtworks.map((artwork) => (
                            <PaintingCard
                              key={artwork._id}
                              painting={artwork}
                              onClick={() => navigate('/ViewArtwork')}
                              isFavorite={favorites.includes(artwork._id)}
                              onToggleFavorite={toggleFavorite}
                            />
                          ))
                        ) : (
                          <p>No paintings is uploaded!</p>
                        )}
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
                    <Tab.Pane eventKey="third">Third tab content</Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Tab>
          <Tab eventKey="profile" title="Profile">
            {/* <button
              type="button"
              onClick={() => {
                navigate('/EditUser')
              }}
              className="member-btn"
            >
              {'Edit user information'}
            </button> */}
            <div>
              <form className="form" onSubmit={onSubmit}>
                <h3>{'Edit'}</h3>
                {/* name field */}
                <FormRow
                  type="text"
                  name="firstname"
                  value={values?.firstname}
                  handleChange={handleChange}
                />
                <FormRow
                  type="text"
                  name="lastname"
                  value={values?.lastname}
                  handleChange={handleChange}
                />
                {/* email field */}

                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'loading...' : 'submit'}
                </button>
              </form>

              <h3>{'change password'}</h3>
              <button
                type="button"
                onClick={() => {
                  navigate('/EditPassword')
                }}
              >
                {'change password'}
              </button>
              <br />
              <br />
              <DeleteButton />
              {/* <button
        type="button"
        onClick={() => {
          dispatch(removeUser({ email: user.email }))
        }}
        style={{ backgroundColor: 'red' }}
      >
        {'remove user'}
      </button> */}
              <br />
              <br />
              <button
                type="button"
                onClick={() => {
                  navigate('/User')
                }}
              >
                {'back'}
              </button>
            </div>
          </Tab>
        </Tabs>
      </div>
      <button
        type="button"
        onClick={() => {
          dispatch(logoutUser())
          navigate('/login')
        }}
        className="member-btn"
      >
        {'Logout'}
      </button>

      <div>
        <Footer />
      </div>
    </div>
  )
}

export default User
