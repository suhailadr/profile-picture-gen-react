import React from "react";
import "./App.css";
import ImageBlender from "./ImageBlender";

function App() {
  return (
    <div className="App">
      {/* <header className="hero">
        <h1>Ramadan Prayer Congregation</h1>
        <p className="subtitle">Ma'din Academy's 26th Night of Holy Ramadan</p>
      </header> */}

      <main className="content">
        <ImageBlender />
        <section className="highlight-section">
          <h2>A Gathering for Peace</h2>
          <p>
            The mammoth Ramadan prayer congregation in India, organized by Ma'din
            Academy, concluded with mass prayer and pledge against terrorism.
            Thousands from across the globe united in prayer and purpose.
          </p>
        </section>

        <section className="stats-section">
          <div className="stat-card">
            <h3>30</h3>
            <p>Days of Spiritual Program</p>
          </div>
          <div className="stat-card">
            <h3>5555</h3>
            <p>Volunteer Members</p>
          </div>
          <div className="stat-card">
            <h3>100K+</h3>
            <p>Food Packets Distributed</p>
          </div>
        </section>

        <section className="details-section">
          <h2>Program Highlights</h2>
          <div className="program-grid">
            <div className="program-item">
              <h3>Prayer & Peace Conference</h3>
              <p>Itikaf session in Ma'din Grand Masjid, followed by Qura'n and Hadith learning sessions</p>
            </div>
            <div className="program-item">
              <h3>International Participation</h3>
              <p>Delegates from Australia, UK, Hong Kong, Malaysia and Gulf countries</p>
            </div>
            <div className="program-item">
              <h3>Community Support</h3>
              <p>Medical, fire and rescue units alongside district administration and police</p>
            </div>
          </div>
        </section>

        <section className="quote-section">
          <blockquote>
            "We reaffirm that usurping the rights of fellow-beings is a grave offence to humanity. 
            We honour the dignity of others. Even when we take pride in being a Muslim, we respect 
            and honour all other faiths and their followers."
            <cite>- Sayyid Ibraheemul Khaleel Al Bukhri</cite>
          </blockquote>
        </section>

        <section className="about-section">
          <h2>About Ma'din Academy</h2>
          <p>
            Established in 1997, Ma'din Academy runs 50+ educational and charity ventures 
            with 30,000+ students. The academy promotes interfaith harmony through various 
            programs including the International Interfaith Harmony Seminar and participation 
            in the G20 Interfaith Summit.
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 Ma'din Academy. Promoting Peace, Education & Harmony</p>
      </footer>
    </div>
  );
}

export default App;
