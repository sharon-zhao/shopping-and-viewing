import React from 'react'
import { LinkedinShareButton, LinkedinIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon } from 'react-share'

const Footer = () => (
  <div>
    <footer className="navi_footer" data-global-footer="" data-navi-footer="">
      <div className="navi_footer-grid">
        <div className="navi_footer-grid-one-half navi_footer-main-col">
          <h2 className="navi_footer-links_header">Contact Us</h2>
          <FacebookShareButton
            url="https://sharon-zhao.github.io/shopping-and-viewing/#/"
          >
            <FacebookIcon size={40} round={true} iconFillColor={'white'}/>
          </FacebookShareButton>

          <LinkedinShareButton
            url="https://sharon-zhao.github.io/shopping-and-viewing/#/"
          >
            <LinkedinIcon size={40} round={true} iconFillColor={'white'}/>
          </LinkedinShareButton>

          <TwitterShareButton
            url="https://sharon-zhao.github.io/shopping-and-viewing/#/"
          >
            <TwitterIcon size={40} round={true} iconFillColor={'white'}/>
          </TwitterShareButton>

          <EmailShareButton
            subject="Come check out Envoy!"
            url="https://sharon-zhao.github.io/shopping-and-viewing/#/"
            body="Hey! I'm inviting you to check out this awesome website that I recently discovered called 'ST' where you can view a lot of useful courses. Come check it out!"
          >
            <EmailIcon size={40} round={true} iconFillColor={'white'}/>
          </EmailShareButton>
        </div>
      </div>
      <div className="navi_footer-grid second">
        <div className="navi_footer-grid-one-whole navi_footer-footnote">
          <p className="navi_footer-footnote_copyright footerword">
          ©
          2020
          Shary Todd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
)

export default Footer
