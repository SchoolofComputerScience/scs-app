<template>
  <div class="content-page">
    <div class="page-body">
      <h1> 
        Diversity and Inclusion
      </h1>
      <section>
        <p>
          The students, faculty and staff of Carnegie Mellon’s School of Computer Science bring together a wealth of perspectives, identities, backgrounds and cultures. Diversity and inclusion are essential elements of our value system bringing unique strengths to education and research as we work to make the world a better place for us all. Diversity and inclusion efforts are not only the right things to do, more and more research shows diversity is a means to better problem solving, higher productivity, and greater innovation.
        </p>
        <p>
          Our success with gender diversity in the undergraduate CS major has been a source of great pride to us all. At a time when women’s participation in computer science is still lamentably low across the nation we show that women can be successful. We show that women can do the work just as well as their male peers. We did not need to change our very challenging curriculum but we did need to change the culture and ensure women were on board with this ongoing process. Indeed, this success has been the result of many years of community involvement including the critical support of our institutional leaders, our faculty and staff, and our students. But we do not rest on our laurels. We still have much to do in terms of sustaining our strengths and working on our weaknesses, on improving broader diversity and inclusion.
        </p>
        <p>
          Improving our community is an ongoing process. We recognize that it isn’t enough for a community to be diverse, members must feel included. One of our valued programs among our diversity and inclusion efforts <a href="https://scs4all.cs.cmu.edu/biasbusters/">BiasBusters@CMU</a> facilitates discussion and practice to raise awareness of unconscious biases and encourages us to work communally to help mitigate the impact of bias.
        </p>
        <p>
          Our efforts are also characterized by the goals of our SCS student organizations: <a href="https://www.scs4all.cs.cmu.edu/">SCS4ALL</a> and <a href="https://www.women.cs.cmu.edu/">Women@SCS</a> who work to develop programs of social and professional activities, leadership opportunities, and outreach events to broaden interest and participation in computing. These initiatives are open to all students in SCS as well as friends of SCS4ALL so that ALL feel included in shaping the culture of our school.
        </p>
        <div class="card card-section">
          <a href="https://www.scs4all.cs.cmu.edu/">
            <h3>SCS4ALL</h3>
            <div>
              <img src="https://storage.cloud.google.com/scs-static/pages/content/scs4all_0.jpg" alt="SCS For All">
            </div>
            <div>
              <p>SCS4ALL is a student-run initiative that works to develop a program of social and professional activities and leadership opportunities for the SCS community along with outreach events to broaden interest and participation in computing.</p>
            </div>
          </a>
        </div>
        <div class="card card-section">
          <a href="https://www.scs4all.cs.cmu.edu/">
            <h3>Women@SCS</h3>
            <div>
              <img src="https://storage.cloud.google.com/scs-static/pages/content/wscs_logo2.jpg" alt="SCS For All">
            </div>
            <div>
              <p>The Women@SCS mission is to create, encourage, and promote women's academic, social and professional opportunities in the computer sciences and to promote the breadth of the field and its diverse community. The Women@SCS Advisory Committee consists of undergraduate students, graduate students, and faculty within the School of Computer Science.</p>
            </div>
          </a>
        </div>
        <div class="card card-section">
          <a href="https://www.scs4all.cs.cmu.edu/">
            <h3>BiasBusters@CMU</h3>
            <div>
              <p>BiasBusters@CMU is modeled on Google’s Bias Busting@ Work program, and developed in concert with Google. The program was piloted in the School of Computer Science (BiasBusters@SCS,CMU) to engage over issues of bias, diversity, and inclusion. BiasBusters sessions are led by members of the CMU community who have volunteered to be trained as program facilitators. BiasBusters@CMU now reaches communities across the Carnegie Mellon campus.</p>
              <p>Several things distinguish BiasBusters@CMU from similar programs. First is the framing: the program has an academic tone, focusing on summaries of research evidence into which discussions of experience are woven. Second, the role-playing, based on relevant and real life scenarios, has proved to be a powerful and effective approach for engaging participants, both at Google and at CMU, creating commitments to greater inclusion.</p>
            </div>
          </a>
        </div>
        <div class="brochure-bit">
          <blockquote>
            <h2>A diverse and inclusive community is the foundation for excellence in research, creativity, learning and human development, and is, therefore, at the core of our mission as a university.</h2> 
            <footer>
              <cite>
                <strong>Farnam Jahanian</strong>
                President of CMU
              </cite>
            </footer>
          </blockquote>
        </div>
        <p>For more information regarding Diversity and Inclusion at Carnegie Mellon University, including demographics, strategic planning, and our history, visit <a href="http://www.cmu.edu/diversity">click here</a>.</p>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

.content-page {
  background: #fff;
}

.card-section {
  a {
    color: #000;  
  }
}


.brochure-bit {
  font-size: 1rem;
  line-height: 1.7;
  @include breakpoint-min(tablet) {
    font-size: 1.25rem;
    padding: $default-gutter #{$default-gutter * 2};
  }
  @include breakpoint-min(laptop) {
    padding: #{$default-gutter * 2};
  }
  @include breakpoint-min(full) {
    padding: #{$default-gutter * 3} #{$default-gutter * 4};
  }

  // Special spacing between touching brochure bits

  h2 {
    font-size: 1.4em;
    line-height: 1.44;
    font-weight: bold;
  }

  blockquote {
    @include diagonal-line(vertical, default);
    position: relative;
    padding: 0 0 0 2.1rem;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      box-sizing: content-box;
      width: 0.8em;
      height: 0.8em * 0.7879;
      transform: translate(-50%, 0);
      font-size: 4.25em;
      line-height: 0.5;
      color: #900;
      background: #fff url(../assets/img/quote.png) no-repeat center top;
      background-size: 60% auto;
    }
  }

  cite {
    font-size: 1rem;
    line-height: 1.375;
    font-style: italic;

    strong {
      display: block;
      font-style: normal;
    }
  }
}


</style>