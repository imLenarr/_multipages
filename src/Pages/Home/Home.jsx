import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="me">
        <div className="image">
          <img src="./me.JPG" alt="me" />
        </div>
        <h4>WANNASA WONGDEE</h4>
        <h4>
          Studying in the Faculty of Infomation Technology at Sripathum
          University (CSI)
        </h4>
      </div>

      <div className="info">
        <h3>More information</h3>
        <h4>
          I was born in Ayutthaya Thailand <br />
          and now I came to bangkok for study. <br />
          I love to learn new things. <br />
          When I have time, I like to play games or just do not thing just lay
          on my bed and keep thinking about my future. <br />
          in the future I want to be a software engineer get a marriage have a
          few kids and have a good life and also follow my dream that I wanna be
          a billionaire somehow. Well I am currently studying in my second year
          at university and I have only two years left to graduate and I looking
          forward to it.
        </h4>
        <div className="tj">
          <img src="./tom.jpg" alt="tonandjerry" className="tjimg" />
        </div>
      </div>
    </div>
  );
}

export default Home;
