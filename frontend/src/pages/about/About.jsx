import React from 'react'
import Navbar from '../../components/Navbar'
import './About.css'

function About() {
  return (
    <>
      <div>
        <Navbar />
        <div className="about-container">
          <h1>About CANDU</h1>
          <p className="about-body-p">
            Welcome to CANDU, a unique platform that connects art, creativity,
            and social engagement.
          </p>
          <h2>What is CANDU?</h2>
          <p className="about-body-p">
            CANDU is a private online gallery within the university. All
            registered users with a university email can upload their own
            artworks and offer them for sale. Artists decide whether to keep the
            proceeds or donate them to a charitable organization.
          </p>
          <h2>How does it work?</h2>
          <ul className="about-body-ul">
            <li>
              Only users with a valid university email can access the platform.
            </li>
            <li>
              When uploading an artwork, artists choose whether to keep or
              donate the proceeds.
            </li>
            <li>
              Artworks available for donation are marked, allowing buyers to
              voluntarily pay more than the minimum price.
            </li>
            <li>
              A countdown on the homepage shows the duration of the current
              donation campaign.
            </li>
            <li>
              Once the campaign ends, all funds from donation-based sales are
              forwarded to a selected charity.
            </li>
          </ul>
          <h2>Our Vision</h2>
          <p className="about-body-p">
            We believe that art is not only a form of individual expression but
            also a way to strengthen communities and drive positive change.
            CANDU provides a platform where creativity is showcased and
            solidarity is brought to life.
          </p>
          <p className="about-body-p">
            Whether you're an artist or an art enthusiast – join CANDU and
            support art with purpose!
          </p>
        </div>
      </div>
    </>
  )
}

export default About
