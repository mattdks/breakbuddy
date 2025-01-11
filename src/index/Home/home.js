export default function renderHomePage() {
  const main = document.querySelector("main");
  main.innerHTML = `
  <div class="content">
    <img
      src="https://cdn.glitch.global/3774e2e9-58a5-41b3-9d45-62c8b63bc41c/Landing%20Page.png?v=1731688772833"
      alt="Break Buddy Logo"
      class="logo"  
    />

    <header class="header">
      <div class="flex-container">
        <div class="character">
          <img
            src="https://cdn.glitch.global/3774e2e9-58a5-41b3-9d45-62c8b63bc41c/character.png?v=1731698171007"
            alt="Break Buddy Character"
          />
        </div>
        
        <div id="down">
          <a href="#learn-more">
            <i class="fa-solid fa-angles-down"></i>
          </a>
        </div>
        
        <button
          class="get-started-btn"
          onclick="window.location.href='?page=login'">
          Get Started <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </header>
  </div>

    <section class="content">
      <h1 id="learn-more">Learn More</h1>
      <section class="info">
        <h2>What are the <strong>benefits</strong> of a productive break?</h2>
        <hr />
        <p>
          Taking productive breaks offers a variety of benefits that go beyond
          simply stepping away from work. They help restore focus and energy,
          giving your brain the chance to recharge so you can return to your
          tasks with greater clarity and concentration. Breaks also enhance
          memory and retention, as they allow the brain to process and
          consolidate what you’ve been working on, making it easier to recall
          later. Engaging in a different activity during a break can boost
          creativity, sparking fresh ideas or new perspectives when you come
          back to your work. <br /><br />
          On a mental and emotional level, breaks reduce stress and improve
          overall well-being. Whether it’s through mindfulness, light physical
          activity, or just stepping outside for fresh air, taking a moment for
          yourself can help lower anxiety and provide a sense of balance.
          Physically, breaks encourage movement, which is crucial for avoiding
          the strain caused by sitting too long. Simple actions like stretching
          or walking can alleviate discomfort and promote better posture.
          <br /><br />
          Productive breaks also increase motivation by making tasks feel more
          manageable. They provide an opportunity to pause and reset, helping
          you stay consistent and engaged. Additionally, they can sharpen
          decision-making and problem-solving skills, as stepping away briefly
          clears mental clutter and allows for better judgment. Over time,
          incorporating regular breaks into your routine fosters positive
          habits, builds resilience, and ensures sustainable productivity
          without risking burnout. A well-timed break isn’t just time off; it’s
          a way to work smarter, not harder.
        </p>
      </section>

      <section class="info">
        <h2>How can <strong>BreakBuddy</strong> help you?</h2>
        <hr />
        <p>
          BreakBuddy is your personal companion for creating a balanced and
          engaging study routine. The app suggests activities tailored to your
          break length, stress level, and location, ensuring every break is
          purposeful and rejuvenating. Our built-in timers help you stay focused
          during study periods, providing structure and accountability so you
          can tackle tasks efficiently. <br /><br />
          Beyond individual productivity,BreakBuddy fosters a sense of community
          with a dedicated Ask &amp; Answer page. Here, you can post questions,
          share answers, and explore what other users are discussing, making
          studying a more collaborative and supportive experience. <br /><br />
          To keep things fun and motivating, BreakBuddy offers daily and monthly
          challenges. By completing these goals, you earn points that can be
          used to customize your very own BreakBuddy character, adding a playful
          and personal touch to your study breaks. With BreakBuddy, staying
          productive and taking mindful breaks becomes something to look forward
          to.
        </p>
      </section>

      <section class="info">
        <h2>What are students’ biggest <strong>concerns?</strong></h2>
        <hr />
        <div class="quote">
          <p><em>“I feel overwhelmed”</em></p>
          <p>
            It's normal to feel overwhelmed when juggling multiple
            responsibilities, but a structured approach can help. BreakBuddy
            provides tailored activities to help you recharge and refocus,
            making overwhelming tasks feel more manageable. With tools like
            timers and daily goals, the app helps break down your study time
            into achievable chunks, reducing stress and keeping you on track.
          </p>
        </div>
        <div class="quote">
          <p><em>“I should use my time better when studying”</em></p>
          <p>
            Time management can be a challenge, especially when distractions
            creep in. BreakBuddy helps you stay on task with features like
            customizable timers and activity suggestions designed to maximize
            your productivity. By encouraging mindful breaks and offering tools
            to plan your study sessions, we empower you to make the most of your
            time and achieve your goals efficiently.
          </p>
        </div>
        <div class="quote">
          <p>
            <em
              >“It's easy to fall into a cycle of procrastination and
              self-negotiation where I end up regretting how I use my time.”</em
            >
          </p>
          <p>
            Procrastination often stems from a lack of structure or motivation.
            BreakBuddy addresses this by gamifying your study routine with daily
            goals, point rewards, and character customization. These features
            provide a sense of accomplishment and accountability, helping you
            break the cycle of procrastination. The app’s community page also
            offers a supportive space to ask questions and find encouragement,
            keeping you motivated to stay on track.
          </p>
        </div>
      </section>
    </section>`;
}