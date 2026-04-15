import React from 'react';
import '../App.css';

const Mentecobre = () => {
  return (
    <div className="mentecobre-root">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h1>Obsidian Conduit</h1>
          <p>Linguistic Data Node</p>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="sidebar-link active">
            <span className="material-symbols-outlined">home</span>
            <span>Home</span>
          </a>
          <a href="#" className="sidebar-link">
            <span className="material-symbols-outlined">query_stats</span>
            <span>Progress</span>
          </a>
          <a href="#" className="sidebar-link">
            <span className="material-symbols-outlined">book</span>
            <span>Glossary</span>
          </a>
          <a href="#" className="sidebar-link">
            <span className="material-symbols-outlined">assignment</span>
            <span>Forms</span>
          </a>
          <a href="#" className="sidebar-link">
            <span className="material-symbols-outlined">sports_esports</span>
            <span>Games</span>
          </a>
        </nav>

        <button className="sidebar-action">
          <span className="material-symbols-outlined">add</span>
          New Translation
        </button>

        <div className="sidebar-footer">
          <a href="#" className="sidebar-footer-link">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </a>
          <a href="#" className="sidebar-footer-link">
            <span className="material-symbols-outlined">help_outline</span>
            <span>Help</span>
          </a>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-start">
            <div className="app-title">The Obsidian Conduit</div>
            <div className="topbar-search">
              <span className="material-symbols-outlined search-icon">search</span>
              <input
                className="search-input"
                type="text"
                placeholder="Search neural patterns..."
              />
            </div>
          </div>

          <div className="topbar-actions">
            <button className="icon-button">
              <span className="material-symbols-outlined">translate</span>
            </button>
            <div className="profile-pill">
              <span>Data Node 01</span>
              <div className="profile-avatar">
                <img
                  alt="User Profile"
                  className="profile-image"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-T9zefl3VJRTbM7W0RDgnYuSsNhhvXcD7Cdj9wgbZAaWv3pcpe3ID46-NU9Ld-rzU84n3rsg6WVYWKoaQvMSNgsOlawOlrwfdsP8Di3JQXjpr6XQxhxAtrnywjQopJA5FEiuJVcXA73t-89pV-_H2QyqQZfDZsMvDyLtqdyAQpF0hYiuSMT3_YLzhVHbTTokMXUKVwuLyy9AKIPDSD02nAUHF0ONtkv-5CrFn8nxEyMLQCGhjWiMW5yNIbjIUysQ6ShmFl9rl6K_T"
                />
              </div>
            </div>
          </div>
        </header>

        <section className="content-section">
          <div className="grid-layout">
            <div className="hero-card">
              <div className="hero-header">
                <div className="hero-tags">
                  <span className="tag tag-primary">Input: Ancient script</span>
                  <span className="tag tag-secondary">Target: Obsidian Common</span>
                </div>
                <span className="hero-status">
                  <span className="status-dot" />
                  Neural Sync Active
                </span>
              </div>

              <div className="hero-copy">
                <p className="hero-copy-text">
                  The stars whisper secrets in languages we have long since forgotten, echoing through the void of the conduit...
                </p>
                <div className="hero-divider" />
                <h3 className="hero-heading">
                  Os astros sussurram segredos em línguas que há muito esquecemos, ecoando pelo vazio do conduto...
                </h3>
              </div>

              <div className="hero-actions">
                <button className="primary-button">
                  <span className="material-symbols-outlined">auto_fix_high</span>
                  Refine Translation
                </button>
                <button className="secondary-button">
                  <span className="material-symbols-outlined">content_copy</span>
                  Extract Data
                </button>
              </div>

              <div className="hero-accent" />
            </div>

            <div className="status-panel">
              <div className="panel-card">
                <span className="panel-label">Throughput Efficiency</span>
                <div className="panel-value-row">
                  <span className="panel-value">94.8%</span>
                  <span className="panel-delta">+2.4%</span>
                </div>
                <div className="panel-progress">
                  <div className="panel-progress-fill" style={{ width: '94.8%' }} />
                </div>
                <p className="panel-note">Optimized via Obsidian ML-Core v4.2</p>
              </div>

              <div className="mini-card">
                <div className="mini-card-header">
                  <span className="material-symbols-outlined mini-card-icon">memory</span>
                  <h4>Latency Response</h4>
                </div>
                <div className="mini-card-value">
                  <span className="mini-card-main">12ms</span>
                  <span className="mini-card-sub">Global Average</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid-layout split-layout">
            <div className="glossary-card">
              <div className="glossary-header">
                <h2>Bilingual Glossary</h2>
                <button className="link-button">View All</button>
              </div>

              <div className="glossary-entry">
                <div className="glossary-entry-header">
                  <strong>Conduit</strong>
                  <span className="badge">NOUN</span>
                </div>
                <p className="glossary-text">
                  A channel for conveying fluid or information, specifically in the context of neural data transmission.
                </p>
                <p className="glossary-quote">
                  "The obsidian conduit pulsed with the rhythm of a thousand dialects."
                </p>
              </div>

              <div className="glossary-entry">
                <div className="glossary-entry-header">
                  <strong>Lattice</strong>
                  <span className="badge">NOUN</span>
                </div>
                <p className="glossary-text">
                  A structural framework consisting of a pattern of interlaced strips or bars of information.
                </p>
              </div>

              <div className="glossary-entry">
                <div className="glossary-entry-header">
                  <strong>Kinetic</strong>
                  <span className="badge">ADJ</span>
                </div>
                <p className="glossary-text">
                  Relating to or resulting from motion, particularly data in transition.
                </p>
              </div>
            </div>

            <div className="graph-card">
              <div className="graph-header">
                <div>
                  <h3>Processing Velocity</h3>
                  <p className="graph-subtitle">Linguistic nodes handled per millisecond</p>
                </div>
                <div className="graph-key">
                  <span className="graph-key-dot primary" />
                  <span className="graph-key-dot accent" />
                </div>
              </div>

              <div className="graph-bars">
                <div className="graph-bar short">
                  <div className="graph-fill" />
                </div>
                <div className="graph-bar medium">
                  <div className="graph-fill" />
                </div>
                <div className="graph-bar tall">
                  <div className="graph-fill" />
                </div>
                <div className="graph-bar xTall">
                  <div className="graph-fill" />
                </div>
                <div className="graph-bar tallish">
                  <div className="graph-fill" />
                </div>
                <div className="graph-bar max">
                  <div className="graph-fill" />
                </div>
              </div>

              <div className="graph-labels">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
              </div>

              <div className="simulation-grid">
                <div className="simulation-card tertiary-border">
                  <h4>Neural Lattice Simulation</h4>
                  <p className="simulation-text">
                    Run stress tests on the current linguistic model to ensure 99.9% semantic accuracy.
                  </p>
                  <button className="link-button accent">Initialize Sim</button>
                </div>

                <div className="simulation-card primary-border">
                  <h4>Dialect Drift Analysis</h4>
                  <p className="simulation-text">
                    Identify emerging linguistic patterns in real-time global communications.
                  </p>
                  <button className="link-button">Analyze Drift</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="page-footer">
          <div>System Status: All Nodes Functional</div>
          <div className="footer-meta">
            <span>Core: v8.1.0-Obsidian</span>
            <span>© 2124 The Conduit Collective</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Mentecobre;
