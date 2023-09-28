const bookFirst = {
  title: "Все любят котиков",
  description:
    "Все любят котиков! И это чистая правда. Ведь нет никого милее этих пушистиков, которые, свернувшись комочком на вашей груди, способны спасти от любой печали и вернуть вам душевную гармонию.",
  author: "Томас Ом",
};

const bookSecond = {
  title: "Фелинология. Учебное пособие",
  description:
    "Благодаря данному пособию студент будет иметь представление о предмете и задачах фелинологии, о значении фелинологии и ее связи с другими разделами биологии.",

  author: "Татьяна Блохина",
};

const bookThird = {
  title: "КОТоЛОГИКА. О чем молчит кошка",
  description:
    "Мы можем быть хозяевами животных, но когда речь заходит о безусловной любви – здесь именно они настоящие мастера. Поэтому время, уделенное любимой кошке, никогда не будет потрачено зря: так вы вкладываете в любовь.",
  author: "Марина Жеребилова",
};

describe("Favorite book spec", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
  });

  it("Should add new book", () => {
    cy.addBook(bookFirst);
    cy.get(".card-title").should("contain.text", bookFirst.title);
  });

  it("Should add new book to favorite", () => {
    cy.addFavoriteBook(bookSecond);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", bookSecond.title);
  });

  it("Should add book to favorite through 'Book list' page", () => {
    cy.addBookNoFavorite(bookFirst);
    cy.contains(bookFirst.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.visit("/favorites");
    cy.contains(bookFirst.title).should("be.visible");
  });

  it("Should delete book from favorite", () => {
    cy.visit("/favorites");
    cy.contains(bookSecond.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(bookSecond.title).should("not.exist");
  });
});
