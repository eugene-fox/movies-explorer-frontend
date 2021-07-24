import './AboutMe.css';
import studentPhotoPath from '../../images/student-photo-test.jpg';

export function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__container">
        <h2 className="main__section-header">Студент</h2>
        <article className="about-me__information">
          <img className="about-me__student-photo" src={studentPhotoPath} alt="Фотография студента" />
          <div className="about-me__text-wrapper">
            <h3 className="about-me__name">Виталий</h3>
            <p className="about-me__short-description">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__paragraph">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>

            <p className="about-me__paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus minima assumenda voluptates perspiciatis dolore sed inventore rem, aut illo rerum dignissimos placeat quod quae blanditiis saepe dolorum itaque molestiae. Rerum veniam deleniti doloribus minima quidem nam nesciunt ex totam. Asperiores corrupti quam totam consequatur non, exercitationem esse rem consectetur ex eligendi. Veritatis quaerat repellendus dolor quia excepturi? Dolorem, ullam deleniti? Tenetur fugiat doloribus nobis ipsam est magnam voluptates repellendus sit eaque iste at similique consequatur nihil nisi corporis cupiditate porro, omnis suscipit dicta saepe voluptatem obcaecati quae iusto odio. Amet, repellat laudantium unde velit ad magni officiis ea facere quia.</p>

            <p className="about-me__paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit harum quia ullam, praesentium ut illum, voluptas deleniti rerum saepe deserunt eaque doloribus accusantium! Voluptate provident tempora unde aspernatur atque! Molestiae eveniet quidem impedit quas ab cumque? Ipsum voluptate assumenda quae commodi minus beatae dignissimos, vel veritatis sit odio natus ullam, rem placeat laudantium itaque blanditiis cumque dolorum nihil quidem? Aut animi obcaecati repellat recusandae consectetur delectus pariatur dolor aspernatur quod vero earum harum, ratione repellendus laboriosam praesentium repudiandae quos, voluptate velit provident dolore corrupti adipisci perspiciatis qui ex. Earum debitis placeat consequatur omnis nostrum neque nulla harum in nobis dolore!</p>

            <ul className="about-me__student-links">
              <li><a className="about-me__student-link-item" href="https://www.facebook.com/eu.lifesizemirror" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a className="about-me__student-link-item" href="https://github.com/eugene-fox" target="_blank" rel="noreferrer">Github</a></li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  )
}