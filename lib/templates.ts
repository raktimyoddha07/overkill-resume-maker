export const STARTER_HTML = `<div class="resume">
  <header class="resume-header">
    <h1>Jane Doe</h1>
    <p class="tagline">Full Stack Developer</p>
    <p>
      <i class="fa-solid fa-envelope"></i>
      <a href="mailto:jane@example.com">jane@example.com</a>
      &nbsp;|&nbsp;
      <i class="fa-brands fa-linkedin"></i>
      <a href="https://linkedin.com/in/janedoe" target="_blank">linkedin.com/in/janedoe</a>
      &nbsp;|&nbsp;
      <i class="fa-brands fa-github"></i>
      <a href="https://github.com/janedoe" target="_blank">github.com/janedoe</a>
    </p>
  </header>
  <hr />
  <section>
    <h2>Experience</h2>
    <div class="entry">
      <div class="entry-header">
        <strong>Senior Developer</strong>
        <span>Acme Corp · 2021 – Present</span>
      </div>
      <ul>
        <li>Built and shipped three customer-facing products serving 50k+ users.</li>
        <li>Reduced API latency by 40% through query optimisation.</li>
      </ul>
    </div>
  </section>
  <hr />
  <section>
    <h2>Education</h2>
    <div class="entry">
      <div class="entry-header">
        <strong>B.Sc. Computer Science</strong>
        <span>State University · 2017 – 2021</span>
      </div>
    </div>
  </section>
  <hr />
  <section>
    <h2>Skills</h2>
    <ul class="skills-list">
      <li>TypeScript</li>
      <li>React</li>
      <li>Node.js</li>
      <li>PostgreSQL</li>
      <li>Docker</li>
    </ul>
  </section>
</div>`;

export const STARTER_CSS = `.resume { font-family: 'Roboto', sans-serif; }
.resume-header { text-align: center; margin-bottom: 16px; }
.resume-header h1 { font-size: 28px; font-weight: 700; margin-bottom: 4px; }
.tagline { font-size: 15px; color: #555; margin-bottom: 8px; }
h2 { font-size: 16px; font-weight: 600; text-transform: uppercase;
     letter-spacing: 0.08em; color: #333; margin: 16px 0 8px; }
hr { border: none; border-top: 1px solid #ddd; margin: 8px 0; }
.entry { margin-bottom: 12px; }
.entry-header { display: flex; justify-content: space-between;
                font-size: 14px; margin-bottom: 4px; }
ul { margin: 0; padding-left: 18px; }
li { margin-bottom: 3px; font-size: 13px; }
a { color: #1a56db; }
.skills-list { display: flex; flex-wrap: wrap; gap: 8px; list-style: none;
               padding: 0; }
.skills-list li { background: #f3f4f6; padding: 3px 10px;
                  border-radius: 4px; font-size: 13px; }`;
