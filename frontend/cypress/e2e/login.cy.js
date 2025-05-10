describe('Login', () => {
    it('logs in with valid credentials', () => {
        cy.visit("http://localhost:5173/login")

        cy.get('input[type="email"]').type("domino@gmail.com")
        cy.get('input[type="password"]').type("123")
        cy.get('button[type="submit"]').click()

        cy.contains("Create a Note")
    })
})